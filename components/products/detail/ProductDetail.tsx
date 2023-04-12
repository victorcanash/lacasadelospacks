import { useState, useCallback } from 'react';

import { FormattedMessage } from 'react-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  faTruck,
  faLock,
  faPhoneVolume,
  faArrowRightArrowLeft,
  faWallet,
  faWarehouse,
  faHourglass,
} from '@fortawesome/free-solid-svg-icons';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

import type { Product, ProductInventory, ProductPack } from '@core/types/products';
import type { Source } from '@core/types/multimedia';
import { convertElementToSx } from '@core/utils/themes';

import { themeCustomElements } from '@lib/constants/themes/elements';
import { useAppContext } from '@lib/contexts/AppContext';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import useCart from '@lib/hooks/useCart';
import useSelectInventory from '@lib/hooks/useSelectInventory';
import useSelectInventoryQuantity from '@lib/hooks/useSelectInventoryQuantity';
import LoadingBtn from '@components/ui/LoadingBtn';
import LoadingRating from '@components/ui/LoadingRating';
import ProductCarousel from '@components/products/detail/ProductCarousel';
import EverfreshDetail from '@components/products/detail/EverfreshDetail';
import BagsDetail from '@components/products/detail/BagsDetail';

type ProductDetailProps = {
  product: Product,
};

