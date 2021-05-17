import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes, getGame, updateGame } = useContext(GameContext)
    const { gameId = null } = useParams()

    const [currentGame, setCurrentGame] = useState({
        title: "",
        maker: "",
        skillLevel: 1,
        numberOfPlayers: 1,
        gameTypeId: 0
    })

    useEffect(() => {
        getGameTypes()
        if (gameId != null) {
            getGame(gameId).then(setCurrentGame)
        }
    }, [])

    const changeGameState = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    const handleSaveGame = () => {
        if (currentGame.title === "" && currentGame.maker === "" && currentGame.gameTypeId === 0) {
            window.alert("Please complete all fields")
        } else {
            const game = {
                title: currentGame.title,
                maker: currentGame.maker,
                skillLevel: parseInt(currentGame.skillLevel),
                numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                gameTypeId: parseInt(currentGame.gameTypeId)
            }
            if (gameId) {
                game.id = gameId
                updateGame(game)
                    .then(() => history.push("/games"))
            } else {

                createGame(game)
                    .then(() => history.push("/games"))
            }
            // createGame({
            //     title: currentGame.title,
            //     maker: currentGame.maker,
            //     skillLevel: parseInt(currentGame.skillLevel),
            //     numberOfPlayers: parseInt(currentGame.numberOfPlayers),
            //     gameTypeId: parseInt(currentGame.gameTypeId)
            // })
            //     .then(() => history.push("/games"))
        }

    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus maxLength="75" className="form-control"
                        placeholder="Game Title"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required maxLength="50" className="form-control"
                        placeholder="Game Maker"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level 1-10: </label>
                    <input type="number" name="skillLevel" required min="1" max="10" className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" required min="1" className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameTypeId" required className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}>
                        <option value="0">Select a Game Type</option>
                        {gameTypes.map(gameType => (
                            <option value={gameType.id} key={gameType.id}>{gameType.label}</option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <button className="btn btn-2 btn-primary"
                onClick={evt => {
                    evt.preventDefault()
                    handleSaveGame()
                }}>{gameId ? "Update" : "Create"}</button>
        </form>
    )
}