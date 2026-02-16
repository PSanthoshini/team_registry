import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
    Typography,
    Box,
    Alert,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import DynamicForm from './DynamicForm';
import { getAllUsers, createUser, updateUser, deleteUser } from '../services/userService';
import { formConfig } from '../config/formConfig';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async (userData) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await createUser(userData);
            setSuccess('User created successfully!');
            setShowForm(false);
            await fetchUsers();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateUser = async (userData) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await updateUser(editingUser.id, userData);
            setSuccess('User updated successfully!');
            setShowForm(false);
            setEditingUser(null);
            await fetchUsers();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await deleteUser(userToDelete.id);
            setSuccess('User deleted successfully!');
            setDeleteDialogOpen(false);
            setUserToDelete(null);
            await fetchUsers();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setDeleteDialogOpen(true);
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingUser(null);
    };

    const handleAddNewUser = () => {
        setEditingUser(null);
        setShowForm(true);
    };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    return (
        <Container maxWidth="lg" className="app-container">
            {!showForm && (
                <Box className="registry-header">
                    <Typography variant="h4" className="registry-title" gutterBottom>
                        Team Registry
                    </Typography>
                    <Typography variant="body1" className="registry-description">
                        Manage your team members and their information in one place.
                    </Typography>
                </Box>
            )}

            <Paper elevation={0} className="card-paper">
                <Box className="section-header" sx={{ mb: showForm ? 0 : 4 }}>
                    {!showForm && (
                        <>
                            <Typography variant="h6" className="subtitle" sx={{ mt: { xs: 1, sm: 2 }, ml: { xs: 1, sm: 2 }, mr: { xs: 1, sm: 2 } }}>
                                All Members
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={handleAddNewUser}
                                sx={{ px: 4, mt: { xs: 1, sm: 2 }, ml: { xs: 1, sm: 2 }, mr: { xs: 1, sm: 2 } }}
                            >
                                Add New Member
                            </Button>
                        </>
                    )}
                </Box>

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
                        {success}
                    </Alert>
                )}

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}

                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                        <CircularProgress />
                    </Box>
                )}

                {showForm && (
                    <DynamicForm
                        onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
                        initialData={editingUser}
                        onCancel={handleFormCancel}
                    />
                )}

                {!showForm && !loading && (
                    <TableContainer className="registry-table-container">
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead className="registry-table-header">
                                <TableRow>
                                    {formConfig.map((field) => (
                                        <TableCell key={field.name} className="table-header-cell">
                                            {field.label.toUpperCase()}
                                        </TableCell>
                                    ))}
                                    <TableCell align="center" className="table-header-cell">
                                        ACTIONS
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={formConfig.length + 1} align="center">
                                            <Typography variant="body1" color="textSecondary">
                                                No users found. Click "Add New Member" to create one.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.map((user) => (
                                        <TableRow key={user.id} hover>
                                            {formConfig.map((field) => (
                                                <TableCell key={field.name}>{user[field.name]}</TableCell>
                                            ))}
                                            <TableCell align="center">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleEditClick(user)}
                                                    title="Edit"
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDeleteClick(user)}
                                                    title="Delete"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete user{' '}
                        <strong>
                            {userToDelete?.firstName} {userToDelete?.lastName}
                        </strong>
                        ?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteUser} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UserManagement;
