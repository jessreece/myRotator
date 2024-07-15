import { useEffect, useState } from "react";
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Typography from "@mui/material/Typography";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Table, TableRow, TableCell, TableBody } from '@mui/material'
import { useRouter } from "next/navigation";
import InfoIcon from '@mui/icons-material/Info';

interface TeamInterestRecs{
  teamId: string,
  teamName: string,
  teamDescription: string,
  teamLeadName: string,
  teamLeadEmail: string,
  availabilities: Availabilities[],
  alignedInterestsNames: string,
  alignedInterestsCount: number,
  otherInterestsCovered: string[],
  neededSkillsNames: string,
  neededSkillCount: number,
}

interface TeamSkillRecs {
  teamId: string,
  teamName: string,
  teamDescription: string,
  teamLeadName: string,
  teamLeadEmail: string,
  alignedSkills: string,
  alignedSkillCount: number,
  otherSkillsInvolved: string,
  neededSkills: string,
  neededSkillCount: number,
  availabilityPerGrade: Availabilities[]
}

interface Availabilities {
  grade: string,
  quantity: number
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
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

const TeamRecs = () => {
  const [interestRec, setInterestRec] = useState<TeamInterestRecs[] | null>(null)
  const [skillRecs, setSkillRec] = useState<TeamSkillRecs[] | null>(null)
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch("/api/teamByInterest")
      const reqJson = await req.json()
      setInterestRec(reqJson)
      const secondReq = await fetch("/api/teamBySkills")
      const secondJson = await secondReq.json()
      setSkillRec(secondJson)
    }
    fetchData()
  }, [])

  if (interestRec === null) {
    return (
      <CircularProgress color="inherit" sx={{width: '100%', height: '80%', marginLeft: '48%', marginTop: '8%', marginBottom: '15%'}}/>
    )
  }

  const handleButtonClick = (team: string) => {
    const url = {
      pathname: `/${encodeURIComponent(team)}`,
      query: { teamName: team }
    };
    router.push(url.pathname);
  }


  return (
    <Box sx={{ width: '100%', backgroundColor: '#F5F5F5', paddingBottom: '50px' }}>
      <br />
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Box sx={{ backgroundColor: '#510DBC', padding: '15px', color: '#FFFFFF', marginBottom: '20px', borderRadius: 5}}>
            <LongTooltip title="Team recommendations calculated using your skills and recommending teams based on how many requirements you meet" arrow>
              <Typography sx={{ textAlign: 'center', fontWeight: 700 }}>
                Team Recommendations by Skill Criteria
                <InfoIcon fontSize="small" sx={{paddingLeft: '8px'}} />
              </Typography>
            </LongTooltip>
          </Box>
          {skillRecs?.map((team) => (
            <Item key={team.teamId} sx={{ marginBottom: '20px'}}>
              <Button
                key={team.teamId}
                variant="contained"
                sx={{backgroundColor: '#510DBC', color: '#FFFFFF', width: '100%', fontWeight: 700}}
                onClick={() => handleButtonClick(team.teamName)}
              >
                {team.teamName}
              </Button>
                <Table sx={{color: 'rgb(0, 51, 141)'}}>
                  <TableBody>
                    <TableRow>
                      <TableCell><Typography sx={{ fontWeight: 700}}>Team Description</Typography></TableCell>
                      <TableCell><Typography>{team.teamDescription}</Typography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography sx={{ fontWeight: 700}}>Team Lead</Typography></TableCell>
                      <Tooltip title={`Contact the team lead via email: ${team.teamLeadEmail}`} arrow placement="left">
                        <TableCell><Typography>{team.teamLeadName} <InfoIcon fontSize="small" sx={{paddingLeft: '8px'}} /></Typography></TableCell>
                      </Tooltip>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography sx={{ fontWeight: 700}}>Aligned skills between you and {team.teamName}</Typography></TableCell>
                      <TableCell>
                        <Tooltip title={`There are ${team.alignedSkillCount} skills you share with this team`} arrow placement="left">
                          <Typography>{team.alignedSkills} <InfoIcon fontSize="small" sx={{paddingLeft: '8px'}} /></Typography>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography sx={{ fontWeight: 700}}>Other areas of interest covered in {team.teamName}</Typography></TableCell>
                      <TableCell>
                        <Tooltip title="This does not include skills marked as required by the team" arrow placement="left">
                          {team.otherSkillsInvolved == "" ? <Typography>There are no other skills involved other than ones you already have! <InfoIcon fontSize="small" sx={{paddingLeft: '8px'}} /></Typography>:
                            <Typography>{team.otherSkillsInvolved} <InfoIcon fontSize="small" sx={{paddingLeft: '8px'}} /></Typography>
                          }
                          
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <Tooltip title="Skills you must have to move onto this team" arrow placement="left">
                        <TableCell><Typography sx={{ fontWeight: 700}}>Team Criteria <InfoIcon fontSize="small" sx={{paddingLeft: '8px'}} /></Typography></TableCell>
                      </Tooltip>
                      <TableCell>
                        {team.neededSkillCount == 0 ? <Typography>You have all the skills required by this team!</Typography> :
                          <Typography>{team.neededSkills}</Typography>
                        }
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography sx={{ fontWeight: 700}}>Grade Availabilities</Typography></TableCell>
                      <TableCell>
                        {team.availabilityPerGrade == null ? (
                          <Typography>There are currently no availabilities on this team</Typography>
                        ) : (
                          team.availabilityPerGrade.map((available, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography>{available.grade ?? "No spaces available on this team"}</Typography>
                              {available.quantity != null ? <Typography>Number of spaces: {available.quantity}</Typography>: ""}
                            </div>
                          ))
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
            </Item>
          ))}
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ backgroundColor: '#098E7E', padding: '15px', color: '#FFFFFF', marginBottom: '20px', borderRadius: 5}}>
            <LongTooltip title="Team recommendations calculated using your interests and recommending teams based on how many of these interests are covered" arrow>
              <Typography sx={{ textAlign: 'center', fontWeight: 700 }}>
                Team Recommendations by Maximum Interests Involved
                <InfoIcon fontSize="small" sx={{paddingLeft: '8px'}} />
              </Typography>
            </LongTooltip>
          </Box>
          {interestRec.map((team) => (
          <Item key={team.teamId} sx={{ marginBottom: '20px'}}>
              <Button
                key={team.teamId}
                variant="contained"
                sx={{backgroundColor: '#098E7E', color: '#FFFFFF', width: '100%', fontWeight: 700}}
                onClick={() => handleButtonClick(team.teamName)}
              >
                {team.teamName}
              </Button>
                <Table sx={{color: 'rgb(0, 51, 141)'}}>
                  <TableBody>
                    <TableRow>
                      <TableCell><Typography sx={{ fontWeight: 700}}>Team Description</Typography></TableCell>
                      <TableCell><Typography>{team.teamDescription}</Typography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography sx={{ fontWeight: 700}}>Team Lead</Typography></TableCell>
                      <Tooltip title={`Contact the team lead via email: ${team.teamLeadEmail}`} arrow placement="left">
                        <TableCell><Typography>{team.teamLeadName} <InfoIcon fontSize="small" sx={{paddingLeft: '8px'}} /></Typography></TableCell>
                      </Tooltip>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography sx={{ fontWeight: 700}}>Aligned interests between you and {team.teamName}</Typography></TableCell>
                      <TableCell>
                        <Tooltip title={`There are ${team.alignedInterestsCount} skills you share with this team`} arrow placement="left">
                          <Typography>{team.alignedInterestsNames} <InfoIcon fontSize="small" sx={{paddingLeft: '8px'}} /></Typography>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography sx={{ fontWeight: 700}}>Other areas of interests within {team.teamName} team</Typography></TableCell>
                      <TableCell>
                        <Typography>{team.otherInterestsCovered}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <Tooltip title="Skills you must have to move onto this team that you currently do not have" arrow placement="right">
                        <TableCell><Typography sx={{ fontWeight: 700}}>Team Criteria <InfoIcon fontSize="small" sx={{paddingLeft: '8px'}} /></Typography></TableCell>
                      </Tooltip>
                      <TableCell>
                        {team.neededSkillCount == 0 ? <Typography>You have all the skills required by this team!</Typography> :
                          <Typography>{team.neededSkillsNames}</Typography>
                        }
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography sx={{fontWeight: 700}}>Grade Availabilities</Typography></TableCell>
                      <TableCell>
                        {team.availabilities == null ? (
                          <Typography>There are currently no availabilities on this team</Typography>
                        ) : (
                          team.availabilities.map((available, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography>{available.grade ?? "No spaces available on this team"}</Typography>
                              {available.quantity != null ? <Typography>Number of spaces: {available.quantity}</Typography>: ""}
                            </div>
                          ))
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Item>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeamRecs;
