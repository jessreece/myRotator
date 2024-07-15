import { useEffect, useState } from "react";
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import TeamRotate from "./openToRotate";
import UserSkillList from "./skillList";
import UserInterestList from "./interestList";

interface UserData{
  id: string,
  name: string,
  username: string,
  openToRotateTeams: boolean,
  email: string,
  supervisorName: string,
  supervisorEmail: string,
  lastTeamName: string,
  currentTeamName: string
}

const UserComponent = () => {
  const [userDetails, setUserDetails] = useState<UserData[] | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch("/api/userData")
      const reqJson = await req.json()
      setUserDetails(reqJson)
    }
    void fetchData()
  }, [setUserDetails])

  if (userDetails === null) {
    return (
      <CircularProgress color="inherit" sx={{width: '100%', height: '80%', marginLeft: '48%', marginTop: '8%', marginBottom: '15%'}}/>
    )
  }


  return (
    <Box sx={{ width: '40%', backgroundColor: '#FFFFFF', marginLeft: '30%', borderRadius: '20%', paddingTop: '20px', paddingBottom: '20px'}}>
      {userDetails.map((user) => (
        <Box key={user.id} sx={{ width: '70%', paddingLeft: '15%'}}>
          <Typography sx={{textAlign: 'center', paddingTop: '10px', fontSize: '30px'}}>
            {user.name}
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography sx={{ textAlign: 'center', fontWeight: 600 }}>
                    Username
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{textAlign: 'center'}}>
                    {user.username}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography sx={{textAlign: 'center', fontWeight: 600}}>
                    Contact email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{textAlign: 'center'}}>
                    {user.email}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography sx={{textAlign: 'center', fontWeight: 600}}>
                    Supervisor
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{textAlign: 'center'}}>
                    {user.supervisorName}
                    <br />
                    {user.supervisorEmail}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography sx={{textAlign: 'center', fontWeight: 600}}>
                    Last team
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{textAlign: 'center'}}>
                    {user.lastTeamName}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography sx={{textAlign: 'center', fontWeight: 600}}>
                    Current team
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{textAlign: 'center'}}>
                    {user.currentTeamName}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <br />
          <TeamRotate openToRotate={user.openToRotateTeams ? true : false} />
          <br />
          <UserSkillList />
          <br />
          <UserInterestList />
          <br />
        </Box>
      ))}
      <br />
    </Box>
  )
}

export default UserComponent