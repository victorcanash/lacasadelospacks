import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

import { useIntl, FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';

import { FormFieldTypes } from '@core/constants/forms';
import type { CartItem, GuestCartCheckItem } from '@core/types/cart';
import { itemPriceString, itemTotalPriceString, availableItemQuantity } from '@core/utils/cart';
import Link from '@core/components/Link';

import type { FormButtonsNormal } from '@lib/types/forms';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import useSelectInventoryQuantity from '@lib/hooks/useSelectInventoryQuantity';
import useForms from '@lib/hooks/useForms';
import useAuth from '@lib/hooks/useAuth';
import BaseForm from '@components/forms/BaseForm';

type CartItemDetailProps = {
  item: CartItem | GuestCartCheckItem,
  Subdivider: (props: {
    mt?: number;
    mb?: number;
  }) => JSX.Element,
  updateQuantity?: (cartItem: CartItem, quantity: number, forceUpdate?: boolean) => void,
  priorityImg?: boolean,
};

const CartItemDetail = (props: CartItemDetailProps) => {
  const { item, Subdivider, updateQuantity, priorityImg } = props;

  const { getProductPageUrl, getProductImgUrl } = useProductsContext();

  const intl = useIntl();

  const { Select: SelectQuantity } = useSelectInventoryQuantity(
    item as CartItem,
    // On change
    (quantity: number) => {
      if (updateQuantity) {
        updateQuantity(item as CartItem, quantity);
      }
    }
  );
  const { couponFormValidation, couponFieldsInitValues } = useForms();
  const { applyCoupon, errorMsg } = useAuth();

  const [availableQuantity, setAvailableQuantity] = useState(true);

  const handleRemoveItem = () => {
    if (updateQuantity) {
      updateQuantity(item as CartItem, 0, true);
    }
  };

  const handleCouponSubmit = async (_values: { couponCode: string }) => {
    applyCoupon();
  };

  const checkAvailableQuantity = useCallback(() => {
    if ((item as CartItem)?.cartId) {
      setAvailableQuantity(availableItemQuantity(item));
      return;
    } else if ((item as GuestCartCheckItem)?.quantity) {
      if (item.quantity <= 0) {
        setAvailableQuantity(false);
        return;
      }
      setAvailableQuantity(true);
    }
  }, [item])

  useEffect(() => {
    checkAvailableQuantity();
  }, [checkAvailableQuantity]);

  return (
    <>
      {/* Delete Button */}
      { updateQuantity &&
        <Grid container direction="row-reverse">
          <Grid item>
            <Tooltip 
              title={intl.formatMessage({ id: 'app.deleteBtn' })} 
              placement='top'
            >
              <IconButton 
                onClick={handleRemoveItem}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      }

      <Grid container rowSpacing={1} columnSpacing={2}>
        <Grid item xs={12} xs_sm={6}>
          {/* Product Image */}
          <Box>
            <Link href={getProductPageUrl(item)} noLinkStyle>
              <Image
                src={getProductImgUrl(item)}
                alt="Product image"
                layout="responsive"
                objectFit="cover"
                style={{ borderRadius: '10px' }}
                priority={priorityImg}
              />
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} xs_sm={6}>
          <Box
            sx={!availableQuantity ? { color: 'text.disabled' } : undefined}
          >
            {/* Product Name */}
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography component="div" variant="body1" sx={{ fontWeight: 700 }}>
                  <FormattedMessage
                    id="cart.product"
                  />
                </Typography>
              </Grid>
              <Grid item>
                <Typography component="div" variant="body1">
                  {item.inventory?.name.current || item.pack?.name.current}
                </Typography>
              </Grid>
            </Grid>
            <Subdivider />
            {/* Product Price */}
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography component="div" variant="body1" sx={{ fontWeight: 700 }}>
                  <FormattedMessage
                    id="cart.price"
                  />
                </Typography>
              </Grid>
              <Grid item>
                <Typography component="div" variant="body1">
                  {itemPriceString(item)}
                </Typography>
              </Grid>
            </Grid>
            <Subdivider />
            {/* Product Quantity */}
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography component="div" variant="body1" sx={{ fontWeight: 700 }}>
                  <FormattedMessage
                    id="cart.quantity"
                  />
                </Typography>
              </Grid>
              <Grid item>
                { !updateQuantity ?
                  <Typography component="div" variant="body1">
                    {item.quantity.toString()}
                  </Typography>
                  :
                  <>
                    <SelectQuantity />      
                    { ((item.inventory || item.pack) && item.quantity <= 0) &&
                      <Typography 
                        variant="body2"
                        color={!availableQuantity ? { color: 'text.disabled' } : { color: 'text.primary' }}
                      >
                        { !availableQuantity ? 
                          intl.formatMessage({ id: 'cart.inventoryUnavailable' }) : 
                          intl.formatMessage({ id: 'cart.inventoryAvailable' })
                        }
                      </Typography>
                    }
                  </>
                }
              </Grid>
            </Grid>
            <Subdivider />
            {/* Product Subtotal */}
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography component="div" variant="body1" sx={{ fontWeight: 700 }}>
                  <FormattedMessage
                    id="cart.subtotal"
                  />
                </Typography>
              </Grid> 
              <Grid item>
                <Typography component="div" variant="body1">
                  {itemTotalPriceString(item)}
                </Typography>
              </Grid>
            </Grid>
            <Subdivider />
          </Box>
          {/* Product Coupon Form */}
          <Box mt={-2}>
            <BaseForm
              initialValues={couponFieldsInitValues}
              validationSchema={couponFormValidation}
              formFieldGroups={[
                {
                  formFields: [
                    {
                      name: 'couponCode',
                      type: FormFieldTypes.text,
                      required: true,
                    },
                  ],
                  formFieldsMb: 0,
                }
              ]}
              formButtons={{
                submit: {
                  text: {
                    id: 'cart.coupon.successBtn',
                  },
                  disabled: !availableQuantity,
                  onSubmit: handleCouponSubmit,
                },
              } as FormButtonsNormal}
              errorMsg={errorMsg}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CartItemDetail;
