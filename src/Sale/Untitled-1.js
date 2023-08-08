
import React, { useState, useEffect, useRef } from 'react';
import { ProductService } from '../service/ProductService';
import {
    Button,
    Toolbar,
    DataTable,
    Column,
    Tag,
    Rating,
} from '../Utils/PrimeComponent';
import Add from './Add';
import { all } from './DBModel';

const List = () => {

    const [data, setData] = useState([]);
    const [editRecord, setEditRecord] = useState('');
    const [newDialog,setNewDialog] = useState(false);
    const [editDialog,setEditDialog] = useState(false);


    const [expandedRows, setExpandedRows] = useState();

    useEffect(() => {
        getList();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getList = async () => {
        let response = await all();
        setData(response.data)
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
        console.log({_expandedRows});
        setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
        setExpandedRows(null);
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const amountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.amount);
    };

    const statusOrderBodyTemplate = (rowData) => {
        return <Tag value={rowData.status.toLowerCase()} severity={getOrderSeverity(rowData)}></Tag>;
    };

    const searchBodyTemplate = () => {
        return <Button icon="pi pi-search" />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} width="64px" className="shadow-4" />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={getProductSeverity(rowData)}></Tag>;
    };

    const getProductSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const getOrderSeverity = (order) => {
        switch (order.status) {
            case 'DELIVERED':
                return 'success';

            case 'CANCELLED':
                return 'danger';

            case 'PENDING':
                return 'warning';

            case 'RETURNED':
                return 'info';

            default:
                return null;
        }
    };

    const allowExpansion = (rowData) => {
        return true;
    };

    const rowExpansionTemplate = (data) => {
        console.log( data )
        return (
            <div className="p-3">
                <h5>Inventory of {data.name}</h5>
                <DataTable value={data}>
                    <Column field="id" header="Id" ></Column>
                    <Column field="quantity" header="Quantity" ></Column>
                    <Column field="total_amount" header="Total Amount" ></Column>
                    <Column field="purchase_date" header="Purchase Date" ></Column>
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


    return (
        <div className="card">
            <Toolbar  left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <DataTable value={data} expandedRows={{ 1:'true' }} onRowToggle={(e) => setExpandedRows(e.data)}
                     rowExpansionTemplate={rowExpansionTemplate}
                    dataKey="id" tableStyle={{ minWidth: '60rem' }}>
                <Column expander={allowExpansion} style={{ width: '5rem' }} />
                <Column field="name" header="Name" sortable />
            </DataTable>
            <Add show={newDialog} handleCloseDialog={handleCloseDialog} />
        </div>
    );
}

export default List;