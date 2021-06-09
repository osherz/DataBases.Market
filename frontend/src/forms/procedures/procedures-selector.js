import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import BuyProductFromBranchForm from './buy-product-from-branch-form';
import AddProductsToBranchForm from './add-products-to-branch-form';
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

export default function ProcedureSelector({ procedureName }) {
    const [openSuccessBar, setOpenSuccessBar] = useState(false);
    const [openFailedBar, setOpenFailedBar] = useState(false);

    let getParams = () => { };

    const handleSuccessBarClosed = () => setOpenSuccessBar(false);
    const handleFailedBarClosed = () => setOpenFailedBar(false);

    const updateStatus = (status, successCallBack = function () { }) => {
        const isSuccess = status === "success";
        setOpenSuccessBar(isSuccess);
        setOpenFailedBar(!isSuccess);
        if (isSuccess) {
            successCallBack();
        }
    }


    const procedures = {
        'addProductsToBranch': <AddProductsToBranchForm setParams={getParamsFun => getParams = getParamsFun } />,
        'buyProductFromBranch': <BuyProductFromBranchForm setParams={getParamsFun => getParams = getParamsFun} />,
    };

    return (
        <div>
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
            {procedures[procedureName]}
            <Button
                style={{ margin: '5px', height: '60px' }}
                variant={"contained"}
                color="primary"
                fullWidth
                onClick={() => {
                    fetch(`procedure/${procedureName}?${getParams()}`)
                        .then((result) => result.text())
                        .then((data) => {
                            updateStatus(data);
                        });
                }}>
                Submit
            </Button>
        </div>
    );
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}