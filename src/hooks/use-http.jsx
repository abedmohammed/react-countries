import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const sendRequest = useCallback(async (requestURL, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestURL);

      if (!response.ok || response.status === 503) {
        throw new Error(response.status);
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
};

export default useHttp;
