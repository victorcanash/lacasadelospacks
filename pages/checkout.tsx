import { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { PageTypes } from '@core/constants/navigation';
import { isAdminUser } from '@core/utils/auth';

import { pages } from '@lib/constants/navigation';
import { useAppContext } from '@lib/contexts/AppContext';
import { useCartContext } from '@lib/contexts/CartContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import usePage from '@lib/hooks/usePage';
import PageHeader from '@components/ui/PageHeader';
import CheckoutForms from '@components/forms/checkout';

const Checkout: NextPage = () => {
  const { setLoading } = useAppContext();
  const { disabledCheckoutPage } = useCartContext();
  const {token, paypal } = useAuthContext();

  const router = useRouter();

  const page = usePage(false);

  const [loadedCheckout, setLoadedCheckout] = useState(false);

  const init = useCallback(async () => {
    if (disabledCheckoutPage()) {
      let isAdmin = false;
      await isAdminUser(token).then((response: boolean) => {
        isAdmin = response;
      }).catch((_error) => {})
      if (!isAdmin) {
        router.push(pages.home.path);
        return;
      }
    }
    setLoadedCheckout(true);
    setLoading(false);
  }, [disabledCheckoutPage, router, setLoading, token]);

  useEffect(() => {
    if (page.checked) {
      init();
    }
  }, [init, page.checked]);

  return (
    <>
      <PageHeader
        pageType={PageTypes.main}
        metas={{
          titleId: 'checkout.metas.title',
          descriptionId: 'checkout.metas.description',
        }}
        marginTop={true}
      />

      { (loadedCheckout && paypal) &&
        <CheckoutForms />
      }
    </>
  );
};

export default Checkout;
