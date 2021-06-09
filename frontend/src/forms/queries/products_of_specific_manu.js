import React, { useState } from 'react';
import AutocompleteComboBox from '../../controls/autocomplete-combo-box';
import '../form.css';

export default function ProductsOfSpecificManuForm({ flexDirection = 'column', ...props }) {
    const [manufacturer, setManufacturer] = useState(0);

    props.setParams(() => `manu_name=${manufacturer.name}`);
    return (
        <div style={{width: '250px'}}>
            <form
                style={{ display: 'flex', flexDirection: flexDirection }}
                {...props}
            >
                <div className='form-control'>
                    <AutocompleteComboBox
                        tableName='manufacturer'
                        value={manufacturer}
                        columnToShow='name'
                        handleValueChanged={setManufacturer}
                    />
                </div>
            </form>
        </div>
    );
}