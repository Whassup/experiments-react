import { render, screen } from "@testing-library/react";
import {
  PropertyList
} from "../PropertyList";


describe("<PropertyList />", () => {
  const propertyCardsContent = "PropertyCards";
  const savedPropertyCardsContent = "SavedPropertyCards";

  beforeEach(() => {
    render(
      <PropertyList
        propertyCards={<>{propertyCardsContent}</>}
        savedPropertyCards={<>{savedPropertyCardsContent}</>}
        totalCount={100}
        pageCount={10}
      />
    );
  });

  it("SHOULD display propertyCards", () => {
    const propertyCards = screen.getByText(propertyCardsContent);
    expect(propertyCards).toBeInTheDocument();
  });

  it("SHOULD display result summary", () => {
    const resultSummary = screen.getByRole("heading", {
      name: "Displaying 10 of 100 total results.",
    });
    expect(resultSummary).toBeInTheDocument();
  });

  it("SHOULD display savedPropertyCards", () => {
    const propertyCards = screen.getByText(savedPropertyCardsContent);
    expect(propertyCards).toBeInTheDocument();
  });
});
