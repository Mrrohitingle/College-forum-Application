import { SearchTwoTone } from "@mui/icons-material";
import { useTheme, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import SearchModal from "./SearchModel";
import CustomButton from "../../Components/Post/CustomButton";
import { useDispatch } from "react-redux";
import { setSearchModal } from "../../states";

const Search = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <>
      <CustomButton
        startIcon={<SearchTwoTone />}
        onClick={() => dispatch(setSearchModal())}
        endIcon={
          <Box
            sx={{
              border: `1px solid ${theme.palette.secondary.main}`,
              px: 0.7,
              textTransform: "capitalize",
              borderRadius: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 400,
                // fontFamily: theme.typography.fontFamily,
              }}
            >
              Ctrl+K
            </Typography>
          </Box>
        }
        disableRipple
      >
        Search...
      </CustomButton>
      <SearchModal />
    </>
  );
};
export default Search;
