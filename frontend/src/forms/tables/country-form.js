import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import '../form.css';

export default function CountryForm(props) {
    const [name, setName] = useState('');
    props.setParams(()=>`country_name=${name}`);
    return (
        <div>
            <form {...props}>
                <div className='form-control'>
                    <TextField 
                        name='name' 
                        variant="outlined" 
                        label="Conutry Name" 
                        value={name} 
                        onChange={(ev)=>setName(ev.target.value)} 
                        />
                </div>
            </form>
        </div>
    );
}