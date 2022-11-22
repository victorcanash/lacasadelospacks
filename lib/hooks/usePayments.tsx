import { useState } from 'react';

import { Dropin, PaymentMethodPayload } from 'braintree-web-drop-in';

import { 
  checkPaymentMethod as checkPaymentMethodMW, 
  createTransaction as createTransactionMW, 
} from '@core/utils/payments';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';

const usePayments = () => {
  const { setLoading } = useAppContext();
  const { token, setBraintreeToken } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const checkPaymentMethod = (dropin: Dropin, onSuccess?: (paymentPayload: PaymentMethodPayload) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    checkPaymentMethodMW(dropin)
      .then((response: {paymentPayload: PaymentMethodPayload}) => {
        onCheckPaymentMethodSuccess(response.paymentPayload, onSuccess);
      }).catch((_error: Error) => {
        dropin.clearSelectedPaymentMethod();
        const errorMsg = 'Something went wrong. Try again or select a different payment method.';
        setErrorMsg(errorMsg);
        setLoading(false);
      })
  };

  const onCheckPaymentMethodSuccess = (paymentPayload: PaymentMethodPayload, onSuccess?: (paymentPayload: PaymentMethodPayload) => void) => {
    if (onSuccess) {
      onSuccess(paymentPayload);
    }
    setLoading(false);
    setSuccessMsg('Checked payment method');
  };

  const createTransaction = async (paymentMethodNonce: string, onSuccess?: (transactionId: string) => void, onError?: (message: string) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    await createTransactionMW(token, paymentMethodNonce)
      .then((response: { transactionId: string, braintreeToken: string }) => {
        onCreateTransactionSuccess(response.transactionId, response.braintreeToken, onSuccess);
      }).catch((error) => {
        let errorMsg = error.message;
        if (errorMsg.includes('Insufficient Funds')) {
          errorMsg = 'Failed proceeding to payment, insufficient funds';
        } else {
          errorMsg = 'Failed proceeding to payment, modify your data or choose a different payment method';
        }
        setErrorMsg(errorMsg);
        setLoading(false);
        if (onError) {
          onError(errorMsg);
        }
      });
  };

  const onCreateTransactionSuccess = (transactionId: string, braintreeToken: string, onSuccess?: (transactionId: string) => void) => {
    setBraintreeToken(braintreeToken);
    if (onSuccess) {
      onSuccess(transactionId);
    }
    setLoading(false);
    setSuccessMsg('Created transaction');
  }

  return {
    errorMsg,
    successMsg,
    checkPaymentMethod,
    createTransaction,
  };
};

export default usePayments;
