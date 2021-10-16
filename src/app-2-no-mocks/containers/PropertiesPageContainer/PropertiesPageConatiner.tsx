import { FunctionComponent, useEffect, useState } from "react";
import { PropertyData, PropertyResultsData } from "../../../data";
import { PropertiesPageLayout } from "../../components/PropertiesPageLayout/PropertiesPageLayout";
import {
    PropertyCard,
    PropertyCardProps
} from "../../components/PropertyCard/PropertyCard";
import { PropertyAttributes } from "../../components/PropertyCard/subcomponents/PropertyAttributes";
import { PropertyList } from "../../components/PropertyList/PropertyList";
import { PropertyListLoading } from "../../components/PropertyList/subcomponents/PropertyListLoading/PropertyListLoading";
import { PropertyListNoResults } from "../../components/PropertyList/subcomponents/PropertyListNoResults/PropertyListNoResults";
import { useQuery } from "../../hooks/useQuery/useQuery";
import { useSavedList } from "../../hooks/useSavedList/useSavedList";

const publishErrorToMonitoringTools = (error: any) => {
  console.error(error);
  // send errors to your monitoring tools here
};

const getPropertyListWithData = (
  data: PropertyResultsData,
  isSaved: (property: PropertyData) => boolean,
  toggleSavedItem: (property: PropertyData) => void,
  removeSavedItem: (property: PropertyData) => void,
  savedProperties: PropertyData[]
) =>
  data
    ? (propertyList: typeof PropertyList) => {
        const { results, pageInfo } = data;

        const dataToPropertyCardProps =
          (data: PropertyData) =>
          ({
            onSaveToggle,
            saved,
          }: Pick<
            PropertyCardProps,
            "onSaveToggle" | "saved"
          >): PropertyCardProps => {
            const { property, propertyDetailsPage } = data;
            const {
              address: { shortAddressDisplay },
              attributes: { beds, baths, carSpaces },
            } = property;
            const { slug } = propertyDetailsPage;

            return {
              title: shortAddressDisplay,
              href: slug,
              attributes: (
                <PropertyAttributes
                  beds={beds}
                  baths={baths}
                  carSpaces={carSpaces}
                />
              ),
              onSaveToggle,
              saved,
            };
          };
        const propertyCards = results.map((data) => (
          <PropertyCard
            key={data.property.id}
            {...dataToPropertyCardProps(data)({
              onSaveToggle: () => toggleSavedItem(data),
              saved: isSaved(data),
            })}
          />
        ));
        const savedPropertyCards = savedProperties.map((data) => (
          <PropertyCard
            key={data.property.id}
            {...dataToPropertyCardProps(data)({
              onSaveToggle: () => removeSavedItem(data),
              saved: true,
            })}
          />
        ));
        return (
          <PropertyList
            propertyCards={propertyCards}
            savedPropertyCards={savedPropertyCards}
            pageCount={results.length}
            totalCount={pageInfo.totalResultsCount}
          />
        );
      }
    : () => <></>;

export const PropertiesPageContainer: FunctionComponent = () => {
  const [savedProperties, { isSaved, removeSavedItem, toggleSavedItem }] =
    useSavedList(useState<PropertyData[]>([]), (d) => d.property.id);
  const { data, loading, error } = useQuery("GetPropertyResults");
  const hasResults = data?.results.length;

  useEffect(() => {
    publishErrorToMonitoringTools(error);
  }, [error]);

  const getPropertyList = () => {
    if (loading) {
      return <PropertyListLoading />;
    }

    if (hasResults) {
      return getPropertyListWithData(data, isSaved, toggleSavedItem,removeSavedItem, savedProperties);
    }

    return <PropertyListNoResults />;
  };

  return <PropertiesPageLayout propertyList={getPropertyList()} />;
};
