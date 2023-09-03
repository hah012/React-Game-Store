import React from 'react';

const ResultsHeader = ({ searchTerm }) => {
  return (
    <div>
      <h1 >{searchTerm}</h1>
    </div>
  );
};

export default ResultsHeader;