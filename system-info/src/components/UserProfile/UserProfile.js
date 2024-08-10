import React, { useState } from 'react';
import './UserProfile.css';

const UserProfile = ({ user, onUpdate, onCancel }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [address, setAddress] = useState(user.address);
    const [phone, setPhone] = useState(user.phone);

    const handleUpdate = () => {
        onUpdate({ ...user, name, username, email, address, phone });
    };

    return (
        <div className="user-profile">
            <h2>Edit User Profile</h2>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Address:
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </label>
            <label>
                Phone:
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </label>
            <div className="user-profile-buttons">
                <button onClick={handleUpdate}>Update</button>
                <button className="cancel-button" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default UserProfile;
