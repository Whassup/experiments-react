import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { PropertyAttributes } from "../PropertyAttributes";

describe("<PropertyAttributes />", () => {
  const beds = 0;
  const baths = 1;
  const carspaces = 2;

  describe("render", () => {
    describe("GIVEN property is expanded", () => {
      beforeEach(() => {
        render(
          <PropertyAttributes
            beds={beds}
            baths={baths}
            carSpaces={carspaces}
            expanded={true}
            onExpandToggle={() => {}}
          />
        );
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
        const carSpacesCount = screen.getByRole("definition", {
          name: "carSpaces",
        });
        expect(carSpacesCount).toHaveTextContent(String(carspaces));
      });
    });

    describe("GIVEN property is NOT expanded", () => {
      beforeEach(() => {
        render(
          <PropertyAttributes
            beds={beds}
            baths={baths}
            carSpaces={carspaces}
            expanded={false}
            onExpandToggle={() => {}}
          />
        );
      });

      it("SHOULD NOT display property attributes", () => {
        const attributes = screen.queryAllByRole("definition", {
          name: /carSpaces|baths|beds/,
        });
        expect(attributes.length).toBe(0);
      });
    });
  });

  describe("behaviours", () => {
    describe("WHEN expand button is pressed", () => {
      const PropertyAttributesWithExpandedState = ({
        intialExpanded = true,
      }) => {
        const [expanded, setExpanded] = useState(intialExpanded);
        return (
          <PropertyAttributes
            beds={beds}
            baths={baths}
            carSpaces={carspaces}
            expanded={expanded}
            onExpandToggle={() => setExpanded((x) => !x)}
          />
        );
      };
      describe("GIVEN card is expanded", () => {
        beforeEach(() => {
          render(<PropertyAttributesWithExpandedState />);
        });

        it("SHOULD NOT display property attributes", () => {
          const expandBtn = screen.getByRole("button", { name: /show|hide/i });
          userEvent.click(expandBtn);
          const attributes = screen.queryAllByRole("definition", {
            name: /carSpaces|baths|beds/,
          });
          expect(attributes.length).toBe(0);
        });

        describe("AND expand button is pressed again", () => { 
            it("SHOULD display property attributes", () => {
                const expandBtn = screen.getByRole("button", { name: /show|hide/i });
                userEvent.click(expandBtn);
                userEvent.click(expandBtn);
                const attributes = screen.queryAllByRole("definition", {
                  name: /carSpaces|baths|beds/,
                });
                expect(attributes.length).toBe(3);
              });
        });
      });

      describe("GIVEN card is NOT expanded", () => {
        beforeEach(() => {
          render(
            <PropertyAttributesWithExpandedState intialExpanded={false} />
          );
        });

        it("SHOULD display property attributes", () => {
          const expandBtn = screen.getByRole("button", { name: /show|hide/i });
          userEvent.click(expandBtn);
          const attributes = screen.queryAllByRole("definition", {
            name: /carSpaces|baths|beds/,
          });
          expect(attributes.length).toBe(3);
        });
      });
    });
  });
});
