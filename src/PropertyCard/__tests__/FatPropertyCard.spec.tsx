import { render, screen } from "@testing-library/react";
import { FatPropertyCard } from "../FatPropertyCard";

export const data = {
    property : {
        address: {
            shortAddressDisplay: "7 Westview Court, Springvale South",
        },
        attributes: {
            beds: 1,
            baths: 2,
            carSpaces: 3
        }
    },
    propertyDetailsPage: {
        slug: "details/7-westview-court-springvale-south-3172-vic"
    }
};


describe("<FatPropertyCard />", () => {
    describe("render", () => {
        beforeEach(() => {
            render(<FatPropertyCard data={data} />);
        });


        it("SHOULD display property shortAddress as property card title", () => {
            const title = screen.getByText(data.property.address.shortAddressDisplay);
            expect(title).toBeInTheDocument();
        });

        it("title SHOULD link to propertyDetailsPage", () => {
            const link = screen.queryByRole("link", { name: data.property.address.shortAddressDisplay});
            const href = (link instanceof HTMLAnchorElement && link.href) ?? "";
            expect(href).toBe(`http://localhost/${data.propertyDetailsPage.slug}`);
        });

        it("view details SHOULD link to propertyDetailsPage", () => {
            const link = screen.queryByRole("link", { name: "View details page"});
            const href = (link instanceof HTMLAnchorElement && link.href) ?? "";
            expect(href).toBe(`http://localhost/${data.propertyDetailsPage.slug}`);
        });

        it("SHOULD display beds count", () => {
            const bedsCount = screen.getByRole("definition", { name: "beds" });
            expect(bedsCount).toHaveTextContent("1");
        });

        it("SHOULD display baths count", () => {
            const bathsCount = screen.getByRole("definition", { name: "baths" });
            expect(bathsCount).toHaveTextContent("2");
        });

        it("SHOULD display carSpaces count", () => {
            const carSpacesCount = screen.getByRole("definition", { name: "carSpaces" });
            expect(carSpacesCount).toHaveTextContent("3");
        });
    });
});