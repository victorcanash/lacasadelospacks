import * as Yup from 'yup';
import { useIntl } from 'react-intl';

import { CountryOptions } from '@core/constants/addresses'
import { subtractYears } from '@core/utils/dates';

const useForms = () => {
  const intl = useIntl();

  const initForms = () => {
    Yup.setLocale({
      mixed: {
        default: intl.formatMessage({ id: 'forms.errors.default' }),
        required: intl.formatMessage({ id: 'forms.errors.required' }),
      },
      string: {
        min: ({ min }) => (intl.formatMessage({ id: 'forms.errors.minString' }, { min })),
        max: ({ max }) => (intl.formatMessage({ id: 'forms.errors.maxString' }, { max })),
        email: intl.formatMessage({ id: 'forms.errors.email' }),
      },
      number: {
        min: ({ min }) => (intl.formatMessage({ id: 'forms.errors.minNumber' }, { min })),
        max: ({ max }) => (intl.formatMessage({ id: 'forms.errors.maxNumber' }, { max })),
      },
    });
  };

  // Custom fields

  const userFieldsValidation = {
    email: Yup
      .string()
      .email()
      .required(),
    password: Yup
      .string()
      .min(8)
      .required(),
    confirm: (passwordKey: string) => {
      return Yup
        .string()
        .when(passwordKey, {
          is: (value: string) => (value && value.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref(passwordKey)],
            intl.formatMessage({ id: 'forms.errors.confirmPassword' }),
          ),
        })
        .required('You must confirm your password');
    },
    firstName: Yup
      .string()
      .min(3)
      .max(12)
      .required(),
    lastName: Yup
      .string()
      .min(3)
      .max(12)
      .required(),
    birthday: Yup
      .date()
      .max(
        subtractYears(6), 
        intl.formatMessage(
          { id: 'forms.errors.maxBirthday' }, 
          { minYears: 6 }
        )
      )
      .nullable()
      .required(),
  };

  const userFieldsInitValues = { 
    email: '',
    password: '',
    confirm: '',
    firstName: '',
    lastName: '',
    birthday: subtractYears(18),
  };

  const addressFieldsValidation = {
    firstName: userFieldsValidation.firstName,
    lastName: userFieldsValidation.lastName,
    addressLine1: Yup
      .string()
      .min(3)
      .max(200)
      .required(),
    addressLine2: Yup
      .string()
      .min(3)
      .max(200),
    postalCode: Yup
      .string()
      .min(5)
      .max(7)
      .required(),
    locality: Yup
      .string()
      .min(3)
      .max(30)
      .required(),
    country: Yup
      .string()
      .min(3)
      .max(30)
      .required(),
  };

  const addressFieldsInitValues = { 
    firstName: userFieldsInitValues.firstName,
    lastName: userFieldsInitValues.lastName,
    addressLine1: '',
    addressLine2: '',
    postalCode: '',
    locality: '',
    country: CountryOptions.ES,
  };

  const orderFieldsValidation = {
    locale: Yup
      .string()
      .min(2)
      .max(5)
      .required(),
    id: Yup
      .number()
      .min(0)
      .required(),
    userId: Yup
      .number()
      .min(0)
      .required(),
    braintreeTransactionId: Yup
      .string()
      .min(1)
      .required(),
  };

  const orderFieldsInitValues = {
    id: 0,
    locale: intl.defaultLocale,
    userId: 0,
    braintreeTransactionId: '',
  }

  const orderProductFieldsValidation = {
    quantity: Yup
      .number()
      .min(1)
      .required(),
    inventoryId: Yup
      .number()
      .min(0)
      .required(),
  };

  const orderProductFieldsInitValues = {
    quantity: 1,
    inventoryId: 0,
  };

  const localizedTextsFieldsValidation = {
    en: Yup
      .string()
      .min(3)
      .required(),
    es: Yup
      .string()
      .min(3)
      .required(),
  };

  const localizedTextsFieldsInitValues = {
    en: '',
    es: '',
  };

  const productFieldsValidation = {
    categoryId: Yup
      .number()
      .min(0)
      .required(),
    name: Yup.object().shape(localizedTextsFieldsValidation),
    description: Yup.object().shape(localizedTextsFieldsValidation),
  };

  const productFieldsInitValues = {
    categoryId: 0,
    name: localizedTextsFieldsInitValues,
    description: localizedTextsFieldsInitValues,
  };

  const categoryFieldsValidation = {
    name: Yup.object().shape(localizedTextsFieldsValidation),
    description: Yup.object().shape(localizedTextsFieldsValidation),
  }

  const categoryFieldsInitValues = {
    name: localizedTextsFieldsInitValues,
    description: localizedTextsFieldsInitValues,
  }

  const inventoryFieldsValidation = {
    sku: Yup
      .string()
      .required(),
    name: Yup.object().shape(localizedTextsFieldsValidation),
    description: Yup.object().shape(localizedTextsFieldsValidation),
    price: Yup
      .number()
      .min(0)
      .required(),
  };

  const inventoryFieldsInitValues = {
    sku: '',
    name: localizedTextsFieldsInitValues,
    description: localizedTextsFieldsInitValues,
    price: 0,
  };

  const discountFieldsValidation = {
    name: Yup.object().shape(localizedTextsFieldsValidation),
    description: Yup.object().shape(localizedTextsFieldsValidation),
    discountPercent: Yup
      .number()
      .min(0.1)
      .required(),
    active: Yup
      .boolean()
  };

  const discountFieldsInitValues = {
    name: localizedTextsFieldsInitValues,
    description: localizedTextsFieldsInitValues,
    discountPercent: 0.1,
    active: false,
  };

  // Custom forms

  const loginFormValidation = Yup.object().shape({
    email: userFieldsValidation.email,
    password: userFieldsValidation.password,
  });
  
  const registerFormValidation = Yup.object().shape({
    email: userFieldsValidation.email,
    password: userFieldsValidation.password,
    confirm: userFieldsValidation.confirm('password'),
    firstName: userFieldsValidation.firstName,
    lastName: userFieldsValidation.lastName,
    birthday: userFieldsValidation.birthday,
  });
  
  const sendEmailFormValidation = Yup.object().shape({
    email: userFieldsValidation.email,
  });
  
  const updateEmailFormValidation = Yup.object().shape({
    password: userFieldsValidation.password,
    newEmail: userFieldsValidation.email,
  });
  
  const resetPasswordFormValidation = Yup.object().shape({
    newPassword: userFieldsValidation.password,
    newConfirm: userFieldsValidation.confirm('newPassword'),
  });

  const updateUserFormValidation = Yup.object().shape({
    firstName: userFieldsValidation.firstName,
    lastName: userFieldsValidation.lastName,
    birthday: userFieldsValidation.birthday,
  });

  const checkoutAddressesFormValidation = Yup.object().shape({
    shipping: Yup.object().shape(addressFieldsValidation),
    billing: Yup
      .object().when('sameAsShipping', {
        is: (sameAsShipping: boolean) => !sameAsShipping,
        then: Yup.object().shape(addressFieldsValidation),
      }),
    sameAsShipping: Yup
      .boolean(),
  });

  const createFailedOrderFormValidation = Yup.object().shape({
    locale: orderFieldsValidation.locale,
    userId: orderFieldsValidation.userId,
    braintreeTransactionId: orderFieldsValidation.braintreeTransactionId,
    shipping: Yup.object().shape(addressFieldsValidation),
  });
  
  const createFailedOrderProductFormValidation = Yup.object().shape({
    quantity: orderProductFieldsValidation.quantity,
    inventoryId: orderProductFieldsValidation.inventoryId,
  });
  
  const sendFailedOrderEmailFormValidation = Yup.object().shape({
    locale: orderFieldsValidation.locale,
    orderId: orderFieldsValidation.id,
  });

  const manageProductFormValidation = Yup.object().shape({
    categoryId: productFieldsValidation.categoryId,
    name: productFieldsValidation.name,
    description: productFieldsValidation.description,
  });

  const manageCategoryFormValidation = Yup.object().shape({
    name: categoryFieldsValidation.name,
    description: categoryFieldsValidation.description,
  });

  const manageInventoryFormValidation = Yup.object().shape({
    sku: inventoryFieldsValidation.sku,
    name: inventoryFieldsValidation.name,
    description: productFieldsValidation.description,
    price: inventoryFieldsValidation.price,
  });

  const manageDiscountFormValidation = Yup.object().shape({
    name: discountFieldsValidation.name,
    description: discountFieldsValidation.description,
    discountPercent: discountFieldsValidation.discountPercent,
    active: discountFieldsValidation.active,
  });

  return {
    initForms,
    
    userFieldsInitValues,
    addressFieldsInitValues,
    orderFieldsInitValues,
    orderProductFieldsInitValues,
    productFieldsInitValues,
    categoryFieldsInitValues,
    inventoryFieldsInitValues,
    discountFieldsInitValues,

    loginFormValidation,
    registerFormValidation,
    sendEmailFormValidation,
    updateEmailFormValidation,
    resetPasswordFormValidation,
    updateUserFormValidation,
    checkoutAddressesFormValidation,
    createFailedOrderFormValidation,
    createFailedOrderProductFormValidation,
    sendFailedOrderEmailFormValidation,
    manageProductFormValidation,
    manageCategoryFormValidation,
    manageInventoryFormValidation,
    manageDiscountFormValidation,
  }
};

export default useForms;
