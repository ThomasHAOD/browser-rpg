import React, {Fragment, useState} from 'react'
import PlayerBattleSprite from '../Components/BattleComponents/PlayerBattleSprite'
import EnemyBattleSprite from '../Components/BattleComponents/EnemyBattleSprite'
import battle from '../sounds/battle.mp3'

import {Redirect} from 'react-router-dom'

import './BattleContainer.css'

const BattleContainer = ({currentPlayer, currentCharacter, currentEnemy, playerAttacksEnemy, enemyAttacksPlayer, playerDefends, resetEnemy, accumulateScore, setCurrentHPCharacter}) => {

    const [playerTurn, setPlayerTurn] = useState(true);
    
    if (currentEnemy.alive === false) {
        console.log(currentEnemy.currentHP)
        resetEnemy();
        accumulateScore();
        return (
            <Redirect to="/endgame" />
        )
    }

    if (currentCharacter.alive === false) {
        console.log(currentCharacter.currentHP)
        setCurrentHPCharacter()
        console.log(currentCharacter.currentHP)
        resetEnemy();
        return (
            <Redirect to="/endgame" />
        )
    }


    if (!currentPlayer.id || !currentCharacter.maxHP) {
        return (
            <Redirect to="/" />
        )
    }

    

    if(playerTurn === false){
        setInterval(enemyAttacksPlayer(), 4000)
        
        setPlayerTurn(true)

    }

    function attack(){
        playerAttacksEnemy()
        setPlayerTurn(false)

    }

    function defend(){
        playerDefends()
        setPlayerTurn(false)
    }
    
        return(
            <Fragment>
                <div id="battle-container">
                    <audio src={battle} autoPlay loop={true}/>
                    <h1>FIGHT!</h1>
                    <PlayerBattleSprite currentCharacter={currentCharacter}/>
                    <EnemyBattleSprite hp={currentEnemy}/>
                    <button id="attack" onClick={attack}>Attack!</button>
                    <button id="defend" onClick={defend}>Defend!</button>

                </div>
                
            </Fragment>
        )

}

export default BattleContainer