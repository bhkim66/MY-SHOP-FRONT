import PropTypes from 'prop-types';

function Loading({ text = '로딩 중...' }) {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            {text && (
                <p className="mt-4 text-gray-600 text-sm">{text}</p>
            )}
        </div>
    );
}

Loading.propTypes = {
    text: PropTypes.string,
};

export default Loading;
