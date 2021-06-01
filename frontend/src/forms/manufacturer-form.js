import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AutocompleteComboBox from '../controls/autocomplete-combo-box';
import './form.css';

export default function ManufacturerForm(props) {
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    props.setParams(()=>`name=${name}&countryid=${country.id}`);
    return (
        <div>
            <form {...props}>
                <div className='form-control'>
                    <TextField 
                        name='name' 
                        variant="outlined" 
                        label="Manufaturer Name" 
                        value={name} 
                        onChange={(ev)=>setName(ev.target.value)} 
                        />
                </div>

                <div>
                    <AutocompleteComboBox
                        tableName='country'
                        value={country}
                        handleValueChanged={setCountry}
                    />
                </div>
            </form>
        </div>
    );
}