import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

interface Props {
  openToRotate: boolean;
}

export default function TeamRotate({ openToRotate }: Props) {
  const [wantToRotate, setWantToRotate] = useState<boolean>(openToRotate);

  const handleChange = async (event: SelectChangeEvent) => {
    const { value } = event.target;
    const wantToRotateValue: boolean = value === 'true'; // Convert string value to boolean

    try {
      // Send a POST request to save the user rotation
      await fetch("/api/saveRotation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rotation: wantToRotateValue }), // Send the selected rotation preference
      });

      // Update local state
      setWantToRotate(wantToRotateValue);
    } catch (error) {
      console.error("Error saving rotation:", error);
    }
  };

  return (
    <Box sx={{ width: '100%'}}>
      <FormControl fullWidth>
        <InputLabel>
          Open To Rotate?
        </InputLabel>
        <Select
          value={wantToRotate ? 'true' : 'false'} // Convert boolean value to string
          sx={{ paddingTop: '5px'}}
          onChange={handleChange}
          input={<OutlinedInput label="Open To Rotate?" />}
        >
          <MenuItem value={'true'}>Yes</MenuItem>
          <MenuItem value={'false'}>No</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
