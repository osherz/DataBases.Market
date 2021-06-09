import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AutocompleteComboBox from '../../controls/autocomplete-combo-box';
import '../form.css';

export default function BuyProductFromBranchForm(props) {
    const [branch, setBranch] = useState('');
    const [product, setProduct] = useState('');
    const [amount, setAmount] = useState();

    props.setParams(() => `branch_id=${branch['ID']}&barcode=${product.barcode}&amount=${amount}`);
    return (
        <div>
            <form {...props}>
                <div className='form-control'>
                    <AutocompleteComboBox
                        tableName='branchs'
                        value={branch}
                        columnToShow="ADDRESS"
                        handleValueChanged={setBranch}
                    />
                </div>

                <div className='form-control'>
                    <AutocompleteComboBox
                        tableName='product'
                        value={product}
                        columnToShow="name"
                        handleValueChanged={setProduct}
                    />
                </div>

                <div className='form-control'>
                    <TextField
                        name='amount'
                        variant="outlined"
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(ev) => setAmount(ev.target.value)}
                        fullWidth
                    />
                </div>
            </form>
        </div>
    );
}