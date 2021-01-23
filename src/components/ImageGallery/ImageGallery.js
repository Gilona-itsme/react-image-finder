import React from "react";
import PropTypes from "prop-types";

import ImageGalleryItem from "../ImageGalleryItem";
import styled from "styled-components";

const BoxGallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 10px);

  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 10px;
  margin-bottom:20px
 
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

const ImageGallery = ({ images, onClickOpenModal }) => {
  return (
    <BoxGallery>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          tags={tags}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          onClickOpenModal={onClickOpenModal}
        />
      ))}
    </BoxGallery>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ).isRequired,
  onClickOpenModal: PropTypes.func.isRequired,
};
