import { useRouter } from 'next/router';

import { ManageActions } from '@core/constants/app';
import { AdminSections } from '@core/constants/admin';

import { pages } from '@lib/config/navigation.config';
import ManagePCategoryForm from '@core/components/forms/admin/ManagePCategoryForm';

const CreateCategorySection = () => {
  const router = useRouter();

  const onSuccessManage = () => {
    router.push(`${pages.admin.path}?section=${AdminSections.home}`);
  }

  return (
    <>           
      <ManagePCategoryForm
        action={ManageActions.create}
        onSubmitSuccess={onSuccessManage}
      />
    </>
  );
};

export default CreateCategorySection;