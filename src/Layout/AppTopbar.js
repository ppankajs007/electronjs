import React, { useRef, useState } from 'react';
import { FaMinus } from 'react-icons/fa';
import { FiMinimize,  } from 'react-icons/fi';
import { CiMaximize2  } from 'react-icons/ci';
import { RxDotsVertical  } from 'react-icons/rx';
import { TieredMenu } from 'primereact/tieredmenu';

const AppTopbar = () => {

    const dotsVertical = useRef(null);
    const [maximizeIcon,setMaximizeIcon] = useState(true)
    const [dayNightM,setDayNightM] = useState(localStorage.getItem('mode-type'));
    const minimize = () => {
        window.control.minimize()
    }
    const closeApp = () => {
        window.control.closeApp()
    }

    const maximizeApp = async () => {
        let isMax =  await window.control.maximize();
        setMaximizeIcon(isMax);
    }

    const changeTheme = async(type) => {
        localStorage.setItem('mode-type',type);
        setDayNightM(type);
        let hrefLink = './node_modules/primereact/resources/themes/'+(type)+'/theme.css';
        document.getElementById('appStyleMode').setAttribute('href',hrefLink)
    }

    const dotsVerticalItems = [
        {
            label: 'Theme',
            items: [
                {
                    label: 'Arya',
                    items: [
                        {
                            label: 'Arya Blue',
                            icon: ( dayNightM === 'arya-blue' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('arya-blue');
                            }
                        },
                        {
                            label: 'Arya Green',
                            icon: ( dayNightM === 'arya-green' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('arya-green');
                            }
                        },
                        {
                            label: 'Arya Orange',
                            icon: ( dayNightM === 'arya-orange' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('arya-orange');
                            }
                        },
                        {
                            label: 'Arya Purple',
                            icon: ( dayNightM === 'arya-purple' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('arya-purple');
                            }
                        }
                    ]
                },
                {
                    label: 'Bootstrap4',
                    items: [
                        {
                            label: 'Bootstrap4 Dark Blue',
                            icon: ( dayNightM === 'bootstrap4-dark-blue' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('bootstrap4-dark-blue');
                            }
                        },
                        {
                            label: 'Bootstrap4 Dark Purple',
                            icon: ( dayNightM === 'bootstrap4-dark-purple' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('bootstrap4-dark-purple');
                            }
                        },
                        {
                            label: 'Bootstrap4 Light Blue',
                            icon: ( dayNightM === 'bootstrap4-light-blue' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('bootstrap4-light-blue');
                            }
                        },
                        {
                            label: 'Bootstrap4 lLight Purple',
                            icon: ( dayNightM === 'bootstrap4-light-purple' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('bootstrap4-light-purple');
                            }
                        }
                    ]
                },
                {
                    label: 'Fluent',
                    items: [
                        {
                            label: 'Fluent Light',
                            icon: ( dayNightM === 'fluent-light' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('fluent-light');
                            }
                        }
                    ]
                },
                {
                    label: 'Lara',
                    items: [
                        {
                            label: 'Lara Dark Blue',
                            icon: ( dayNightM === 'lara-dark-blue' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('lara-dark-blue');
                            }
                        },
                        {
                            label: 'Lara Dark Indigo',
                            icon: ( dayNightM === 'lara-dark-indigo' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('lara-dark-indigo');
                            }
                        },
                        {
                            label: 'Lara Dark Purple',
                            icon: ( dayNightM === 'lara-dark-purple' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('lara-dark-purple');
                            }
                        },
                        {
                            label: 'Lara Dark Teal',
                            icon: ( dayNightM === 'lara-dark-teal' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('lara-dark-teal');
                            }
                        },
                        {
                            label: 'Lara Light Blue',
                            icon: ( dayNightM === 'lara-light-blue' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('lara-light-blue');
                            }
                        },
                        {
                            label: 'Lara Light Indigo',
                            icon: ( dayNightM === 'lara-light-indigo' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('lara-light-indigo');
                            }
                        },
                        {
                            label: 'Lara Light Purple',
                            icon: ( dayNightM === 'lara-light-purple' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('lara-light-purple');
                            }
                        },
                        {
                            label: 'Lara Light Teal',
                            icon: ( dayNightM === 'lara-light-teal' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('lara-light-teal');
                            }
                        }
                    ]
                },
                {
                    label: 'Luna',
                    items: [
                        {
                            label: 'Luna Amber',
                             icon: ( dayNightM === 'luna-amber' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('luna-amber');
                            }
                        },
                        {
                            label: 'Luna Blue',
                             icon: ( dayNightM === 'luna-blue' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('luna-blue');
                            }
                        },
                        {
                            label: 'Luna Green',
                             icon: ( dayNightM === 'luna-green' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('luna-green');
                            }
                        },
                        {
                            label: 'Luna Pink',
                            icon: ( dayNightM === 'luna-pink' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('luna-pink');
                            }
                        }
                    ]
                },
                {
                    label: 'MDC',
                    items: [
                        {
                            label: 'Mdc Dark Deeppurple',
                            icon: ( dayNightM === 'mdc-dark-deeppurple' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('mdc-dark-deeppurple');
                            }
                        },
                        {
                            label: 'Mdc Dark Indigo',
                            icon: ( dayNightM === 'mdc-dark-indigo' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('mdc-dark-indigo');
                            }
                        },
                        {
                            label: 'Mdc Light Deeppurple',
                            icon: ( dayNightM === 'mdc-light-deeppurple' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('mdc-light-deeppurple');
                            }
                        },
                        {
                            label: 'Mdc Light Indigo',
                            icon: ( dayNightM === 'mdc-light-indigo' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('mdc-light-indigo');
                            }
                        }
                    ]
                },
                {
                    label: 'MD',
                    items: [
                        {
                            label: 'Md Dark Deeppurple',
                            icon: ( dayNightM === 'md-dark-deeppurple' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('md-dark-deeppurple');
                            }
                        },
                        {
                            label: 'Md Dark Indigo',
                            icon: ( dayNightM === 'md-dark-indigo' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('md-dark-indigo');
                            }
                        },
                        {
                            label: 'Md Light Deeppurple',
                            icon: ( dayNightM === 'md-light-deeppurple' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('md-light-deeppurple');
                            }
                        },
                        {
                            label: 'Md Light Indigo',
                            icon: ( dayNightM === 'md-light-indigo' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('md-light-indigo');
                            }
                        }
                    ]
                },
                {
                    label: 'Mira',
                    items: [
                        {
                            label: 'Mira',
                            icon: ( dayNightM === 'mira' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('mira');
                            }
                        }
                    ]
                },
                {
                    label: 'Nano',
                    items: [
                        {
                            label: 'Nano',
                            icon: ( dayNightM === 'nano' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('nano');
                            }
                        }
                    ]
                },
                {
                    label: 'Nova',
                    items: [
                        {
                            label: 'Nova',
                            icon: ( dayNightM === 'nova' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('nova');
                            }
                        },
                        {
                            label: 'Nova Accent',
                            icon: ( dayNightM === 'nova-accent' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('nova-accent');
                            }
                        },
                        {
                            label: 'Nova Alt',
                            icon: ( dayNightM === 'nova-alt' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('nova-alt');
                            }
                        }
                    ]
                },
                {
                    label: 'Rhea',
                    items: [
                        {
                            label: 'Rhea',
                            icon: ( dayNightM === 'rhea' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('rhea');
                            }
                        }
                    ]
                },
                {
                    label: 'Saga',
                    items: [
                        {
                            label: 'Saga Blue',
                            icon: ( dayNightM === 'saga-blue' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('saga-blue');
                            }
                        },
                        {
                            label: 'Saga Green',
                            icon: ( dayNightM === 'saga-green' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('saga-green');
                            }
                        },
                        {
                            label: 'Saga Orange',
                            icon: ( dayNightM === 'saga-orange' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('saga-orange');
                            }
                        },
                        {
                            label: 'Saga Purple',
                            icon: ( dayNightM === 'saga-purple' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('saga-purple');
                            }
                        }
                    ]
                },
                {
                    label: 'Soho',
                    items: [
                        {
                            label: 'Soho Dark',
                            icon: ( dayNightM === 'soho-dark' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('soho-dark');
                            }
                        },
                        {
                            label: 'Soho Light',
                            icon: ( dayNightM === 'soho-light' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('soho-light');
                            }
                        }
                    ]
                },
                {
                    label: 'Tailwind',
                    items: [
                        {
                            label: 'Tailwind Light',
                            icon: ( dayNightM === 'tailwind-light' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('tailwind-light');
                            }
                        }
                    ]
                },
                {
                    label: 'Vela',
                    items: [
                        {
                            label: 'Vela Blue',
                            icon: ( dayNightM === 'vela-blue' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('vela-blue');
                            }
                        },
                        {
                            label: 'Vela Green',
                            icon: ( dayNightM === 'vela-green' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('vela-green');
                            }
                        },
                        {
                            label: 'Vela Orange',
                            icon: ( dayNightM === 'vela-orange' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('vela-orange');
                            }
                        },
                        {
                            label: 'Vela Purple',
                            icon: ( dayNightM === 'vela-purple' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('vela-purple');
                            }
                        }
                    ]
                },
                {
                    label: 'Vivo',
                    items: [
                        {
                            label: 'Viva Dark',
                            icon: ( dayNightM === 'viva-dark' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('viva-dark');
                            }
                        },
                        {
                            label: 'Viva Light',
                            icon: ( dayNightM === 'viva-light' && 'pi pi-check'  ),
                            command: () => {
                                changeTheme('viva-light');
                            }
                        }
                    ]
                },
            ]
        },
    ];

    


    return (
        <div className="layout-topbar">
            <div className={'layout-topbar-menu'}>
                    <button type="button" className="p-link layout-topbar-button cp web-drag-false" onClick={(e) => dotsVertical.current.toggle(e)} >
                        <RxDotsVertical  />
                    </button>
                    <TieredMenu model={dotsVerticalItems} popup ref={dotsVertical} breakpoint="767px" />{/* 
                    <Menu model={dotsVerticalItems} popup ref={dotsVertical} /> */}
                    <button type="button" className="p-link layout-topbar-button cp web-drag-false" onClick={minimize} >
                    <FaMinus style={{ fontSize: '1rem' }} />
                </button>
                <button type="button" className="p-link layout-topbar-button ml-0 cp web-drag-false "  onClick={maximizeApp} >
                    { (maximizeIcon)?<FiMinimize  style={{ fontSize: '1rem' }} />
                    : <CiMaximize2 style={{ fontSize: '1rem' }} /> }
                </button>
                <button type="button" className="p-link layout-topbar-button ml-0 cp web-drag-false p-link-closeIcon" onClick={closeApp}>
                    <i className="pi pi-times" style={{ fontSize: '1rem' }} ></i>
                </button>
            </div>
        </div>
    );
};

export default AppTopbar;
