import React from 'react'

const CurrencyRow = ({ currencyOptions, selectedCurrency, amount, onChangeCurrecny, onChangeAmount }) => {
    return (
        <div>
            <input type="number" className='border rounded border-pink-500 
            border-solid m-1 p-1 w-1/3'
                value={amount}
                onChange={onChangeAmount} />
            <select name="" id="" className='m-2'
                onChange={onChangeCurrecny}
                value={selectedCurrency}>
                {currencyOptions.map(
                    option => (
                        <option
                            key={option}
                            value={option}>
                            {option}
                        </option>
                    )
                )}
            </select>
        </div>
    )
}

export default CurrencyRow