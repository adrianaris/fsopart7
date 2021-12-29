import blogService from '../services/blogs'

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export const like = blog => {
  return async dispatch => {
    const updBlog = { ...blog, likes: blog.likes + 1 }
    const newBlog = await blogService.updateBlog(blog.id, updBlog)
    dispatch({
      type: 'LIKE',
      data: newBlog
    })
  }
}

export const create = blog => {
  return async dispatch => {
    await blogService.createBlog(blog)
    dispatch(initBlogs())
  }
}

export const del = blog => {
  return async dispatch => {
    await blogService.deleteBlog(blog.id)
    dispatch({
      type: 'DELETE',
      data: blog
    })
  }
}