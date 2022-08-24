import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { useAppContext } from '@lib/contexts/AppContext';
import Loading from '@components/Loading';
import Header from '@components/NavBar';
import Footer from '@components/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { initialized } = useAppContext();

  return (
    <div className="app" style={initialized ? {pointerEvents: 'auto'} : {pointerEvents: 'none'}}>
      <Loading />
      <Header />
      <Container component="main">
        <Box
          sx={{
            mt: 10,
            mb: 4,
          }}
        >
          {children}
        </Box>
      </Container>
      <Footer />
    </div>
  )
}

export default Layout;
