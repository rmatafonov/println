import React, { Component } from 'react'
import Button from '../Button'

class App extends Component {
  state = {
    name: 'Пупа',
    dummy: false,
  }

  toggleMessage = () => {
    const { name } = this.state

    this.setState({ name: name === 'Пупа' ? 'Лупа' : 'Пупа' })
  }

  toggleDummy = () => {
    this.setState({ dummy: !this.state.dummy })
  }

  render() {
    const { name } = this.state

    return (
      <React.Fragment>
        <h1>{name}</h1>
        <Button className="button_red" onClick={this.toggleMessage}>
          Изменить сообщение
        </Button>
        <button onClick={this.toggleMessage}>Изменить сообщение</button>
        <button onClick={this.toggleDummy}>Сделать пустое изменение</button>
      </React.Fragment>
    )
  }
}

export default App
