import React, { Component } from "react";
import PropTypes from "prop-types";

import { ImSearch } from "react-icons/im";
import { toast } from "react-toastify";

import Input from "./Input";
import Form from "./Form";
import Button from "./Button";

class Search extends Component {
  state = {
    searchInput: "",
  };

  handleTagesChange = (event) => {
    this.setState({ searchInput: event.target.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.searchInput.trim() === "") {
      toast.dark("Enter text, please");
      return;
    }

    this.props.onSubmitImageTags(this.state.searchInput);
    this.setState({ searchInput: "" });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Button type="submit">
          <ImSearch style={{ width: 25, height: 25 }} />
        </Button>

        <Input
          type="text"
          autoComplete="off"
          name="image"
          value={this.state.searchInput}
          onChange={this.handleTagesChange}
          placeholder="Search images and photos"
        />
      </Form>
    );
  }
}

Search.propTypes = { onSubmit: PropTypes.func };

export default Search;
