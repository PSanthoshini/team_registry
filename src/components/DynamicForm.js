import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Paper
} from '@mui/material';
import { formConfig, getInitialFormState, validateField, validateForm } from '../config/formConfig';

const DynamicForm = ({ onSubmit, initialData = null, onCancel }) => {
    const [formData, setFormData] = useState(getInitialFormState());
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(getInitialFormState());
        }
        setErrors({});
        setTouched({});
    }, [initialData]);

    const handleChange = (fieldName) => (event) => {
        const value = event.target.value;
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));

        if (touched[fieldName]) {
            const validation = validateField(fieldName, value);
            setErrors(prev => ({
                ...prev,
                [fieldName]: validation.error
            }));
        }
    };

    const handleBlur = (fieldName) => () => {
        setTouched(prev => ({
            ...prev,
            [fieldName]: true
        }));

        const validation = validateField(fieldName, formData[fieldName]);
        setErrors(prev => ({
            ...prev,
            [fieldName]: validation.error
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const allTouched = {};
        formConfig.forEach(field => {
            allTouched[field.name] = true;
        });
        setTouched(allTouched);

        const validation = validateForm(formData);

        if (validation.isValid) {
            onSubmit(formData);
        } else {
            setErrors(validation.errors);
        }
    };

    const handleCancel = () => {
        setFormData(getInitialFormState());
        setErrors({});
        setTouched({});
        if (onCancel) onCancel();
    };

    return (
        <Paper elevation={0} className="card-paper form-card">
            <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    {initialData ? 'Edit User Profile' : 'Create New Member'}
                </Typography>

                <Box className="form-stack">
                    {formConfig.map((field) => (
                        <TextField
                            key={field.name}
                            fullWidth
                            margin="normal"
                            label={field.label}
                            name={field.name}
                            type={field.type}
                            value={formData[field.name] || ''}
                            onChange={handleChange(field.name)}
                            onBlur={handleBlur(field.name)}
                            required={field.required}
                            error={touched[field.name] && Boolean(errors[field.name])}
                            helperText={touched[field.name] && errors[field.name]}
                            variant="outlined"
                            className="input-field-bg"
                            InputLabelProps={{
                                shrink: field.type === 'date' ? true : undefined,
                            }}
                        />
                    ))}
                </Box>

                <Box className="form-actions">
                    <Button
                        type="button"
                        variant="outlined"
                        color="inherit"
                        size="large"
                        onClick={handleCancel}
                        className="card-paper"
                        sx={{ border: '1px solid #e2e8f0' }}
                    >
                        Discard
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ px: 4 }}
                    >
                        {initialData ? 'Save Changes' : 'Create Profile'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default DynamicForm;
