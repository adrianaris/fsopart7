const blogsReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT': {
            return action.data
        }
        case 'DELETE': {
            const id = action.data.id
            return state.filter(b => b.id !== id)
        }
        case 'LIKE': {
            const id = action.data.id
            const blog = state.find(b => b.id === id)
            const newBlog = { ...blog, likes: blog.likes + 1 }
            return state.map(b => b.id !== id ? b : newBlog)
        }
        default:
            return state
    }
}

export default blogsReducer