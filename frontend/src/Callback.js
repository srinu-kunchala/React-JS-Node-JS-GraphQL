import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import {API_ROOT} from './api';

class Callback extends Component {
  constructor(props){
    super(props);
    this.state={};
  }
  
  async componentDidMount() {
    await auth0Client.handleAuthentication();       
    const requestBody = {
      query : `
        mutation{
          createUser(userInput:{name:"${auth0Client.getProfile().name}", email:"${auth0Client.getProfile().email}"}){            
            name
            email
        }
      }`
    }
    fetch(API_ROOT, {
      method:'POST',
      body:JSON.stringify(requestBody),
      headers: {
        'Content-Type':'application/json', 
        'Authorization': `Bearer ${auth0Client.getIdToken()}` 
      }
    }).then(res =>{
      return res.json();   
    }).then(resData =>{    
    var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "idtoken" + "=" + auth0Client.getIdToken() + ";" + expires + ";path=/"; 
    let expiresAt =  auth0Client.expiresAt;
    document.cookie = "expiresAt" + "=" + expiresAt + ";" + expires + ";path=/";   
    this.props.history.replace('/');    
    });    
  }
  render() {
    return (
      <div>
        <p>Loading profile...</p>
      </div>
    );
  }
}

export default withRouter(Callback);