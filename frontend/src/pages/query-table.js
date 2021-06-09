import { Button, Typography } from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import DataTable from '../controls/data-table';
import QueriesSelector from "../forms/queries/queries-selector";

export default function QueryTable({ queryName, hasParams = false }) {
    const [rows, setRows] = useState([]);
    let getParams = () => { };

    const fetchData = useCallback((params = undefined) => {
        setRows([]);
        if (!hasParams || params !== undefined) {
            fetch(`/query/${queryName}?${params}`)
                .then((result) => result.json())
                .then((data) => {
                    setRows(data["data"]);
                });
        }
    }, [queryName, hasParams]);

    useEffect(() => fetchData(), [queryName, fetchData]);
    const formStyle = {
        marginBottom: '10px',
        display: 'flex',
        flexDirection:'row'
    }
    const form = hasParams && (
        <div style={formStyle}>
            <QueriesSelector
                queryName={queryName}
                setParams={(getParamsFun) => getParams = getParamsFun}
            />
            <Button onClick={() => fetchData(getParams())}
                style={{margin: '10px'}}
                variant={"contained"}
                color="primary"
            >
                Submit
                </Button>
        </div>
    );

    let dataDisplayMethod;
    if (rows.length === 1 && Object.keys(rows[0]).length === 1) {
        const key = Object.keys(rows[0])[0];
        dataDisplayMethod = (
            <div>
                <Typography variant="h6" noWrap>
                    {key} : {rows[0][key]}
                </Typography>
            </div>
        );
    }
    else {
        dataDisplayMethod = (
            <DataTable
                rows={rows}
                enableManagement={false}
            />
        );
    }

    return (
        <>
            {form}
            {dataDisplayMethod}
        </>
    );
}