// Exhibit A: Fat dependencies

import { FunctionComponent } from "react";

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
  saved = false,
  onSaveToggle,
}) => {
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
