import PropTypes from "prop-types";
import React from "react";

const EmojiSearch = ({ textChange }) => {
  const handleChange = (event) => {
    textChange(event);
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-6">
          <div className="input-group mb-3">
            <span className="input-group-text" id="emoji-name">😎</span>
            <input
              type="text"
              className="form-control"
              placeholder="Emoji name"
              aria-label="Emoji name"
              aria-describedby="emoji-name"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

EmojiSearch.propTypes = {
  textChange: PropTypes.func
};

export default EmojiSearch;
