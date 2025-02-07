import style from './PageTitle.module.css'

function PageTitle(props){
  return(
    <h1 className={style.pageTitle}>{props.title}</h1>
  )
}

export default PageTitle