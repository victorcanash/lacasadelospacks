import Image, { StaticImageData } from 'next/image';

import { FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type ProductTutorialProps = {
  titleId?: string,
  textId: string,
  source: {
    type?: 'video' | 'image',
    src: StaticImageData | 'string',
  },
};

const ProductTutorial = (props: ProductTutorialProps) => {
  const { titleId, textId, source } = props;

  const maxWidth = '800px';

  return (
    <Grid
      container
      className='animate__animated animate__fadeIn'
    >
      <Grid 
        item 
        xs={12}
      >
        <Box 
          sx={{ 
            maxWidth: maxWidth, 
            m: 'auto',
            textAlign: 'center',
          }}
        >
          { titleId &&
            <Typography component="h2" variant="h1" sx={{ mt: 2, mb: 3 }}>
              <FormattedMessage id={titleId} />
            </Typography> 
          }
          <Typography component="div" variant="body1" sx={{ mb: 3 }}>
            <FormattedMessage id={textId} />
          </Typography>
        </Box>
        <Box 
          sx={{ 
            maxWidth: maxWidth, 
            m: 'auto',
            mb: '2',
          }}
        >
          { source.type == 'video' ?
            <video 
              loop
              muted
              autoPlay={true}  
              style={{ 
                position: 'relative',
                width: '100%', 
                height: '100%',
                borderRadius: '10px',
              }}
            >
              <source src={source.src as string} />
            </video> :
            <Image 
              src={source.src} 
              alt="Tutorial" 
              width={500}
              height={500}
              quality={100}
              layout="responsive" 
              objectFit="cover"
              style={{ borderRadius: '10px' }}
            />
          }
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductTutorial;
