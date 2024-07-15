import Box from '@mui/material/Box'
import { Container, Typography } from '@mui/material'

const BottomBanner = () => {
  return (
    <Box
    component="footer"
    sx={{
      position: 'fixed',
      bottom: 0,
      width: '100%',
      pt: '8px',
      height: 33,
      backgroundColor: '#646464',
    }}
    >
      <Container>
        <Typography
          align="center"
          sx={{
            fontWeight: 400,
            color: '#FFFFFF',
          }}
        >
          {'Copyright © KPMG UK '}
          {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  )
}

export default BottomBanner

