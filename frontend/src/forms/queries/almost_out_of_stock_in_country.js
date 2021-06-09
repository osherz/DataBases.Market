import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AutocompleteComboBox from '../../controls/autocomplete-combo-box';
import '../form.css';

export default function AlmostOutOfStockInCountry({ flexDirection = 'column', ...props }) {
    const [minAmount, setMinAmount] = useState(0);
    const [country, setCountry] = useState('');

    props.setParams(() => `min_amount=${minAmount}&country_name=${country.country_name}`);
    return (
        <div>
            <form 
            style={{display: 'flex', flexDirection: flexDirection }}
            {...props}
            >
                <div className='form-control'>
                    <TextField
                        name='minAmount'
                        variant="outlined"
                        label="Min Amount"
                        type="number"
                        value={minAmount}
                        onChange={(ev) => setMinAmount(ev.target.value)}
                        fullWidth
                    />
                </div>

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