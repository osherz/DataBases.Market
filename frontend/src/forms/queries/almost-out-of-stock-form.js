import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import '../form.css';

export default function AlmostOutOfStockForm({ flexDirection = "column", ...props }) {
    const [minAmount, setMinAmount] = useState(0);

    props.setParams(() => `min_amount=${minAmount}`);
    return (
        <div>
            <form style={{ display: 'flex', flexDirection: flexDirection }}
                {...props}>
                <div className='form-control'>
                    <TextField
                        name='minAmount'
                        variant="outlined"
                        label="Min Amount"
                        type="number"
                        value={minAmount}
                        onChange={(ev) => setMinAmount(ev.target.value)}
                    />
                </div>
            </form>
        </div>
    );
}