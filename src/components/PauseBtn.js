import React from "react";
import { StyledStartButton } from "./styles/StyledStartButton";


const PauseBtn = ({callback}) =>(
    <StyledStartButton onClick={callback}>Pause</StyledStartButton>
)


export default PauseBtn;