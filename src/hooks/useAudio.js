import React, { useState, useEffect } from "react";
import music1 from '../../src/sounds/GameA.mp3';



const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
      audio.loop=true;
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);
  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(music1);
//   toggle = true;

  return (
    <div>
      <button className='musBtn' onClick={toggle}>{playing ? "Music off" : "Music on"}</button>
    </div>
  );
};

export default Player;