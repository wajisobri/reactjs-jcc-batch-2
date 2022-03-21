import React from 'react'

function TodoItem(props) {
  return (
    <li>
        <input type="checkbox" className="checkbox" /> <label>{props.title}</label>
    </li>
  )
}

export default TodoItem