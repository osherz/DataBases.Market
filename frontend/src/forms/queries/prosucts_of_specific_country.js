import React, { useState } from 'react';
import AutocompleteComboBox from '../../controls/autocomplete-combo-box';
import '../form.css';

export default function ProductsOfSpecificCountryForm({ flexDirection = 'column', ...props }) {
    const [country, setCountry] = useState('');

    props.setParams(() => `country_name=${country.country_name}`);
    return (
        <div style={{ width: '250px' }}>
            <form
                style={{ display: 'flex', flexDirection: flexDirection }}
                {...props}
            >
                <div className='form-control'>
                    <AutocompleteComboBox
                        tableName='country'
                        value={country}
                        columnToShow="country_name"
                        handleValueChanged={setCountry}
                    />
                </div>
            </form>
        </div>
    );
}