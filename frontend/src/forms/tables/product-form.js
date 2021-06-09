import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AutocompleteComboBox from '../../controls/autocomplete-combo-box';
import Checkbox from '@material-ui/core/Checkbox';
import '../form.css';
import { FormControlLabel } from '@material-ui/core';

export default function ProductForm(props) {
    const [barcode, setBarcode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [itemPrice, setItemPrice] = useState();
    const [qtyInPackage, setQtyInPackage] = useState();
    const [quantity, setQuantity] = useState();
    const [bIsWeighted, setBIsWeighted] = useState(false);
    const [unitQty, setUnitQty] = useState('');
    const [manufacturer, setManufacturer] = useState('');

    props.setParams(() => `barcode=${barcode}&name=${name}&description=${description}&manufacturld=${manufacturer.id}&unitQty=${unitQty}&quantity=${quantity}&bIsWeighted=${bIsWeighted}&qtyInPackage=${qtyInPackage}&itemPrice=${itemPrice}`);

    const unitQtyOptions = [
        'גרמים',
        'קילוגרמים',
        'יחידה',
        'ליטרים',
        'מיליליטרים',
        'מטרים',
    ];
    return (
        <div>
            <form {...props}>
                <div className='form-control'>
                    <TextField
                        name='barcode'
                        variant="outlined"
                        label="Barcode"
                        value={barcode}
                        onChange={(ev) => setBarcode(ev.target.value)}
                    />
                </div>

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
                        name='description'
                        variant="outlined"
                        label="Description"
                        value={description}
                        onChange={(ev) => setDescription(ev.target.value)}
                    />
                </div>

                <div className='form-control'>
                    <AutocompleteComboBox
                        tableName='manufacturer'
                        value={manufacturer}
                        columnToShow='name'
                        handleValueChanged={setManufacturer}
                    />
                </div>

                <div className='form-control'>
                    <Autocomplete
                        id="unitQty"
                        value={unitQty}
                        onChange={(ev) => setUnitQty(ev.target.value)}
                        renderInput={(params) => <TextField {...params} label='Unit Quantity' variant="outlined" />}
                        options={unitQtyOptions}
                    />
                </div>

                <div className='form-control'>
                    <TextField
                        name='qtyInPackage'
                        variant="outlined"
                        label="Quantity In Package"
                        type="number"
                        value={qtyInPackage}
                        onChange={(ev) => setQtyInPackage(ev.target.value)}
                    />
                </div>

                <div className='form-control'>
                    <TextField
                        name='quantity'
                        variant="outlined"
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={(ev) => setQuantity(ev.target.value)}
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
                    />
                </div>

                <div className='form-control'>
                    <FormControlLabel
                        control={<Checkbox
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            checked={bIsWeighted}
                            onChange={(ev) => setBIsWeighted(ev.target.checked)}
                        />}
                        label='Is Weighted'
                    />
                </div>
            </form>
        </div>
    );
}