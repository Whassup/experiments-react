import { FunctionComponent, ReactNode, useState } from "react";
import { PropertyData, PropertyResultsData } from "../PropertyCard/data";
import { PropertyAttributes, PropertyCard, PropertyCardProps } from "../PropertyCard/PropertyCard";
import { useSavedList } from "../useSavedList/useSavedList";

interface PropertyListProps {
  propertyCards: ReactNode;
  savedPropertyCards: ReactNode;
  totalCount: number;
  pageCount: number;
}

export const PropertyList: FunctionComponent<PropertyListProps> = ({
  propertyCards,
  savedPropertyCards,
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
      <h1>Saved Properties</h1>
      <section>{savedPropertyCards}</section>
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
    const [savedProperties, { isSaved, removeSavedItem, toggleSavedItem }] = useSavedList(useState<PropertyData[]>([]), (d) => d.property.id);
    const { results, pageInfo } = propertiesData;
    const dataToPropertyCardProps = (data: PropertyData) => ({ onSaveToggle, saved}: Pick<PropertyCardProps , 'onSaveToggle' | 'saved'>): PropertyCardProps => {
      const { property, propertyDetailsPage } = data;
      const {
        address: { shortAddressDisplay },
        attributes: { beds, baths, carSpaces },
      } = property;
      const { slug } = propertyDetailsPage;

      return {
        title:shortAddressDisplay,
        href:slug,
        attributes: <PropertyAttributes beds={beds} baths={baths} carSpaces={carSpaces} />,
        onSaveToggle,
        saved
      }
    }
    const propertyCards = results.map((data) => (
      <PropertyCard key={data.property.id} {...dataToPropertyCardProps(data)({onSaveToggle: () => toggleSavedItem(data), saved: isSaved(data)})} />
    ));
    const savedPropertyCards = savedProperties.map((data) => (
      <PropertyCard key={data.property.id} {...dataToPropertyCardProps(data)({onSaveToggle: () => removeSavedItem(data), saved: true})} />
    ));
    const list = (
      <PropertyList
        propertyCards={propertyCards}
        savedPropertyCards={savedPropertyCards}
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
