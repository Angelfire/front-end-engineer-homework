import React, { useState, useEffect } from "react";

/**
 * Validates an emoji title to ensure it contains only letters and spaces.
 *
 * @param {string} title - The emoji title to be validated.
 * @returns {string} An error message if the title is invalid, otherwise an empty string.
 *
 */
const validateTitle = (title) => {
  if (!/^[A-Za-z\s]+$/.test(title)) {
    return "Emoji Name should only contain letters and spaces.";
  }
  return "";
};

/**
 * Validates an emoji symbol to ensure it contains only valid symbols (non-alphanumeric characters).
 *
 * @param {string} symbol - The emoji symbol to be validated.
 * @returns {string} An error message if the symbol is invalid, otherwise an empty string.
 *
 */
const validateSymbol = (symbol) => {
  if (!/^[^\w\s]+$/.test(symbol)) {
    return "Emoji Symbol should only contain valid symbols.";
  }
  return "";
};

const EmojiForm = ({ editingEmoji, onAddEditEmoji }) => {
  const [emoji, setEmoji] = useState({ title: "", symbol: "" });
  const [titleError, setTitleError] = useState("");
  const [symbolError, setSymbolError] = useState("");

  useEffect(() => {
    if (editingEmoji) {
      setEmoji(editingEmoji);
    } else {
      setEmoji({ title: "", symbol: "" });
    }
  }, [editingEmoji]);

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setEmoji({ ...emoji, title: value });
    setTitleError(validateTitle(value));
  };

  const handleSymbolChange = (e) => {
    const { value } = e.target;
    setEmoji({ ...emoji, symbol: value });
    setSymbolError(validateSymbol(value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const titleValidationError = validateTitle(emoji.title);
    const symbolValidationError = validateSymbol(emoji.symbol);

    if (!titleValidationError && !symbolValidationError) {
      onAddEditEmoji(emoji);
      setEmoji({ title: "", symbol: "" });
      setTitleError("");
      setSymbolError("");
    }
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <form onSubmit={handleSubmit} className="col-12 col-sm-6">
          <h3>{editingEmoji ? "Edit Emoji" : "Add Emoji"}</h3>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Emoji Name:
            </label>
            <input
              type="text"
              className={`form-control ${titleError ? "is-invalid" : ""}`}
              id="title"
              value={emoji.title}
              onChange={handleTitleChange}
            />
            {titleError && <div className="invalid-feedback">{titleError}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="symbol" className="form-label">
              Emoji Symbol:
            </label>
            <input
              type="text"
              className={`form-control ${symbolError ? "is-invalid" : ""}`}
              id="symbol"
              value={emoji.symbol}
              onChange={handleSymbolChange}
            />
            {symbolError && <div className="invalid-feedback">{symbolError}</div>}
          </div>
          <button type="submit" className="btn btn-primary">
            {editingEmoji ? "Save Changes" : "Add Emoji"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmojiForm;
