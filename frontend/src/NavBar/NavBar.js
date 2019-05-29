import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from '../Auth';
import jwtDecode from 'jwt-decode';
import Departments from '../components/Departments';

class NavBar extends Component{     
    signOut(e,thisRef, idtoken, expiresAt) {        
        auth0Client.signOut();
        document.cookie = idtoken + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';  
        document.cookie = expiresAt + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';      
        thisRef.props.history.replace('/');
      };
    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);        
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }                    
            if (c.indexOf(name) === 0) {               
                return c.substring(name.length, c.length);
            }
        }
    return null;
    }
    
    render(){
        let cookieValue;        
        cookieValue = this.getCookie('idtoken');
        let userName;
        if(cookieValue){
            userName = jwtDecode(cookieValue).name;
        }      
        return(
            <div>
                <nav className="navbar navbar-dark bg-primary fixed-top">
                    <Link className="navbar-brand" to="/">
                        Home
                    </Link>
                    <Departments />
                    {
                       !auth0Client.isAuthenticated() && 
                        <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
                    }
                    {
                        auth0Client.isAuthenticated() &&
                        <div>                                                    
                        <label className="mr-2 text-white">{userName}</label>
                        <button className="btn btn-dark" onClick={(e)=>this.signOut(e,this,"idtoken", "expiresAt")}>Sign Out</button>
                        </div>
                    }
                </nav>
            </div>

        );
    }
}
export default withRouter(NavBar);