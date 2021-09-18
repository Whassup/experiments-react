import { act, renderHook } from '@testing-library/react-hooks';
import { useMutableSavedList } from "../useMutableSavedList";

describe("useMutableSavedList", () => {
    const item = { id: 10 };
    describe("isSaved", () => {
      describe("GIVEN item is saved", () => {
        it("SHOULD return true", () => {
          const { result } = renderHook(() => useMutableSavedList([item], ({id}) => id));
          expect(result.current[1].isSaved(item)).toBe(true);
        })
      });
      describe("GIVEN item is NOT saved", () => {
        it("SHOULD return false", () => {
          const { result } = renderHook(() => useMutableSavedList([] as typeof item[], ({id}) => id));
          expect(result.current[1].isSaved(item)).toBe(false);
        })
      });
    });
  
    describe("toggleSavedItem", () => {
      describe("GIVEN item is saved", () => {
        it("SHOULD remove item", () => {
          const { result } = renderHook(() => useMutableSavedList([item], ({id}) => id));
          act(() => {
            result.current[1].toggleSavedItem(item);
          })
          expect(result.current[1].isSaved(item)).toBe(false);
        })
      });
      describe("GIVEN item is NOT saved", () => {
        it("SHOULD add item", () => {
          const { result } = renderHook(() => useMutableSavedList([] as typeof item[], ({id}) => id));
          act(() => {
            result.current[1].toggleSavedItem(item);
          });
          expect(result.current[1].isSaved(item)).toBe(true);
        })
      });
    });
  
    describe("addSavedItem", () => {
      it("SHOULD add property", () => {
        const { result } = renderHook(() => useMutableSavedList([] as typeof item[], ({id}) => id));
        act(() => {
          result.current[1].addSavedItem(item);
        });
        expect(result.current[1].isSaved(item)).toBe(true);
      })
    });
  
    describe("removeSavedItem", () => {
      it("SHOULD remove property", () => {
        const { result } = renderHook(() => useMutableSavedList([item], ({id}) => id));
        act(() => {
          result.current[1].removeSavedItem(item);
        })
        expect(result.current[1].isSaved(item)).toBe(false);
      })
    });
  });