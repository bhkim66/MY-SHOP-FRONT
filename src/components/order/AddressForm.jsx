import PropTypes from 'prop-types';

function AddressForm({ address, onChange, errors }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...address, [name]: value });
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        수령인 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="receiverName"
                        value={address.receiverName || ''}
                        onChange={handleChange}
                        placeholder="수령인 이름"
                        className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors?.receiverName ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors?.receiverName && (
                        <p className="text-red-500 text-sm mt-1">{errors.receiverName}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        name="receiverPhone"
                        value={address.receiverPhone || ''}
                        onChange={handleChange}
                        placeholder="010-0000-0000"
                        className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors?.receiverPhone ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors?.receiverPhone && (
                        <p className="text-red-500 text-sm mt-1">{errors.receiverPhone}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        우편번호
                    </label>
                    <input
                        type="text"
                        name="zipCode"
                        value={address.zipCode || ''}
                        onChange={handleChange}
                        placeholder="12345"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    주소 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="address1"
                    value={address.address1 || ''}
                    onChange={handleChange}
                    placeholder="기본 주소"
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors?.address1 ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors?.address1 && (
                    <p className="text-red-500 text-sm mt-1">{errors.address1}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    상세 주소
                </label>
                <input
                    type="text"
                    name="address2"
                    value={address.address2 || ''}
                    onChange={handleChange}
                    placeholder="상세 주소 (동/호수 등)"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    배송 메시지
                </label>
                <select
                    name="shippingMessage"
                    value={address.shippingMessage || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">배송 메시지를 선택해주세요</option>
                    <option value="문 앞에 놓아주세요">문 앞에 놓아주세요</option>
                    <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
                    <option value="배송 전 연락 부탁드립니다">배송 전 연락 부탁드립니다</option>
                    <option value="부재 시 휴대폰으로 연락주세요">부재 시 휴대폰으로 연락주세요</option>
                    <option value="custom">직접 입력</option>
                </select>
                {address.shippingMessage === 'custom' && (
                    <input
                        type="text"
                        name="customMessage"
                        value={address.customMessage || ''}
                        onChange={(e) => onChange({ ...address, customMessage: e.target.value })}
                        placeholder="배송 메시지를 입력해주세요"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}
            </div>
        </div>
    );
}

AddressForm.propTypes = {
    address: PropTypes.shape({
        receiverName: PropTypes.string,
        receiverPhone: PropTypes.string,
        zipCode: PropTypes.string,
        address1: PropTypes.string,
        address2: PropTypes.string,
        shippingMessage: PropTypes.string,
        customMessage: PropTypes.string,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object,
};

export default AddressForm;
