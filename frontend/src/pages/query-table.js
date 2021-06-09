import { Button } from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import DataDisplay from "../controls/data-display";
import QueriesSelector from "../forms/queries/queries-selector";

export default function QueryTable({ queryName, hasParams = false }) {
    const [params, setParams] = useState('');
    let getParams = () => { };

    const formStyle = {
        marginBottom: '10px',
        display: 'flex',
        flexDirection:'row',
    }
    const form = hasParams && (
        <div style={formStyle}>
            <QueriesSelector
                queryName={queryName}
                setParams={(getParamsFun) => getParams = getParamsFun}
            />
            <Button onClick={() => setParams(getParams())}
                style={{margin: '10px'}}
                variant={"contained"}
                color="primary"
            >
                Submit
                </Button>
        </div>
    );

    return (
        <>
            {form}
            <DataDisplay 
                fullDirective={'/query/'+queryName} 
                params={params} 
                hasParams={hasParams} 
            />
        </>
    );
}