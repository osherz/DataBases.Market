import { Typography } from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import DataTable from '../controls/data-table';

export default function QueryTable({ fullPath }) {
    const [rows, setRows] = useState([]);

    const fetchData = useCallback(() => {
        fetch(`/${fullPath}`)
            .then((result) => result.json())
            .then((data) => {
                setRows(data["data"]);
            });
    }, [fullPath]);

    useEffect(() => fetchData(), [fullPath, fetchData]);
    if (rows.length == 1 && Object.keys(rows[0]).length == 1) {
        const key = Object.keys(rows[0])[0];
        return (
            <div>
                <Typography variant="h6" noWrap>
                    {key} : {rows[0][key]}
                </Typography>
            </div>
        );
    }
    else {
        return (
            <DataTable
                rows={rows}
                enableManagement={false}
            />
        );
    }
}