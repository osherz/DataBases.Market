import * as utils from "./utils";

const FAILED_MSG = 'failed'

/**
 * 
 * @param {string} tableName 
 * @param {string} idColName 
 * @param {Array} ids - Array of id's to delete'
 * @param {} callback - Call when finish
 */
export function deleteRows(tableName, idColName, ids, callback) {
    const rowsDeleted = [];
    const errorRows = [];
    ids.forEach(async (rowid) => {
        try {
            const result = await fetch(`${tableName}/delete?${idColName}=${rowid}`);
            const text = await result.text();
            if (text === 'success') {
                rowsDeleted.push(rowid);
            } else {
                errorRows.push(rowid);
            }
        }
        catch {
            errorRows.push(rowid);
        }
    });

    callback(errorRows);
}

/**
 * 
 * @param {*} tableName 
 * @param {*} rowToUpdateObj 
 * @param {*} callback - Get as prameter 'success' or 'fail'.
 */
export function updateRow(tableName, rowToUpdateObj, callback) {
    const paramsStr = utils.objectToGetParams(rowToUpdateObj);
    const query = `${tableName}/update?${paramsStr}`;
    fetch(query)
        .then(result => result.text())
        .then(text => callback(text))
        .catch(() => callback(FAILED_MSG));
}

export function insertRowFromObj(tableName, obj, callback) {
    const queryParams = utils.objectToGetParams(obj);
    insertRowWithParams(tableName, queryParams, callback);
}

export function insertRowWithParams(tableName, queryParams, callback) {
    const query = `${tableName}/insert?${queryParams}`;
    fetch(query)
        .then(result => result.text())
        .then(text => callback(text))
        .catch(() => callback(FAILED_MSG));
}