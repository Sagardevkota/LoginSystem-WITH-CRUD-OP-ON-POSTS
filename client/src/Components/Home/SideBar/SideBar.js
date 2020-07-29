import React from 'react'
import styles from './SideBar.module.css'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

function sideBar(props){

    return(

        <div className={styles.SideBar}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon style={{color: "white"}} >
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon style={{color: "white"}}>
            <DraftsIcon />
          </ListItemIcon >
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
        </div>
    )
}


export default sideBar