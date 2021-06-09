import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import '../form.css';

export default function ShareholderForm(props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [stock, setStock] = useState();

    props.setParams(() => `name=${name}&email=${email}&stock=${stock}`);
    return (
        <div>
            <form {...props}>
                <div className='form-control'>
                    <TextField
                        name='name'
                        variant="outlined"
                        label="Name"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                    />
                </div>

                <div className='form-control'>
                    <TextField
                        name='email'
                        variant="outlined"
                        label="Email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                </div>

                <div className='form-control'>
                    <TextField
                        name='stock'
                        variant="outlined"
                        label="Stock"
                        type="number"
                        value={stock}
                        onChange={(ev) => setStock(ev.target.value)}
                    />
                </div>
            </form>
        </div>
    );
}