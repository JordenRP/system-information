import React, { useState, useEffect } from 'react';
import UserProfile from '../../components/UserProfile/UserProfile';
import UserList from '../../components/UserList/UserList';
import './UserManagementPage.css';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const baseUri = 'http://localhost:8080';

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(baseUri + '/user');
            const data = await response.json();
            const transformedData = data.map(user => ({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                address: user.address.street,
                phone: user.phone,
            }));
            setUsers(transformedData);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async (newUser) => {
        let user = {
            address: {

            }
        };

        user.name = newUser.name
        user.username = newUser.username
        user.email = newUser.email
        user.phone = newUser.phone
        user.address.street = newUser.address

        try {
            const response = await fetch(baseUri + '/user/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const _ = await response.json();
            setUsers([...users, newUser]);
            setSelectedUser(null);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const handleUpdateUser = async (updatedUser) => {
        let user = {
            address: {

            }
        };

        user.name = updatedUser.name
        user.username = updatedUser.username
        user.email = updatedUser.email
        user.phone = updatedUser.phone
        user.address.street = updatedUser.address

        try {
            await fetch(baseUri + `/user/${updatedUser.id}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
            setSelectedUser(null);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await fetch(baseUri + `/user/${userId}`, {
                method: 'DELETE',
            });
            setUsers(users.filter(user => user.id !== userId));
            setSelectedUser(null);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
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
            phone: '',
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
