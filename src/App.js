import React, { useState } from "react";

import EmojiResults from "./components/EmojiResults";
import SearchInput from "./components/SearchInput";
import Header from "./components/Header/Header";
import Paginator from "./components/Paginator";
import filterEmoji from "./filterEmoji";

const emojisPerPage = 5;

const App = () => {
  const [filteredEmoji, setFilteredEmoji] = useState(filterEmoji("", 20));
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (event) => {
    setFilteredEmoji(filterEmoji(event.target.value, 20));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the index range for the current page
  const indexOfLastEmoji = currentPage * emojisPerPage;
  const indexOfFirstEmoji = indexOfLastEmoji - emojisPerPage;

  // Slice the filteredEmoji array based on the current page
  const emojisToDisplay = filteredEmoji.slice(indexOfFirstEmoji, indexOfLastEmoji);

  return (
    <div className="mx-2 my-4">
      <Header />
      <SearchInput textChange={handleSearchChange} />
      <EmojiResults emojiData={emojisToDisplay} />
      <Paginator
        currentPage={currentPage}
        totalPages={Math.ceil(filteredEmoji.length / emojisPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
