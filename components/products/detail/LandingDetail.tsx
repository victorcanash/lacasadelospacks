import { useState, useMemo, useCallback } from 'react';

import { FormattedMessage } from 'react-intl';
import { useInView } from 'react-intersection-observer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  faCcVisa,
  faCcMastercard,
  faCcPaypal,
} from '@fortawesome/free-brands-svg-icons';
import {
  faTruck,
  faLock,
  faPhoneVolume,
  faArrowRightArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Slide from '@mui/material/Slide';
import Masonry from '@mui/lab/Masonry';

import type { Landing, LandingConfig, ProductInventory, ProductPack } from '@core/types/products';
import type { FormatText } from '@core/types/texts';
import type { Source } from '@core/types/multimedia';
import { convertElementToSx } from '@core/utils/themes';
import { scrollToSection } from '@core/utils/navigation';
import { getFirstLandingItem, getLandingItems, getLandingPathByConfig, getProductPriceData } from '@core/utils/products';
import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';
import inventoryConfig from '@lib/constants/products';
import colors from '@lib/constants/themes/colors';
import { themeCustomElements } from '@lib/constants/themes/elements';
import { useAppContext } from '@lib/contexts/AppContext';
import { useProductsContext } from '@lib/contexts/ProductsContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import useCart from '@lib/hooks/useCart';
import LoadingBtn from '@components/ui/LoadingBtn';
import LoadingRating from '@components/ui/LoadingRating';
import ProductCarousel from '@components/products/detail/ProductCarousel';
import SelectItem from '@components/products/inputs/SelectItem'
import SelectItemQuantity from '@components/products/inputs/SelectItemQuantity'
import DetailCharacteristics from '@components/products/sections/DetailCharacteristics';
import EverfreshDetail from '@components/products/detail/EverfreshDetail';
import BagsDetail from '@components/products/detail/BagsDetail';

type ProductDetailProps = {
  landingModel: Landing,
  landingConfig: LandingConfig,
};

const LandingDetail = (props: ProductDetailProps) => {
  const { landingModel, landingConfig } = props;

  const { initialized } = useAppContext();
  const {
    getLandingImgsUrl,
  } = useProductsContext();
  const { convertPriceToString } = useAuthContext();

  const { addCartItem } = useCart(false);
  const { ref: payNowBtnRef, inView: payNowInView } = useInView({
    threshold: 0,
    rootMargin: '-83px 0px 1000px 0px',
  });

  const [selectedItem, setSelectedItem] = useState<ProductInventory | ProductPack | undefined>();
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const [maxWidthSmall, _setMaxWidthSmall] = useState('540px');
  const [maxWidthMedium, _setMaxWidthMedium] = useState('623px');

  const onClickAddCartBtn = useCallback(() => {
    if (selectedItem) {
      addCartItem(selectedItem, selectedQuantity);
    }
  }, [addCartItem, selectedItem, selectedQuantity]);

  const onClickPayNowBtn = useCallback(() => {
    if (selectedItem) {
      addCartItem(selectedItem, selectedQuantity, true);
    }
  }, [addCartItem, selectedItem, selectedQuantity])

  const productH1 = useMemo(() => {
    return (
      <Typography component="h1" variant="h1" sx={{ display: 'none' }}>
        { landingConfig.metas.title }
      </Typography>
    );
  }, [landingConfig.metas.title]);

  const productRating = useMemo(() => {
    if (!initialized) {
      return (
        <LoadingRating />
      );
    };
    return (
      <Link
        href={getLandingPathByConfig(landingConfig)}
        onClick={() => scrollToSection('reviews')}
        sx={{ textDecoration: 'none' }}
      >
        <Grid container>
          <Grid item>
            <Rating
              value={/*parseFloat(landing.rating)*/0}
              precision={0.5}
              readOnly
            />
          </Grid>
          <Grid item sx={{ ml: '6px' }}>
            <Typography component="span" variant="body1">
              {`(${/*product.reviewsCount*/0})`}
            </Typography>
          </Grid>
        </Grid>
      </Link>
    );
  }, [initialized, landingConfig]);

  const productTitle = useMemo(() => {
    let text = getFirstLandingItem(landingModel)?.name.current || '';
    if (selectedItem) {
      text = selectedItem.name.current;
    }
    return (
      <Typography component="h2" variant="h1" color="text.primary">
        { text }
      </Typography>
    );
  }, [landingModel, selectedItem]);

  const priceIcon = useCallback((icon: IconDefinition) => {
    return (
      <Grid item>
        <FontAwesomeIcon 
          size="2xl" 
          icon={icon}
        />
      </Grid>
    );
  }, []);

  const productPrice = useMemo(() => {
    let priceData = { price: 0, originPrice: 0 };
    if (selectedItem) {
      priceData = getProductPriceData(selectedItem);
    } else {
      const firstItem = getFirstLandingItem(landingModel);
      if (firstItem) {
        priceData = getProductPriceData(firstItem);
      }
    }
    return (
      <Grid container spacing={2}>
        <Grid item>
          <Typography component="h2" variant="h2" sx={convertElementToSx(themeCustomElements.landing.priceContent.priceText)}>
            { priceData.price !== priceData.originPrice ?
              <>
                <span
                  style={{ fontWeight: 500, textDecoration: 'line-through' }}
                >
                  <span style={{ color: colors.text.disabled }}>
                    {`${convertPriceToString(priceData.originPrice)}`}
                  </span>
                </span>
                {` ${convertPriceToString(priceData.price)}`}
              </>
              :
              <>
                {`${convertPriceToString(priceData.price)}`}
              </>
            }
          </Typography>
        </Grid>
        <Grid item sx={{ mt: '3px' }}>
          <Typography variant="body2">
            <FormattedMessage id="productDetail.price.iva" />
          </Typography>
        </Grid>
        { priceIcon(faCcVisa) }
        { priceIcon(faCcMastercard) }
        { priceIcon(faCcPaypal) }
      </Grid>
    );
  }, [convertPriceToString, landingModel, priceIcon, selectedItem]);

  const landingIcon = useCallback((icon: IconDefinition, text: FormatText, columnSpacing: number) => {
    return (
      <Grid item xs={12} container columnSpacing={columnSpacing}>
        <Grid item>
          <FontAwesomeIcon 
            size="2xl" 
            icon={icon}
          />
        </Grid>
        <Grid item>
          <Typography variant="body1Head">
            <FormattedMessage id={text.id} defaultMessage={text.id} values={text.values} />
          </Typography>
        </Grid>
      </Grid>
    );
  }, []);

  const productComments = useMemo(() => {
    return (
      <>
        { landingConfig.comment.id &&
          <Typography component="div" variant="body1">
            <FormattedMessage id={landingConfig.comment.id} values={landingConfig.comment.values} />
          </Typography>
        }
        <Box mt={1}>
          <Link href={pages.orders.path} variant="body1">
            <FormattedMessage id="productDetail.trackingLink" />
          </Link>
        </Box>
      </>
    );
  }, [landingConfig.comment.id, landingConfig.comment.values]);

  const addCartBtn = useMemo(() => {
    if (initialized && selectedItem) {
      return (
        <Button
          fullWidth
          variant="contained"
          onClick={onClickAddCartBtn}
          disabled={selectedItem.quantity == 0}
          sx={{
            ...convertElementToSx(themeCustomElements.button.action.primary),
            mb: 3,
          }}
        >
          <FormattedMessage id="productDetail.addCartBtn" />
        </Button>
      );
    }
    return (
      <LoadingBtn
        fullWidth
        variant="contained"
        sx={{
          ...convertElementToSx(themeCustomElements.button.action.primary),
          mb: 3,
        }}
      >
        <FormattedMessage id="productDetail.addCartBtn" />
      </LoadingBtn>
    );
  }, [initialized, onClickAddCartBtn, selectedItem]);

  const payNowBtn = useMemo(() => {
    if (initialized && selectedItem) {
      return (
        <Button
          fullWidth
          variant="contained"
          onClick={onClickPayNowBtn}
          disabled={selectedItem.quantity == 0}
          ref={payNowBtnRef}
          sx={{
            ...convertElementToSx(themeCustomElements.button.buyNow),
            mb: 3,
          }}
        >
          <FormattedMessage id="productDetail.payNowBtn" />
        </Button>
      );
    }
    return (
      <LoadingBtn
        fullWidth
        variant="contained"
        sx={{
          ...convertElementToSx(themeCustomElements.button.buyNow),
          mb: 3,
        }}
      >
        <FormattedMessage id="productDetail.payNowBtn" />
      </LoadingBtn>
    );
  }, [initialized, onClickPayNowBtn, payNowBtnRef, selectedItem]);

  const payNowBtnStatic = useMemo(() => {
    return (
      <Slide appear={false} in={initialized && selectedItem && !payNowInView} direction="up">
        <Button
          fullWidth
          variant="contained"
          onClick={onClickPayNowBtn}
          disabled={selectedItem && selectedItem.quantity == 0}
          sx={{
            ...convertElementToSx(themeCustomElements.button.buyNow),
            position: 'fixed',
            bottom: '0px',
            left: '0px',
            zIndex: 10,
            borderRadius: '0px',
          }}
        >
          <FormattedMessage id="productDetail.payNowBtn" />
        </Button>
      </Slide>
    );
  }, [initialized, onClickPayNowBtn, payNowInView, selectedItem]);

  return (
    <Box sx={{ overflow: 'hidden' }}>
      { productH1 }
      <Container>
        {/* General Product Section */}
        <Masonry columns={{ xs: 1, md: 2 }} spacing={0}>

          {/* Images */}
          <Box>
            <Box
              sx={{
                maxWidth: {
                  xs: maxWidthSmall,
                  md: maxWidthMedium,
                },
                m: 'auto',
              }}
            >
              <ProductCarousel
                sources={
                  getLandingImgsUrl(landingModel).map((item) => {
                    return {
                      src: item,
                      alt: landingConfig.metas.imgsAlt,
                      priority: true,
                    } as Source;
                  })
                }
              />
            </Box>
          </Box>

          {/* Content */}
          <Box>
            <Box
              sx={{
                maxWidth: {
                  xs: maxWidthSmall,
                  md: 'max-content',
                },
                m: 'auto',
                ml: {
                  xs: 'auto',
                  md: 4,
                  md_lg: 5,
                  lg: 6,
                }
              }}  
            >
              <Box>
                { productRating }
              </Box>
              <Box sx={{ mb: 2 }}>
                { productTitle }
              </Box>
              <Box sx={{ mb: 2 }}>
                { productPrice }
              </Box>
              {/* Icons */}
              <Grid container spacing={2} mb={3}>
                { landingIcon(faTruck, { id: 'productDetail.icons.shipping' }, 2) }
                { landingIcon(faLock, { id: 'productDetail.icons.payment' }, 3) }
                { landingIcon(faPhoneVolume, { id: 'productDetail.icons.support' }, 2.5) }
                { landingIcon(faArrowRightArrowLeft, { id: 'productDetail.icons.guarantee' }, 3) }
              </Grid>
              {/* Cart inputs */}
              <Grid container columnSpacing={2} rowSpacing={1}>
                <Grid item>
                  <SelectItem
                    landingId={landingModel.id}
                    items={getLandingItems(landingModel)}
                    selectInputLabel={landingConfig.product?.selectInputTexts?.label || landingConfig.packs?.selectInputTexts?.label}
                    selectInputContent={landingConfig.product?.selectInputTexts?.content || landingConfig.packs?.selectInputTexts?.content}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
                </Grid>
                <Grid item mb={2}>
                  <SelectItemQuantity
                    item={selectedItem}
                    selectedQuantity={selectedQuantity}
                    setSelectedQuantity={setSelectedQuantity}
                    label={true}
                  />
                </Grid>
              </Grid>
              { addCartBtn }
              { payNowBtn }
              { payNowBtnStatic }
              <Box>
                { productComments }
              </Box>
            </Box>
          </Box>

        </Masonry>
      </Container>

      {/* Type Product Section */}
      <Box>
        <DetailCharacteristics
          landingConfig={landingConfig}
        />
        { (landingConfig.id === inventoryConfig.vacuumMachine.id || landingConfig.id === inventoryConfig.vacuumPack.id) &&
          <EverfreshDetail />
        }
        { (landingConfig.id === inventoryConfig.vacuumBags.id || landingConfig.id === inventoryConfig.vacuumBagsPack.id) &&
          <BagsDetail />
        }
      </Box>
    </Box>
  );
};

export default LandingDetail;
