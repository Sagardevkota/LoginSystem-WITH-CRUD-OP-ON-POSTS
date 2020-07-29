import React, { Component } from 'react'
import {withRouter , Link} from 'react-router-dom';
import styles from './Home.module.css'
import Axios from 'axios';
import Post from './Post';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import SideBar from '../Home/SideBar/SideBar'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { isWidthUp } from '@material-ui/core';


const useStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    
  });

export class Home extends Component {

    constructor(props){
        super(props)
        this.props=props
       
    }

    state={
        posts:[],
        posts_error:false
    }


    

    componentWillMount(){
        let store=JSON.parse(localStorage.getItem('login'));

        if(store===null){
            console.log("Store is empty so redirecting user to login page");
            this.props.history.push('/')

        }

        else{

            Axios.get('https://jsonplaceholder.typicode.com/posts').then(response=>{
              this.setState(
                 { 
                     posts: response.data
                 }
                  )
            console.log(response)
            }).catch(error=>{
                this.setState({
                    posts_error:error
                })
            });
            }
            
        
        }
    

    logoutHandler=()=>{

        localStorage.removeItem('login');
        this.props.history.push('/');





    }

    onClickHandler=(id)=>{
        this.props.history.push('/FullPost/' + id);
   
    }
   

    render() {

       
            const posts=this.state.posts.map(post=>{
            return <Post 
            key={post.id}
            id={post.id}
            title={post.title} 
            userId={post.userId}
            clicked={()=>this.onClickHandler(post.id)}
            
            />;
        });

       
        const { classes } = this.props;


        return (
            
            <div className={styles.gridcontainer}>
  <header className={styles.header}>
  
  <ul>

      <li>S-Mart</li>
      <li>Add Products</li>
      <li>Profile</li>
      <li>Logout</li>
  </ul>


  </header>
  <aside className={styles.sidenav} >
  <h2>S-Mart Dashboard</h2>
  <SideBar />
  </aside>
  <main className={styles.main}>

  {this.state.posts_error ? <span style={{color: "red"}}>Please Check your internet connection..Error 403</span> : ''}
     
  <section className={styles.tab}  >

  <Card className={styles.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height='210'
      
          image="https://material-ui.com/static/blog/2019-survey/7.png"
          title="Contemplative Reptile"
        />
        <CardContent className={styles.cardContent} >
          <Typography gutterBottom variant="h5" component="h2">
            New Orders
          </Typography>
          <Typography variant="body2" color="white" component="p">
           225
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.cardActions}>
        <Button size="small" color="">
          Click here to view
        </Button>
        
      </CardActions>
    </Card>
     
    <Card className={styles.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height='210'
         
          image="https://material-ui.com/static/blog/2019-survey/1.png"
          title="Contemplative Reptile"
        />
        <CardContent className={styles.cardContent} >
          <Typography gutterBottom variant="h5" component="h2">
            Pending Orders
          </Typography>
          <Typography variant="body2" color="white" component="p">
           225
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.cardActions}>
        <Button size="small" color="">
          Share
        </Button>
        <Button size="small" color="white">
          Learn More
        </Button>
      </CardActions>
    </Card>

    <Card className={styles.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height='210'
          image="https://www.sketchappsources.com/resources/source-image/line-chart-buninux.png"
          title="Contemplative Reptile"
        />
        <CardContent className={styles.cardContent} >
          <Typography gutterBottom variant="h5" component="h2">
            Completed Orders
          </Typography>
          <Typography variant="body2" color="white" component="p">
           225
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.cardActions}>
        <Button size="small" color="">
          Share
        </Button>
        <Button size="small" color="white">
          Learn More
        </Button>
      </CardActions>
    </Card>

   <Card className={styles.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height='210'
          image="https://miro.medium.com/max/3440/1*3d18EljzDqBTpnJXRgfSjA.jpeg"
          title="Contemplative Reptile"
        />
        <CardContent className={styles.cardContent} >
          <Typography gutterBottom variant="h5" component="h2">
            cancelled Orders
          </Typography>
          <Typography variant="body2" color="white" component="p">
           225
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.cardActions}>
        <Button size="small" color="">
          Share
        </Button>
        <Button size="small" color="white">
          Learn More
        </Button>
      </CardActions>
    </Card>
     
      </section>

      <section className={styles.summary} >
          Summary
      </section>



  </main>
  <footer className={styles.footer}></footer>
</div>
           
     
        
         
 


        
        
  

           
               
        )
    }
}

export default withRouter(withStyles(useStyles)(Home) )
