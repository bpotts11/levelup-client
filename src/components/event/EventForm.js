import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider.js"
import { GameContext } from "../game/GameProvider.js"


export const EventForm = () => {
    const history = useHistory()
    const { getGames, games } = useContext(GameContext)
    const { createEvent } = useContext(EventContext)

    const [currentEvent, setEvent] = useState({
        gameId: 0,
        startDate: "",
        description: ""
    })

    useEffect(() => {
        getGames()
    }, [])

    const changeEventState = event => {
        const newEvent = { ...currentEvent }
        let selectedValue = event.target.value
        newEvent[event.target.name] = selectedValue
        setEvent(newEvent)
    }

    const handleSaveEvent = () => {
        if (currentEvent.gameId === 0 && currentEvent.startDate === "" && currentEvent.description === "") {
            window.alert("Please complete all fields")
        } else {
            createEvent({
                gameId: parseInt(currentEvent.gameId),
                startDate: currentEvent.startDate,
                description: currentEvent.description
            })
                .then(() => history.push('/events'))
        }
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={currentEvent.gameId}
                        onChange={changeEventState}>
                        <option value="0">Select a game...</option>
                        {games.map(game => (
                            <option value={game.id} key={game.id}>{game.title}</option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input name="description" type="text" onChange={changeEventState} value={currentEvent.description} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date: </label>
                    <input name="startDate" type="datetime-local" onChange={changeEventState} value={currentEvent.startDate} />
                </div>
            </fieldset>

            <button className="btn btn-2 btn-primary"
                onClick={evt => {
                    evt.preventDefault()
                    handleSaveEvent()
                }}>Create Event</button>
        </form>
    )
}