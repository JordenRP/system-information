import React, { useState, useEffect } from 'react';
import UserProfile from '../../components/UserProfile/UserProfile';
import UserList from '../../components/UserList/UserList';
import './UserManagementPage.css';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                const transformedData = data.map(user => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    age: Math.floor(Math.random() * 30) + 20,
                    address: `${user.address.street}, ${user.address.city}`,
                    phone: user.phone,
                }));
                setUsers(transformedData);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
                setLoading(false);
            });
    }, []);

    const handleUpdateUser = (updatedUser) => {
        setUsers(users.map(user =>
            user.id === updatedUser.id ? updatedUser : user
        ));
        setSelectedUser(null);
    };

    const handleCreateUser = (newUser) => {
        newUser.id = users.length + 1; // Установка нового ID
        setUsers([...users, newUser]);
        setSelectedUser(null);
    };

    const handleDeleteUser = (userId) => {
        setUsers(users.filter(user => user.id !== userId));
        setSelectedUser(null);
    };

    const handleCancel = () => {
        setSelectedUser(null);
    };

    const handleCreateClick = () => {
        setSelectedUser({
            id: null,
            name: '',
            email: '',
            age: '',
            address: '',
            phone: ''
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-management-page">
            <h1>User Management</h1>
            <button className="create-button" onClick={handleCreateClick}>Create New User</button>
            <div className="user-management-content">
                <UserList users={users} onSelectUser={setSelectedUser} onDeleteUser={handleDeleteUser} />
                {selectedUser && (
                    <UserProfile
                        user={selectedUser}
                        onUpdate={selectedUser.id ? handleUpdateUser : handleCreateUser}
                        onCancel={handleCancel}
                    />
                )}
            </div>
        </div>
    );
};

export default UserManagementPage;
