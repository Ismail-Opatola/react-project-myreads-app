import React from "react";

const bookShelfTitle = ({ book }) => {
  return (
    <div>
      <h2>{book.shelf}</h2>
    </div>
  );
};

export default bookShelfTitle;

