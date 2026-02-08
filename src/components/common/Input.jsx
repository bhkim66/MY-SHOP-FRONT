import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(({
    label,
    type = 'text',
    name,
    placeholder,
    error,
    disabled = false,
    className,
    ...props
}, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                className={clsx(
                    'w-full px-3 py-2 border rounded-lg transition-colors',
                    'focus:outline-none focus:ring-2',
                    error
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500',
                    disabled && 'bg-gray-100 cursor-not-allowed',
                    className
                )}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

export default Input;
