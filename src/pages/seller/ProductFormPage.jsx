import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../../components/seller/ProductForm';
import * as sellerAPI from '../../api/seller.api';

function ProductFormPage() {
    const { id: seq } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEdit = Boolean(seq);

    useEffect(() => {
        if (isEdit) {
            loadProduct();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seq, isEdit]);

    const loadProduct = async () => {
        setIsLoading(true);
        try {
            const data = await sellerAPI.getProduct(seq);
            setProduct(data);
        } catch (error) {
            console.error('Failed to load product:', error);
            alert('상품을 불러오는데 실패했습니다.');
            navigate('/seller/products');
        } finally {
            setIsLoading(false);
        }
    };

    const uploadImages = async (productSeq, images) => {
        const uploadPromises = images.map(async (image, index) => {
            if (image instanceof File) {
                const imageType = index === 0 ? 'THUMBNAIL' : 'DETAIL';
                try {
                    await sellerAPI.uploadProductImage(productSeq, image, imageType);
                } catch (error) {
                    console.error(`Failed to upload image ${index}:`, error);
                }
            }
        });
        await Promise.all(uploadPromises);
    };

    const handleSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const productData = {
                productName: data.productName,
                price: Number(data.price),
                description: data.description,
                categoryCode: data.categoryCode,
                stockQty: Number(data.stockQty) || 0,
                minOrderQty: Number(data.minOrderQty) || 1,
                status: data.status,
            };

            if (isEdit) {
                await sellerAPI.updateProduct(seq, productData);

                // 새로 추가된 이미지만 업로드
                const newImages = data.images.filter((img) => img instanceof File);
                if (newImages.length > 0) {
                    await uploadImages(seq, newImages);
                }

                alert('상품이 수정되었습니다.');
            } else {
                // 상품 생성
                const createdProduct = await sellerAPI.createProduct(productData);
                const createdSeq = createdProduct.seq;

                // 이미지 업로드
                if (data.images && data.images.length > 0) {
                    const files = data.images.filter((img) => img instanceof File);
                    if (files.length > 0) {
                        await uploadImages(createdSeq, files);
                    }
                }

                alert('상품이 등록되었습니다.');
            }
            navigate('/seller/products');
        } catch (error) {
            console.error('Failed to save product:', error);
            alert('상품 저장에 실패했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isEdit && isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">로딩 중...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEdit ? '상품 수정' : '상품 등록'}
                </h1>
            </div>

            <ProductForm
                initialData={product}
                onSubmit={handleSubmit}
                isLoading={isSubmitting}
            />
        </div>
    );
}

export default ProductFormPage;
