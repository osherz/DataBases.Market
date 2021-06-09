import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AutocompleteComboBox from '../../controls/autocomplete-combo-box';
import '../form.css';

export default function EmployeesEarnMoreThanXForm({ flexDirection = 'column', ...props }) {
    const [minSalary, setMinSalary] = useState(0);

    props.setParams(() => `min_salary=${minSalary}`);
    return (
        <div>
            <form 
            style={{display: 'flex', flexDirection: flexDirection }}
            {...props}
            >
                <div className='form-control'>
                    <TextField
                        name='minSalary'
                        variant="outlined"
                        label="Min Salary"
                        type="number"
                        value={minSalary}
                        onChange={(ev) => setMinSalary(ev.target.value)}
                        fullWidth
                    />
                </div>
            </form>
        </div>
    );
}