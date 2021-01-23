import React, { Component } from "react";
//import PropTypes from "prop-types";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./styles/base.scss";

import imageApi from "../Services/Pixabay-api";

import Container from "./generic/Container";
import Header from "./Header";
import Searchbar from "./SearchBar";
//import ImageInfo from "./ImageInfo";
import ImageGallery from "./ImageGallery";
import Notification from "./Notification";
import Loader from "./Loader";
import LoadMore from "./LoadMore";
import Modal from "./Modal";

export default class App extends Component {
  state = {
    images: [],
    searchQuery: "",
    page: 1,
    largeImageURL: "",
    loading: false,
    error: null,
    shouldScroll: false,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
    if (this.state.shouldScroll === true) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    this.setState({ loading: true });

    setTimeout(() => {
      imageApi
        .fetchImagesWithQuery(searchQuery, page)
        .then((images) =>
          this.setState((prevState) => ({
            images: [...prevState.images, ...images],
            page: prevState.page + 1,
          }))
        )
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }, 1000);
  };

  handleFormSubmit = (query) => {
    this.setState({ searchQuery: query, page: 1, images: [] });
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
      <Container>
        <ToastContainer position="top-center" />
        <Header>
          <Searchbar onSubmitImageTags={this.handleFormSubmit} />
        </Header>
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
      </Container>
    );
  }
}

// export default class App extends Component {
//   state = {
//     search: "",
//   };

//   handleFormSubmit = (query) => {
//     this.setState({ searchQuery: query, page: 1, images: [] });
//   };
//   render() {
//     return (
//       <Container>
//         <ToastContainer position="top-center" />
//         <Header>
//           <Searchbar onSubmitImageTags={this.handleFormSubmit} />
//         </Header>

//         <ImageInfo search={this.state.search} />
//       </Container>
//     );
//   }
// }
