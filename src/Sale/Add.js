import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
    Button,
    classNames,
    Dialog,
    InputNumber,
    Calendar,
    Dropdown
} from '../Utils/PrimeComponent'
import PrimeToastContext from "../context/PrimeToastContext";

import { all } from "../Scooty/DBModel"
import { all as allCustomer } from "../Customers/DBModel"

import { insertRow, scootyPrice } from "./DBModel";
import { capitalize } from "lodash";

import  AddCustomer from '../Customers/Add'

const Add = (props) => {
    
    const toast = useContext(PrimeToastContext)
    const [visible,setVisible] = useState(false);
    const [fieldsInput,setFields] =useState([]);
    const [totalPrice,setTotalPrice] =useState(0);
    const { control, reset, handleSubmit, formState: { errors } } = useForm({
         defaultValues: {
                        battery_sno: [{ battery_sno__0: "" }]
                    }
    });
    const { fields , append, remove } = useFieldArray({
        name:'battery_sno',
        control
    });

    const [scootyList,setScootyList] = useState('')
    const [customerList,setCustomerList] = useState('')
    const [newCustomerDialog,setNewCustomerDialog] = useState(false)
    
    const onSubmit = async (data) => {
        let response = await insertRow(fieldsInput);
        /* let msg = (response.message)?response.message:'Sale Order add successfully'
        setFields('');
        reset();
        toast.current.show({ severity: response.type, summary: capitalize(response.type) , detail: msg })
        hideDialog(true) */
    }

    const hideDialog = (isRender = false) => {
        setVisible(false);
        setFields('');
        reset();
        props.handleCloseDialog(false,isRender)
    };


    const onInputChange = (e) => {
        let { name, value} = e.target;
        setFields({...fieldsInput,[name]:value})
    }

    const onSelectChange = (e,name) => {
        let value = e.value
        setFields({...fieldsInput,[name]:value})
    }

    const getScootyPrice = async (id) => {
        let qty = 1;
        let response = await scootyPrice({scooty_id:id})
        if( fieldsInput?.quantity && fieldsInput?.quantity > 0 ){
            qty = fieldsInput?.quantity;
        }
        setTotalPrice(response * qty );
    }

    const getQuantityScootyPrie = (quantity) => {
        setTotalPrice(totalPrice * quantity);
    }

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    useEffect(() => {
        setVisible(props.show);
        getScootyList();
        getCustomerList();
    },[props])

    const getScootyList = async () => {
           let response =  await all();
           let scootyDropDownList = [];
           if( response.status ){
                for (let element of response.data) {
                    scootyDropDownList.push({
                        name: capitalize(element.name),
                        value: element.id,
                    })
                }
                setScootyList(scootyDropDownList)
           }
    }

    const getCustomerList = async () => {
           let response =  await allCustomer();
           let customerDropDownList = [];
           if( response.status ){
                for (let element of response.data) {
                    customerDropDownList.push({
                        name: capitalize(element.name),
                        value: element.id,
                    })
                }
                setCustomerList(customerDropDownList)
           }
    }

    const handleCustomerCloseDialog = async (isRender = false) => {
            setNewCustomerDialog(false);
            if( isRender ){
                await getCustomerList();
            }
    }
    
    return(
        <React.Fragment>
        <Dialog visible={visible} style={{ width: '700px' }} header="Add Customer" modal className="p-fluid auto-mobile-dialog"  onHide={hideDialog}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="formgrid grid">
                <div className="field col">
                    <label htmlFor="name">Scooty</label>
                <Controller
                        name="scooty_id"
                        control={control}
                        rules={{ required: 'Scooty is required.'} }
                        render={({ field,fieldState }) => 
                            <Dropdown value={fieldsInput?.scooty_id} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => { onSelectChange(e,'scooty_id'); getScootyPrice(e.value); field.onChange(e.value) }} options={scootyList} optionLabel="name" placeholder="Select a Scooty" 
                                filter showClear />
                        }
                    />
                    {getFormErrorMessage('scooty_id')}
                </div>
                <div className="field col" >
                    <label htmlFor="name">Quantity</label>
                    <Controller
                        name="quantity"
                        control={control}
                        rules={{ required: 'Quantity is required.',min:1 } }
                        render={({ field,fieldState }) => 
                            <InputNumber inputId="horizontal-buttons" value={fieldsInput?.quantity} onChange={ (e) => {onSelectChange(e,'quantity'); getQuantityScootyPrie(e.value); field.onChange(e.value) }  }  showButtons
                                buttonLayout="horizontal" step={1} min={1}
                                decrementButtonClassName="p-button-danger" className={classNames({ 'p-invalid': fieldState.error })}  incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                            />
                        }
                    />
                    {getFormErrorMessage('quantity')}
                </div>
            </div>

            <div className="formgrid grid">
                <div className="field col-11 md:col-11">
                    <label htmlFor="name">Customer</label>
                    <Controller
                        name="customer_id"
                        control={control}
                        rules={{ required: 'Customer is required.'} }
                        render={({ field,fieldState }) => 
                            <Dropdown value={fieldsInput?.customer_id} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => { onSelectChange(e,'customer_id'); field.onChange(e.value) }} options={customerList} optionLabel="name" placeholder="Select a Customer" 
                                filter showClear />
                        }
                    />
                    {getFormErrorMessage('customer_id')}
                </div>
                <div className="field col-1 md:col-1" >
                    <label htmlFor="name" style={{ visibility:'hidden' }}>Add</label>
                    <Button type="button" icon="pi pi-plus-circle" outlined severity="success" raised onClick={() => setNewCustomerDialog(true) }  />
                </div>
            </div>

            <div className="formgrid grid">
                <div className="field col">
                    <label htmlFor="name">Scooty Price</label>
                   <InputNumber inputId="currency-india" value={totalPrice} mode="currency" currency="INR" locale="en-IN" />
                </div>
                <div className="field col" >
                    <label htmlFor="name">Sale Price</label>
                    <Controller
                        name="sale_price"
                        control={control}
                        rules={{ required: 'Sale Price is required.' } }
                        render={({ field,fieldState }) => 
                            <InputNumber inputId="currency-india" className={classNames({ 'p-invalid': fieldState.error })} value={fieldsInput?.sale_price} onChange={ (e) => {onSelectChange(e,'sale_price'); field.onChange(e.value) }  } mode="currency" currency="INR" locale="en-IN" />
                        }
                    />
                    {getFormErrorMessage('sale_price')}
                </div>
            </div>

             <div className="formgrid grid">
                <div className="field col-12 md:col-12">
                    <label htmlFor="name">Sale Date</label>
                    <Controller
                        name="sale_date"
                        control={control}
                        rules={{ required: 'Sale Date is required.'} }
                        render={({ field,fieldState }) => 
                            <Calendar className={classNames({ 'p-invalid': fieldState.error })} value={fieldsInput?.sale_date} onChange={ (e) => {onSelectChange(e,'sale_date'); field.onChange(e.value) }  }  />
                        }
                    />
                    {getFormErrorMessage('sale_date')}
                </div>
            </div>

            <div className="formgrid grid">
                <h5>Battery Details</h5>
                {fields.map((item, index) => (
                    <React.Fragment>
                        <div className="field col-11 md:col-11" key={`bt-${index}`}>
                            <label htmlFor="name">Battery Sno. {index + 1} </label>
                            <Controller
                                name= {`battery_sno__${index}`}
                                control={control}
                                rules={{ required: `Battery Sno. ${index + 1} is required.` } }
                                render={({ field,fieldState }) => 
                                     <InputNumber  className={classNames({ 'p-invalid': fieldState.error })} name={`battery_sno__${index}`} value={ fieldsInput[`battery_sno__${index}`] || '' }  onChange={ (e) => { onSelectChange(e,`battery_sno__${index}`); field.onChange(e.value) } } useGrouping={false} />
                                }
                            />
                            {getFormErrorMessage(`battery_sno__${index}`)}
                        </div>
                        <div className="field col-1 md:col-1" >
                            <label htmlFor="name" style={{ visibility:'hidden' }}>Add</label>
                            {
                                (fields.length === (index + 1))?
                                    <Button type="button" icon="pi pi-plus-circle" outlined severity="success" raised onClick={() => append({ [`battery_srn_${index}`] :''}) }  />
                                :<Button type="button" icon="pi pi-trash" outlined severity="danger" raised onClick={() => remove(`battery_srn_${index}`) }  />

                            }
                            
                        </div>
                    </React.Fragment>
                ))}
            </div>

        
            <div className="p-dialog-footer mt-6">
                <Button type="button" label="Cancel" icon="pi pi-times"  outlined severity="danger" raised onClick={hideDialog} />
                <Button type="submit" label="Save" icon="pi pi-check"    outlined severity="success" raised  />
            </div>
        </form>
        </Dialog>
        <AddCustomer show={newCustomerDialog} handleCloseDialog={handleCustomerCloseDialog} />
        </React.Fragment>
    )
}

export default Add;
