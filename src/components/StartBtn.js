import React from "react";
import { StyledStartButton } from "./styles/StyledStartButton";


const StartBtn = ({callback}) =>(
    <StyledStartButton onClick={callback}>Start new Game</StyledStartButton>
)


export default StartBtn;