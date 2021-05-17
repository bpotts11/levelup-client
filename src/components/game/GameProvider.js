import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [games, setGames] = useState([])
    const [gameTypes, setGameTypes] = useState([])

    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const createGame = (game) => {
        return fetch('http://localhost:8000/games', {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem('lu_token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(game)
        })
            .then(getGames)
    }

    const getGameTypes = () => {
        return fetch('http://localhost:8000/gametypes', {
            headers: {
                "Authorization": `Token ${localStorage.getItem('lu_token')}`
            }
        })
            .then(res => res.json())
            .then(setGameTypes)
    }

    const getGame = (gameId) => {
        return fetch(`http://localhost:8000/games/${gameId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem('lu_token')}`
            }
        })
            .then(res => res.json())
            .then(game => {
                return {
                    title: game.title,
                    maker: game.maker,
                    skillLevel: game.skill_level,
                    numberOfPlayers: game.number_of_players,
                    gameTypeId: game.game_type.id
                }
            })
    }

    const updateGame = (game) => {
        return fetch(`http://localhost:8000/games/${game.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem('lu_token')}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(game)
        })
    }

    return (
        <GameContext.Provider value={{ games, getGames, gameTypes, getGameTypes, createGame, getGame, updateGame }} >
            { props.children}
        </GameContext.Provider>
    )
}