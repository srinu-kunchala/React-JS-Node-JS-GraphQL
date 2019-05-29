import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import Callback from './Callback';
import Department from './components/Departments/index';
import Category from './components/Categories/index';
import { Route } from 'react-router';
class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
              
        <Route path="/categories/:departmentName" component={Category} />        
        <Route exact path='/callback' component={Callback}/>
      </div>
    );
  }
}

export default App;
