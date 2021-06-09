import React from 'react';
import ManufacturerForm from './tables/manufacturer-form';
import CountryForm from './tables/country-form';
import ManufacturerExpensesForm from './tables/manufacturer-expenses-form';
import ShareholderForm from './tables/shareholder-form';
import PublicityForm from './tables/publicity';
import ProductInBranchForm from './tables/product-in-branch-form';
import BranchForm from './tables/branch-form';
import EmployeeForm from './tables/employee-form';
import ProductForm from './tables/product-form';

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
        employees: <EmployeeForm setParams={setParams} />,
        product: <ProductForm setParams={setParams} />,
    };

    return tableName in forms ? forms[tableName] : 'Error';
}