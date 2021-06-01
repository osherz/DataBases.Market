import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './form.css';
import AutocompleteComboBox from '../controls/autocomplete-combo-box';

export default function EmployeeForm(props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [salary, setSalary] = useState();
    const [seniority, setSeniority] = useState();
    const [job, setJob] = useState('');
    const [branch, setBranch] = useState('');

    props.setParams(() => `name=${name}&email=${email}&branch_id=${branch.id}&job=${job}&seniority=${seniority}&salary=${salary}`);
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
                    <AutocompleteComboBox
                        tableName='branchs'
                        value={branch}
                        label='Branch'
                        columnToShow="ADDRESS"
                        handleValueChanged={setBranch}
                    />
                </div>
                
                <div className='form-control'>
                    <TextField
                        name='job'
                        variant="outlined"
                        label="Job"
                        value={job}
                        onChange={(ev) => setJob(ev.target.value)}
                    />
                </div>

                
                <div className='form-control'>
                    <TextField
                        name='seniority'
                        variant="outlined"
                        label="Seniority"
                        type="number"
                        value={seniority}
                        onChange={(ev) => setSeniority(ev.target.value)}
                    />
                </div>
                
                <div className='form-control'>
                    <TextField
                        name='salary'
                        variant="outlined"
                        label="Salary"
                        type="number"
                        value={salary}
                        onChange={(ev) => setSalary(ev.target.value)}
                    />
                </div>

            </form>
        </div>
    );
}