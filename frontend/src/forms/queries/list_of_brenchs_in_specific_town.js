import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AutocompleteComboBox from '../../controls/autocomplete-combo-box';
import '../form.css';

export default function ListOfBrenchsInSpecificTownForm({ flexDirection = 'column', ...props }) {
    const [town, setTown] = useState('');

    props.setParams(() => `town=${town}`);
    return (
        <div>
            <form 
            style={{display: 'flex', flexDirection: flexDirection }}
            {...props}
            >
                <div className='form-control'>
                    <TextField
                        name='town'
                        variant="outlined"
                        label="Town"
                        value={town}
                        onChange={(ev) => setTown(ev.target.value)}
                        fullWidth
                    />
                </div>
            </form>
        </div>
    );
}