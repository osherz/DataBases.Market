import React from 'react';
import AlmostOutOfStockForm from './almost-out-of-stock-form';
import AlmostOutOfStockInCountryForm from './almost_out_of_stock_in_country';
import EmployeesEarnMoreThanXForm from './employees_earn_more_than_x';
import ListOfBrenchsInSpecificTownForm from './list_of_brenchs_in_specific_town';
import ProductsOfSpecificManuForm from './products_of_specific_manu';
import ProductsOfSpecificCountryForm from './prosucts_of_specific_country';
import PublicityPriceOfSpecificGoalForm from './publicity_price_of_specific_goal';
/**
 * 
 * @param {String} param0 
 */
export default function QueriesSelector({ queryName='', setParams }) {
    queryName = queryName.toLowerCase();
    const queryForms = {
        almost_out_of_stock: <AlmostOutOfStockForm setParams={setParams} flexDirection='row' />,
        almost_out_of_stock_in_country: <AlmostOutOfStockInCountryForm setParams={setParams}  flexDirection='row' />,
        employees_earn_more_than_x: <EmployeesEarnMoreThanXForm setParams={setParams} flexDirection='row' />,
        list_of_brenchs_in_specific_town: <ListOfBrenchsInSpecificTownForm setParams={setParams} flexDirection='row' />,
        products_of_specific_manu: <ProductsOfSpecificManuForm setParams={setParams} flexDirection='row' />, 
        products_of_specific_country: <ProductsOfSpecificCountryForm setParams={setParams} flexDirection='row' />,
        publicity_price_of_specific_goal: <PublicityPriceOfSpecificGoalForm setParams={setParams} flexDirection='row' />,
    };

    return queryName in queryForms ? queryForms[queryName] : 'Error';
}