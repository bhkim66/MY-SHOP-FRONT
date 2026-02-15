import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import clsx from 'clsx';

const Textarea = forwardRef(({
    label,
    name,
    placeholder,
    error,
    disabled = false,
    rows = 4,
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
            <textarea
                ref={ref}
                name={name}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                className={clsx(
                    'w-full px-3 py-2 border rounded-lg transition-colors resize-none',
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

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    rows: PropTypes.number,
    className: PropTypes.string,
};

export default Textarea;
