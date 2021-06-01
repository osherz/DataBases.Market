import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import * as utils from "./utils";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { NoteAdd } from "@material-ui/icons";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FormDialog from "./forms/form-dialog";
import FormSelector from './forms/form-selector';
import * as requests from './requests';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function TableManagement({ tableName }) {
    let getParams = null;
    const classes = useStyles();

    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [openSuccessBar, setOpenSuccessBar] = useState(false);
    const [openFailedBar, setOpenFailedBar] = useState(false);
    const [idColName, setIdColName] = useState("");
    const idColNamesOptions = ["id", "ID", "Id", "barcode", "Barcode", "BARCODE"];
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [enableDelete, setEnableDelete] = useState(false);
    const [openInsertForm, setOpenInsertForm] = useState(false);

    useEffect(() => {
        if (rows.length > 0) {
            const rowToCheck = rows[0];
            const fields = Object.keys(rowToCheck);
            setIdColName(
                fields.filter((colName) => idColNamesOptions.includes(colName))[0]
            );
            setColumns(
                fields.map((colName) => {
                    const editable = colName !== idColName;
                    return {
                        field: colName,
                        type: fieldType(colName, rowToCheck[colName]),
                        headerName: textToTitle(colName),
                        width: 150,
                        editable: editable,
                    };
                })
            );
            changeColDateToDateType(rows);
        }
    }, [rows]);

    useEffect(() => setEnableDelete(selectionModel.length > 0), [selectionModel]);

    const fetchData = () => {
        fetch(`/${tableName}/select`)
            .then((result) => result.json())
            .then((data) => {
                setRows(data["data"]);
            });
    };

    const cellChanged = ({ id, field, props }) => {
        rows.forEach((row) => {
            if (row[idColName] == id) {
                const newRow = { ...row };
                newRow[field] = props.value;
                updateRow(newRow);
            }
        });
    };

    const updateStatus = (status, successCallBack = function () { }) => {
        const isSuccess = status === "success";
        setOpenSuccessBar(isSuccess);
        setOpenFailedBar(!isSuccess);
        if (isSuccess) {
            successCallBack();
            setTimeout(fetchData, 100);
        }

    }

    const updateRow = (rowToUpdate) => {
        requests.updateRow(tableName, rowToUpdate, updateStatus);
    };

    const handleDelete = async () => {
        if (selectionModel.length > 0) {
            requests.deleteRows(tableName, idColName, selectionModel,
                (errorRows) => {
                    const hasErrors = errorRows.length > 0;
                    setOpenSuccessBar(!hasErrors);
                    setOpenFailedBar(hasErrors);
                    fetchData();
                });
        }
    };

    const handleFinishInsert = () => {
        requests.insertRowWithParams(
            tableName,
            getParams(),
            status => updateStatus(status, handleInsertFormClose));

    };

    const handleInsertButtonClick = () => { setOpenInsertForm(true) };
    const handleInsertFormClose = () => { setOpenInsertForm(false) };

    const handleSuccessBarClosed = () => setOpenSuccessBar(false);
    const handleFailedBarClosed = () => setOpenFailedBar(false);

    useEffect(() => {
        fetchData();
    }, [tableName]);
    return (
        <div style={{ height: "800px", width: "100%" }}>
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    disabled={!enableDelete}
                    startIcon={<DeleteIcon />}
                    onClick={handleDelete}
                >
                    Delete
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<NoteAdd>send</NoteAdd>}
                    onClick={handleInsertButtonClick}
                >
                    Insert New
                </Button>
            </div>
            <Snackbar
                open={openSuccessBar}
                autoHideDuration={3000}
                onClose={handleSuccessBarClosed}
            >
                <Alert onClose={handleSuccessBarClosed} severity="success">
                    Operation succedded!
                </Alert>
            </Snackbar>
            <Snackbar
                open={openFailedBar}
                autoHideDuration={3000}
                onClose={handleFailedBarClosed}
            >
                <Alert onClose={handleFailedBarClosed} severity="error">
                    Operation failed!
                </Alert>
            </Snackbar>
            <DataGrid
                rows={rows}
                getRowId={(row) =>
                    row["ID"] ? row["ID"] : row["id"] ? row["id"] : row["barcode"]
                }
                columns={columns}
                onEditCellChangeCommitted={cellChanged}
                disableSelectionOnClick={true}
                onSelectionModelChange={(newSelection) => {
                    setSelectionModel(newSelection.selectionModel);
                }}
                selectionModel={selectionModel}
                autoPageSize
                checkboxSelection
            />

            <FormDialog title={'Insert to ' + tableName}
                open={openInsertForm}
                handleClose={handleInsertFormClose}
                handleFinish={handleFinishInsert}
            >
                <FormSelector
                    setParams={(getParamsFun) => getParams = getParamsFun}
                    tableName={tableName}
                />
            </FormDialog>
        </div>
    );
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function textToTitle(str) {
    return str
        .charAt(0)
        .toUpperCase()
        .concat(str.toLowerCase().slice(1, str.length));
}

function fieldType(colName, value) {
    return utils.isNumber(value) ? "number" : isDate(colName) ? "date" : "";
}

function isDate(colName) {
    return colName.toLowerCase().includes("date");
}

function changeColDateToDateType(rows) {
    rows.forEach((row) => {
        Object.keys(row).forEach((colName) => {
            if (isDate(colName)) {
                row[colName] = new Date(Date.parse(row[colName]));
            }
        });
    });
}

