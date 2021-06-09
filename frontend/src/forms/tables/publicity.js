import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AutocompleteComboBox from '../../controls/autocomplete-combo-box';
import '../form.css';

export default function PublicityForm(props) {
    const [location, setLocation] = useState('');
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');

    props.setParams(() => `goal=${product.barcode}&location=${location}&price=${price}`);
    return (
        <div>
            <form {...props}>
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
                        name='location'
                        variant="outlined"
                        label="Location"
                        value={location}
                        onChange={(ev) => setLocation(ev.target.value)}
                        fullWidth
                    />
                </div>

                <div className='form-control'>
                    <TextField
                        name='price'
                        variant="outlined"
                        label="Price"
                        type="number"
                        value={price}
                        onChange={(ev) => setPrice(ev.target.value)}
                        fullWidth
                    />
                </div>
            </form>
        </div>
    );
}