import React, { useState } from 'react';
import AutocompleteComboBox from '../../controls/autocomplete-combo-box';
import '../form.css';

export default function PublicityPriceOfSpecificGoalForm({ flexDirection = 'column', ...props }) {
    const [product, setProduct] = useState('');

    props.setParams(() => `goal=${product.barcode}`);
    return (
        <div style={{ width: '250px' }}>
            <form
                style={{ display: 'flex', flexDirection: flexDirection }}
                {...props}
            >
                <div className='form-control'>
                    <AutocompleteComboBox
                        tableName='product'
                        value={product}
                        columnToShow="name"
                        handleValueChanged={setProduct}
                    />
                </div>
            </form>
        </div>
    );
}