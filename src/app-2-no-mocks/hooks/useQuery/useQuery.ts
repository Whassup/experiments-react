import { useEffect, useRef, useState } from "react";
import { createPropertyResultsData, PropertyResultsData } from "../../../data";

interface useQueryResponse {
    data?: PropertyResultsData
    error?: string,
    loading: boolean
}

function useTimeout(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback)
  
    // Remember the latest callback if it changes.
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])
  
    // Set up the timeout.
    useEffect(() => {
      // Don't schedule if no delay is specified.
      if (delay === null) {
        return
      }
  
      const id = setTimeout(() => savedCallback.current(), delay)
  
      return () => clearTimeout(id)
    }, [delay])
  }

export const useQuery = (query: "GetPropertyResults"): useQueryResponse => {
    const [{ data, error, loading}, setState ] = useState<useQueryResponse>({ data: undefined, error: undefined, loading: false });

    useTimeout(() => {
        switch(query) {
            case "GetPropertyResults":
            setState({ data: createPropertyResultsData(), error: undefined, loading: false });
            break;
        }
    }, 2000);

    return { data, error, loading};
}