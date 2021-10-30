import { render, screen } from "@testing-library/react";
import { PropertiesPageLayout } from "../PropertiesPageLayout";


describe("<PropertyCard />", () => {
    const propertyListContent = "Property List"
    const propertyList = <>{propertyListContent}</>;

    describe("render", () => {

        it("should render", () => {
            const {asFragment} = render(<PropertiesPageLayout propertyList={propertyList}/>);
            expect(asFragment()).toMatchSnapshot();
        });
        
        describe("GIVEN propertyList", () => {
            beforeEach(() => {
                render(<PropertiesPageLayout propertyList={propertyList}/>);
            });

            it("SHOULD display property card title", () => {
                const titleElement = screen.getByText(propertyListContent);
                expect(titleElement).toBeInTheDocument();
            });

        });
    });
});