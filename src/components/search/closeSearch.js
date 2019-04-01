import React from "react";
import { Link } from "react-router-dom";

const closeSearch = () => {
  return (
    <div>
      <Link to="/" className="close-search" />
    </div>
  );
};

export default closeSearch;
