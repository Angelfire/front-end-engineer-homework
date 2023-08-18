import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Clipboard from "clipboard";

import EmojiResultRow from "./EmojiResultRow/EmojiResultRow";

const EmojiResults = ({ emojiData }) => {
  // useEffect instead of componentDidMount and componentWillUnmount
  useEffect(() => {
    const clipboard = new Clipboard(".copy-to-clipboard");

    return () => {
      clipboard.destroy();
    };
  }, []);

  return (
    <ul className="list-group list-group-flush">
      {emojiData.map((emojiData) => (
        <EmojiResultRow
          key={emojiData.title}
          symbol={emojiData.symbol}
          title={emojiData.title}
        />
      ))}
    </ul>
  );
};

EmojiResults.propTypes = {
  emojiData: PropTypes.array
};

export default EmojiResults;
