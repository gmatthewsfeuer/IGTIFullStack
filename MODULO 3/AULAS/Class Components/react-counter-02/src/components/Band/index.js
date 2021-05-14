import React, { Component } from 'react'

export default class Band extends Component {
  constructor() {
    super();

    this.state = {
      bandName: 'Rush',
      bandMembers: [
        {
          id: 1,
          name: 'Neil Peart',
          instrument: 'Baterista',
        },
        {
          id: 2,
          name: 'Alex Lifeson',
          instrument: 'Guitarra',
        },
        {
          id: 3,
          name: 'Geddy Lee',
          instrument: 'Baixo'
        }
      ]
    }
  }

  render() {
    const { bandName, bandMembers } = this.state;

    return (
      <div>
        <h4>{bandName}</h4>
        {bandMembers.map(({ id, name, instrument }) => {
          return (
            <ul key={id}>
              <li><b>Nome:</b> {name}</li>
              <li><b>Instrumento:</b> {instrument}</li>
            </ul>
          );
        })}
      </div>
    )
  }
}
