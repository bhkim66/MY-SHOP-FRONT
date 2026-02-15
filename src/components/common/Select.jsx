import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import clsx from 'clsx';

const Select = forwardRef(({
    label,
    name,
    options = [],
    error,
    disabled = false,
    className,
    placeholder,
    ...props
}, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <select
                ref={ref}
                name={name}
                id={name}
                disabled={disabled}
                className={clsx(
                    'w-full px-3 py-2 border rounded-lg transition-colors appearance-none bg-white',
                    'focus:outline-none focus:ring-2',
                    error
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500',
                    disabled && 'bg-gray-100 cursor-not-allowed',
                    className
                )}
                {...props}
            >
                {placeholder && (
                    <option value="">{placeholder}</option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
});

Select.displayName = 'Select';

Select.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    placeholder: PropTypes.string,
};

export default Select;
