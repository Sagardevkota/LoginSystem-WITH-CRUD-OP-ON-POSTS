import React, { useState,useEffect } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel,createMuiTheme,withTheme } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import {  withRouter } from 'react-router-dom'
const axios=require('axios').default;






const styles = theme => ({
	main: {
       
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		[theme.breakpoints.up(400 + theme.spacing(6))]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
       
		marginTop: theme.spacing(8) ,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        
    }, 
    p:{
        color:"red"
    },
    p:{
        color:"red"
    },
	submit: {
        backgroundColor:'#14b8d9',
		marginTop: theme.spacing(3),
	},
});




function SignIn(props){
    const { classes } = props

	const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const[emailError,setEmailError]=useState('');
    const[passError,setPassError]=useState('')
    const[btnDisabled,setbtnDisabled]=useState(true);


    function checkAuthentication(){
        let store=JSON.parse(localStorage.getItem('login'))
        console.log(store.isAuthenticated);
       
        if(!store===null ){
            if(store.isAuthenticated){
                props.history.push('/Home');
               
            }
         
        }

        else 
        return;

    }

    function onPassChange(value){

        if(value.length>5){
            setPassError(false)
            setbtnDisabled(false)
        }
        else{
            setbtnDisabled(true)
            setPassError(true)
        }
        setPassword(value);
    }

   function onchangeHandler(value){
     
       
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  

     

          if(!re.test(value)){

            setEmailError(true);
            
          

          }
          else{
              setEmailError(false);
             
             
          }
          setEmail(value);

    }
   

    useEffect(() => {
     
      checkAuthentication();
       
    }, [])
  
    return(

        <main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					S-Mart Login Panel
       			</Typography>
                <form
                className={classes.form} onSubmit={e => e.preventDefault() && false}>
                    <FormControl margin="normal" required fullWidth
                    error={emailError}
                   
                    
                    >
                        <InputLabel htmlFor="email"
                        
                      color="primary"
                        >Email Address</InputLabel>
                        	<Input id="email" name="email" autoComplete="off"  autoFocus value={email} onChange={event=>onchangeHandler(event.target.value)} />
                            {emailError ? <span style={{color: "red"}}>Please Enter valid email address</span> : ''}
         
                	</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password"
                         color="primary"
                        >Password</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={event => onPassChange(event.target.value)} />
                        {passError ? <span style={{color: "red"}}>Password is too short</span> : ''}
         
                    </FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
                        color="primary"
                        disabled={btnDisabled}
						onClick={login}
						className={classes.submit}>
						LOGIN
          			</Button>
				
				</form>
			</Paper>
		</main>




    )

    async function login() {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
                
            }
          };
        

        const data={
            email:email,
            password:password
        }
		try {
           
            

            axios.post('/api/login',
               data,{ // convert Js object to a string

            axiosConfig
        
        
        }  )
            .then( (response)=> {
                
              // handle success

              if(response.data.status==="ok"){
              
               
                // save login info to 
                const expirationDate=new Date(new Date().getTime+1000)

          localStorage.setItem('login',
          JSON.stringify({
              expirationDate:expirationDate,
              isAuthenticated:true,
              token:response.data.token


          })
          
          
          
          )
          
          props.history.push('/Home');

                  
              }
              else{
                   alert("incorrect email or password")
              }
              console.log(response);
              
            })
            .catch(function (error) {
              // handle error
              console.log("Axios caught error is"+error.response.data);
            })
               
			
		} catch( error) {
			alert(error.message)
		}
	}

}


export default withRouter(withStyles(styles)(SignIn)) 
