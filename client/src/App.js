import React from 'react';

import { Menu } from './components/menu/Menu.js';
import { Pages } from './components/pages/Pages.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        activePage: 0
    }
  }

  render() {
    return (
      <div className="application">
        <Menu onChange={(i) => this.pageDidChanged(i)}/>
        <Pages activePage={this.state.activePage}/>
      </div>
    );
  }

  pageDidChanged(i) {
    this.setState({activePage: i});
  }
}