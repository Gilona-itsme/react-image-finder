import axios from "axios";
import PropTypes from "prop-types";

const BASE_URL = "https://pixabay.com/api";
const API_KEY = "19097273-498c0f6143a3d5e6f313fb87e";

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: "photo",
  orientation: "horizontal",
  per_page: 12,
};

const fetchImagesWithQuery = async (q, page) => {
  try {
    const { data } = await axios.get("/", {
      params: { q, page },
    });
    return data.hits;
  } catch (error) {
    return [];
  }
};

const api = { fetchImagesWithQuery };

fetchImagesWithQuery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default api;
