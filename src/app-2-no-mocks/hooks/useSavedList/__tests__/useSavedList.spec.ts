import {
    addSavedItem,
    isSaved,
    removeSavedItem,
    toggleSavedItem,
    useSavedList
} from "../useSavedList";

const item = { id: 10 };
const getId = ({ id }: typeof item) => id;

describe("isSaved", () => {
  describe("GIVEN item is saved", () => {
    it("SHOULD return true", () => {
      expect(isSaved([item], getId)(item)).toEqual(true);
    });
  });
  describe("GIVEN item is NOT saved", () => {
    it("SHOULD return false", () => {
      expect(isSaved([], getId)(item)).toEqual(false);
    });
  });
});

describe("toggleSavedItem", () => {
  describe("GIVEN item is saved", () => {
    it("SHOULD remove item", () => {
      const result = toggleSavedItem([item], item, getId);
      expect(result).toEqual([]);
    });
  });
  describe("GIVEN item is NOT saved", () => {
    it("SHOULD add item", () => {
      const result = toggleSavedItem([], item, getId);
      expect(result).toEqual([item]);
    });
  });
});

describe("addSavedItem", () => {
  it("SHOULD add property", () => {
    const result = addSavedItem(item)([]);
    expect(result).toEqual([item]);
  });
});

describe("removeSavedItem", () => {
  it("SHOULD remove property", () => {
    const result = removeSavedItem(item, getId)([item]);
    expect(result).toEqual([]);
  });
});

describe("useSavedList", () => {
    it("SHOULD return bound functions", () => {
        const result = useSavedList([[item], jest.fn()], jest.fn());
        expect(result).toEqual(expect.arrayContaining([
            expect.arrayContaining([item]),
            expect.objectContaining({
                isSaved: expect.any(Function),
                removeSavedItem: expect.any(Function),
                addSavedItem: expect.any(Function),
                toggleSavedItem: expect.any(Function),
            })
        ]))
    })
});
