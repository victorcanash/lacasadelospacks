import { useCallback, Fragment } from 'react';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { Source } from '@core/types/multimedia';
import { convertElementToSx } from '@core/utils/themes';
import LinkButton from '@core/components/LinkButton';
import CustomImage from '@core/components/CustomImage';

import { keywords } from '@lib/config/next-seo.config';
import { pages } from '@lib/constants/navigation';
import { homeUseImgIds, homeVideoIds } from '@lib/constants/multimedia';
import { themeCustomElements } from '@lib/constants/themes/elements';
import Title from '@components/ui/Title';
import MultimediaContainer from '@components/multimedia/MultimediaContainer';

const Use = () => {
  const getPackingMachineStep = useCallback((index: number, source: Source) => {
    return (
      <>
        <Container>
          <Box
            maxWidth="sm"
            m="auto"
          >
            <Title
              type="h4Home"
              texts={{
                title: {
                  id: 'home.use.packingMachine.steps.title',
                  values: {
                    step: index + 1,
                  },
                },
              }}
              divider={false}
            />
            <Typography component="div" variant="body1">
              <FormattedMessage id={`home.use.packingMachine.steps.${index + 1}`} />
            </Typography>
          </Box>
        </Container>
        <MultimediaContainer
          type="default"
          source={source}
        />
      </>
    );
  }, []);

  return (
    <>
      <Container id="use">
        <Box
          maxWidth="sm"
          m="auto"
        >
          <Title
            type="h2"
            texts={{
              title: {
                id: 'home.use.title',
              },
            }}
            divider={true}
          />
        </Box>
      </Container>

      {/* Food Preparation Section */}
      <Container id="useFoodPreparation">
        <Box
          maxWidth="sm"
          m="auto"
          mb={1}
        >
          <Title
            type="h3Home"
            texts={{
              title: {
                id: 'home.use.foodPreparation.title',
              },
            }}
            divider={false}
          />
          <Typography component="div" variant="body1">
            <FormattedMessage id="home.use.foodPreparation.description" />
          </Typography>
        </Box>
      </Container>
      <Box
        sx={{     
          position: 'absolute',
          width: '200px',
          left: {
            xs: '5%',
            sm: '12%',
            sm_md: '20%',
            md: '25%',
            md_lg: '30%',
            lg: '35%',
            xl: '40%',
          },
          zIndex: 1,
          mt: -3,
        }}
      >
        <CustomImage
          src={homeUseImgIds[0]}
          alt={keywords.vacuumMachine.others[0]}
          width="628"
          height="628"
          layout="responsive" 
          objectFit="cover"
        />
      </Box>
      <MultimediaContainer
        type="default"
        source={{
          src: homeUseImgIds[1],
        }}
        mt={10}
      />

      {/* Bag Selection Section */}
      <Container id="useBagSelection">
        <Box
          maxWidth="sm"
          m="auto"
        >
          <Title
            type="h3Home"
            texts={{
              title: {
                id: 'home.use.bagSelection.title',
              },
            }}
            divider={false}
          />
          <Typography component="div" variant="body1">
            <FormattedMessage id="home.use.bagSelection.description" />
          </Typography>
        </Box>
      </Container>
      <MultimediaContainer
        type="default"
        source={{ 
          src: homeUseImgIds[2],
          alt: keywords.vacuumBags.others[0],
          width: '8001',
          height: '2800',
        }}
      />
      <Container>
        <Box
          maxWidth="sm"
          m="auto"
        >
          <Title
            type="h4Home"
            texts={{
              title: {
                id: 'home.use.bagSelection.sizes.title',
              },
            }}
            divider={false}
          />
          <MultimediaContainer
            mt={-4}
            type="default"
            source={{ 
              src: homeUseImgIds[3],
              alt: keywords.vacuumBags.others[0],
              width: '1080',
              height: '1080',
            }}
            borderRadius="0px"
            maxWidth="xs_sm"
          />
          <LinkButton
            href={pages.bags.path}
            id="advantages"
            sx={{
              ...convertElementToSx(themeCustomElements.button.action.primary),
              mt: 4,
            }}
          >
            <FormattedMessage id="home.use.bagSelection.buyBtn" />
          </LinkButton>
        </Box>
      </Container>
  
      {/* Packing Machine Section */}
      <Container id="usePackingMachine">
        <Box
          maxWidth="sm"
          m="auto"
        >
          <Title
            type="h3Home"
            texts={{
              title: {
                id: 'home.use.packingMachine.title',
              },
            }}
            divider={false}
          />
          <Typography component="div" variant="body1">
            <FormattedMessage id="home.use.packingMachine.description" />
          </Typography>
        </Box>
      </Container>
      { 
        ([
          {
            type: 'video',
            src: homeVideoIds[0],
            alt: keywords.vacuumMachine.others[1],
          },
          {
            type: 'image',
            src: homeUseImgIds[4],
            alt: keywords.vacuumBags.main,
          },
          {
            type: 'video',
            src: homeVideoIds[1],
            alt: keywords.vacuumMachine.others[0],
          },
          {
            type: 'video',
            src: homeVideoIds[2],
            alt: keywords.vacuumMachine.others[0],
          }
        ] as Source[]).map((item, index) => (
          <Fragment key={index}>
            { getPackingMachineStep(index, item) }
          </Fragment>
        ))
      }
    </>
  );
};

export default Use;