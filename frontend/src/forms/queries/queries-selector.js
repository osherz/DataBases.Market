import React from 'react';
import AlmostOutOfStock from './almost-out-of-stock-form';
import AlmostOutOfStockInCountry from './almost_out_of_stock_in_country';
/**
 * 
 * @param {String} param0 
 */
export default function QueriesSelector({ queryName='', setParams }) {
    queryName = queryName.toLowerCase();
    const queryForms = {
        almost_out_of_stock: <AlmostOutOfStock setParams={setParams} flexDirection='row' />,
        almost_out_of_stock_in_country: <AlmostOutOfStockInCountry setParams={setParams}  flexDirection='row' />,
    };

    return queryName in queryForms ? queryForms[queryName] : 'Error';
}