import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Form } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { BasicCardInfo } from '~/types';
import { ErrorMessage } from '../ErrorMessage';
var valid = require('card-validator');

function CreditCardForm(errorMessage: any) {
  //console.log(errorMessage);
  const yearRef = useRef();
  const codeRef = useRef();
  const [cardData, setCardData] = useState<BasicCardInfo>({
    cardNumber: '',
    month: '',
    year: '',
    cardCode: '',
  });
  const [error, setError] = useState({
    cardNumber: false,
    year: false,
    month: false,
    code: false,
  });
  const [cardType, setCardType] = useState<string>('');
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [spinner, setSpinner] = useState<boolean>(false);

  const hasErrors = (errObject: Object, dataObject: Object) => {
    const hasError =
      Object.values(errObject).some((value) => value === true) ||
      Object.values(dataObject).some((value) => value === '');
    setBtnDisabled(hasError);
  };

  useEffect(() => {
    hasErrors(error, cardData);
  }, [error, cardData]);

  useEffect(() => {
    if (errorMessage?.errorMessage) setSpinner(false);
  }, [errorMessage]);

  useEffect(() => {
    if (cardData.month.length == 2 && !error.month) {
      yearRef?.current?.focus();
    }
    if (cardData.year.length == 2 && !error.year) {
      codeRef?.current?.focus();
    }
  }, [cardData.month, cardData.year]);

  const cardNumberChange = (e) => {
    setCardData({
      ...cardData,
      cardNumber: e.target.value,
    });
    var numberValidation = valid.number(e.target.value);
    if (!numberValidation.isValid) {
      setCardType('');
      setError({
        ...error,
        cardNumber: true,
      });
    } else {
      setCardType(numberValidation?.card?.niceType);
      setError({
        ...error,
        cardNumber: false,
      });
    }
  };

  const monthChange = (e) => {
    if (e.target.value > 12 || e.target.value < 1) {
      setError({ ...error, month: true });
    } else {
      setError({ ...error, month: false });
    }
    setCardData({
      ...cardData,
      month: e.target.value,
    });
  };
  const yearChange = (e) => {
    const currentYear = new Date().getFullYear().toString().substring(2);
    if (
      e.target.value > Number(currentYear) + 5 ||
      e.target.value < Number(currentYear)
    ) {
      setError({ ...error, year: true });
    } else {
      setError({ ...error, year: false });
    }
    setCardData({
      ...cardData,
      year: e.target.value,
    });
  };
  return (
    <div className="max-w-md mx-auto p-8 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Credit Card Information</h2>
      <Form
        // action="/api/authorize"
        method="post"
        onSubmit={() => setSpinner(true)}
      >
        <div className="mb-4">
          <div className="flex justify-between">
            <input type="hidden" name="paymentMethodCode" value="authorize" />

            <label className="block text-gray-700 font-bold mb-2">
              Credit Card Number:
            </label>
            <span className="text-orange-300">{cardType}</span>
          </div>

          <input
            type="number"
            name="cardNumber"
            value={cardData.cardNumber}
            onChange={(e) => cardNumberChange(e)}
            placeholder="Enter your credit card number"
            className={`w-full px-4 py-2  rounded-lg ${
              error.cardNumber ? ' border-red-600 bg-red-300 text-red-600' : ''
            } `}
          />
          {error.cardNumber && (
            <span className="text-red-600">Enter Valid Card Details</span>
          )}
        </div>

        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <label className="block text-gray-700 font-bold mb-2">
              Expiry Date:
            </label>
            <input
              type="number"
              name="month"
              value={cardData.month}
              onChange={(e) => {
                // setCardData({
                //     ...cardData,
                //     month: e.target.value
                // })
                monthChange(e);
              }}
              placeholder="MM"
              className={`w-[80px] px-4 py-2  rounded-lg ${
                error.month ? ' border-red-600 bg-red-300 text-red-600' : ''
              } `}
            />
            <span className="mx-2 text-xl">/</span>
            <input
              ref={yearRef}
              type="text"
              name="year"
              value={cardData.year}
              onChange={(e) => {
                yearChange(e);
              }}
              placeholder="YY"
              className={` w-[80px] px-4 py-2  rounded-lg ${
                error.year ? 'text-red-600 bg-red-300 border-red-600' : ''
              }`}
            />
            {error.month && <span className="text-red-600">from 01 to 12</span>}
            {error.year && <span className="text-red-600">invalid year</span>}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Card Code:
          </label>
          <input
            ref={codeRef}
            type="text"
            name="cardCode"
            value={cardData.cardCode}
            onChange={(e) => {
              setCardData({
                ...cardData,
                cardCode: e.target.value,
              });
            }}
            placeholder="CVV"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {errorMessage && (
          <div className="text-red-600 text-lg">
            {' '}
            {errorMessage?.errorMessage}{' '}
          </div>
        )}

        <button
          type="submit"
          disabled={btnDisabled || spinner}
          className={
            btnDisabled
              ? 'flex gap-2 items-center opacity-60 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:bg-blue-600'
              : `
         flex gap-2 items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:bg-blue-600`
          }
        >
          Proceed{' '}
          {spinner && (
            <ArrowPathIcon className="animate-spin h-5 w-5 text-white" />
          )}
        </button>
      </Form>
    </div>
  );
}

export default CreditCardForm;
