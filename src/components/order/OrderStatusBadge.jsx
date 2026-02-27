import PropTypes from 'prop-types';

const STATUS_CONFIG = {
    PENDING: {
        label: '결제대기',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
    },
    PAYMENT_COMPLETED: {
        label: '결제완료',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
    },
    PREPARING: {
        label: '상품준비중',
        bgColor: 'bg-indigo-100',
        textColor: 'text-indigo-800',
    },
    SHIPPED: {
        label: '배송중',
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-800',
    },
    DELIVERED: {
        label: '배송완료',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
    },
    CANCELED: {
        label: '취소됨',
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
    },
    CONFIRMED: {
        label: '주문확인',
        bgColor: 'bg-teal-100',
        textColor: 'text-teal-800',
    },
};

function OrderStatusBadge({ status }) {
    const config = STATUS_CONFIG[status] || {
        label: status,
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}
        >
            {config.label}
        </span>
    );
}

OrderStatusBadge.propTypes = {
    status: PropTypes.string.isRequired,
};

export default OrderStatusBadge;
