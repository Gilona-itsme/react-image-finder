import React from "react";
import PropTypes from "prop-types";
import BoxItem from "./BoxItem";
import Image from "./Image";

const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  onClickOpenModal,
  largeImageURL,
}) => {
  return (
    <BoxItem>
      <Image
        id={id}
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
        onClick={onClickOpenModal}
      />
    </BoxItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  id: PropTypes.number,
  onClickOpenModal: PropTypes.func,
};

export default ImageGalleryItem;
