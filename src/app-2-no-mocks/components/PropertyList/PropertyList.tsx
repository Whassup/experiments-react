import React, { FunctionComponent, ReactNode } from "react";

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

