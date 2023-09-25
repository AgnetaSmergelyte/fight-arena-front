import React from 'react';

const FighterSelectBox = ({imageInfo, index, selectedImage, setSelectedImage}) => {
    return (
        <div>
            {imageInfo.taken ?
                <div className="selectImage taken">
                    <img src={imageInfo.image} alt=""/>
                </div> :
                <div className={(index === selectedImage) ? "selectImage selected" : "selectImage"} onClick={() => setSelectedImage(index)}>
                    <img src={imageInfo.image} alt=""/>
                </div>
            }
        </div>
    );
};

export default FighterSelectBox;