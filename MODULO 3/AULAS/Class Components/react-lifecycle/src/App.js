import React, { Component } from 'react';
import Toggle from './components/Toggle';
import Users from './components/Users';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      showUsers: false
    }
  }

  // Ótimo componente para requisições HTTP
  async componentDidMount() {
    const res = await fetch('https://randomuser.me/api/?seed=rush&nat=br&results=10');

    const json = await res.json();

    this.setState({
      users: json.results
    });
  }

  handleShowUsers = (isChecked) => {
    this.setState({showUsers: isChecked });
  }

  render() {
    const { showUsers, users } = this.state;

    return (
      <div>
        <h3>React LifeCycle</h3>
        <Toggle description="Mostrar usuários:" enabled={showUsers} onToggle={this.handleShowUsers} />
        <hr/>
        {showUsers && ( <Users users={users} /> )}
      </div>
    );
  }
}
