import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Paginator from "../../src/components/Paginator";

it("renders pagination with page numbers", () => {
  const mockOnPageChange = jest.fn();

  render(
    <Paginator currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />
  );

  const pageNumbers = screen.getAllByRole("button");
  expect(pageNumbers).toHaveLength(5); // Assuming totalPages is 5

  // Test clicking on a page number
  fireEvent.click(pageNumbers[2]); // Click on page number 3
  expect(mockOnPageChange).toHaveBeenCalledWith(3);
});