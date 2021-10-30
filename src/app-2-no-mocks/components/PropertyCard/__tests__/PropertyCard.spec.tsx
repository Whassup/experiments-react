import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PropertyCard } from "../PropertyCard";


describe("<PropertyCard />", () => {
    const title = "7 Westview Court Springvale South";
    const href = "http://localhost/7-westview-court-springvale-south";
    const attributesContent = "Beds 4, Baths 3, Carspaces 4";
    const Attributes = () => <>{attributesContent}</>;

    describe("render", () => {

        describe("GIVEN props for title, href and attributes", () => {
            beforeEach(() => {
                render(<PropertyCard title={title} href={href} attributes={<Attributes />} onSaveToggle={() => {}} />);
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


        describe("GIVEN property is not saved", () => {
            beforeEach(() => {
                render(<PropertyCard title={title} href={href} saved={false} onSaveToggle={() => {}} />);
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
                render(<PropertyCard title={title} href={href} saved={true} onSaveToggle={() => {}} />);
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
                render(<PropertyCard title={title} href={href} onSaveToggle={onSaveToggle} />);
                const button = screen.getByRole("button", { name: /save/i});
                userEvent.click(button);
                expect(onSaveToggle).toHaveBeenCalledTimes(1);
            });
        });
    });
});
