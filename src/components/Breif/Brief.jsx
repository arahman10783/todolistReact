import style from './Breif.module.css'

function Brief ({taskNo = 0}){
  return(
    <p className={style.taskCount}>You have {taskNo} tasks to do</p>
  )
}

export default Brief

