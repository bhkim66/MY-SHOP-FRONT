import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import clsx from 'clsx';

function ImageUploader({
    images = [],
    onImagesChange,
    maxImages = 5,
    error,
}) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFiles = (files) => {
        const newImages = [];
        const validFiles = Array.from(files).filter((file) =>
            file.type.startsWith('image/')
        );

        validFiles.forEach((file) => {
            if (images.length + newImages.length < maxImages) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    newImages.push({
                        id: Date.now() + Math.random(),
                        file,
                        preview: e.target.result,
                    });
                    if (newImages.length === validFiles.length) {
                        onImagesChange([...images, ...newImages].slice(0, maxImages));
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleFileSelect = (e) => {
        handleFiles(e.target.files);
        e.target.value = '';
    };

    const handleRemove = (id) => {
        onImagesChange(images.filter((img) => img.id !== id));
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                상품 이미지 ({images.length}/{maxImages})
            </label>

            {/* 업로드 영역 */}
            <div
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={clsx(
                    'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
                    isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : error
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50',
                    images.length >= maxImages && 'opacity-50 cursor-not-allowed'
                )}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={images.length >= maxImages}
                />
                <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                    클릭하거나 이미지를 드래그하여 업로드
                </p>
                <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF 최대 {maxImages}장
                </p>
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}

            {/* 이미지 미리보기 */}
            {images.length > 0 && (
                <div className="mt-4 grid grid-cols-5 gap-4">
                    {images.map((image, index) => (
                        <div key={image.id} className="relative group">
                            <img
                                src={image.preview || image.url}
                                alt={`상품 이미지 ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                            />
                            {index === 0 && (
                                <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                                    대표
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={() => handleRemove(image.id)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

ImageUploader.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            preview: PropTypes.string,
            url: PropTypes.string,
            file: PropTypes.object,
        })
    ),
    onImagesChange: PropTypes.func.isRequired,
    maxImages: PropTypes.number,
    error: PropTypes.string,
};

export default ImageUploader;
