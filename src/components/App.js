import React, { Component } from "react";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../styles/base.scss";

import Container from "./generic/Container";
import Header from "./Header";
import Searchbar from "./SearchBar";

import ImageFinderInfo from "./ImageFinderInfo";
export default class App extends Component {
  state = {
    searchQuery: "",
  };

  handleFormSubmit = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <Container>
        <ToastContainer position="top-center" />
        <Header>
          <Searchbar onSubmitImageTags={this.handleFormSubmit} />
        </Header>

        <ImageFinderInfo searchQuery={this.state.searchQuery} />
      </Container>
    );
  }
}
