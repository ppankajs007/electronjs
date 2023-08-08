import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Button,
    classNames,
    Dialog,
    InputMask,
    InputText,
    InputTextarea
} from '../Utils/PrimeComponent'
import PrimeToastContext from "../context/PrimeToastContext";

import { updateRow } from "./DBModel";
import { capitalize } from "lodash";

const Edit = (props) => {
    
    const toast = useContext(PrimeToastContext)
    const [visible,setVisible] = useState(false);
    const [fields,setFields] =useState(props.row);
    const { control, reset, handleSubmit, formState: { errors } } = useForm({});
    
    const onSubmit = async (data) => {
        let response = await updateRow({id:fields.id},fields);
        let msg = (response.message)?response.message:'Customer updated successfully'
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

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    useEffect(() => {
        setVisible(props.show);
        setFields(props.row)
    },[props])

    
    return(
        <React.Fragment>
        <Dialog visible={visible} style={{ width: '450px' }} header="Add Customer" modal className="p-fluid auto-mobile-dialog"  onHide={hideDialog}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
                <label htmlFor="name">Name</label>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'Name is required.'} }
                    defaultValue={ fields.name || '' }
                    render={({ field,fieldState }) => 
                     <InputText className={classNames({ 'p-invalid': fieldState.error })}  id="name" name="name" value={fields.name || ''}  onChange={(e) => { onInputChange(e); field.onChange(e.target.value) }} />
                    }
                />
                {getFormErrorMessage('name')}
            </div>

            <div className="field">
                <label htmlFor="name">Mobile</label>
               <Controller
                    name="mobile"
                    control={control}
                    rules={{ required: 'Mobile is required.'} }
                    defaultValue={ fields.mobile || '' }
                    render={({ field,fieldState }) => 
                     <InputMask id="phone" mask="(999) 999-9999"  className={classNames({ 'p-invalid': fieldState.error })}  name="mobile" value={ fields.mobile || '' }  onChange={(e) => { onInputChange(e); field.onChange(e.target.value) }} />
                    }
                />
                {getFormErrorMessage('mobile')}
            </div>

            <div className="field">
                <label htmlFor="name">Address</label>
               <Controller
                    name="address"
                    control={control}
                    rules={{ required: 'Address is required.'} }
                    defaultValue={ fields.address || '' }
                    render={({ field,fieldState }) => 

                     <InputTextarea value={ fields.address || '' }  name="address" onChange={(e) => { onInputChange(e); field.onChange(e.target.value) }} className={classNames({ 'p-invalid': fieldState.error })} rows={5} />
                    }
                />
                {getFormErrorMessage('address')}
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
