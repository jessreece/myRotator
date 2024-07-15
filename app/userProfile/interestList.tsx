import { useEffect, useState } from "react";
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

interface Interest {
  skill: string;
}

interface UserInterest {
  personId: string;
  skillId: string;
  skillName: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const UserInterestList: React.FC = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [fullInterests, setFullInterests] = useState<Interest[]>([]);
  const [userInterests, setUserInterests] = useState<UserInterest[]>([]);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const req = await fetch("/api/skills");
        const skillsArray = await req.json();
        setFullInterests(skillsArray);
        const reqTwo = await fetch("/api/userInterests");
        const userInterestsArray = await reqTwo.json();
        setUserInterests(userInterestsArray);

        // Set the initially selected skills from userInterests
        setSelectedInterests(userInterestsArray.map((userInterest: { skillName: any; }) => userInterest.skillName));
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchInterests();
  }, []); // Run once when the component mounts

  const handleChange = async (event: SelectChangeEvent<typeof selectedInterests>) => {
    const { value } = event.target;

    setSelectedInterests(value as string[]);

    try {
      // Send a POST request to save the selected interests
      await fetch("/api/saveUserInterests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interests: value }), // Send the selected interests array
      });
    } catch (error) {
      console.error("Error saving user interests:", error);
    }
  };

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-multiple-checkbox-label">Interests</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedInterests}
          onChange={handleChange}
          input={<OutlinedInput label="Interests" />}
          renderValue={(selected) => (selected as string[]).join(', ')}
          MenuProps={MenuProps}
        >
          {fullInterests.map((skill) => (
            <MenuItem key={skill.skill} value={skill.skill}>
              <Checkbox checked={selectedInterests.includes(skill.skill)} />
              <ListItemText primary={skill.skill} />
            </MenuItem>
          ))}
        </Select>

      </FormControl>
    </div>
  );
};

export default UserInterestList;
