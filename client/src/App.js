import React, { Component } from 'react';
import styles from './App.module.css';
import UserForm from './Components/userForm';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, withRouter, Route, Switch,Redirect } from 'react-router-dom';
import FullPost from './Components/Home/FullPost/FullPost';

class App extends Component {

    constructor(props){
        super(props)
        this.props=props
    }

    state={
         isAuthenticated:false

    }

  requireAuth(replace) {

    let store=JSON.parse(localStorage.getItem('login'));

    if(!store===null){
        if(store.isAuthenticated){
            console.log("requireAuth"+replace )
            replace(replace);
        }
       

    }

    else
    {
        console.log("Store is empty so redirecting user to login page");
            replace('localhost:3000')
            
    }
       
       
      }



    componentWillMount(){
       
    }

    render() {

        

        return (
            <Router>
                <div className={styles.App}>

                    <div >
                     <Switch>
                        <Route path="/" exact={true} component={UserForm} onEnter={this.requireAuth(Home)}/>
                        <Route path="/Home" exact={true} component={Home} onEnter={this.requireAuth(Home)}/>
                        <Route path="/FullPost/:id" exact={true} component={FullPost}/>
                        </Switch>
                   </div>

                </div>
            </Router>
        )


    }



}

export default App ;
