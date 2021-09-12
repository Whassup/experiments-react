import { render, screen } from "@testing-library/react";
import { createPropertyResultsData } from "../../PropertyCard/data";
import { FatPropertyList } from "../FatPropertyList";

const propertiesData = createPropertyResultsData();

describe("<FatPropertyList />", () => {
  describe("GIVEN results", () => {
    beforeEach(() => {
      render(<FatPropertyList propertiesData={propertiesData} />);
    });
    it("SHOULD display propertyCards", () => {
      const propertyTitle =
        propertiesData.results[0].property.address.shortAddressDisplay;
      const propertyCards = screen.getAllByText(propertyTitle);
      expect(propertyCards).toHaveLength(propertiesData.results.length);
    });

    it("SHOULD display result summary", () => {
      const resultSummary = screen.getByText(
        "Displaying 3 of 100 total results."
      );
      expect(resultSummary).toBeInTheDocument();
    });

    it("SHOULD NOT display no results", () => {
      const noResults = screen.queryByText(
        "No results found please try another search."
      );
      expect(noResults).not.toBeInTheDocument();
    });
  });

  describe("GIVEN no results", () => {
    const { results, ...data } = propertiesData;
    const noResultsPropertiesData = { ...data, results: [] };

    beforeEach(() => {
      render(<FatPropertyList propertiesData={noResultsPropertiesData} />);
    });

    it("SHOULD NOT display propertyCards", () => {
      const propertyTitle =
        propertiesData.results[0].property.address.shortAddressDisplay;
      const propertyCards = screen.queryAllByText(propertyTitle);
      expect(propertyCards).toHaveLength(0);
    });

    it("SHOULD NOT display result summary", () => {
      const resultSummary = screen.queryByText(
        "Displaying 3 of 100 total results."
      );
      expect(resultSummary).not.toBeInTheDocument();
    });

    it("SHOULD display no results", () => {
      const noResults = screen.getByText(
        "No results found please try another search."
      );
      expect(noResults).toBeInTheDocument();
    });
  });
});
