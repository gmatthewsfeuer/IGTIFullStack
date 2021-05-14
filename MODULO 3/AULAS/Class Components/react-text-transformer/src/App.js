import React, { Component } from 'react';
import Input from './components/Input';
import Transformations from './components/Transformations';
import Transformation from './components/Transformations/Transformation';
import { isConsonant, isVowel, removeSpecialCharacters } from './helpers/stringHelpers';

const MY_TRANSFORMATIONS = [
  {
    id: 't1',
    description: 'Texto invertido',
    transformFunction: text => text.split('').reverse().join('')
  },
  {
    id: 't2',
    description: 'CSV',
    transformFunction: text => text.split(' ').map(word => `"${word}"`).join(';')
  },
  {
    id: 't3',
    description: 'Slug',
    transformFunction: text => removeSpecialCharacters(text).toLowerCase().split(' ').join('-')
  },
  {
    id: 't4',
    description: 'Texto numérico',
    transformFunction: text => 
      removeSpecialCharacters(text)
      .toUpperCase()
      .split('')
      .map(char => {
        switch (char) {
          case 'O':
            return '0';
          case 'L':
            return '1';
          case 'E':
            return '3';
          case 'A':
            return '4';
          case 'S':
            return '5';
          case 'T':
            return '7';
          default:
            return char;
        }
      })
      .join('')
  },
  {
    id: 't5',
    description: 'Somente vogais',
    transformFunction: text => text.split('').filter(char => char === ' ' || isVowel(char)).join('')
  },
  {
    id: 't6',
    description: 'Somente consoantes',
    transformFunction: text => text.split('').filter(char => char === ' ' || isConsonant(char)).join('')
  },
  {
    id: 't7',
    description: 'Variável',
    transformFunction: text => removeSpecialCharacters(text).split(' ').map((word, index) => {
      return index === 0 
        ? word.toLowerCase() 
        : word.toLowerCase().split('').map((char, index) => index === 0 ? char.toUpperCase() : char).join('');
    }).join('')
  },
  {
    id: 't8',
    description: 'Alternância entre maiúscula e minúscula',
    transformFunction: text => text.split('').map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()).join('')
  }
]

const DEFAULT_STATE = {
  userInput: 'Trabalho Prático',
}

export default class App extends Component {
  constructor() {
    super();

    this.state = { ...DEFAULT_STATE };
  }

  componentDidMount() {
    document.title = 'React Text Transformer';
  }

  handleInputChange = (newText) => {
    this.setState({ userInput: newText, });
  }

  render() {
    const { userInput } = this.state;

    return (
      <div className="container">
        <h1 className="center">react-text-transformer</h1>

        <Input
          id="userInput"
          description="Digite um texto qualquer"
          value={userInput}
          onChange={this.handleInputChange}
          autoFocus
        />

        <Transformations>
          {MY_TRANSFORMATIONS.map(({ id, description, transformFunction }) => {
            return (
              <Transformation
                key={id}
                id={id}
                description={description}
                value={transformFunction(userInput)}
              />
            )
          })}
        </Transformations>

      </div>
    );
  }
}
