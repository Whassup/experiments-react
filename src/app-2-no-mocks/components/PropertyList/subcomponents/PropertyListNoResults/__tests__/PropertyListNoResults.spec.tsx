import { render } from "@testing-library/react";
import { PropertyListNoResults } from "../PropertyListNoResults";

describe("<PropertyListNoResults />", () => {
    beforeEach(() => {
      render(<PropertyListNoResults />);
    });
  
    it("SHOULD render", () => {
      const { asFragment } = render(<PropertyListNoResults />);
      expect(asFragment()).toMatchSnapshot();
    });
  });