import PropTypes from "prop-types";
import React from "react";

const SearchInput = ({ textChange }) => {
  const handleChange = (event) => {
    textChange(event);
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-6">
          <div class="input-group mb-3">
            <span class="input-group-text" id="emoji-name">😎</span>
            <input
              type="text"
              class="form-control"
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

SearchInput.propTypes = {
  textChange: PropTypes.func
};

export default SearchInput;
