import { FunctionComponent, ReactNode } from "react";
import { PropertyResultsData } from "../PropertyCard/data";
import { PropertyCardWithData } from "../PropertyCard/PropertyCard";

interface PropertyListProps {
  propertyCards: ReactNode;
  totalCount: number;
  pageCount: number;
}

export const PropertyList: FunctionComponent<PropertyListProps> = ({
  propertyCards,
  totalCount,
  pageCount,
}) => {
  return (
    <section>
      <h1>Properties</h1>
      <h2>
        Displaying <strong>{pageCount}</strong> of <strong>{totalCount}</strong>{" "}
        total results.
      </h2>
      <section>{propertyCards}</section>
    </section>
  );
};

export const PropertyListNoResults: FunctionComponent = () => {
  return (
    <section>
      <h1>Properties</h1>
      <p>No results found please try another search.</p>
    </section>
  );
};

interface PropertyListViewProps {
  hasResults: boolean;
  list: ReactNode;
  noResults: ReactNode;
}

export const PropertyListView: FunctionComponent<PropertyListViewProps> = ({
  hasResults,
  list,
  noResults,
}) => (hasResults ? <>{list}</> : <>{noResults}</>);

interface PropertyListWithDataProps {
  propertiesData: PropertyResultsData;
}

export const PropertyListWithData: FunctionComponent<PropertyListWithDataProps> =
  ({ propertiesData }) => {
    const { results, pageInfo } = propertiesData;
    const propertyCards = results.map((data) => (
      <PropertyCardWithData key={data.property.id} data={data} />
    ));
    const list = (
      <PropertyList
        propertyCards={propertyCards}
        pageCount={results.length}
        totalCount={pageInfo.totalResultsCount}
      />
    );
    return (
      <PropertyListView
        hasResults={Boolean(results.length)}
        list={list}
        noResults={<PropertyListNoResults />}
      />
    );
  };
