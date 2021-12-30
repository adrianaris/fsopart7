import React from "react"

const User = ({ user }) => {
    return (
        <>
            <h2>{user.name}</h2>
            <h4>added blogs</h4>
            <ul>
                {user.blogs.map(blog =>
                    <li>{blog.title}</li>
                )}
            </ul>
        </>
    )
} 