import React from "react";
import { Link } from "react-router-dom";

const closeSearch = ({ CloseSearchPage }) => {
  return (
    <div>
      <Link 
        to="/" 
        className="close-search" 
        onClick={(e) => CloseSearchPage(e)} />
    </div>
  );
};

export default closeSearch;