const ProductDetail = (props: ProductDetailProps) => {
  const { product } = props;

  const { initialized } = useAppContext();
  const {
    isEverfreshProduct,
    isBagsProduct,
    //getProductPacks,
    getProductDetailImgsUrl,
  } = useProductsContext();

  const { addCartItem } = useCart(false);
  const {
    Select: SelectInventory,
    selectedInventory,
  } = useSelectInventory(
    product,
    //getProductPacks(product).length > 0 ? getProductPacks(product)[0] : undefined
  );
  const { Select: SelectQuantity, selectedQuantity } = useSelectInventoryQuantity(selectedInventory);

  const [maxWidthCarousel, _setMaxWidthCarousel] = useState('540px');

  const onClickAddCartBtn = useCallback(() => {
    if (selectedInventory) {
      addCartItem(selectedInventory, selectedQuantity);
    }
  }, [addCartItem, selectedInventory, selectedQuantity]);

  const productH1 = useCallback(() => {
    let formatted = false;
    let text = product.name.current;
    if (isEverfreshProduct(product)) { 
      formatted = true
      text = 'everfresh.h1';
    } else if (isBagsProduct(product)) {
      formatted = true
      text = 'bags.h1';
    }
    return (
      <Typography component="h1" variant="h1" sx={{ display: 'none' }}>
        { formatted ? 
          <FormattedMessage id={text} defaultMessage={text} />
          :
          <>{ text }</>
        }
      </Typography>
    );
  }, [isBagsProduct, isEverfreshProduct, product]);

  const productRating = useCallback(() => {
    const ReviewsCountText = (props: { value: number }) => (
      <Typography component="span" variant="body1">
        {`(${props.value})`}
      </Typography>
    )

    if (!initialized || !selectedInventory) {
      return (
        <LoadingRating />
      );
    }
    const rating = parseInt(selectedInventory.rating);
    return (
      <Grid container>
        <Grid item>
          <Rating
            value={rating}
            precision={0.5}
            readOnly
          />
        </Grid>
        <Grid item sx={{ mt: '2px', ml: '6px' }}>
          <ReviewsCountText value={selectedInventory.reviewsCount} />
        </Grid>
      </Grid>
    );
  }, [initialized, selectedInventory]);

  const productTitle = useCallback(() => {
    let text = product.name.current;
    if (selectedInventory) {
      text = selectedInventory.description.current;
    }
    return (
      <Typography component="h2" variant="h1">
        { text }
      </Typography>
    );
  }, [product.name, selectedInventory]);

  const productPrice = useCallback(() => {
    let price = product.lowestRealPrice;
    if ((selectedInventory as ProductInventory)?.realPrice) {
      price = (selectedInventory as ProductInventory).realPrice;
    } else if ((selectedInventory as ProductPack)?.inventories) {
      price = (selectedInventory as ProductPack).price;
    }
    return (
      <Typography component="h2" variant="h1" sx={convertElementToSx(themeCustomElements.landing.priceContent.priceText)}>
        {`${price} €`} 
      </Typography>
    );
  }, [product.lowestRealPrice, selectedInventory]);

  const productPriceWithDiscount = useCallback(() => {
    let price = product.lowestRealPrice;
    let originPrice = product.lowestPrice;
    if ((selectedInventory as ProductInventory)?.realPrice) {
      price = (selectedInventory as ProductInventory).realPrice;
      originPrice = (selectedInventory as ProductInventory).price;
    } else if ((selectedInventory as ProductPack)?.inventories) {
      price = (selectedInventory as ProductPack).price;
      originPrice = (selectedInventory as ProductPack).originalPrice;
    }
    return (
      <Typography component="h2" variant="h1" sx={convertElementToSx(themeCustomElements.landing.priceContent.priceText)}>
        <span
          style={{ fontWeight: 500, textDecoration: 'line-through' }}
        >
          <span style={{ color: '#7a7a7a' }}>
            {`${originPrice}€`}
          </span>
        </span>
        {` ${price}€`}
      </Typography>
    );
  }, [product.lowestPrice, product.lowestRealPrice, selectedInventory]);

  /*const productDiscountPercent = useCallback(() => {
    let percent = product.activeDiscount?.discountPercent || 0;
    if ((selectedInventory as ProductPack)?.inventories) {
      percent = (selectedInventory as ProductPack).discountPercent;
    }
    return (
      <Typography component="span" variant="body1" sx={convertElementToSx(themeCustomElements.landing.priceContent.discountText)}> 
        {` -${percent}%`}
      </Typography>
    );
  }, [product.activeDiscount?.discountPercent, selectedInventory]);*/

  const productDescription = useCallback(() => {
    let formatted = false;
    let text = product.description.current;
    if (isEverfreshProduct(product)) { 
      formatted = true;
      text = 'everfresh.description';
    } else if (isBagsProduct(product)) {
      formatted = true;
      text = 'bags.description';
    }
    return (
      <Typography component="h3" variant="body1">
        { formatted ? 
            <FormattedMessage id={text} defaultMessage={text} />
            :
            <>{ text }</>
        }
      </Typography>
    );
  }, [isBagsProduct, isEverfreshProduct, product]);

  const productComments = useCallback(() => {
    if (isEverfreshProduct(product) || isBagsProduct(product)) {
      return (
        <>
          <Typography component="div" variant="body1" mb={4}>
            <FormattedMessage id={isEverfreshProduct(product) ? 'everfresh.comment' : 'bags.comment'} />
          </Typography>
          {/*<LinkButton
            href={isEverfreshProduct(product) ? pages.bags.path : pages.everfresh.path}
            sx={convertElementToSx(themeCustomElements.button.action)}
          >
            <FormattedMessage
              id={isEverfreshProduct(product) ? 'everfresh.bagsButton' : 'bags.everfreshButton'}
            />
          </LinkButton>*/}
        </>
      );
    }
    return (<></>);
  }, [isBagsProduct, isEverfreshProduct, product]);

  const landingIcon = useCallback((icon: IconDefinition) => {
    return (
      <FontAwesomeIcon 
        size="2xl" 
        icon={icon}
        //style={{ color: "#ffffff" }}
      />
    );
  }, []);

  return (
    <Box 
      sx={{
        overflow: 'hidden',
      }}
    >
      { productH1() }

      {/* General Product Section */}
      <Grid 
        container 
        spacing={3}
      >
        {/* Images */}
        <Grid
          item
          xs={12}
          md={6}
        >
          <Container>
            <Box
              sx={{
                maxWidth: maxWidthCarousel, 
                m: 'auto',
              }}  
            >
              <ProductCarousel 
                sources={getProductDetailImgsUrl(product).map((item) => { 
                  return { src: item } as Source;
                })}
              />
            </Box>
          </Container>
        </Grid>

        {/* Content */}
        <Grid 
          item 
          xs={12}
          md={6}
        >
          <Box
            sx={{
              maxWidth: maxWidthCarousel, 
              m: 'auto',
            }}  
          >
            <Container>
              <Box>
                { productRating() }
              </Box>
              <Box sx={{ mb: 3 }}>
                { productTitle() }
              </Box>
              { (product.activeDiscount || (selectedInventory as ProductPack)?.inventories) ?
                <Box sx={{ mb: 1 }}>
                  { productPriceWithDiscount() }
                </Box>
                :
                <Box sx={{ mb: 1 }}>
                  { productPrice() }
                </Box>
              }
              { productDescription() }
              {/* Cart inputs */}
              <Grid container mt={4} mb={1}>
                <Grid item>
                  <SelectInventory />
                </Grid>
                <Grid item mb={2}>
                  <SelectQuantity />
                </Grid>
              </Grid>
              { initialized && selectedInventory ?
                <Button
                  fullWidth
                  variant="contained"
                  onClick={onClickAddCartBtn}
                  disabled={selectedInventory.quantity == 0}
                  sx={{
                    ...convertElementToSx(themeCustomElements.button.action.primary),
                    mb: 4,
                  }}
                >
                  <FormattedMessage id="productDetail.addCartBtn" />
                </Button>
                :
                <LoadingBtn
                  fullWidth
                  variant="contained"
                  sx={{
                    ...convertElementToSx(themeCustomElements.button.action.primary),
                    mb: 4,
                  }}
                >
                  <FormattedMessage id="productDetail.addCartBtn" />
                </LoadingBtn>
              }
            </Container>
            {/* Icons */}
            <Grid 
              container
              sx={{
                backgroundColor: '#d3d3d3',
                mb: 2,
                py: 2,
                justifyContent: 'space-around',
              }}
            >
              <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                { landingIcon(faTruck) }
                <Typography component="div" variant="body2" sx={{ textAlign: 'center', lineHeight: '12px', mt: '7px', fontSize: '10px' }}>
                  {'ENVÍOS\n24/48H'}
                </Typography>
              </Grid>
              <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                { landingIcon(faLock) }
                <Typography component="div" variant="body2" sx={{ textAlign: 'center', lineHeight: '12px', mt: '7px', fontSize: '10px' }}>
                  {'PAGO\nSEGURO'}
                </Typography>
              </Grid>
              <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                { landingIcon(faPhoneVolume) }
                <Typography component="div" variant="body2" sx={{ textAlign: 'center', lineHeight: '12px', mt: '7px', fontSize: '10px' }}>
                  {'ATENCIÓN\nAL CLIENTE'}
                </Typography>
              </Grid>
              <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                { landingIcon(faArrowRightArrowLeft) }
                <Typography component="div" variant="body2" sx={{ textAlign: 'center', lineHeight: '12px', mt: '7px', fontSize: '10px' }}>
                  {'CAMBIOS Y\nDEVOLUCIONES'}
                </Typography>
              </Grid>
            </Grid>
            <Container sx={{ mt: 4 }}>
              { productComments() }
            </Container>
            <Grid
              container
              mt={4}
              justifyContent="space-evenly"
            >
              <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                { landingIcon(faWallet) }
                <Typography component="div" variant="body2" sx={{ textAlign: 'center', lineHeight: '12px', mt: '7px', fontSize: '10px' }}>
                  {'Ahorra\ndinero'}
                </Typography>
              </Grid>
              <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                { landingIcon(faWarehouse) }
                <Typography component="div" variant="body2" sx={{ textAlign: 'center', lineHeight: '12px', mt: '7px', fontSize: '10px' }}>
                  {'Ahorra\nespacio'}
                </Typography>
              </Grid>
              <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                { landingIcon(faHourglass) }
                <Typography component="div" variant="body2" sx={{ textAlign: 'center', lineHeight: '12px', mt: '7px', fontSize: '10px' }}>
                  {'Ahorra\ntiempo'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Type Product Section */}
      { (isEverfreshProduct(product) || isBagsProduct(product)) &&
        <Box sx={{ marginTop: '16px' }}>
          { isEverfreshProduct(product) &&
            <EverfreshDetail />
          }
          { isBagsProduct(product) &&
            <BagsDetail />
          }
        </Box>
      }
    </Box>
  );
};

export default ProductDetail;
