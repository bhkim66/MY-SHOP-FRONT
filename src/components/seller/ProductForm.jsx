import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Select from '../common/Select';
import Button from '../common/Button';
import ImageUploader from '../common/ImageUploader';
import OptionManager from './OptionManager';
import { PRODUCT_STATUS_OPTIONS, CATEGORY_OPTIONS } from '../../utils/constants';

const productSchema = yup.object({
    productName: yup.string().required('상품명을 입력해주세요'),
    categoryCode: yup.string().required('카테고리를 선택해주세요'),
    price: yup
        .number()
        .typeError('가격을 입력해주세요')
        .required('가격을 입력해주세요')
        .min(0, '가격은 0 이상이어야 합니다'),
    stockQty: yup
        .number()
        .typeError('재고 수량을 입력해주세요')
        .required('재고 수량을 입력해주세요')
        .min(0, '재고 수량은 0 이상이어야 합니다'),
    minOrderQty: yup
        .number()
        .typeError('최소 주문 수량을 입력해주세요')
        .min(1, '최소 주문 수량은 1 이상이어야 합니다')
        .optional(),
    description: yup.string().required('상품 설명을 입력해주세요'),
    status: yup.string().required('상태를 선택해주세요'),
});

function ProductForm({ initialData, onSubmit, isLoading }) {
    const [images, setImages] = useState([]);
    const [options, setOptions] = useState([]);
    const [imageError, setImageError] = useState('');

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(productSchema),
        defaultValues: {
            productName: '',
            categoryCode: '',
            price: '',
            stockQty: '',
            minOrderQty: 1,
            description: '',
            status: 'ON_SALE',
        },
    });

    useEffect(() => {
        if (initialData) {
            reset({
                productName: initialData.productName,
                categoryCode: initialData.categoryCode,
                price: initialData.price,
                stockQty: initialData.stockQty,
                minOrderQty: initialData.minOrderQty || 1,
                description: initialData.description || '',
                status: initialData.status,
            });
            if (initialData.imageUrls) {
                setImages(
                    initialData.imageUrls.map((url, index) => ({
                        id: index,
                        url,
                    }))
                );
            }
            if (initialData.options) {
                setOptions(initialData.options);
            }
        }
    }, [initialData, reset]);

    const handleFormSubmit = (data) => {
        if (images.length === 0) {
            setImageError('최소 1개의 이미지를 업로드해주세요');
            return;
        }
        setImageError('');

        onSubmit({
            ...data,
            images: images.map((img) => img.file || img.url),
            options,
        });
    };

    const handleImagesChange = (newImages) => {
        setImages(newImages);
        if (newImages.length > 0) {
            setImageError('');
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* 기본 정보 */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                    기본 정보
                </h3>
                <div className="grid grid-cols-2 gap-6">
                    <Input
                        label="상품명"
                        name="productName"
                        placeholder="상품명을 입력하세요"
                        error={errors.productName?.message}
                        {...register('productName')}
                    />
                    <Controller
                        name="categoryCode"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="카테고리"
                                name="categoryCode"
                                options={CATEGORY_OPTIONS}
                                placeholder="카테고리 선택"
                                error={errors.categoryCode?.message}
                                {...field}
                            />
                        )}
                    />
                    <Input
                        label="가격"
                        name="price"
                        type="number"
                        placeholder="0"
                        error={errors.price?.message}
                        {...register('price')}
                    />
                    <Input
                        label="재고 수량"
                        name="stockQty"
                        type="number"
                        placeholder="0"
                        error={errors.stockQty?.message}
                        {...register('stockQty')}
                    />
                    <Input
                        label="최소 주문 수량"
                        name="minOrderQty"
                        type="number"
                        placeholder="1"
                        error={errors.minOrderQty?.message}
                        {...register('minOrderQty')}
                    />
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="판매 상태"
                                name="status"
                                options={PRODUCT_STATUS_OPTIONS}
                                error={errors.status?.message}
                                {...field}
                            />
                        )}
                    />
                </div>
                <div className="mt-6">
                    <Textarea
                        label="상품 설명"
                        name="description"
                        placeholder="상품에 대한 상세 설명을 입력하세요"
                        rows={6}
                        error={errors.description?.message}
                        {...register('description')}
                    />
                </div>
            </div>

            {/* 이미지 */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                    상품 이미지
                </h3>
                <ImageUploader
                    images={images}
                    onImagesChange={handleImagesChange}
                    maxImages={5}
                    error={imageError}
                />
            </div>

            {/* 옵션 */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                    상품 옵션
                </h3>
                <OptionManager
                    options={options}
                    onOptionsChange={setOptions}
                />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end gap-4">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => window.history.back()}
                >
                    취소
                </Button>
                <Button type="submit" variant="primary" loading={isLoading}>
                    {initialData ? '수정하기' : '등록하기'}
                </Button>
            </div>
        </form>
    );
}

ProductForm.propTypes = {
    initialData: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

export default ProductForm;
