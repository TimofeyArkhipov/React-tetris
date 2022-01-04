import React, {useEffect, useState} from "react";
import { createStage, checkCollision } from "../gameHelpers";
import { StyledTetrisWrapper, StyledTetris, StyledMusBtn } from "./styles/StyledTetris";


// import {useInteral} from '../hooks/useInteral';
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from './../hooks/useStage';
import {useGameStatus} from '../hooks/useGameStatus';

import Stage from "./Stage";
import Display  from "./Display";
import StartBtn from "./StartBtn";
// import playerRotate
import { useInterval } from '../hooks/useInterval';
import Player from "../hooks/useAudio";

// import music1 from '../../src/sounds/GameA.mp3';
import sound1 from '../../src/sounds/battle-city-sfx-6.mp3';
import sound2 from '../../src/sounds/sfx-3.mp3';
import loose from '../../src/sounds/Loose.mp3';
import imDropSound from '../../src/sounds/sfx-10.mp3';
import PauseBtn from "./PauseBtn";

const Tetris = () => {
  const [pause, setPause] = useState(false);
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(    rowsCleared  );

  // let music = new Audio(music1);
  let audio1 = new Audio(sound1);
  let audio2 = new Audio(sound2);
  let looseSound = new Audio(loose);
  let dropSound = new Audio(imDropSound);

//get user score





  const [topScore, setTopScore] = useState(localStorage.getItem('topScore') ? localStorage.getItem('topScore') : '');




  // console.log('re-render');
  
    const movePlayer = dir => {
      if (!checkCollision(player, stage, { x: dir, y: 0 })) {
        updatePlayerPos({ x: dir, y: 0 });
      }
    }
  
    const startGame = () => {
      // console.log("test")
      // const audio = '/public/sounds/GameA.mp3';
      // music.play();
      // music.loop = true;
      // music.volume = 0.3;
      
      setStage(createStage());
      setDropTime(1000);
      resetPlayer();
      setScore(0);
      setRows(0);
      setLevel(0);
      setGameOver(false);     
    }


  

  

 
   audio1.volume = 0.2;
    
  
    const drop = () => {
      // Increase level when player has cleared 10 rows

      if(score>topScore){
        setTopScore(score);
        localStorage.setItem('topScore', score);
      }


      if (rows > (level + 1) * 10) {
        setLevel(prev => prev + 1);
        // Also increase speed
        setDropTime(1000 / (level + 1) + 200);
      }
  
      if (!checkCollision(player, stage, { x: 0, y: 1 })) {
        updatePlayerPos({ x: 0, y: 1, collided: false });
       
      } else {
        // Game over!
        if (player.pos.y < 1) {
          console.log('GAME OVER!!!');
          setGameOver(true);
          setDropTime(null);
          looseSound.play();
          console.log(topScore);
        }

        updatePlayerPos({ x: 0, y: 0, collided: true });
        dropSound.volume = 0.3;
        dropSound.play();
        
      }
    };
  
    const keyUp = ({ keyCode }) => {
      if (!gameOver) {
        // Activate the interval again when user releases down arrow.
        if (keyCode === 40) {
          setDropTime(1000 / (level + 1) + 200);
        }
      }
    };

    const dropPlayer = () => {
      console.log('interval off')
      setDropTime(null);
      drop();
    }
  
    const move = ({ keyCode }) => {
    
      audio1.pause();
      audio1.currentTime = 0;    

        if (!gameOver && !pause) {
          if (keyCode === 37) {
            movePlayer(-1);
          } else if (keyCode === 39) {
            movePlayer(1);
          } else if (keyCode === 40) {
            dropPlayer();
          } else if (keyCode === 38) {
            playerRotate(stage, 1)
          }
          // audio1.pause();
          // audio1.currentTime = 0;
          // audio1.play();
         
        }
    }

    useInterval(()=>{
      drop();
    }, dropTime, pause);
  

    const resumeGame = () =>{
      setDropTime(1000 / (level + 1) + 200);
    }

    const pauseGame = () => {
      setDropTime(null);
    }  

    const pauseBtn = () =>{
      if(pause){
        setPause(false);
        resumeGame();
      } else {
        setPause(true);
        pauseGame();
      }
      console.log(pause);
    }


  
    // useEffect(()=>{
    //   // if(pause){
    //   //   pauseGame();
    //   // } else {
    //   //   resumeGame();
    //   // }
    //   console.log(pause)

    // }, [pause])


    return (
      <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)} onKeyUp={keyUp}>
        <StyledTetris>
          <Stage stage={stage} />
          <aside>
            {gameOver ? (
              <div>
                <Display gameOver={gameOver} text="Game Over" />
                <Display text={`top score: ${topScore}`} />
              </div>
              
            ) : (
              <div>
                <Display text={`Score: ${score}`} />
                <Display text={`Rows: ${rows}`} />
                <Display text={`Level: ${level}`} />
                <Display text={`top score: ${topScore}`} />
              </div>
            )}
            <StartBtn callback={startGame} />
            <PauseBtn callback={pauseBtn} />
         
            <Player/>
          </aside>
        </StyledTetris>
      </StyledTetrisWrapper>
    );
  };
  
  export default Tetris;