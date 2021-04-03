import axios from "axios";

const SetToken = (token) => {
  if (token) {
    return (axios.defaults.headers.common["token-key"] = token);
  } else {
    delete axios.defaults.headers.common["token-key"];
  }
};

export default SetToken;
