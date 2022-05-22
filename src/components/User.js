import React from 'react'
import './user.css'

const User = ({ user, onDelete, onUserSelect }) => {
    const {id, email, name, username, phone, website } = user;

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 3,  }} className='list'>
            <span>{name}</span>
            <span>{email}</span>
            <span>{phone}</span>
            <span>{website}</span>
            <span>{username}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <button onClick={() => onUserSelect(user)}>edit</button>
                <button onClick={() => onDelete(id)}>delete</button>
            </span>
        </div>
    )


    }
export default User

