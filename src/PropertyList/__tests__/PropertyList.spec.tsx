import { render, screen } from "@testing-library/react";
import { createPropertyResultsData } from "../../PropertyCard/data";
import {
  PropertyList,
  PropertyListNoResults,
  PropertyListView,
  PropertyListWithData
} from "../PropertyList";

const propertiesData = createPropertyResultsData();

describe("<PropertyListWithData />", () => {
  it("SHOULD render with mapped data", () => {
    const { asFragment } = render(
      <PropertyListWithData propertiesData={propertiesData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("<PropertyListView />", () => {
  const noResultsContent = "no results";
  const resultsContent = "display the results";

  describe("GIVEN results", () => {
    beforeEach(() => {
      render(
        <PropertyListView
          hasResults={true}
          list={<>{resultsContent}</>}
          noResults={<>{noResultsContent}</>}
        />
      );
    });
    it("SHOULD display list", () => {
      const list = screen.getByText(resultsContent);
      expect(list).toBeInTheDocument();
    });

    it("SHOULD NOT display no results", () => {
      const noResults = screen.queryByText(noResultsContent);
      expect(noResults).not.toBeInTheDocument();
    });
  });

  describe("GIVEN no results", () => {
    beforeEach(() => {
      render(
        <PropertyListView
          hasResults={false}
          list={<>{resultsContent}</>}
          noResults={<>{noResultsContent}</>}
        />
      );
    });
    it("SHOULD NOT display list", () => {
      const list = screen.queryByText(resultsContent);
      expect(list).not.toBeInTheDocument();
    });
    it("SHOULD display no results", () => {
      const noResults = screen.getByText(noResultsContent);
      expect(noResults).toBeInTheDocument();
    });
  });
});

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

describe("<PropertyListNoResults />", () => {
  beforeEach(() => {
    render(<PropertyListNoResults />);
  });

  it("SHOULD render", () => {
    const { asFragment } = render(<PropertyListNoResults />);
    expect(asFragment()).toMatchSnapshot();
  });
});
