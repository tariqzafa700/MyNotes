import React, { Component } from 'react';
import './App.css';
import {
	  BrowserRouter as Router,
	  Route,
	} from "react-router-dom";
import Notes from './layout/Notes';
	
class App extends Component {
  render() {
    return (
    	<Router>
            <div className="App">
              <header className="App-header">
                <h1 className="App-title">My Notes</h1>
              </header>
              <Route path="/" component={Notes} />
            </div>
        </Router>
    );
  }
}

export default App;

