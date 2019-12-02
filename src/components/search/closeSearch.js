import React from "react";
import { Redirect } from "react-router-dom";

const closeSearch = ({ CloseSearchPage, redirect }) => {
  if (redirect) return <Redirect to="/" />;

  return (
    <div onClick={() => CloseSearchPage()}>
      <div className="close-search">🡠</div>
    </div>
  );
};

export default closeSearch;
