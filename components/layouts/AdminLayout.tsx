import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Header from '@components/NavBar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <Header />
      <Container 
        component="main"
      >
        <Box
          sx={{
            mt: 10,
            mb: 4,
          }}
        >
          {children}
        </Box>
      </Container>
    </>
  )
}

export default AdminLayout;
