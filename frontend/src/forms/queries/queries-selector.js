import React from 'react';
import AlmostOutOfStock from './almost-out-of-stock-form';
/**
 * 
 * @param {String} param0 
 */
export default function QueriesSelector({ queryName='', setParams }) {
    queryName = queryName.toLowerCase();
    const queryForms = {
        almost_out_of_stock: <AlmostOutOfStock setParams={setParams} />,
    };

    return queryName in queryForms ? queryForms[queryName] : 'Error';
}