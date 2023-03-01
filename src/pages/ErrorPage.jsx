import React, { useEffect, useState } from "react";
import { useRouteError } from "react-router-dom";

import HeaderBar from "../components/HeaderBar";

import "./ErrorPage.scss";

const ErrorPage = () => {
  const error = useRouteError();
  const [message, setMessage] = useState("Page does not exist...");

  useEffect(() => {
    if (+error.message === 404) {
      setMessage("Something went wrong... Please try again later.");
    }

    if (+error.essage === 503) {
      setMessage(
        "The countries API seems to be down... Please try again later."
      );
    }
  }, [error]);

  return (
    <>
      <HeaderBar />
      <main className="error">
        <p className="error__emoji">😔</p>
        <h2>An error has occured!</h2>
        <p className="error__message">{message}</p>
      </main>
    </>
  );
};

export default ErrorPage;
