import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Button = styled.button`
float: left;
clear: left;
padding: 0em 1em;
margin: 0.2em;
`

const Toggable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideDisplay = { display: visible ? 'none' : '' }
  const showDisplay = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideDisplay}>
        <Button onClick={toggleVisibility} className="toggleButton">{props.buttonLabel}</Button>
      </div>
      <div style={showDisplay} className="toggableContent">
        <Button onClick={toggleVisibility}>cancel</Button>
        {props.children}
      </div>
    </div>
  )
})

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Toggable.displayName = 'Toggable'

export default Toggable