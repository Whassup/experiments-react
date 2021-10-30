import { FunctionComponent, useEffect, useState } from "react";
import { PropertyData } from "../../../data";
import { useQuery } from "../../hooks/useQuery/useQuery";
import { useSavedList } from "../../hooks/useSavedList/useSavedList";
import {
  getPropertiesPageLayoutWithData,
  getPropertyAttributesWithData,
  getPropertyCardWithData,
  getPropertyListWithData
} from "./withDataHelpers";

const publishErrorToMonitoringTools = (error: any) => {
  console.error(error);
  // send errors to your monitoring tools here
};

export const PropertiesPageContainer: FunctionComponent = () => {
  const [savedProperties, { isSaved, removeSavedItem, toggleSavedItem }] =
    useSavedList(useState<PropertyData[]>([]), (d) => d.property.id);
  const { data, loading, error } = useQuery("GetPropertyResults");

  useEffect(() => {
    publishErrorToMonitoringTools(error);
  }, [error]);

  return getPropertiesPageLayoutWithData(
    getPropertyListWithData(
      getPropertyCardWithData(
        getPropertyAttributesWithData,
        toggleSavedItem,
        isSaved
      ),
      getPropertyCardWithData(
        getPropertyAttributesWithData,
        removeSavedItem,
        () => true
      )
    )
  )({data, savedProperties, loading});
};
