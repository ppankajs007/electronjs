export const dateFormat = (data) => {
    let date = new Date(data);
    let getdate = (date.getDate() < 10)?`0${date.getDate()}`:date.getDate(); 
    let getMonth = (date.getMonth() < 10)?`0${date.getMonth() + 1 }`:date.getMonth() + 1 ; 
    return `${getdate}/${getMonth}/${date.getFullYear()}`;
}

export const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'INR' });
};