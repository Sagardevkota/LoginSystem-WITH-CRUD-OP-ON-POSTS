import React from 'react'
import styles from './Post.module.css'


const Post=(props)=>{

    return(
        
         <div  className={styles.Post}
        onClick={props.clicked}
         >
          <h1>{ props.title }</h1>
          <h4>{props.userId} </h4>

         </div>
         
    )
}

export default Post