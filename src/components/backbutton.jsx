import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div style={{ paddingLeft: '24px' }}>
      <Button variant="text" size="large" color="secondary" onClick={handleBack}>
        Go To Previous
      </Button>
    </div>
  );
};

export default BackButton;