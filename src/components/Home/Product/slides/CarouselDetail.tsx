import React, { useEffect, useRef, useState } from "react";
import {fixUrlImage} from "../CardProduct";
import '../../../../styles/Slide.scss'

export type ImageType = { form?: string; url: string };

const ImageCarousel: React.FC<{ images?: ImageType[] }> = ({ images }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState<ImageType>();
    const carouselItemsRef = useRef<HTMLDivElement[] | null[]>([]);

    useEffect(() => {
        if (images && images[0]) {
            carouselItemsRef.current = carouselItemsRef.current.slice(
                0,
                images.length
            );

            setSelectedImageIndex(0);
            setSelectedImage(images[0]);
        }
    }, [images]);

    const handleSelectedImageChange = (newIdx: number) => {
        if (images && images.length > 0) {
            setSelectedImage(images[newIdx]);
            setSelectedImageIndex(newIdx);
            if (carouselItemsRef?.current[newIdx]) {
                carouselItemsRef?.current[newIdx]?.scrollIntoView({
                    inline: "center",
                    behavior: "smooth",
                    block: "end"
                });
            }
        }
    };

    const handleRightClick = () => {
        if (images && images.length > 0) {
            let newIdx = selectedImageIndex + 1;
            if (newIdx >= images.length) {
                newIdx = 0;
            }
            handleSelectedImageChange(newIdx);
        }
    };

    const handleLeftClick = () => {
        if (images && images.length > 0) {
            let newIdx = selectedImageIndex - 1;
            if (newIdx < 0) {
                newIdx = images.length - 1;
            }
            handleSelectedImageChange(newIdx);
        }
    };

    return (
        <div className="carousel-container">
            <div
                className="selected-image"
                style={{ backgroundImage: `url(${selectedImage && fixUrlImage(selectedImage.url)})` }}
            />
            <div className="carousel">
                <div className="carousel__images">
                    {images &&
                    images.map((image, idx) => (
                        <div
                            onClick={() => handleSelectedImageChange(idx)}
                            style={{ backgroundImage: `url(${fixUrlImage(image.url)})` }}
                            key={idx}
                            className={`carousel__image ${
                                selectedImageIndex === idx && "carousel__image-selected"
                            }`}
                            ref={(el) => (carouselItemsRef.current[idx] = el)}
                        />
                    ))}
                </div>
                {/*<button*/}
                {/*    className="carousel__button carousel__button-left"*/}
                {/*    onClick={handleLeftClick}*/}
                {/*>*/}
                {/*    Prev*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    className="carousel__button carousel__button-right"*/}
                {/*    onClick={handleRightClick}*/}
                {/*>*/}
                {/*    Next*/}
                {/*</button>*/}
            </div>
        </div>
    );
};

export default ImageCarousel;