import React, { useState, useEffect } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


export default function AutocompleteComboBox({value, handleValueChanged, tableName, columnToShow, label=''}) {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(`/${tableName}/select`)
            .then(result => result.json())
            .then(json => setData(json['data']));
    }, [tableName]);
    return (
        <Autocomplete
            options={data}
            getOptionLabel={option => option[columnToShow]}
            value={value}
            onChange={(event, newValue) => handleValueChanged(newValue)}
            renderInput={(params) => <TextField {...params} label={'Choose ' + (label.length > 0 ? label : tableName)} variant="outlined" />}
            />
    )
}