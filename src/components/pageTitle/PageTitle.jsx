import style from './PageTitle.module.css'

function PageTitle({title}){
  return(
    <h1 className={style.pageTitle}>{title}</h1>
  )
}

export default PageTitle