import { useState } from 'react';
import { useRouter } from 'next/router';

import { FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import UpdateIcon from '@mui/icons-material/Update';

import { ManageActions } from '@core/constants/app';
import type { ProductPack } from '@core/types/products';
import Button from '@core/components/inputs/Button';

import Pagination from '@core/components/ui/Pagination';
import ManagePPackForm from '@core/components/forms/admin/ManagePPackForm';
import PackDetail from '@core/components/Admin/sections/old/details/PackDetail';

export type CheckPacksSectionProps = {
  packs: ProductPack[],
  totalPages: number,
  currentPage: number,
};

const CheckPacksSection = (props: CheckPacksSectionProps) => {
  const { 
    packs, 
    totalPages, 
    currentPage, 
  } = props;

  const router = useRouter();

  const [selected, setSelected] = useState<ProductPack | undefined>(undefined);

  const handleChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    //router.push(getPacksHref(page));
  };

  const onClickUpdateBtn = (pack: ProductPack) => {
    setSelected(pack);
  }

  const onSuccessUpdate = (_pack: ProductPack) => {
    setSelected(undefined);
  }

  const onSuccessDelete = () => {
    setSelected(undefined);
  }

  const onCancel = () => {
    setSelected(undefined);
  }

  return (
    <>           
      { !selected ?
        <>
          <Typography component="h1" variant="h1">
            <FormattedMessage
              id="admin.productPacks"
            />
          </Typography>
          
          <Grid container spacing={4} py={3}>
            {packs?.map((item, index) => (
              <Grid item xs={6} key={index}>
                <PackDetail
                  pack={item}
                  created={true}
                />
                <Button
                  startIcon={<UpdateIcon />}                    
                  onClick={() => onClickUpdateBtn(item)}
                >
                  <FormattedMessage
                    id="admin.updatePackBtn"
                  />
                </Button>
              </Grid>
            ))}
          </Grid>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onChangePage={handleChangePage}
          />
        </>
        :
        <ManagePPackForm
          action={ManageActions.update}
          productPack={selected}
          onSubmitSuccess={onSuccessUpdate}
          onDeleteSuccess={onSuccessDelete}
          onCancel={onCancel}
        />
      }
    </>
  );
};

export default CheckPacksSection;