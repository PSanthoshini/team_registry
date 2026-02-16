export const formConfig = [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        validation: {
            pattern: /^[a-zA-Z\s]+$/,
            message: 'First name should only contain letters'
        }
    },
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
        validation: {
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Last name should only contain letters'
        }
    },
    {
        name: 'phoneNumber',
        label: 'Phone Number',
        type: 'tel',
        required: true,
        validation: {
            pattern: /^[0-9]{10}$/,
            message: 'Phone number must be 10 digits'
        }
    },
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: true,
        validation: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        }
    }
];

export const getInitialFormState = () => {
    const initialState = {};
    formConfig.forEach(field => {
        initialState[field.name] = '';
    });
    return initialState;
};

export const validateField = (fieldName, value) => {
    const field = formConfig.find(f => f.name === fieldName);

    if (!field) return { isValid: true, error: '' };

    if (field.required && !value.trim()) {
        return { isValid: false, error: `${field.label} is required` };
    }

    if (value && field.validation.pattern && !field.validation.pattern.test(value)) {
        return { isValid: false, error: field.validation.message };
    }

    return { isValid: true, error: '' };
};

export const validateForm = (formData) => {
    const errors = {};
    let isValid = true;

    formConfig.forEach(field => {
        const validation = validateField(field.name, formData[field.name] || '');
        if (!validation.isValid) {
            errors[field.name] = validation.error;
            isValid = false;
        }
    });

    return { isValid, errors };
};
