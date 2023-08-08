
import React, { useState, useEffect } from 'react';
import {
    Button,
    Toolbar,
    DataTable,
    Column,
    Tag,
    confirmDialog,
} from '../Utils/PrimeComponent';
import Add from './Add';
import { all, deleteRow } from './DBModel';
import { formatCurrency } from '../Utils/helpers';
import Edit from './Edit';
import { capitalize } from 'lodash';

const List = () => {

    const [data, setData] = useState([]);
    const [editRecord, setEditRecord] = useState('');
    const [newDialog,setNewDialog] = useState(false);
    const [editDialog,setEditDialog] = useState(false);


    const [expandedRows, setExpandedRows] = useState(null);

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        let response = await all();
        setData(response)
    }

    const handleCloseDialog = async (close,isRender = false) =>{
        setNewDialog(close);
        setEditDialog(close);
        if( isRender ){
           await getList()
        }
    }

    const expandAll = () => {
        let _expandedRows = {};
        data.forEach((p) => (_expandedRows[`${p.id}`] = true));
        setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
        setExpandedRows(null);
    };


    const amountBodyTemplate = (row) => {
        return formatCurrency(row.total_amount)
    };

    
    const statusBodyTemplate = (remaning) => {
        let status  = 'IN STOCK';
        let severity = 'success';
        if( remaning < 3 &&  remaning > 0 ){
            status  = 'LOW STOCK';
            severity = 'warning';
        }else if( remaning == 0 ){
            status  = 'OUT OF STOCK';
            severity = 'danger';
        }
        return <Tag className='flex justify-content-center' value={status} severity={severity}></Tag>
    };

    const calculateCustomerTotal = (name) => {
        if (customers) {
            for (let customer of customers) {
                if (customer.representative.name === name) {
                    total++;
                }
            }
        }

        return total;
    };

    const footerTemplate = (row) => {
        let quantity = 0;
        let total_sale = 0;
        if( row?.props?.value ){
            for (let element of row?.props?.value) {
                total_sale = element.total_sale;
                quantity +=  element.quantity
            }
        }
        let remaning = (quantity - total_sale)
        return (
            <React.Fragment>
                <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span className="flex justify-content-start font-bold">Total Stock: {quantity} </span>
                    { statusBodyTemplate(remaning) }
                    <span className="flex justify-content-end font-bold">Remaning Stock: {remaning} </span>
                </div>
            </React.Fragment>
        );
    };

    const allowExpansion = () => {
        return true;
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3">
                <DataTable value={data.child} footer={footerTemplate} >
                    <Column field="id" header="Id" ></Column>
                    <Column field="quantity" header="Quantity" ></Column>
                    <Column header={"Total Amount"} body={amountBodyTemplate}></Column>
                    <Column field="purchase_date" header="Purchase Date" ></Column>
                    <Column body={templateAction}></Column>
                </DataTable>
            </div>
        );
    };
    
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" severity="success" raised outlined className="mr-2" onClick={(e) => setNewDialog(true) } />
            </React.Fragment>
        );
    };
    
    const leftToolbarTemplate = () => {
        return (
            <div className='flex gap-2'>
               <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} raised outlined />
                <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} raised outlined />
            </div>
        );
    };

    const handleEditRecord = (row) => {
        setEditRecord(row);
        setEditDialog(true);
    }
    
    const handleDeleteRecord = (data) => {
        confirmDialog({
            message: `Are you sure you want to delete ${data.quantity} quantity?`,
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: async () => { 
                await deleteRow({id:data.id});
                getSolve();
            },
            reject: () => {}
        });
    };

    const templateAction = (row) => {
        return ( 
            <div className='flex gap-2'>
                <Button icon="pi pi-pencil" raised outlined  severity="success" aria-label="Edit" onClick={() => handleEditRecord(row) } />
                <Button icon="pi pi-trash" raised outlined  severity="danger" aria-label="Delete" onClick={() => handleDeleteRecord(row) } />
            </div>
        )
        
    };

    
    return (
        <div className="card">
            <Toolbar  left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <DataTable value={data} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                     rowExpansionTemplate={rowExpansionTemplate}
                    dataKey="id"  >
                <Column expander={allowExpansion} style={{ width: '5rem' }} />
                <Column field="name" header="Name"  />
            </DataTable>
            <Add show={newDialog} handleCloseDialog={handleCloseDialog} />
            <Edit show={editDialog} handleCloseDialog={handleCloseDialog} row={editRecord} />
        </div>
    );
}

export default List;