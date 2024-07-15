import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

type Props = {
  pageType?: string
}

const TopSection = ({ pageType }: Props) => {
  return (
    <Box sx={{background: 'none', paddingTop: '10px', justifyContent: 'center', display: 'flex'}}>
      <div>
      <h3 className="welcomeMessage">Welcome to myRotator, you are currently viewing: </h3>
      <Divider />
      <Box sx={{justifyContent: 'center', display: 'flex'}}>
        <h1 className="allTeams">{pageType}</h1>
      </Box>
      </div>
    </Box>
  )
}

export default TopSection