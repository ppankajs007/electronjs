import React from "react";
import { dateFormat } from "../Utils/helpers";

export const pagination = async (paginate,where = "") => {
    return await window.database.pagination("*","sale_order",paginate,where);
}

export const all = async () => {
    return await window.database.select("*","sale_order");
}

export const scootyPrice = async (where) => {
    let response = await window.database.select("*","inventory",where);
    let totalQuantity = 0;
    let totalPrice  = 0;
    if( response.status && response.data.length > 0 ){
        for (let element of response.data) {
            totalQuantity += element.quantity;
            totalPrice += element.total_amount
        }
        return  Math.round(totalPrice/totalQuantity)
    }
    return 0;
}

export const insertRow = async (data) => {
    let saleOrder = [{
        scooty_id:data.scooty_id,
        quantity:data.quantity,
        customer_id:data.customer_id,
        sale_price: dateFormat(data.sale_price),
        sale_date: dateFormat(data.sale_date)
    }];
    //let response = await window.database.insert("sale_orders",saleOrder);
    let batterySr = [];
    for (let element of data) {
        if( element.includes('battery_sno__') ){
            batterySr.push({
                scooty_id: data.scooty_id,
                battery_sr_number: element,
            })
        }
    }

    console.log( {batterySr} );
    
}

export const updateRow = async (where,data) => {
    if( data.id !== '' && data.id !== 'undefined' ){
        delete data.id;
    }
    return await window.database.update("sale_order",where,data);
}

export const deleteRow = async (where) => {
    return await window.database.delete("sale_order",where);
}

export const deleteMultipleRow = async (column,where) => {
    return await window.database.multipleDelete("sale_order",column,where);
}


