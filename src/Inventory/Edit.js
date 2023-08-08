import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Button,
    Calendar,
    classNames,
    Dialog,
    Dropdown,
    InputNumber,
    InputText  
} from '../Utils/PrimeComponent'
import PrimeToastContext from "../context/PrimeToastContext";

import { updateRow } from "./DBModel";
import { all as scootyAll } from "../Scooty/DBModel";
import { capitalize } from "lodash";

const Edit = (props) => {
    
    const toast = useContext(PrimeToastContext)
    const [visible,setVisible] = useState(false);
    const [fields,setFields] =useState('');
    const [scootyList,setScootyList] = useState([]);
    const { control, reset, handleSubmit, formState: { errors } } = useForm({});
    
    const onSubmit = async (data) => {
        let response = await updateRow({id:fields.id},fields);
        let msg = (response.message)?response.message:'Inventory updated successfully'
        setFields('');
        reset();
        toast.current.show({ severity: response.type, summary: capitalize(response.type) , detail: msg })
        hideDialog(true)
    }

    const hideDialog = (isRender = false) => {
        setVisible(false);
        setFields('');
        reset();
        props.handleCloseDialog(false,isRender)
    };


    const onInputChange = (e) => {
        let { name, value} = e.target;
        setFields({...fields,[name]:value})
    }

    const onSelectChange = (e,name) => {
        let value = e.value
        setFields({...fields,[name]:value})
    }

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    useEffect(() => {
        setVisible(props.show);
        getScootyList();
        setFields(props.row)
    },[props])

    const getScootyList = async () => {
        let response = await scootyAll();
        let selectObject = [];
        if( response?.status &&  response?.data ){
            for (let element of response.data) {
                    selectObject.push({ name: capitalize(element.name), value:element.id })
            }
            setScootyList(selectObject)
        }
    }
    
    return(
        <React.Fragment>
        <Dialog visible={visible} style={{ width: '450px' }} header="Add Stock" modal className="p-fluid auto-mobile-dialog"  onHide={hideDialog}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
                <label htmlFor="name">Scooty</label>
                <Controller
                    name="scooty_id"
                    control={control}
                    rules={{ required: 'Scooty is required.' }}
                    defaultValue={fields?.scooty_id || ''}
                    render={({ field,fieldState }) => 
                    <Dropdown
                        value={fields?.scooty_id || ''}
                        optionLabel="name"
                        placeholder="Select a Scooty"
                        name="scooty_id"
                        options={scootyList}
                        control={control}
                        onChange={(e) => { onSelectChange(e,'scooty_id'); field.onChange(e.value) }}
                        className={classNames({ 'p-invalid': fieldState.error })}
                        filter 
                    />
                    }
                />
                {getFormErrorMessage('scooty_id')}
            </div>
            <div className="field">
                <label htmlFor="name">Quantity</label>
                <Controller
                    name="quantity"
                    control={control}
                    rules={{ required: 'Quantity is required.',min:1} }
                    defaultValue={fields?.quantity || ''}
                    render={({ field,fieldState }) => 
                     <InputNumber  inputId="horizontal-buttons" buttonLayout="horizontal" step={1} showButtons min={0} max={50} decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"  className={classNames({ 'p-invalid': fieldState.error })} id="quantity" name="quantity" value={fields?.quantity || ''}  onChange={(e) => { onSelectChange(e,'quantity'); field.onChange(e.value) }} />
                    }
                />
                {getFormErrorMessage('quantity')}
            </div>
            <div className="field">
                <label htmlFor="name">Total Amount</label>
                <Controller
                    name="total_amount"
                    control={control}
                    rules={{ required: 'Total amount is required.',min:1} }
                    defaultValue={fields?.total_amount || ''}
                    render={({ field,fieldState }) => 
                     <InputNumber  className={classNames({ 'p-invalid': fieldState.error })} locale="en-IN" id="total_amount" name="total_amount" value={fields?.total_amount || ''}  onChange={(e) => { onSelectChange(e,'total_amount'); field.onChange(e.value) }} />
                    }
                />
                {getFormErrorMessage('total_amount')}
            </div>

            <div className="field">
                <label htmlFor="name">Purchase Date</label>
                <Controller
                    name="purchase_date"
                    control={control}
                    rules={{ required: 'Purchase date is required.'} }
                    defaultValue={new Date(fields?.purchase_date)}
                    render={({ field,fieldState }) =>
                     
                    <Calendar className={classNames({ 'p-invalid': fieldState.error })} inputId={field.name} value={new Date(fields?.purchase_date)} onChange={(e) => { onSelectChange(e,'purchase_date'); field.onChange(e.value) }} dateFormat="dd/mm/yy"  />
                    }
                />
                {getFormErrorMessage('purchase_date')}
            </div>

            <div className="p-dialog-footer mt-6">
                <Button type="button" label="Cancel" icon="pi pi-times"  outlined severity="danger" raised onClick={hideDialog} />
                <Button type="submit" label="Save" icon="pi pi-check"    outlined severity="success" raised  />
            </div>
        </form>
        </Dialog>
        </React.Fragment>
    )
}

export default Edit;
