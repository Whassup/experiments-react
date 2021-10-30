import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FatPropertyCard } from "../FatPropertyCard";

export const data = {
    property : {
        id: "123",
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
        describe("GIVEN property data", () => {
            beforeEach(() => {
                render(<FatPropertyCard data={data} onSaveToggle={() => {}}/>);
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

        describe("GIVEN property is not saved", () => {
            beforeEach(() => {
                render(<FatPropertyCard data={data} saved={false} onSaveToggle={() => {}} />);
            });
            it("SHOULD display save button", () => {
                const button = screen.getByRole("button", { name: /save/i});
                expect(button).toBeInTheDocument();
            });

            it("SHOULD NOT display remove (unsave) button", () => {
                const button = screen.queryByRole("button", { name: /remove/i});
                expect(button).not.toBeInTheDocument();
            });
        });

        describe("GIVEN property is saved", () => {
            beforeEach(() => {
                render(<FatPropertyCard data={data} saved={true} onSaveToggle={() => {}} />);
            });
            it("SHOULD NOT display save button", () => {
                const button = screen.queryByRole("button", { name: /save/i});
                expect(button).not.toBeInTheDocument();
            });

            it("SHOULD display remove (unsave) button", () => {
                const button = screen.getByRole("button", { name: /remove/i});
                expect(button).toBeInTheDocument();
            });
        });
    });

    describe("behaviours", () => {
        describe("WHEN user clicks save/remove button", () => {
            it("SHOULD call onSaveToggle", () => {
                const onSaveToggle = jest.fn();
                render(<FatPropertyCard data={data} onSaveToggle={onSaveToggle} />);
                const button = screen.getByRole("button", { name: /save/i});
                userEvent.click(button);
                expect(onSaveToggle).toHaveBeenCalledTimes(1);
            });
        });
    });
});