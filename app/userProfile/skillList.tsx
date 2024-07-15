import { useEffect, useState } from "react";
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

interface Skill {
  skill: string;
}

interface UserSkill {
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

const UserSkillList: React.FC = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [fullSkills, setFullSkills] = useState<Skill[]>([]);
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const req = await fetch("/api/skills");
        const skillsArray = await req.json();
        setFullSkills(skillsArray);
        const reqTwo = await fetch("/api/userSkills");
        const userSkillsArray = await reqTwo.json();
        setUserSkills(userSkillsArray);

        // Set the initially selected skills from userSkills
        setSelectedSkills(userSkillsArray.map((userSkill: { skillName: any; }) => userSkill.skillName));
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []); // Run once when the component mounts

  const handleChange = async (event: SelectChangeEvent<typeof selectedSkills>) => {
    const { value } = event.target;

    setSelectedSkills(value as string[]);

    try {
      // Send a POST request to save the selected skills
      await fetch("/api/saveUserSkills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skills: value }), // Send the selected skills array
      });
    } catch (error) {
      console.error("Error saving user skills:", error);
    }
  };

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-multiple-checkbox-label">Skills</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedSkills}
          onChange={handleChange}
          input={<OutlinedInput label="Skills" />}
          renderValue={(selected) => (selected as string[]).join(', ')}
          MenuProps={MenuProps}
        >
          {fullSkills.map((skill) => (
            <MenuItem key={skill.skill} value={skill.skill}>
              <Checkbox checked={selectedSkills.includes(skill.skill)} />
              <ListItemText primary={skill.skill} />
            </MenuItem>
          ))}
        </Select>

      </FormControl>
    </div>
  );
};

export default UserSkillList;
