import React from 'react'
import style from './FiltrationBtn.module.css'

interface FiltrationBtnProps {
  label: string;
  onClickHandler: () => void;
  active: Boolean;
}


export default function FiltrationBtn ({label, onClickHandler, active}: FiltrationBtnProps){
  return (
    <button className={`${style.button} ${active? style.chosen : ""}`} onClick={onClickHandler}>{label}</button>
  )
}