import React from "react";
import PropTypes from "prop-types";

import "./EmojiResultRow.css";

/**
 * Convert the Unicode code point of an emoji symbol to a hexadecimal string
 * and construct a URL to fetch the corresponding PNG image from a CDN.
 * This code is used to display emoji images in the EmojiResultRow component.
 *
 * @param {string} symbol - The emoji symbol character.
 * @returns {string} The URL to the PNG image corresponding to the emoji symbol.
 */
const generateEmojiImageUrl = (symbol) => {
  // Retrieve the Unicode code point of the first character in the symbol.
  const codePointHex = symbol.codePointAt(0).toString(16);

  // Construct the URL to fetch the emoji image using the hexadecimal code point.
  const imageUrl = `//cdn.jsdelivr.net/emojione/assets/png/${codePointHex}.png`;

  return imageUrl;
};

const EmojiResultRow = ({ title, symbol }) => {
  const imageUrl = generateEmojiImageUrl(symbol);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(symbol);
  };

  return (
    <li
      className="component-emoji-result-row copy-to-clipboard list-group-item d-flex align-items-center justify-content-between"
      onClick={handleCopyToClipboard}
    >
      <div>
        <img alt={title} src={imageUrl} className="pe-2" />
        <span className="title">{title}</span>
      </div>
      <span className="info">Click to copy emoji</span>
    </li>
  );
};

EmojiResultRow.propTypes = {
  title: PropTypes.string,
  symbol: PropTypes.string
};

export default EmojiResultRow;
