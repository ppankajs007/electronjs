import React, { useEffect, useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Button,
    classNames,
    Dialog,
    InputText
} from '../Utils/PrimeComponent'
import { updateRow } from "./DBModel";
import PrimeToastContext from "../context/PrimeToastContext";
import { capitalize } from "lodash";

const Edit = (props) => {

    const toast = useContext(PrimeToastContext)
    const [visible,setVisible] = useState(false);
    const [fields,setFields] =useState('');
    const { control, reset, handleSubmit, formState: { errors } } = useForm({});
    const onSubmit = async (data) => {
         let response = await updateRow({'id':fields.id},{name:fields.name});
        let msg = (response.message)?response.message:'Scooty update successfully'
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
        const { name, value} = e.target;
        setFields({...fields,[name]:value})
    }
    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    useEffect(() => {
        setVisible(props.show);
        setFields(props?.row)
    },[props])
    
    return(
        <React.Fragment>
        <Dialog visible={visible} style={{ width: '450px' }} header="Edit Scooty" modal className="p-fluid auto-mobile-dialog"  onHide={hideDialog}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
                <label htmlFor="name">Name</label>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'Name is required.' }}
                    defaultValue={fields.name || ''}
                    render={({ field,fieldState }) => 
                        <InputText className={classNames({ 'p-invalid': fieldState.error })} id="name" name="name" value={fields.name || ''}  onChange={(e) => { onInputChange(e); field.onChange(e.target.value) }} />
                    }
                />
                {getFormErrorMessage('name')}
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
