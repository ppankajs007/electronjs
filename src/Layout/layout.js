import React,{ useRef } from 'react';
import AppSidebar from './AppSidebar';
import AppTopbar from './AppTopbar';

import { Outlet } from "react-router-dom";
import { ConfirmDialog,Toast } from '../Utils/PrimeComponent'
import { ToastProvider } from '../context/PrimeToastContext';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";   

const Layout = () => {
    const toast = useRef(null);
    const sideBarHover = useRef(null);

    const sideBarMouseEnter = () => {
        sideBarHover.current.children[0].children[1].innerHTML = 'AGTGYHUJIKJUTFG';
        if(!sideBarHover.current.classList.contains('layout-active-sidebar')){
            sideBarHover.current.children[0].children[2].innerHTML = "<span class='pi pi-unlock'></span>";    
        }else{
            sideBarHover.current.children[0].children[2].innerHTML = "<span class='pi pi-lock'></span>";    
        }
        sideBarHover.current.classList.add('layout-lock-sidebar');
    }
    
    const sideBarMouseLeave = () => {
        if(!sideBarHover.current.classList.contains('layout-active-sidebar')){
            sideBarHover.current.classList.remove('layout-lock-sidebar');
            sideBarHover.current.children[0].children[1].innerHTML = '';
            sideBarHover.current.children[0].children[2].innerHTML = '';
        }
    }

    return (
        <React.Fragment>
            <ToastProvider value={toast}>
                <Toast ref={toast} />  
                <ConfirmDialog />
                <div className={'layout-wrapper layout-static'}>
                    <AppTopbar  />
                    <div className="layout-sidebar" ref={sideBarHover} onMouseEnter={sideBarMouseEnter} onMouseLeave={sideBarMouseLeave} >
                        <AppSidebar />
                    </div>
                    <div className="layout-main-container">
                        <div className="layout-main"><Outlet /></div>
                    </div>
                    <div className="layout-mask"></div>
                </div>
            </ToastProvider>
        </React.Fragment>
    );
};

export default Layout;
