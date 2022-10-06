import { Fragment } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useCartContext } from '@lib/contexts/CartContext';
import useCart from '@lib/hooks/useCart';
import CartItem from '@components/cart/CartItem';
import GoBackBtn from '@components/ui/GoBackBtn';
import CheckoutBtn from '@components/checkout/CheckoutBtn';

const CartDetail = () => {
  const { cart, totalPrice, totalQuantity } = useCartContext();

  const { updateCartItemQuantity } = useCart();

  return (
    <>
      <Typography component='h1' variant='h5' className='animate__animated animate__fadeInLeft'>
        {`My cart (${totalQuantity})`}
      </Typography>
      <Divider sx={{ my: 3 }} />

      {cart && cart.items.length > 0 ?
        <>
          <Container className='animate__animated animate__fadeIn'>
            {cart.items.map((item) => (
              <Fragment key={item.id}>
                <CartItem 
                  item={item} 
                  updateQuantity={updateCartItemQuantity}
                />
                <Divider variant='fullWidth' sx={{ my: 3 }} />
              </Fragment>
            ))}
          </Container>

          <Typography
            variant='h6'
            align='right'
            className='animate__animated animate__fadeInUp'
          >
            Total: {totalPrice.toFixed(2)} €
          </Typography>

          <Box display='flex' justifyContent={'center'} my={1}>
            <CheckoutBtn />
          </Box>

        </>
      :
        <>
          <Typography variant='h5' align='center' sx={{ my: 5 }}>
            There are no products added
          </Typography>
        </>
      }
      <GoBackBtn />
    </>
  );
};

export default CartDetail;
