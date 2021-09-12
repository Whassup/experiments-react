import { render, screen } from "@testing-library/react";
import { createPropertyData } from "../data";
import { PropertyAttributes, PropertyCard, PropertyCardWithData } from "../PropertyCard";


describe("<PropertyCardWithData />", () => {
    it("SHOULD render with mapped data", () => {
        const { asFragment } = render(<PropertyCardWithData data={createPropertyData()} />);
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("<PropertyCard />", () => {
    describe("render", () => {
        const title = "7 Westview Court Springvale South";
        const href = "http://localhost/7-westview-court-springvale-south";
        const attributesContent = "Beds 4, Baths 3, Carspaces 4";
        const Attributes = () => <>{attributesContent}</>;

        beforeEach(() => {
            render(<PropertyCard title={title} href={href} attributes={<Attributes />} />);
        });

        it("SHOULD display property card title", () => {
            const titleElement = screen.getByText(title);
            expect(titleElement).toBeInTheDocument();
        });

        it("title SHOULD link to href", () => {
            const link = screen.queryByRole("link", { name: title });
            const href = (link instanceof HTMLAnchorElement && link.href) ?? "";
            expect(href).toBe(href);
        });

        it("view details SHOULD link to href", () => {
            const link = screen.queryByRole("link", { name: "View details page" });
            const href = (link instanceof HTMLAnchorElement && link.href) ?? "";
            expect(href).toBe(href);
        });

        it("SHOULD display attributes", () => {
            const attributesElement = screen.getByText(attributesContent);
            expect(attributesElement).toBeInTheDocument();
        });
    });
});

describe("<PropertyAttributes />", () => {
    describe("render", () => {
        const beds = 0;
        const baths = 1;
        const carspaces = 2;
        beforeEach(() => {
            render(<PropertyAttributes beds={beds} baths={baths} carSpaces={carspaces} />);
        });

        it("SHOULD display beds count", () => {
            const bedsCount = screen.getByRole("definition", { name: "beds" });
            expect(bedsCount).toHaveTextContent(String(beds));
        });

        it("SHOULD display baths count", () => {
            const bathsCount = screen.getByRole("definition", { name: "baths" });
            expect(bathsCount).toHaveTextContent(String(baths));
        });

        it("SHOULD display carSpaces count", () => {
            const carSpacesCount = screen.getByRole("definition", { name: "carSpaces" });
            expect(carSpacesCount).toHaveTextContent(String(carspaces));
        });
    });
});