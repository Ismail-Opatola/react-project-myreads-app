import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const openSearch = props => {
  const { history, to } = props;
  return (
    <button
      className="open-search"
      onClick={() => {
        history.push(to);
      }}
    />
  );
};

openSearch.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default withRouter(openSearch);

// withRouter HOC
// https://stackoverflow.com/questions/42463263/wrapping-a-react-router-link-in-an-html-button

// <Link to="/search">
//  <button className="open-search">Add a book</button>
// </Link>
