import style from './FiltrationBtn.module.css'

export default function FiltrationBtn ({label, onClickHandler, active}){
  return (
    <button className={`${style.button} ${active? style.chosen : ""}`} onClick={onClickHandler}>{label}</button>
  )
}