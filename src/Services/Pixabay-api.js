import axios from "axios";
import PropTypes from "prop-types";

const fetchImagesWithQuery = (searchQuery, page = 0) => {
  const API_KEY = "19097273-498c0f6143a3d5e6f313fb87e";
  const BASE_URL = "https://pixabay.com/api/";
  return axios
    .get(
      // `https://pixabay.com/api/?q=${searchQuery}&key=19097273-498c0f6143a3d5e6f313fb87e&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
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
