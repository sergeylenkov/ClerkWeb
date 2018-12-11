import React from 'react';
import './App.css';
import { Menu } from './components/Menu/Menu.js';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Menu/>
      </div>
    );
  }
}