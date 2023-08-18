import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";

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

const EmojiResultRow = ({ title, symbol, onEdit, onDelete }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn btn-primary" onClick={() => onEdit({ title, symbol })}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => setDeleteModalVisible(true)}>
          Delete
        </button>
      </div>

      <Modal show={deleteModalVisible} onHide={() => setDeleteModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this emoji?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setDeleteModalVisible(false)}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(title)}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </li>
  );
};

EmojiResultRow.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  title: PropTypes.string,
  symbol: PropTypes.string
};

export default EmojiResultRow;
