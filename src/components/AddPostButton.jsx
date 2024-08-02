import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";

const StyledFab = styled(Fab)({
  position: 'fixed',
  bottom: 16,
  right: 16,
});

const AddPostButton = ({ onClick }) => {
  return (
    <StyledFab color="primary" aria-label="add" onClick={onClick}>
      <AddIcon />
    </StyledFab>
  );
};

export default AddPostButton;
