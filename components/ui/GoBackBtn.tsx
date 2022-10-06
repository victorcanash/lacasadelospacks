import { useRouter } from 'next/router';

import Button, { ButtonProps } from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type GoBackBtnProps = {
   onClick?: () => void,
};

const GoBackBtn = (props: ButtonProps & GoBackBtnProps) => {
  const { onClick } = props;

  const router = useRouter();
  
  const onClickDefault = () => {
    router.back();
  }

  return (
    <Button {...props} startIcon={<ArrowBackIcon />} onClick={onClick || onClickDefault}>
      Go back
    </Button>
  );
};
export default GoBackBtn;
