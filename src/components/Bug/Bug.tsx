import React, { useState } from 'react'
import Button from '../Button'

function Bug() {
  const [counter, setCounter] = useState(0)

  const handleClick = () => {
    setCounter(counter + 1)
  }

  if (counter === 5) {
    throw new Error('Test')
  }

  return <Button onClick={handleClick}>{counter}</Button>
}

export default Bug
