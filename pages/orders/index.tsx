import { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';

import { pages } from '@core/config/navigation.config';
import { Order } from '@core/types/orders';
import usePage from '@lib/hooks/usePage';
import useOrders from '@lib/hooks/useOrders';
import OrderList from '@components/orders/OrderList';

const Orders: NextPage = () => {
  const router = useRouter();
  const intl = useIntl();

  const page = usePage();
  const { getOrders } = useOrders();

  const title = intl.formatMessage({ id: 'orderList.metas.title' });
  const description = intl.formatMessage({ id: 'orderList.metas.description' });

  const [loadedOrders, setLoadedOrders] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const onChangePage = (page: number) => {
    getOrders(page, onSuccessGetOrders);
  };

  const onSuccessGetOrders = useCallback((orders: Order[], totalPages: number, currentPage: number) => {
    setOrders(orders);
    setTotalPages(totalPages);
    setCurrentPage(currentPage);
  }, []);

  const onErrorGetOrders = useCallback((_errorMsg: string) => {
    router.push(pages.home.path);
  }, [router]);

  useEffect(() => {
    if (page.checked && !loadedOrders) {
      setLoadedOrders(true);
      getOrders(0, onSuccessGetOrders, onErrorGetOrders);
    }
  }, [getOrders, loadedOrders, onErrorGetOrders, onSuccessGetOrders, page.checked]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

    { loadedOrders &&
      <OrderList 
        orders={orders} 
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    }
    </>
  );
};

export default Orders;