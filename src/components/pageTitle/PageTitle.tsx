import React from 'react'
import style from './PageTitle.module.css'

interface PageTitleProps {
  title: string
}

function PageTitle({title}: PageTitleProps){
  return(
    <h1 className={style.pageTitle}>{title}</h1>
  )
}

export default PageTitle