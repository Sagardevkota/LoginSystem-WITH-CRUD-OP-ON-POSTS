
import React, { useState,useEffect, Component } from 'react'

import axios from 'axios'
import styles from './FullPost.module.css'
import Spinner from '../../Spinner';


function FullPost({match}){

    const[isLoading,setisLoading]=useState(true);

    useEffect(()=>{

        fetchItem();
        
    },[]


    );

    const [item,setItem]=useState({});

    const fetchItem=async()=>{
         
       const res= await axios.get("https://jsonplaceholder.typicode.com/posts/" +match.params.id );

        setItem(res.data)
        setisLoading(false)

    }
    return(
      <div className={styles.FullPost}>

          
           {isLoading ? <Spinner/> : null}
         
          <h1>{item.id}</h1>
    <h2>{item.body}</h2>
      </div>

    )


}


export default FullPost