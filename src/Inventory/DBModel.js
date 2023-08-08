import { mergeWith, uniqBy } from "lodash";
import React from "react";
import { dateFormat } from "../Utils/helpers";

export const all = async () => {
    let queryQbject = { select:['inventory.*','scooty.*','scooty.id as scootyId','inventory.id as inventoryId'],
                        sqlQuery:'(SELECT SUM(quantity) from sale_orders where sale_orders.scooty_id = inventory.scooty_id) as total_sale',
                        table:'inventory',
                        leftjoin:['scooty','scooty.id','inventory.scooty_id']}
    
    let response = await window.database.leftJoin(queryQbject);

    let details = response.data;
    if( response.status && response.data ){
        let data = [];
        for (let iterator of details) {
            data.push({
                id:iterator.scootyId,
                name:iterator.name,
            })    
                
        }

        data = uniqBy(data, function (e) {
            return e.id;
        })
        
        for (let i = 0; i < data.length; i++) {
            let j = 0;
            data[i].child = [];
            for (let element of response.data) {
                if( element.scooty_id === data[i].id ){
                    data[i].child[j] = { id:element.inventoryId,scooty_id:element.scooty_id, quantity:element.quantity, total_amount:element.total_amount,purchase_date: dateFormat(element.purchase_date),total_sale:element.total_sale }
                 j++;
                }     
            }        
        }
        return data
    
    }

}

export const insertRow = async (data) => {
    return await window.database.insert("inventory",data);
}

export const updateRow = async (where,data) => {
    if( data.id !== '' && data.id !== 'undefined' ){
        delete data.id;
    }
    delete data.total_sale;
    return await window.database.update("inventory",where,data);
}

export const deleteRow = async (where) => {
    return await window.database.delete("inventory",where);
}