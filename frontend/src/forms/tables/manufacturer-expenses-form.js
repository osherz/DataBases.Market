import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AutocompleteComboBox from '../../controls/autocomplete-combo-box';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {dateNumberToString} from '../../utils';
import '../form.css';

export default function ManufacturerExpensesForm(props) {
    const [manufacturer, seManufacturer] = useState('');
    const [expenses, setExpenses] = useState(0);
    const [dateOfExpenses, setDateOfExpenses] = useState(Date.now());

    props.setParams(() => `manufacturer_id=${manufacturer.id}&expenses=${expenses}&date_of_expenses=${dateNumberToString(dateOfExpenses)}`);
    return (
        <div>
            <form {...props}>
                <div className='form-control'>
                    <TextField
                        label="expenses"
                        variant="outlined"
                        value={expenses}
                        onChange={(ev) => setExpenses(ev.target.value)}
                        type="number"
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
                            value={dateOfExpenses}
                            onChange={setDateOfExpenses}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            fullWidth
                        />
                    </MuiPickersUtilsProvider>
                </div>

                <div className='form-control'>
                    <AutocompleteComboBox
                        tableName='manufacturer'
                        value={manufacturer}
                        columnToShow='name'
                        handleValueChanged={seManufacturer}
                    />
                </div>
            </form>
        </div>
    );
}