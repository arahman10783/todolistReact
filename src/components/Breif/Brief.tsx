import React from 'react'
import style from './Breif.module.css'

interface BriefProps {
  taskNo: number
}

function Brief ({taskNo = 0} : BriefProps){
  return(
    <p className={style.taskCount}>You have {taskNo} {taskNo === 1 ? "task" : "tasks"} to do</p>
  )
}

export default Brief

