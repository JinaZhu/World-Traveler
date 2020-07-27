if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const config = {
  googleAPIKey: process.env.REACT_APP_GOOGLE_API,
};

export default config;
