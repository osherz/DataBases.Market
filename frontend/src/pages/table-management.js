import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { NoteAdd } from "@material-ui/icons";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FormDialog from "../forms/form-dialog";
import FormSelector from '../forms/form-selector';
import * as requests from '../requests';
import DataTable from "../controls/data-table";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function TableManagement({ tableName, enableManagement = true }) {
    let getParams = null;
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [openSuccessBar, setOpenSuccessBar] = useState(false);
    const [openFailedBar, setOpenFailedBar] = useState(false);
    const [idColName, setIdColName] = useState("");

    const [selectionModel, setSelectionModel] = React.useState([]);
    const [enableDelete, setEnableDelete] = useState(false);
    const [openInsertForm, setOpenInsertForm] = useState(false);

    useEffect(() => setEnableDelete(selectionModel.length > 0), [selectionModel, setEnableDelete]);

    const fetchData = useCallback(() => {
        fetch(`/${tableName}/select`)
            .then((result) => result.json())
            .then((data) => {
                setRows(data["data"]);
            });
    }, [tableName]);

    const cellChanged = ({ id, field, props }) => {
        rows.forEach((row) => {
            if (row[idColName] === id) {
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
                    setSelectionModel([]);
                    updateStatus(errorRows.length <= 0 ? 'success' : 'failed');
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
    }, [tableName, fetchData]);
    return (
        <>
            <div hidden={!enableManagement}>
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

            <DataTable
                rows={rows}
                idColNameChanged={setIdColName}
                onEditCellChanged={cellChanged}
                enableManagement
                onSelectionModelChange={(newSelection) => {
                    setSelectionModel(newSelection.selectionModel);
                }}
                selectionModel={selectionModel}
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
        </>
    );
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
