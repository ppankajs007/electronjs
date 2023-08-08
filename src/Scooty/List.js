import React, { useState, useEffect } from 'react';
import 'primeflex/primeflex.css';
import {
    Button,
    DataView,
    Toolbar,
    confirmDialog
} from '../Utils/PrimeComponent'
import Add from './Add';
import Edit from './Edit';
import { all,deleteRow } from './DBModel';

const List = () => {
    const [data, setData] = useState([]);
    const [editRecord, setEditRecord] = useState('');
    const [newDialog,setNewDialog] = useState(false);
    const [editDialog,setEditDialog] = useState(false);
    
    useEffect(() => {
        getSolve();
    }, []);

    const getSolve = async () => {
        let response = await all();
        if( response.status ){
            setData(response.data)
        }
    }

    const handleCloseDialog = async (close,isRender = false) =>{
        setNewDialog(close);
        setEditDialog(close);
        if( isRender ){
           await getSolve()
        }
    }

    const handleDeleteRecord = (data) => {
        confirmDialog({
            message: `Are you sure you want to delete ${data.name}?`,
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

    const handleEditRecord = (row) => {
        setEditRecord(row);
        setEditDialog(true);
    }


    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" severity="success" raised outlined className="mr-2" onClick={(e) => setNewDialog(true) } />
            </React.Fragment>
        );
    };

    const itemTemplate = (data) => {
        return (
            <div className="col-12 sm:col-6 lg:col-6 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <div className="text-2xl font-bold">{data.name}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <Button icon="pi pi-trash" severity='danger' rounded outlined raised onClick={() => handleDeleteRecord(data) } />
                        <Button icon="pi pi-pencil" severity='success' rounded outlined raised onClick={() => handleEditRecord(data) } ></Button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <Toolbar  right={rightToolbarTemplate}></Toolbar>
            <DataView value={data} itemTemplate={itemTemplate} />
            <Add show={newDialog} handleCloseDialog={handleCloseDialog} />
            <Edit show={editDialog} handleCloseDialog={handleCloseDialog} row={editRecord} />
        </div>
    );
}

export default List;
