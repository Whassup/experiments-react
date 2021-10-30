import { FunctionComponent } from "react";

interface PropertyAttributesProps {
  beds: number;
  baths: number;
  carSpaces: number;
  expanded: boolean;
  onExpandToggle: () => void;
}

export const PropertyAttributes: FunctionComponent<PropertyAttributesProps> = ({
  beds,
  baths,
  carSpaces,
  expanded = true,
  onExpandToggle,
}) => (
  <div>
    <h2>
      Property Attributes <button onClick={onExpandToggle}>{expanded ? "Hide" : "Show"} </button>
    </h2>
    {expanded && (
      <dl>
        <dt>Beds</dt>
        <dd aria-label="beds">{beds}</dd>

        <dt>Baths</dt>
        <dd aria-label="baths">{baths}</dd>

        <dt>Carspaces</dt>
        <dd aria-label="carSpaces">{carSpaces}</dd>
      </dl>
    )}
  </div>
);
