import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import * as utils from './utils';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { NoteAdd } from '@material-ui/icons'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function TableManagement({ tableName }) {
    const classes = useStyles();

    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [openSuccessBar, setOpenSuccessBar] = useState(false);
    const [idColName, setIdColName] = useState('');
    const idColNamesOptions = ['id', 'ID', 'Id', 'barcode', 'Barcode', 'BARCODE'];

    useEffect(() => {
        if (rows.length > 0) {
            const rowToCheck = rows[0];
            const fields = Object.keys(rowToCheck);
            setIdColName(fields.filter(colName => idColNamesOptions.includes(colName))[0]);
            setColumns(fields.map(colName => {
                const editable = colName !== idColName;
                return {
                    field: colName,
                    type: fieldType(colName, rowToCheck[colName]),
                    headerName: textToTitle(colName),
                    width: 150,
                    editable: editable
                };
            }));
            changeColDateToDateType(rows);
        }
    }, [rows]);

    const fetchData = () => {
        fetch(`/${tableName}/select`)
            .then(result => result.json())
            .then(data => setRows(data['data']));
    }

    const cellChanged = ({ id, field, props }) => {
        rows.forEach(row => {
            if (row[idColName] == id) {
                const newRow = { ...row }
                newRow[field] = props.value;
                updateRow(newRow);
            }
        })
    };
    const updateRow = (rowToUpdate) => {
        const paramsStr = utils.objectToGetParams(rowToUpdate);
        fetch(`${tableName}/update?${paramsStr}`)
            .then(result => result.text())
            .then(text => {
                setOpenSuccessBar(text === 'success');
                fetchData();
            });
        return true;
    }

    const handleSuccessBarClosed = () => setOpenSuccessBar(false);

    useEffect(() => {
        fetchData();
    }, [tableName]);
    return (
        <div style={{ height: '800px', width: '100%' }}>
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<NoteAdd>send</NoteAdd>}
                >
                    Insert New
      </Button>
            </div>
            <Snackbar open={openSuccessBar} autoHideDuration={3000} onClose={handleSuccessBarClosed}>
                <Alert onClose={handleSuccessBarClosed} severity="success">
                    Operation succedded!
                </Alert>
            </Snackbar>
            <DataGrid
                rows={rows}
                getRowId={row => row['ID'] ? row['ID'] :
                    row['id'] ? row['id'] : row['barcode']}
                columns={columns}
                onEditCellChangeCommitted={cellChanged}
                disableSelectionOnClick={true}
                autoPageSize
                checkboxSelection
            />
        </div>
    );
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function textToTitle(str) {
    return str.charAt(0)
        .toUpperCase()
        .concat(str.toLowerCase().slice(1, str.length))
}

function fieldType(colName, value) {
    return utils.isNumber(value) ? 'number' :
        isDate(colName) ? 'date' : '';
}

function isDate(colName) {
    return colName.toLowerCase().includes('date');
}

function changeColDateToDateType(rows) {
    rows.forEach(row => {
        Object.keys(row).forEach(colName => {
            if (isDate(colName)) {
                row[colName] = new Date(Date.parse(row[colName]));
            }
        });
    });
}