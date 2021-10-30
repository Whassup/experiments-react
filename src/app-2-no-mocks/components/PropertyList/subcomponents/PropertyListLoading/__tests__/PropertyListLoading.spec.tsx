import { render } from "@testing-library/react";
import { PropertyListLoading } from "../PropertyListLoading";

describe("<PropertyListNoResults />", () => {
    beforeEach(() => {
      render(<PropertyListLoading />);
    });
  
    it("SHOULD render", () => {
      const { asFragment } = render(<PropertyListLoading />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
  