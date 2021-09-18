// Exhibit A: Fat dependencies

import { FunctionComponent } from "react";

interface PropertyAttributesProps {
  beds: number;
  baths: number;
  carSpaces: number;
}

export const PropertyAttributes: FunctionComponent<PropertyAttributesProps> = ({
  beds,
  baths,
  carSpaces,
}) => (
  <div>
    <h2>Property Attributes</h2>
    <dl>
      <dt>Beds</dt>
      <dd aria-label="beds">{beds}</dd>

      <dt>Baths</dt>
      <dd aria-label="baths">{baths}</dd>

      <dt>Carspaces</dt>
      <dd aria-label="carSpaces">{carSpaces}</dd>
    </dl>
  </div>
);

export interface PropertyCardProps {
  title: string;
  href: string;
  attributes?: React.ReactNode;
  onSaveToggle: () => void;
  saved?: boolean;
}

export const PropertyCard: FunctionComponent<PropertyCardProps> = ({
  title,
  attributes,
  href,
  saved,
  onSaveToggle,
} ) => {
  return (
    <article>
      <h1>
        <a href={href}>{title}</a>
      </h1>
      {attributes}
      <a href={href}>View details page</a>
      <button type="button" onClick={onSaveToggle}>
        {saved ? "Remove" : " Save"}
      </button>
    </article>
  );
};

PropertyCard.defaultProps = {
  saved: false
}
