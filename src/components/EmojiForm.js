import React, { useState, useEffect } from "react";

const EmojiForm = ({ editingEmoji, onAddEditEmoji }) => {
  const [emoji, setEmoji] = useState({ title: "", symbol: "" });

  useEffect(() => {
    if (editingEmoji) {
      setEmoji(editingEmoji);
    } else {
      setEmoji({ title: "", symbol: "" });
    }
  }, [editingEmoji]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddEditEmoji(emoji);
    setEmoji({ title: "", symbol: "" });
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
              className="form-control"
              id="title"
              value={emoji.title}
              onChange={(e) => setEmoji({ ...emoji, title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="symbol" className="form-label">
              Emoji Symbol:
            </label>
            <input
              type="text"
              className="form-control"
              id="symbol"
              value={emoji.symbol}
              onChange={(e) => setEmoji({ ...emoji, symbol: e.target.value })}
            />
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
