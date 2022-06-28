///image included in ButtonCard
///Btn is the project convention for tradittional buttons, in order to avoidd confussion with app's buttons
import React, { useState } from "react";
import Image from 'next/image'
import getConfig from "next/config";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export enum ImageType {
    avatar,
    popup,
    marker,
    cardMap,
    cardList,
    buttonCard,
}

export enum ContentAlignment {
    left,
    center,
    right,
}

interface ImageProps {
    height?: string;
    width?: string;
    layout?: string;
    src: string;
    alt: string;
    objectFit?: string;
    imageType: ImageType;
    localUrl?: boolean;
}
export function ImageCarrousel({images}) {
    const [imageSelected, setimageSelected] = useState(0);

  const nextImage = () => {
    if (imageSelected+1 >= images.length) {
      setimageSelected(0);
    } else {
      setimageSelected(imageSelected+1);  
    }
  }

  const previousImage = () => {
    if (imageSelected-1 < 0) {
      setimageSelected(images.length - 1);
    } else {
      setimageSelected(imageSelected-1);  
    }
  }
    
    return (
        <div className="card-button-list__picture-container">
            {images.length > 1 && (
                <div className="card-button-list__nav">
                    <div className="arrow btn-circle__icon" onClick={previousImage}>
                        <IoChevronBackOutline />
                    </div>
                    <div className="arrow btn-circle__icon" onClick={nextImage}>
                        <IoChevronForwardOutline />
                    </div>
                </div>
            )}
            <ImageWrapper
                imageType={ImageType.cardList}
                src={images[imageSelected]}
                alt="popup_img"
                localUrl
            />
        </div>
    );
}
export default function ImageWrapper({
    height = "200",
    width = "200",
    alt = null,
    layout = "responsive",
    src = null,
    objectFit = "contain",
    imageType = ImageType.popup,
    localUrl = false
}: ImageProps) {
    let classNames = [];

    switch (imageType) {
        case ImageType.popup:
            width = "200";
            height = "80";
            break;
        case ImageType.marker:
            break;
        case ImageType.cardMap:
            layout = "responsive";
            width = "200";
            height = "130";
            break;
        case ImageType.cardList:
            layout = "responsive";
            width = "1000";
            height = "1000";
            break;
        case ImageType.buttonCard:
            width = "1000";
            height = "1000";
            layout = "responsive";
            break;
        default:
            break;
    }

    const className = classNames.join(" ");
    if (localUrl && src) {
        src = baseUrl + "/files/get/" + src;
    } else {
        src = "https://dummyimage.com/200/#ccc/fff";
    }

    return (
          <Image
            src={src}
            alt={alt}
            layout={layout}
            width={width}
            height={height}
          />
    );
}




export function ImageContainer({
    height = 200,
    width = 200,
    alt = null,
    src = '',
    localUrl = false
}) {
    let classNames = [];

    const className = classNames.join(" ");
    if (!src) {
        return (
            <>
            </>
        );
    }
    if (localUrl) {
        src = baseUrl + "/files/get/" + src;
    }
    return (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
          />
    );
}
