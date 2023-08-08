import React from "react";

export const all = async () => {
    return await window.database.select("*","scooty");
}

export const insertRow = async (data) => {
    return await window.database.insert("scooty",data);
}

export const updateRow = async (where,data) => {
    return await window.database.update("scooty",where,data);
}

export const deleteRow = async (where) => {
    return await window.database.delete("scooty",where);
}