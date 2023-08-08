
import React, { useState, useEffect } from 'react';
import {
    Button,
    Toolbar,
    DataTable,
    Column,
    confirmDialog,
    InputText
} from '../Utils/PrimeComponent';
import Add from './Add';
import { pagination, deleteRow, deleteMultipleRow } from './DBModel';
import { dateFormat } from '../Utils/helpers';
import Edit from './Edit';

const List = () => {
    
    const [data, setData] = useState([]);
    const [editRecord, setEditRecord] = useState('');
    const [newDialog,setNewDialog] = useState(false);
    const [editDialog,setEditDialog] = useState(false);

    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedRow, setSelectedRow] = useState(null);
    const [lazyState, setLazyState] = useState({
        first: 0,
        rows: 10,
        page: 0,
        sortField: 'id',
        sortOrder: 1,
        search:'',
        searchColumn:[
            'name','mobile','address'
        ]
    });



    useEffect(() => {
        getList(lazyState);
    }, []);

    const getList = async (lazy) => {
        setLoading(true)
        let response = await pagination(lazy);
        if( response.status && response.data ){
            setData(response.data)
            setTotalRecords(response.total);
        }
        setLoading(false)
    }

    const handleCloseDialog = async (close,isRender = false) =>{
        setNewDialog(close);
        setEditDialog(close);
        if( isRender ){
           await getList(lazyState)
        }
    }

    
    const rightToolbarTemplate = () => {
        return (
            <div className="flex align-items-center justify-content-end gap-2">
                { ( selectedRow && selectedRow.length > 0 ) && <span>
                    <Button icon="pi pi-trash" raised outlined  severity="danger" aria-label="Delete" onClick={() => selectedDeleteRecord() } />
                </span> }
                <Button label="New" icon="pi pi-plus" severity="success" raised outlined className="mr-2" onClick={(e) => setNewDialog(true) } />
            </div>
        );
    };

    const onInputChange = (e) => {
        let { name,value } = e.target;
        let searchParam = {
                    ...lazyState,
                    [name]:value,
                    first: 0,
                    rows: 10,
                    page: 0,
                    sortField: 'id',
                    sortOrder: 1,

                }
        setLazyState(searchParam)
        getList(searchParam);

    }

    const refreshLazyState = () => {
        let refreshData = {
            first: 0,
            rows: 10,
            page: 0,
            sortField: 'id',
            sortOrder: 1,
            search:'',
            searchColumn:[
                'name','mobile','address'
            ]
        };

        setLazyState(refreshData)
        getList(refreshData);
    }
    
    const leftToolbarTemplate = () => {
       return (
            <div className="flex align-items-center justify-content-end gap-2">
                <span className="p-input-icon-left">
                    {
                        lazyState.search?
                            <i className={ `cp pi pi-times`} onClick={(e) => refreshLazyState(e) } />
                        :   <i className={ `cp pi pi-search`}  />
                    }
                    <InputText placeholder='Search' name='search' value={ lazyState.search || '' } onChange={(e) => onInputChange(e)}  />
                </span>

                

                
            </div>
        );
    };

    const handleEditRecord = (row) => {
        setEditRecord(row);
        setEditDialog(true);
    }
    
    const handleDeleteRecord = (data) => {
        confirmDialog({
            message: `Are you sure you want to delete ${data.name}?`,
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: async () => { 
                await deleteRow({id:data.id});
                await getList(lazyState);
            },
            reject: () => {}
        });
    };

    const selectedDeleteRecord = () => {
        confirmDialog({
            message: `Are you sure you want to deleted ${selectedRow.length} record?`,
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: async () => { 
                let ids = [];
                for (let element of selectedRow) {
                    ids.push(element.id);
                }
                await deleteMultipleRow('id',ids);
                await getList(lazyState);
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

    const createdDateTemplate = (row) => {
        return dateFormat(row.created_at)
    }

    const onPage = (event) => {
        let eventOnSort = { ...lazyState,...event};
        setLazyState(eventOnSort);
        getList(eventOnSort);
    };

    const onSort = (event) => {
        let eventOnSort = { ...lazyState,...event};
        setLazyState(eventOnSort);
        getList(eventOnSort);
    };
    
    return (
        <div className="card">
            <Toolbar  left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <DataTable value={data} lazy paginator  selection={selectedRow} 
                onSelectionChange={(e) => setSelectedRow(e.value)}
                dataKey="id"  first={lazyState.first} rows={lazyState.rows} 
                totalRecords={totalRecords}  onPage={onPage}
                onSort={onSort} sortField={lazyState.sortField} sortOrder={lazyState.sortOrder}
                    loading={loading} paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                    <Column selectionMode="multiple" />
                    <Column field="id" sortable header="#" hidden />
                    <Column field="name" sortable header="Name" />
                    <Column field="mobile" sortable header="Mobile" />
                    <Column field="address" sortable header="Address" />
                    <Column body={createdDateTemplate} header="Created Date" />
                    <Column body={templateAction}   />
            </DataTable>
            <Add show={newDialog} handleCloseDialog={handleCloseDialog} />
            <Edit show={editDialog} handleCloseDialog={handleCloseDialog} row={editRecord} />
        </div>
    );
}

export default List;