import React, { Component } from 'react';

import './index.css';

export default class User extends Component {
  render() {
    const { name, picture } = this.props.user;

    return (
      <div className="flexRow">
        <img className="avatar" src={picture.large} alt={`Imagem de ${name.first}`}/>
        <span>{`${name.first} ${name.last}`}</span>
      </div>
    )
  }
}
