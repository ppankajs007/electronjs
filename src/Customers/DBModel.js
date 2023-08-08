import React from "react";

export const pagination = async (paginate,where = "") => {
    return await window.database.pagination("*","customers",paginate,where);
}

export const all = async () => {
    return await window.database.select("*","customers");
}

export const insertRow = async (data) => {
    return await window.database.insert("customers",data);
}

export const updateRow = async (where,data) => {
    if( data.id !== '' && data.id !== 'undefined' ){
        delete data.id;
    }
    return await window.database.update("customers",where,data);
}

export const deleteRow = async (where) => {
    return await window.database.delete("customers",where);
}

export const deleteMultipleRow = async (column,where) => {
    return await window.database.multipleDelete("customers",column,where);
}