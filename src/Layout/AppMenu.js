import React,{ useRef, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
const AppMenu = () => {
    const lockRef = useRef();
    const  [barStatus,setBarStatus] = useState(false);
    const sidebarLock = () => {
        console.log( 'layout-topbar-button' )
        if( !barStatus ){
            lockRef.current.offsetParent.children[0].children[1].innerHTML = 'AGTGYHUJIKJUTFG';
            lockRef.current.offsetParent.children[0].children[2].innerHTML = "<span class='pi pi-lock'></span>";
            lockRef.current.offsetParent.classList.add('layout-active-sidebar')
            lockRef.current.offsetParent.nextSibling.classList.add('layout-static-lock')
        }else{
            lockRef.current.offsetParent.classList.remove('layout-active-sidebar')
            lockRef.current.offsetParent.children[0].children[2].innerHTML = "<span class='pi pi-unlock'></span>";
            lockRef.current.offsetParent.nextSibling.classList.remove('layout-static-lock')
        }
        setBarStatus(!barStatus)
    }

    const model = [
        {
            label: 'Scooty',
            items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
                    { label: 'Stock', icon: 'pi pi-fw pi-id-card', to: '/scooty' },
                    { label: 'Inventory', icon: 'pi pi-fw pi-check-square', to: '/inventory' },
                    { label: 'Customer', icon: 'pi pi-fw pi-bookmark', to: '/customers' },
                    { label: 'Sale', icon: 'pi pi-fw pi-exclamation-circle', to: '/sale' }
                ]
        }
    ];

    return (
        <MenuProvider>
            <div className="menu-logo">
                <button className="logo p-link">
                    <img src={'./demo/images/logo/logo-black.png' } alt="logo" />
                </button>
                 <button className="app-name p-link">   
                </button>
                <button className="menu-pin p-link layout-topbar-button" ref={lockRef} onClick={sidebarLock}>
                </button>
            </div>
            <ul className="layout-menu">
                { model.map((item, i) => 
                    <AppMenuitem item={item} root={true} index={i} key={item.label} />
                  )
                }
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
