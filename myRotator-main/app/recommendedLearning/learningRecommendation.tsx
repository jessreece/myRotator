import { useEffect, useState } from "react";
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow'
import { Divider, TableBody } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

interface LearningPath {
  resource_name: string;
  resource_link: string;
  resource_type: string;
}

interface RequiredSkills {
  skillName: string;
  teamsCount: number;
  teamsForSkill: string[];
  learningPaths: LearningPath[]; // Array of LearningPath objects
}

interface SkillInterests {
  skillName: string;
  learningPaths: LearningPath[];
  teamNames: string[];
}


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const LongTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: '100%',
    padding: '5px',
    fontWeight: 500,
    fontSize: '14px',
  },
});

const LearningRecs = () => {
  const [reqSkills, setReqSkills] = useState<RequiredSkills[] | null>(null)
  const [interestSkills, setInterestSkills] = useState<SkillInterests[] | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch("/api/mostRequiredSkills")
        const reqJson = await req.json()
        setReqSkills(reqJson)
        const reqTwo = await fetch("/api/learningByInterest")
        const reqTwoJson = await reqTwo.json()
        setInterestSkills(reqTwoJson)
      } catch (error) {
        console.error("error fetching learning paths")
      }
    }
    fetchData()
  }, [])

  return (

    <Box sx={{ width: '100%', backgroundColor: '#F5F5F5', paddingBottom: '50px' }}>
        <br />
        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <Box sx={{ backgroundColor: '#510DBC', padding: '15px', color: '#FFFFFF', marginBottom: '20px', borderRadius: 5}}>
              <LongTooltip title="Recommended learning for skills that are most frequently required by teams which you do not have : weighted with necessity of the skill" arrow>
                <Typography sx={{ textAlign: 'center', fontWeight: 700 }}>
                  Recommendations by Top Team Requirements
                  <InfoIcon fontSize="small" sx={{paddingLeft: '8px'}} />
                </Typography>
              </LongTooltip>
            </Box>
            {/* Iterate through recommended skills */}
            {reqSkills == null ? "You have all the skills required by teams!" : 
              reqSkills.map((skill) => (
                <Grid key={skill.skillName} sx={{paddingBottom: '15px'}}>
                  <Item>
                    <Typography sx={{backgroundColor: '#510DBC', color: '#FFFFFF', padding: '3px'}}>{skill.skillName}</Typography>
                    <Item sx={{marginBottom: '5px'}}>Needed for these teams: </Item>
                      {skill.teamsForSkill.map((teams, index) => (
                        <Typography key={index}>{teams}</Typography>
                      ))}
                    <Divider />
                    <Table sx={{color: 'rgb(0, 51, 141)'}}>
                      <TableBody>
                        {skill.learningPaths.map((learningPath, index) => (
                          <TableRow key={index}>
                            <TableCell>Resource Name:</TableCell>
                            <TableCell>
                              <Button href={learningPath.resource_link} target="_blank">{learningPath.resource_name}</Button>
                              <br />
                              <Typography sx={{ paddingLeft: '8px'}}>
                                Resource Type: {learningPath.resource_type}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Item>
                </Grid>
              ))
            }
          </Grid>
          <Grid item xs={8}>
          <Box sx={{ backgroundColor: '#098E7E', padding: '15px', color: '#FFFFFF', marginBottom: '20px', borderRadius: 5, verticalAlign: "middle"}}>
              <LongTooltip title="Recommended learning for areas of interest which you do not have the skills for" arrow>
                <Typography sx={{ textAlign: 'center', fontWeight: 700 }}>
                  Recommendations by Interest 
                  <InfoIcon fontSize="small" sx={{paddingLeft: "8px"}}/>
                </Typography>
              </LongTooltip>
            </Box>
            {interestSkills == null ? "You have all the skills for your areas of interest!" : 
              interestSkills.map((skill) => (
                <Grid key={skill.skillName} sx={{paddingBottom: '15px'}}>
                  <Item>
                    <Typography sx={{backgroundColor: '#098E7E', color: '#FFFFFF', padding: '3px'}}>{skill.skillName}</Typography>
                    <Item sx={{marginBottom: '5px'}}>Needed for these teams:</Item>
                    {skill.teamNames.map((teamName, index) => (
                    <Typography key={index}>{teamName}</Typography>
                    ))}
                    <Divider />
                    <Table sx={{color: 'rgb(0, 51, 141)'}}>
                      <TableBody>
                        {skill.learningPaths.map((learningPaths, index) => (
                          <TableRow key={index}>
                            <TableCell>Resource Name:</TableCell>
                            <TableCell>
                              <Button href={learningPaths.resource_link} target="_blank">{learningPaths.resource_name}</Button>
                              <br />
                              <Typography sx={{ paddingLeft: '8px'}}>
                                Resource Type: {learningPaths.resource_type}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Item>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </Box>
  )
}

export default LearningRecs