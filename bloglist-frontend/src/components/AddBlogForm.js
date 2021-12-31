import React, { useState } from 'react'
import styled from 'styled-components'

const Input = styled.input`
display: inline-block;
float: left;
`
const Label = styled.label`
display: inline-block;
float: left;
clear: left;
width: 80px;
text-align: left;
`
const Button = styled.button`
padding: 0em 1em;
margin: 0.2em;
`
const Div = styled.div`
width: 270px;
float: left;
clear: left;
text-align: right;
`

const AddBlogForm = (props) => {
  const { addBlog } = props
  const [newBlog, setNewBlog] = useState({})

  const blog = {}
  const createBlog = (event) => {
    event.preventDefault()

    addBlog(newBlog)
    setNewBlog({})
  }

  return (
    <div className="formDiv">
      <h4>create new</h4>

      <form onSubmit={createBlog}>
        <div>
          <Label>Title:</Label>
          <Input
            type="text"
            id="title"
            onChange={({ target }) => blog.title = target.value}
          />
          <Label>Author:</Label>
          <Input
            type="text"
            id="author"
            onChange={({ target }) => blog.author = target.value}
          />
          <Label>URL:</Label>
          <Input
            type="text"
            id="url"
            onChange={({ target }) => blog.url = target.value}
          />
        </div>
        <Div>
          <Button type="submit" onClick={() => setNewBlog(blog)}>Add Blog</Button>
        </Div>
      </form>
    </div>
  )
}

export default AddBlogForm