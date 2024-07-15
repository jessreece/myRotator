import { useEffect, useState } from "react";
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { experimentalStyled as styled } from '@mui/material/styles';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow'
import { useRouter } from 'next/navigation'
import { TableBody } from "@mui/material";

interface TeamData{
  teamId: string,
  teamName: string,
  teamDescription: string,
  teamLeadName: string,
  skillsNeededNames: string,
  anySkillsRequired: string,
  anySkillsRequiredNames: string

}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TeamDataComponent = () => {
  const [teamsAndSkills, setTeamsAndSkills] = useState<TeamData[] | null>(null)
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch("/api/teamData")
      const reqJson = await req.json()
      setTeamsAndSkills(reqJson)
    }
    void fetchData()
  }, [setTeamsAndSkills])

  if (teamsAndSkills === null) {
    return (
      <CircularProgress color="inherit" sx={{width: '100%', height: '80%', marginLeft: '48%', marginTop: '8%', marginBottom: '15%'}}/>
    )
  }

  const handleButtonClick = (team: TeamData) => {
    const url = {
      pathname: `/${encodeURIComponent(team.teamName)}`,
      query: { teamName: team.teamName }
    };
    router.push(url.pathname);
  };

  return (
      <Box sx={{ flexGrow: 1, paddingLeft: '15px', paddingRight: '15px', backgroundColor:'#F5F5F5', marginTop: '4px', paddingBottom: '50px'}}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {teamsAndSkills.map((team) => (
            <Grid item xs={2} sm={4} md={4} key={team.teamId}>
              <Item>
              <Button
                key={team.teamId}
                variant="contained"
                sx={{backgroundColor: '#1E49E2', color: '#FFFFFF', width: '100%', fontWeight: 700}}
                onClick={() => handleButtonClick(team)}
              >
                {team.teamName}
              </Button>
                <Table sx={{color: 'rgb(0, 51, 141)'}}>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700}}>Team Description</TableCell>
                      <TableCell>{team.teamDescription}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700}}>Team Lead</TableCell>
                      <TableCell>{team.teamLeadName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700}}>Areas of interest and skills covered</TableCell>
                      <TableCell>{team.skillsNeededNames}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700}}>Required skills</TableCell>
                      <TableCell>
                        {team.anySkillsRequired !== "0"
                          ? team.anySkillsRequiredNames
                          : "No required skills"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Item>
            </Grid>
          ))}
        </Grid>
        <br />
      </Box>
  );
};

export default TeamDataComponent;
