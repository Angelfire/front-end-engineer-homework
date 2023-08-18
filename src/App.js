import React, { useState } from "react";

import EmojiResults from "./components/EmojiResults";
import EmojiForm from "./components/EmojiForm";
import SearchInput from "./components/SearchInput";
import Header from "./components/Header/Header";
import Paginator from "./components/Paginator";
import filterEmoji from "./filterEmoji";

const emojisPerPage = 5;

const App = () => {
  const [emojiData, setEmojiData] = useState(filterEmoji("", 20));
  const [currentPage, setCurrentPage] = useState(1);
  const [editingEmoji, setEditingEmoji] = useState(null);

  const handleSearchChange = (event) => {
    const newFilteredEmoji = filterEmoji(event.target.value, 20);
    setEmojiData(newFilteredEmoji);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddEditEmoji = (emoji) => {
    if (editingEmoji) {
      // Editing an existing emoji
      const updatedEmojis = emojiData.map((e) =>
        e.title === editingEmoji.title ? emoji : e
      );
      setEmojiData(updatedEmojis);
      setEditingEmoji(null);
    } else {
      // Adding a new emoji
      setEmojiData([...emojiData, emoji]);
    }
  };

  const handleDeleteEmoji = (title) => {
    const updatedEmojis = emojiData.map((emoji) =>
      emoji.title === title ? { ...emoji, softDeleted: true } : emoji
    );
    setEmojiData(updatedEmojis);
  };

  // Calculate the index range for the current page
  const indexOfLastEmoji = currentPage * emojisPerPage;
  const indexOfFirstEmoji = indexOfLastEmoji - emojisPerPage;

  // Filter and slice the emoji data for display
  const emojisToDisplay = emojiData
    .filter((emoji) => !emoji.softDeleted)
    .slice(indexOfFirstEmoji, indexOfLastEmoji);

  return (
    <div className="mx-2 my-4">
      <Header />
      <SearchInput textChange={handleSearchChange} />
      <EmojiForm
        editingEmoji={editingEmoji}
        onAddEditEmoji={handleAddEditEmoji}
      />
      <EmojiResults
        emojiData={emojisToDisplay}
        onEditEmoji={setEditingEmoji}
        onDeleteEmoji={handleDeleteEmoji}
      />
      <Paginator
        currentPage={currentPage}
        totalPages={Math.ceil(emojiData.filter((emoji) => !emoji.softDeleted).length / emojisPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
