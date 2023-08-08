import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const LastestSale = () => {
    const [products, setProducts] = useState([]);

    return (
        <div class="col-md-5">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Top 5 Sale</h4>
                    <DataTable value={products}>
                        <Column field="code" header="Code"></Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="category" header="Category"></Column>
                        <Column field="quantity" header="Quantity"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

export default LastestSale;