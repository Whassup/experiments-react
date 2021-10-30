// Exhibit A: Fat dependencies

import { FunctionComponent } from "react";
import { PropertyData } from "../../../data";


interface FatPropertyCardProps {
    data: PropertyData;
    onSaveToggle: (propertyData: PropertyData) => void;
    saved?: boolean;
}

export const FatPropertyCard: FunctionComponent<FatPropertyCardProps> = ({ data, saved, onSaveToggle}) => {
    const { property, propertyDetailsPage } = data;
    const { address: { shortAddressDisplay }, attributes: { beds, baths, carSpaces } } = property;
    const { slug } = propertyDetailsPage;

    return <article data-testid={`card-${property.id}${saved ? "--saved" : ""}`} >
        <h1><a href={slug}>{shortAddressDisplay}</a></h1>
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
        <a href={slug}>View details page</a>
        <button data-testid={`save-${property.id}`} type="button" onClick={() => onSaveToggle(data)}>{  saved ? "Remove" : "Save" }</button>
    </article>
}

FatPropertyCard.defaultProps = {
    saved : false
}