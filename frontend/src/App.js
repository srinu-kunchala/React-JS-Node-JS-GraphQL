import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import Callback from './Callback';
import Department from './components/Departments/index';
import { Route } from 'react-router';
class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        
        <Route exact path="/" component={Department} />        
        <Route exact path='/callback' component={Callback}/>
      </div>
    );
  }
}

export default App;
