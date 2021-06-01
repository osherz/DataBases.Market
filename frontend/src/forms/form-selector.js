import React from 'react';
import ManufacturerForm from './manufacturer-form';
import CountryForm from './country-form';
import ManufacturerExpensesForm from './manufacturer-expenses-form';
import ShareholderForm from './shareholder-form';
import PublicityForm from './publicity';
import ProductInBranchForm from './product-in-branch-form';
import BranchForm from './branch-form';

/**
 * 
 * @param {String} param0 
 */
export default function FormSelector({ tableName='', setParams }) {
    tableName = tableName.toLowerCase();
    const forms = {
        country: <CountryForm setParams={setParams} />,
        manufacturer: <ManufacturerForm setParams={setParams} />,
        manufacturer_expenses: <ManufacturerExpensesForm setParams={setParams} />,
        shareholder: <ShareholderForm setParams={setParams} />,
        publicity: <PublicityForm setParams={setParams} />,
        product_in_branch: <ProductInBranchForm setParams={setParams} />,
        branchs: <BranchForm setParams={setParams} />,
    };

    return tableName in forms ? forms[tableName] : 'Error';
}