import PropTypes from 'prop-types';
import Button from '../common/Button';
import Input from '../common/Input';

function OptionManager({ options, onOptionsChange }) {
    const addOption = () => {
        const newOption = {
            id: Date.now(),
            name: '',
            values: [{ id: Date.now() + 1, value: '', stock: 0, additionalPrice: 0 }],
        };
        onOptionsChange([...options, newOption]);
    };

    const removeOption = (optionId) => {
        onOptionsChange(options.filter((opt) => opt.id !== optionId));
    };

    const updateOptionName = (optionId, name) => {
        onOptionsChange(
            options.map((opt) =>
                opt.id === optionId ? { ...opt, name } : opt
            )
        );
    };

    const addOptionValue = (optionId) => {
        onOptionsChange(
            options.map((opt) =>
                opt.id === optionId
                    ? {
                          ...opt,
                          values: [
                              ...opt.values,
                              { id: Date.now(), value: '', stock: 0, additionalPrice: 0 },
                          ],
                      }
                    : opt
            )
        );
    };

    const removeOptionValue = (optionId, valueId) => {
        onOptionsChange(
            options.map((opt) =>
                opt.id === optionId
                    ? {
                          ...opt,
                          values: opt.values.filter((v) => v.id !== valueId),
                      }
                    : opt
            )
        );
    };

    const updateOptionValue = (optionId, valueId, field, value) => {
        onOptionsChange(
            options.map((opt) =>
                opt.id === optionId
                    ? {
                          ...opt,
                          values: opt.values.map((v) =>
                              v.id === valueId ? { ...v, [field]: value } : v
                          ),
                      }
                    : opt
            )
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                    상품 옵션 (선택)
                </label>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addOption}
                >
                    + 옵션 추가
                </Button>
            </div>

            {options.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4 border border-dashed rounded-lg">
                    옵션이 없습니다. 옵션 추가 버튼을 클릭하여 추가하세요.
                </p>
            ) : (
                <div className="space-y-6">
                    {options.map((option, optionIndex) => (
                        <div
                            key={option.id}
                            className="border rounded-lg p-4 bg-gray-50"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex-1">
                                    <Input
                                        name={`option-${option.id}`}
                                        placeholder="옵션명 (예: 색상, 사이즈)"
                                        value={option.name}
                                        onChange={(e) =>
                                            updateOptionName(option.id, e.target.value)
                                        }
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="danger"
                                    size="sm"
                                    onClick={() => removeOption(option.id)}
                                >
                                    삭제
                                </Button>
                            </div>

                            <div className="space-y-3">
                                <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 px-1">
                                    <div className="col-span-4">옵션값</div>
                                    <div className="col-span-3">재고</div>
                                    <div className="col-span-3">추가금액</div>
                                    <div className="col-span-2"></div>
                                </div>

                                {option.values.map((val) => (
                                    <div
                                        key={val.id}
                                        className="grid grid-cols-12 gap-2 items-center"
                                    >
                                        <div className="col-span-4">
                                            <input
                                                type="text"
                                                placeholder="옵션값"
                                                value={val.value}
                                                onChange={(e) =>
                                                    updateOptionValue(
                                                        option.id,
                                                        val.id,
                                                        'value',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="재고"
                                                value={val.stock}
                                                onChange={(e) =>
                                                    updateOptionValue(
                                                        option.id,
                                                        val.id,
                                                        'stock',
                                                        parseInt(e.target.value) || 0
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="추가금액"
                                                value={val.additionalPrice}
                                                onChange={(e) =>
                                                    updateOptionValue(
                                                        option.id,
                                                        val.id,
                                                        'additionalPrice',
                                                        parseInt(e.target.value) || 0
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="col-span-2 flex justify-end">
                                            {option.values.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeOptionValue(option.id, val.id)
                                                    }
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => addOptionValue(option.id)}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    + 옵션값 추가
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

OptionManager.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            values: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    value: PropTypes.string.isRequired,
                    stock: PropTypes.number.isRequired,
                    additionalPrice: PropTypes.number.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    onOptionsChange: PropTypes.func.isRequired,
};

export default OptionManager;
