import { useRef, useEffect } from 'react';

import type { User } from '@core/types/auth';
import type { ProductCategory } from '@core/types/products';
import type { Cart } from '@core/types/cart';
import { getCredentials } from '@core/utils/auth';
import { getAllProductCategories } from '@core/utils/products';
import { useAppContext } from '@lib/contexts/AppContext';
import { useSearchContext } from '@lib/contexts/SearchContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';

const useApp = () => {
  const { setInitialized } = useAppContext();
  const { initSearch } = useSearchContext();
  const { initAuth } = useAuthContext();
  const { initCart } = useCartContext();

  const firstRenderRef = useRef(false);

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true;
      
      const initData = async() => {
        await getCredentials().then((response: {token: string, user: User, cart: Cart}) => {
          initAuth(response.token, response.user);
          initCart(response.cart);
        }).catch((error: Error) => {
        }); 

        await getAllProductCategories().then((response: {productCategories: ProductCategory[]}) => {
          initSearch(response.productCategories);
          setInitialized(true);
        }).catch((error: Error) => {
          throw error;
        });
      };  

      initData();
    }    
  }, [initAuth, initCart, initSearch, setInitialized]);

  return {};
}

export default useApp;
