import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { pages } from '@core/config/navigation.config';
import LinkButton from '@core/components/LinkButton';
import useAuth from '@lib/hooks/useAuth';
import useCountdown from '@lib/hooks/useCountdown';

type ResendActivationFormProps = {
  email: string,
  onClickProceedBtn?: () => void,
};

const ResendActivationForm = (props: ResendActivationFormProps) => {
  const { email, onClickProceedBtn } = props;

  const { sendActivationEmail, errorMsg, successMsg } = useAuth();

  const { trigger, timeLeft, active } = useCountdown();

  const onSendActivationEmailSuccess = () => {
    trigger();
  }

  const onClickResend = () => {
    sendActivationEmail(email, onSendActivationEmailSuccess);
  }

  return (
    <Container maxWidth="xs">

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Typography component="h1" variant="h5">
          Activate your account
        </Typography>

        <Typography component="h2" variant="subtitle1" my={2}>
          We have sent an email to {email} with a link to activate your account before you can login.
          Once you verified your account, proceed to login.
        </Typography>

        <LinkButton href={pages.login.path} fullWidth onClick={onClickProceedBtn}>
            Proceed to login
        </LinkButton>

        <Typography component="h3" variant="subtitle2" sx={{ mt: 4, mb: 2}}>
          Didn&apos;t received the email? 
          Resend {
            timeLeft ?
              `in ${timeLeft} ${timeLeft > 1 ? 'seconds' : 'second'}`
            :
            'now'
          }
        </Typography>

        <Button
          fullWidth
          variant="contained"
          onClick={onClickResend}
          sx={{ mb: 2 }}
          disabled={active}
        >
          Resend
        </Button>

        {
          errorMsg && errorMsg !== '' &&
            <Alert severity="error">{ errorMsg }</Alert>
        }  
        {
          successMsg && successMsg !== '' &&
            <Alert>{ successMsg }</Alert>
        }

      </Box>

    </Container>
  );
};

export default ResendActivationForm;
