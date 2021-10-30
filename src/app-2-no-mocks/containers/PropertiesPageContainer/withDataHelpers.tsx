import { PropertyData, PropertyResultsData } from "../../../data";
import { PropertiesPageLayout } from "../../components/PropertiesPageLayout/PropertiesPageLayout";
import { PropertyCard } from "../../components/PropertyCard/PropertyCard";
import { PropertyAttributes } from "../../components/PropertyCard/subcomponents/PropertyAttributes";
import { PropertyList } from "../../components/PropertyList/PropertyList";
import { PropertyListLoading } from "../../components/PropertyList/subcomponents/PropertyListLoading/PropertyListLoading";
import { PropertyListNoResults } from "../../components/PropertyList/subcomponents/PropertyListNoResults/PropertyListNoResults";

export const getPropertyAttributesWithData = (
  isExpanded: (id: string) => boolean,
  toggleExpanded: (id: string) => void,
) => (data: PropertyData) =>{ 
  const { property: { attributes: { beds, baths, carSpaces } }} = data;
  return (
  <PropertyAttributes
    beds={beds}
    baths={baths}
    carSpaces={carSpaces}
    expanded={isExpanded(data.property.id)}
    onExpandToggle={() => toggleExpanded(data.property.id)}
  />
);
}
export const getPropertyCardWithData =
  (
    getPropertyAttributesWithData: (
      data: PropertyData
    ) => JSX.Element,
    toggleSavedItem: (data: PropertyData) => void,
    isSaved: (data: PropertyData) => boolean
  ) =>
  (data: PropertyData) => {
    const {
      property: {
        id,
        address: { shortAddressDisplay },
      },
      propertyDetailsPage: { slug },
    } = data;
    return (
      <PropertyCard
        key={id}
        title={shortAddressDisplay}
        href={slug}
        attributes={getPropertyAttributesWithData(data)}
        onSaveToggle={() => toggleSavedItem(data)}
        saved={isSaved(data)}
      />
    );
  };

export const getPropertyListWithData =
  (
    getPropertyCardWithData: (data: PropertyData) => JSX.Element,
    getSavedPropertyCardWithData: (data: PropertyData) => JSX.Element
  ) =>
  (data: PropertyResultsData, savedProperties: PropertyData[]) => {
    const { results, pageInfo } = data;

    const propertyCards = results.map(getPropertyCardWithData);
    const savedPropertyCards = savedProperties.map(
      getSavedPropertyCardWithData
    );

    return (
      <PropertyList
        propertyCards={propertyCards}
        savedPropertyCards={savedPropertyCards}
        pageCount={results.length}
        totalCount={pageInfo.totalResultsCount}
      />
    );
  };

export const getPropertiesPageLayoutWithData =
  (
    getPropertyListWithData: (
      data: PropertyResultsData,
      savedProperties: PropertyData[]
    ) => JSX.Element
  ) =>
  ({
    data,
    savedProperties,
    loading,
  }: {
    data?: PropertyResultsData;
    savedProperties: PropertyData[];
    loading: boolean;
  }) => {
    const hasResults = !!data?.results.length;
    const getPropertyList = () => {
      if (loading) {
        return <PropertyListLoading />;
      }

      if (hasResults) {
        return getPropertyListWithData(data, savedProperties);
      }

      return <PropertyListNoResults />;
    };

    return <PropertiesPageLayout propertyList={getPropertyList()} />;
  };
