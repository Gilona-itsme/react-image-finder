import React, { Component } from "react";
//import PropTypes from 'prop-types';

import imageApi from "../../Services/Pixabay-api";

import ImageGallery from "../ImageGallery";
import Notification from "../Notification";
import Loader from "../Loader";
import LoadMore from "../LoadMore";
import Modal from "../Modal";

export default class ImageFinderInfo extends Component {
  state = {
    images: "",
    page: 1,
    largeImageURL: "",
    loading: false,
    error: null,
    shouldScroll: false,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ images: [], page: 1 }, () => this.fetchImages());
    }
  }

  fetchImages = () => {
    const { searchQuery } = this.props;
    const { page } = this.state;

    this.setState({ loading: true });

    // setTimeout(() => {
    imageApi
      .fetchImagesWithQuery(searchQuery, page)
      .then((images) => {
        this.setState(
          (prevState) => ({
            images: [...prevState.images, ...images],
            page: prevState.page + 1,
          }),
          () => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          }
        );
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
    // }, 1000);
  };

  handleButton = () => {
    this.fetchImages();

    if (this.state.page > 1) {
      this.setState({ shouldScroll: true });
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getBigLink = (e) => {
    this.setState({ largeImageURL: e.target.dataset.source });
    this.toggleModal();
  };

  render() {
    const {
      images,
      loading,
      error,
      showModal,
      largeImageURL,
      tags,
    } = this.state;

    const shouldRenderLoadMore = images.length > 0 && !loading;
    const shouldRenderImage = images.length > 0;
    return (
      <>
        {error && (
          <Notification
            message={`Whoops, something went wrong: ${error.message}`}
          />
        )}

        {loading && <Loader />}

        {shouldRenderImage && (
          <ImageGallery images={images} onClickOpenModal={this.getBigLink} />
        )}
        {shouldRenderLoadMore && (
          <LoadMore type="button" onClick={this.handleButton}>
            Load more
          </LoadMore>
        )}

        {showModal && (
          <Modal onClose={this.toggleModal} largeImageURL={largeImageURL}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}
