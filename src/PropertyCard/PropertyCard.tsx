// Exhibit A: Fat dependencies

import { FunctionComponent } from "react";
import { data } from "./data";

interface PropertyAttributesProps {
    beds: number;
    baths: number;
    carSpaces: number;
}

export const PropertyAttributes: FunctionComponent<PropertyAttributesProps> = ({ beds, baths, carSpaces}) => (<div>
    <h2>Property Attributes</h2>
    <dl>
        <dt>Beds</dt>
        <dd aria-label="beds">{beds}</dd>

        <dt>Baths</dt>
        <dd aria-label="baths">{baths}</dd>

        <dt>Carspaces</dt>
        <dd aria-label="carSpaces">{carSpaces}</dd>
    </dl>
</div>);

interface PropertyCardProps {
    title: string;
    href: string;
    attributes: React.ReactNode;
}

export const PropertyCard: FunctionComponent<PropertyCardProps> = ({ title, attributes, href }) => {
    return <article>
        <h1><a href={href}>{title}</a></h1>
        { attributes }
        <a href={href}>View details page</a>
    </article>
}


interface PropertyCardWithDataProps {
    data: typeof data;
}
export const PropertyCardWithData: FunctionComponent<PropertyCardWithDataProps> = ({ data }) => {
    const { property, propertyDetailsPage } = data;
    const { address: { shortAddressDisplay }, attributes: { beds, baths, carSpaces } } = property;
    const { slug } = propertyDetailsPage;

    return <PropertyCard title={shortAddressDisplay} href={slug} attributes={<PropertyAttributes beds={beds} baths={baths} carSpaces={carSpaces} />} />
}