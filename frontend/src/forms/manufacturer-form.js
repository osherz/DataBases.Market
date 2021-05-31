import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AutocompleteComboBox from '../controls/autocomplete-combo-box';
import './form.css';

export default function ManufacturerForm(props) {
    const [country, setCountry] = useState('');


    return (
        <div>
            <form {...props}>
                <div className='form-control'>
                    <TextField name='name' variant="outlined" label="Manufaturer Name" />
                </div>

                <div>
                    <AutocompleteComboBox
                        tableName='country'
                        value={country}
                        handleValueChanged={newValue => setCountry(newValue)}
                    />
                </div>
            </form>
        </div>
    );
}