import PropTypes from 'prop-types';
import clsx from 'clsx';

function StatsCard({ title, value, icon, color = 'blue', subtext }) {
    const colorStyles = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        purple: 'bg-purple-500',
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
                <div className={clsx('p-3 rounded-lg', colorStyles[color])}>
                    <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={icon}
                        />
                    </svg>
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    {subtext && (
                        <p className="text-xs text-gray-400">{subtext}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['blue', 'green', 'yellow', 'purple']),
    subtext: PropTypes.string,
};

export default StatsCard;
