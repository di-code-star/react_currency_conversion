import { useEffect, useState } from 'react'

import './App.css'
import CurrencyRow from './components/CurrencyRow'

const BASE_URL = "https://open.er-api.com/v6/latest";


function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  console.log(exchangeRate)

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(
    () => {
      fetch(BASE_URL)
        .then(res => res.json())
        .then(data => {
          const firstCurrency = Object.keys(data.rates)[1]
          setCurrencyOptions(
            [...Object.keys(data.rates)]
          )
          setFromCurrency(data.base_code)
          setToCurrency(firstCurrency)
          setExchangeRate(data.rates[firstCurrency])
        }
        )
    }, []
  )

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <div className='m-0 w-screen min-h-screen bg-black justify-center items-center text-center text-gray-400'>
        <h1 className='m-0 mb-1'>
          Convert
        </h1>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrecny={e => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}>

        </CurrencyRow>
        <div className='font-bold text-4xl'>
          =
        </div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrecny={e => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}>

        </CurrencyRow>
      </div>
    </>
  )
}

export default App
