import React from 'react';
import AlmostOutOfStockForm from './almost-out-of-stock-form';
import AlmostOutOfStockInCountryForm from './almost_out_of_stock_in_country';
/**
 * 
 * @param {String} param0 
 */
export default function QueriesSelector({ queryName='', setParams }) {
    queryName = queryName.toLowerCase();
    const queryForms = {
        almost_out_of_stock: <AlmostOutOfStockForm setParams={setParams} flexDirection='row' />,
        almost_out_of_stock_in_country: <AlmostOutOfStockInCountryForm setParams={setParams}  flexDirection='row' />,
    };

    return queryName in queryForms ? queryForms[queryName] : 'Error';
}