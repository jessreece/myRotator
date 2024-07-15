import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow'
import { Button, Divider, TableBody } from "@mui/material";

interface Availabilities {
  grade: string,
  quantity: number
}

interface Skill {
  skill: string,
  needed: boolean
}

interface LearningPathAndSkill {
  skill: string,
  learningPaths: LearningPaths[]
}

interface LearningPaths {
  resourceLink: string,
  resourceName: string,
  resourceType: string
}
interface IndividualData {
  id: string,
  name: string,
  description: string,
  teamLeadName: string,
  skillNames: Skill[],
  availabilities : Availabilities[]
  peopleNames: string[],
  learningPaths: LearningPathAndSkill[]

}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const DynamicTeam = ({ teamName }: { teamName?: string }) => {
  const [teamDetails, setTeamDetails] = useState<IndividualData | null>(null);

  useEffect(() => {
    const fetchTeamDetails = async (teamName: string): Promise<void> => {
      try {
        const response = await fetch(`/api/individualTeamDetails?${encodeURIComponent(teamName)}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch team details: ${response.statusText}`);
        }
        const data = await response.json();
        setTeamDetails(data);
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
    };
       

    if (teamName) {
      void fetchTeamDetails(teamName);
    }
  }, [teamName]);
  

  if (teamDetails === null) {
    return (
      <CircularProgress color="inherit" sx={{width: '100%', height: '80%', marginLeft: '48%', marginTop: '8%', marginBottom: '15%'}}/>
    )
  }

  console.log(teamDetails)

  return (
    <div>
        <Box sx={{ width: '100%', backgroundColor: "#F5F5F5", paddingBottom: '50px', paddingTop: '50px'}}>
          <Box sx={{ width: '40%', backgroundColor: '#00338D', marginLeft: '30%', borderRadius: '5%', padding: '20px', border: '5px solid #00338D', textAlign: 'center'}}>
              <Typography sx={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF'}}>
                { teamDetails.name }
              </Typography>
              <Table sx={{ marginTop: '20px', backgroundColor: '#FFFFFF', borderRadius: '5%'}}>
                <TableBody>
                  <TableRow sx={{ borderTop: '5px solid #00338D'}}>
                    <TableCell sx={{width: '30%', borderRight: '2px solid #00338D', borderBottom: '2px solid #00338D'}}>
                      <Typography sx={{ fontWeight: 700}}>
                        Team Description
                      </Typography>
                    </TableCell>
                    <TableCell sx={{borderBottom: '2px solid #00338D'}}>
                      <Typography>
                        { teamDetails.description }
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell sx={{width: '30%', borderRight: '2px solid #00338D', borderBottom: '2px solid #00338D'}}>
                      <Typography sx={{ fontWeight: 700}}>
                        Team Lead Name
                      </Typography>
                    </TableCell>
                    <TableCell sx={{borderBottom: '2px solid #00338D'}}>
                      <Typography>
                        { teamDetails.teamLeadName }
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{width: '30%', borderRight: '2px solid #00338D', borderBottom: '2px solid #00338D'}}>
                      <Typography sx={{ fontWeight: 700}}>
                        Skills and Interest Areas covered by the team
                      </Typography>
                    </TableCell>
                    <TableCell sx={{borderBottom: '2px solid #00338D'}}>
                      {teamDetails.skillNames.map((skill, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography>{skill.skill}</Typography>
                          <Typography>{skill.needed ? 'Required skill' : 'Not required'}</Typography>
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{width: '30%', borderRight: '2px solid #00338D', borderBottom: '2px solid #00338D'}}>
                      <Typography sx={{ fontWeight: 700}}>
                        Availability by Employee Grades
                      </Typography>
                    </TableCell>
                    <TableCell sx={{borderBottom: '2px solid #00338D'}}>
                      {teamDetails.availabilities == null ? (
                        <Typography>There are currently no availabilities on this team</Typography>
                      ) : (
                        teamDetails.availabilities.map((available, index) => (
                          <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>{available.grade}</Typography>
                            <Typography>Number of spaces: {available.quantity}</Typography>
                          </div>
                        ))
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{width: '30%', borderRight: '2px solid #00338D', borderBottom: '2px solid #00338D'}}>
                      <Typography sx={{ fontWeight: 700}}>
                        Names of individuals within the team
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '2px solid #00338D'}}>
                    {teamDetails.peopleNames[0] === "NULL" ? <Typography>This team is currently empty</Typography> : (
                      <ul>
                        {teamDetails.peopleNames.map((person, index) => (
                          <Typography key={index} sx={{ marginLeft: '-40px'}}>
                            {person}
                          </Typography>
                        ))}
                      </ul>
                    )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <br />
          </Box>
          <br />
          <br />
          <Divider />
          <br />
          <Typography sx={{ fontSize: '22px', fontWeight: 700, textAlign: 'center', color: '#00338D' }}>Recommended Learning Based on Skills/Interest Covered by the Team:</Typography>
          <br />
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={6}>
                {teamDetails.learningPaths.slice(0, Math.ceil(teamDetails.learningPaths.length / 2)).map((learning, index) => (
                    <Grid key={index} sx={{paddingBottom: '15px'}}>
                        <Item>
                            <Typography sx={{backgroundColor: '#00338D', color: '#FFFFFF', padding: '3px'}}>{learning.skill}</Typography>
                            <Divider />
                            <Table sx={{color: 'rgb(0, 51, 141)'}}>
                              <TableBody>
                                {learning.learningPaths.map((resources, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ fontWeight: 700}}>Resource Name</TableCell>
                                        <TableCell>
                                            <Button href={resources.resourceLink} target="_blank">{resources.resourceName}</Button>
                                            <br />
                                            <Typography sx={{ paddingLeft: '8px'}}>
                                                Resource Type: {resources.resourceType}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                        </Item>
                    </Grid>
                ))}
            </Grid>
            <Grid item xs={6}>
                {teamDetails.learningPaths.slice(Math.ceil(teamDetails.learningPaths.length / 2)).map((learning, index) => (
                    <Grid key={index} sx={{paddingBottom: '15px'}}>
                        <Item>
                            <Typography sx={{backgroundColor: '#00338D', color: '#FFFFFF', padding: '3px'}}>{learning.skill}</Typography>
                            <Divider />
                            <Table sx={{color: 'rgb(0, 51, 141)'}}>
                                <TableBody>
                                  {learning.learningPaths.map((resources, index) => (
                                      <TableRow key={index}>
                                          <TableCell sx={{ fontWeight: 700}}>Resource Name</TableCell>
                                          <TableCell>
                                              <Button href={resources.resourceLink} target="_blank">{resources.resourceName}</Button>
                                              <br />
                                              <Typography sx={{ paddingLeft: '8px'}}>
                                                  Resource Type: {resources.resourceType}
                                              </Typography>
                                          </TableCell>
                                      </TableRow>
                                  ))}
                                </TableBody>
                            </Table>
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Grid>
        </Box>

    </div>
  );
};

export default DynamicTeam;
