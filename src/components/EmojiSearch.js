import PropTypes from "prop-types";
import React, { useState } from "react";

const EmojiSearch = ({ textChange }) => {
  const [inputText, setInputText] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    const newText = event.target.value;
    setInputText(newText);
    validateInput(newText);
  };

  /**
   * Validates the input text and triggers the textChange callback if the text is valid or empty.
   *
   * @param {string} text - The input text to be validated.
   * @returns {void}
   */
  const validateInput = (text) => {
    const isValidInput = /^[A-Za-z0-9]*$/.test(text) || text === "";
  
    setIsValid(isValidInput);

    if (isValidInput || text === "") {
      textChange({ target: { value: text } });
    }
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-6">
          <div className={`input-group mb-3 ${isValid ? "" : "is-invalid"}`}>
            <span className="input-group-text" id="emoji-name">😎</span>
            <input
              type="text"
              className={`form-control ${!isValid ? "is-invalid" : ""}`}
              placeholder="Emoji name"
              aria-label="Emoji name"
              aria-describedby="emoji-name"
              value={inputText}
              onChange={handleChange}
            />
            {!isValid && (
              <div className="invalid-feedback">
                Emoji name should only contain letters and numbers.
              </div>
            )}
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
