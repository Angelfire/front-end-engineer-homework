import React from "react";
import { render, screen } from "@testing-library/react";
import ReactDOM from "react-dom";
import App from "../App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

it("renders app header", () => {
  render(<App />);

  const header = screen.getByText(/Emoji Search/i);

  expect(header).toBeInTheDocument();
});

it("search input updates and filters emojis", () => {
  render(<App />);

  const searchInput = screen.getByPlaceholderText(/Search emojis/i);

  userEvent.type(searchInput, "smile");

  const emojiResults = screen.queryAllByText(/smile/i);

  expect(emojiResults).toHaveLength(1);
});

it("adding a new emoji", () => {
  render(<App />);
  const addButton = screen.getByText(/Add Emoji/i);
  userEvent.click(addButton);

  const titleInput = screen.getByLabelText(/Title/i);
  const symbolInput = screen.getByLabelText(/Symbol/i);
  const saveButton = screen.getByText(/Add Emoji/i);

  userEvent.type(titleInput, "New Emoji");
  userEvent.type(symbolInput, "😃");
  userEvent.click(saveButton);

  const addedEmoji = screen.getByText(/New Emoji/);
  expect(addedEmoji).toBeInTheDocument();
});

it("editing an emoji", () => {
  render(<App />);
  const editButton = screen.getByText(/Edit/i);
  userEvent.click(editButton);

  const titleInput = screen.getByLabelText(/Title/i);
  const symbolInput = screen.getByLabelText(/Symbol/i);
  const saveButton = screen.getByText(/Save/i);

  userEvent.clear(titleInput);
  userEvent.type(titleInput, "Updated Emoji");
  userEvent.type(symbolInput, "🚀");
  userEvent.click(saveButton);

  const updatedEmoji = screen.getByText(/Updated Emoji/);
  expect(updatedEmoji).toBeInTheDocument();
});

it("deleting an emoji", () => {
  render(<App />);
  const deleteButton = screen.getByText(/Delete/i);
  userEvent.click(deleteButton);

  const confirmButton = screen.getByText(/Delete/i);
  userEvent.click(confirmButton);

  const deletedEmoji = screen.queryByText(/Deleted Emoji/);
  expect(deletedEmoji).toBeNull();
});

it("pagination changes the page", () => {
  render(<App />);
  
  // Assuming the initial page has Emoji 1 to 5 displayed
  const page2Button = screen.getByText("2");
  userEvent.click(page2Button);

  // Emoji 6 should be displayed on the second page
  const secondPageEmoji = screen.queryByText(/Emoji 6/);
  expect(secondPageEmoji).toBeInTheDocument();
});
