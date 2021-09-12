// Exhibit A: Fat dependencies

import { FunctionComponent } from "react";
import { data } from "./data";


interface PropertyCardProps {
    data: typeof data;
}

export const FatPropertyCard: FunctionComponent<PropertyCardProps> = ({ data }) => {
    const { property, propertyDetailsPage } = data;
    const { address: { shortAddressDisplay }, attributes: { beds, baths, carSpaces } } = property;
    const { slug } = propertyDetailsPage;

    return <article>
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
    </article>
}


export default function FatPropertyCardWithData () {
    return <FatPropertyCard data={data} />
}