import { FunctionComponent } from "react";
import { PropertyResultsData } from "../PropertyCard/data";
import { FatPropertyCard } from "../PropertyCard/FatPropertyCard";

interface FatPropertyListProps {
  propertiesData: PropertyResultsData;
}

export const FatPropertyList: FunctionComponent<FatPropertyListProps> = ({
  propertiesData,
}) => {
  const {
    results,
    pageInfo: { totalResultsCount },
  } = propertiesData;
  const pageCount = results.length;
  const totalCount = totalResultsCount;
  const propertyCards = results.map((data) => (
    <FatPropertyCard key={data.property.id} data={data} />
  ));

  if (results.length) {
    return (
      <section>
        <h1>Properties</h1>
        <p>
          Displaying {pageCount} of {totalCount} total results.
        </p>
        <section>{propertyCards}</section>
      </section>
    );
  }

  return (
    <section>
      <h1>Properties</h1>
      <p>No results found please try another search.</p>
    </section>
  );
};
