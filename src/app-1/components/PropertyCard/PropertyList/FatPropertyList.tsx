import { FunctionComponent } from "react";
import { PropertyData, PropertyResultsData } from "../../../../data";
import { useMutableSavedList } from "../../../hooks/useSavedList/useMutableSavedList";
import { FatPropertyCard } from "../FatPropertyCard";

interface FatPropertyListProps {
  propertiesData: PropertyResultsData;
}

export const FatPropertyList: FunctionComponent<FatPropertyListProps> = ({
  propertiesData,
}) => {
  const [savedProperties, { isSaved, removeSavedItem, toggleSavedItem }] = useMutableSavedList([] as PropertyData[], (d) => d.property.id);
  const {
    results,
    pageInfo: { totalResultsCount },
  } = propertiesData;
  const pageCount = results.length;
  const totalCount = totalResultsCount;
  const propertyCards = results.map((data) => (
    <FatPropertyCard key={data.property.id} data={data} onSaveToggle={toggleSavedItem} saved={isSaved(data)}  />
  ));

  const savedPropertyCards = savedProperties.map((data) => (
    <FatPropertyCard key={`save-${data.property.id}`} data={data} onSaveToggle={removeSavedItem} saved={true} />
  ));

  if (results.length) {
    return (
      <section>
        <h1>Properties</h1>
        <p>
          Displaying {pageCount} of {totalCount} total results.
        </p>
        <section>{propertyCards}</section>
        <h2>Saved Properties</h2>
        <section>{savedPropertyCards}</section>
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
