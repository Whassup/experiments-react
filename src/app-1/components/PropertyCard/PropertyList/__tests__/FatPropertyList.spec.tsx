import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createPropertyResultsData } from "../../data";
import { FatPropertyList } from "../FatPropertyList";

const propertiesData = createPropertyResultsData();

describe("<FatPropertyList />", () => {
  describe("render", () => {
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

  describe("behaviours", () => {
    describe("GIVEN results", () => {
      describe("WHEN user clicks save button for property", () => {
        describe("GIVEN property is NOT saved", () => {
          it("should display property in saved list", () => {
            render(<FatPropertyList propertiesData={propertiesData} />);
            const propertyData = propertiesData.results[0];
            const saveButton = screen.getByTestId(`save-${propertyData.property.id}`);
            userEvent.click(saveButton);
            const savedProperty = screen.getAllByTestId(`card-${propertyData.property.id}--saved`);
            expect(savedProperty).toHaveLength(2);
          });
        });

        describe("GIVEN property is saved", () => {
          it("should NOT display property in saved list", () => {
            render(<FatPropertyList propertiesData={propertiesData} />);
            const propertyData = propertiesData.results[0];
            const saveButton = screen.getByTestId(`save-${propertyData.property.id}`);
            userEvent.click(saveButton);
            userEvent.click(saveButton);
            const savedProperty = screen.queryAllByTestId(`card-${propertyData.property.id}--saved`);
            expect(savedProperty).toHaveLength(0);
          });
        });
      });
    });
  });
  
});
