import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router,Routes, Route } from "react-router-dom";




import { LayoutProvider } from './Layout/context/layoutcontext';

import Page from './Dashboard';
import Layout from './Layout/layout';
import ErrorPage from './Utils/ErrorPage';

import Scooty from './Scooty';
import Inventory from './Inventory';
import Customers from './Customers'
import Sale from './Sale'



const ListOfRoute = [...Scooty,...Inventory,...Customers,...Sale];

function Routers() {
    return (
        <Router basename='/' forceRefresh={true}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {
                        ListOfRoute.map((row,i) =>
                            <Route  key={i} path={row.path} element={row.element} />
                        )
                    }
                    <Route  index path='/' element={<Page />} />
                    <Route path="*" element={<ErrorPage />} />

                </Route>
            </Routes>
        </Router>
    );
}

export default Routers;

const root = createRoot(document.getElementById('root'));
root.render(<LayoutProvider><Routers /></LayoutProvider>);