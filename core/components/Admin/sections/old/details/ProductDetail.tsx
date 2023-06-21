import { useIntl } from 'react-intl';
// import { Pagination } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';

import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

import type { Product } from '@core/types/products';
import { useProductsContext } from '@core/contexts/ProductsContext';
// import CustomImage from '@core/components/CustomImage';

type ProductDetailProps = {
  product: Product,
  created: boolean,
};

const ProductDetail = (props: ProductDetailProps) => {
  const { product, created } = props;

  const { getAllCategories } = useProductsContext();

  const intl = useIntl();

  return (
    <>
      { created &&
        <Typography component="div" variant="body1">
          {`${intl.formatMessage({ id: 'forms.id' })}: ${product.id}`}
        </Typography>
      }
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.en' })}: ${product.name.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.name.es' })}: ${product.name.es}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.en' })}: ${product.description.en}`}
      </Typography>
      <Typography component="div" variant="body1">
        {`${intl.formatMessage({ id: 'forms.description.es' })}: ${product.description.es}`}
      </Typography>
      <Typography component="div" variant="body1">
        {/*`${intl.formatMessage({ id: 'forms.category' })}: ${getAllCategories().filter((item) => item.id == product.categoryId)[0]?.name.current}`*/}
      </Typography>
     
      { created &&
        <>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.lowestRealPrice' })}: ${product.lowestRealPrice}`}
          </Typography>
          <Typography component="div" variant="body1">
            {`${intl.formatMessage({ id: 'forms.activeDiscountId' })}: ${product.activeDiscount ? product.activeDiscount.id : 'None'}`}
          </Typography>
          {/*<Box sx={{width: "360px"}}>
            <Box>
              <Swiper
                modules={[Pagination]}
                loop
                pagination={{
                  clickable: true
                }}
              >
                { getProductDetailImgsUrl(product).map((imgSrc, imgSrcIndex) => (
                  <SwiperSlide key={imgSrcIndex}>
                    <div style={{ marginBottom: "40px"}}>
                      <CustomImage 
                        src={imgSrc}
                        width="1080"
                        height="1080"
                        layout="responsive" 
                        objectFit="cover"
                        priority
                        style={{ borderRadius: '10px' }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Box>*/}
        </>
      }
    </>
  );
};

export default ProductDetail;