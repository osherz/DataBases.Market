import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AutocompleteComboBox from '../../controls/autocomplete-combo-box';
import { dateNumberToString } from '../../utils';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import '../form.css';

export default function AddProductsToBranchForm(props) {
    const [branch, setBranch] = useState('');
    const [product, setProduct] = useState('');
    const [amount, setAmount] = useState();
    const [itemPrice, setItemPrice] = useState();
    const [buyDate, setBuyDate] = useState(Date.now());

    props.setParams(() => `branch_id=${branch['ID']}&barcode=${product.barcode}&amount=${amount}&price=${itemPrice}&date=${dateNumberToString(buyDate)}`);
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

                <div className='form-control'>
                    <TextField
                        name='itemPrice'
                        variant="outlined"
                        label="Item Price"
                        type="number"
                        value={itemPrice}
                        onChange={(ev) => setItemPrice(ev.target.value)}
                        fullWidth
                    />
                </div>

                <div className='form-control'>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            margin="normal"
                            label="Expenses Date"
                            value={buyDate}
                            onChange={setBuyDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            fullWidth
                        />
                    </MuiPickersUtilsProvider>
                </div>
            </form>
        </div>
    );
}