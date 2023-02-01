import { Dispatch, SetStateAction, useState } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import type { CartItem } from '@core/types/cart';

import type { FormButtonsCheckout } from '@lib/types/forms';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';
import useCart from '@lib/hooks/useCart';
import usePayments from '@lib/hooks/usePayments';
import BaseForm from '@components/forms/BaseForm';
import AddressDetail from '@components/checkout/details/AddressDetail';
import CartDetail from '@components/cart/CartDetail';
import CheckedCartDialog from '@components/dialogs/CheckedCartDialog';

type CheckoutConfirmFormProps = {
  back?: () => void,
  setTransactionError?: Dispatch<SetStateAction<string>>,
};

const CheckoutConfirmForm = (props: CheckoutConfirmFormProps) => {
  const { back, setTransactionError } = props;

  const { setLoading } = useAppContext();
  const { user, checkoutPayment, getCardPayload, getPaypalPayload } = useAuthContext();
  const { cart, totalPrice } = useCartContext();

  const intl = useIntl();

  const { createTransaction, errorMsg, successMsg } = usePayments();
  const { checkCart } = useCart();

  const [openDialog, setOpenDialog] = useState(false);
  const [changedCart, setChangedCart] = useState(false);
  const [changedItemsByInventory, setChangedItemsByInventory] = useState<CartItem[]>([]);

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleBack = () => {
    if (setTransactionError) {
      setTransactionError('');
    }
    if (back) {
      back();
    }
  };

  const handleSubmit = async () => {
    if (setTransactionError) {
      setTransactionError('');
    }
    checkCart(onSuccessCheckCart);
  };

  const onSuccessCheckCart = (changedCart: boolean, changedItemsByInventory: CartItem[]) => {
    setChangedCart(changedCart);
    setChangedItemsByInventory(changedItemsByInventory);
    if (changedItemsByInventory.length < 1 && !changedCart) {
      createTransaction(onErrorCreateTransaction);
    } else {
      setLoading(false);
      handleDialog();
    }
  };

  const onErrorCreateTransaction = (message: string) => {
    if (setTransactionError) {
      setTransactionError(message);
    }
    if (back) {
      back();
    }
  };

  return (
    <>
      { user && cart && user.billing && user.shipping &&
        <>
          <BaseForm
            maxWidth="800px"
            formFieldGroups={[
              {
                extraElements:
                  <Grid container columnSpacing={5} rowSpacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Typography component="h3" variant="h1">
                        <FormattedMessage 
                          id="forms.shipping" 
                        />
                      </Typography>
                      <Box mt={1}>
                        <AddressDetail 
                          address={user.shipping}
                          variant="body1"
                        />
                      </Box>
                      <Typography component="h3" variant="h1" mt={3}>
                        <FormattedMessage 
                          id="forms.billing" 
                        />
                      </Typography>
                      <Box mt={1}>
                        <AddressDetail 
                          address={user.billing}
                          variant="body1"
                        />
                      </Box>
                      <Typography component="h3" variant="h1" mt={3}>
                        <FormattedMessage 
                          id="checkout.sections.payment" 
                        />
                      </Typography>
                      <Box mt={1}>
                        { getCardPayload()?.details.lastFour &&
                          <Typography component="div" variant="body1">
                            <FormattedMessage 
                              id="orderDetail.paidCard" 
                              values={{
                                cardType: checkoutPayment?.methodPayload.type,
                                last4: getCardPayload()?.details.lastFour,
                              }}
                            />
                          </Typography>
                        }
                        { getPaypalPayload()?.details.email &&
                          <Typography component="div" variant="body1">
                            <FormattedMessage 
                              id="orderDetail.paidPaypal" 
                              values={{
                                payerEmail: getPaypalPayload()?.details.email
                              }}
                            />
                          </Typography>
                        }
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography component="h3" variant="h1" mb={2}>
                        <FormattedMessage 
                          id="checkout.order" 
                        />
                      </Typography>
                      { cart && cart.items && cart.items.length > 0 && totalPrice > 0 ?
                        <>
                          <CartDetail
                            showEmptyItems={false}
                          />  
                        </>
                        :
                        <>
                          <Typography component='div' variant='body1' mt={1}>
                            <FormattedMessage 
                              id="cart.noItems" 
                            />
                          </Typography>
                        </>
                      }
                    </Grid>
                  </Grid>,
              }
            ]}
            formButtons={{
              submit: {
                text: { 
                  id: 'checkout.confirmBtn',
                },
                onSubmit: handleSubmit,
                disabled: totalPrice <= 0,
              },
              back: {
                text: { 
                  id: 'app.backBtn',
                },
                onClick: handleBack,
              },
            } as FormButtonsCheckout}
            successMsg={successMsg}
            errorMsg={errorMsg}
          />

          <CheckedCartDialog
            open={openDialog}
            handleDialog={handleDialog}
            changedCart={changedCart}
            changedItemsByInventory={changedItemsByInventory}
            message={intl.formatMessage({ id: 'dialogs.checkedCart.content.checkoutPage' })}
          />
        </>
      }
    </>
  );
};

export default CheckoutConfirmForm;