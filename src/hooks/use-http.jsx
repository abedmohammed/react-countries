import React, { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const sendRequest = useCallback(async (requestURL, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestURL);

      if (response.status === 503) {
        throw new Error({
          description: "Countries API seems to be currently unavailable 😣",
          status: response.status,
        });
      }

      if (!response.ok) {
        throw new Error({
          status: response.status,
        });
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(
        err.description ||
          "Oops! Something went wrong! Please try again later... 😓"
      );
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
};

export default useHttp;
