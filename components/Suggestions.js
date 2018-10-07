import React, { Component } from "react";

TODO: "write characteristics down below according to items properties";

const Suggestions = props => {
  const options = props.results.map(r => <li key={r.id}>{r.name}</li>);
  return <ul>{options}</ul>;
};

export default Suggestions;
