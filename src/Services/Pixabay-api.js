import axios from "axios";
import PropTypes from "prop-types";

const fetchImagesWithQuery = (searchQuery, page) => {
  const API_KEY = "19097273-498c0f6143a3d5e6f313fb87e";
  const BASE_URL = "https://pixabay.com/api/";
  return axios
    .get(
      `${BASE_URL}?q=${searchQuery}&key=${API_KEY}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((response) => response.data.hits);
};

const api = { fetchImagesWithQuery };

export default api;

fetchImagesWithQuery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
