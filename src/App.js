import React, { Component } from 'react';
import Dogs from './components/Dogs';
import AddDog from './components/AddDog';
//import { POSTS } from './components/json/posts';
import './App.css';
var POSTS = require('./components/json/posts.json');

class App extends Component {
  constructor() {
    super();
    this.state = {
      dogs: []
    };
  }
  
   getDogs() {
   var defaultDogs = {dogs: POSTS};
    this.setState(defaultDogs, () => {this.saveStateToLocalStorage(this.state);});
	  } 
  
  componentWillMount() {
    	this.getDogs(); 
	//this.saveStateToLocalStorage();	
	this.hydrateStateWithLocalStorage();
  }
    
  hydrateStateWithLocalStorage() { 
     // for all items in state 
     for (let key in this.state) { 
       // if the key exists in localStorage 
       if (localStorage.hasOwnProperty(key)) { 
         // get the key's value from localStorage 
         let value = localStorage.getItem(key);  
         // parse the localStorage string and setState 
         try { 
           value = JSON.parse(value); 
           this.setState({ [key]: value }); 
         } catch (e) { 
           // handle empty string 
           this.setState({ [key]: value }); 
         } 
       } 
     } 
   } 

  handleAddDog(dog) {
    let dogs = this.state.dogs;
    dogs.push(dog);
    this.setState({dogs:dogs}, () => {this.saveStateToLocalStorage(this.state);});
	// update localStorage 
  }

  handleDeleteDog(id) {
    let dogs = this.state.dogs;
   	const updatedList = dogs.filter(item => item.id !== id);
   	this.setState({dogs:updatedList}, () => {this.saveStateToLocalStorage(this.state);});
	// update localStorage 
	  }
   
  saveStateToLocalStorage() { 
     // for every item in React state 
     for (let key in this.state) { 
       // save to localStorage 
       localStorage.setItem(key, JSON.stringify(this.state[key])); 
     } 
   } 

  render() {
    return (
      <div className="App">
        <Dogs dogs={this.state.dogs} onDelete={this.handleDeleteDog.bind(this)} />
        <AddDog addDog={this.handleAddDog.bind(this)} />
        <hr />
      </div>
    );
  }
}

export default App;
