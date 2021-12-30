import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initUsers } from '../actions/users'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead><tr>
          <th></th><th>blogs created</th>
        </tr></thead>
        {users.map(user =>
          <tbody key={user.id}><tr>
            <td>
              <Link to={`/users/${user.name}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr></tbody>
        )}
      </table>
    </>
  )
}

export default Users