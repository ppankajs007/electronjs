import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {

   const navigate = useNavigate();

    return (
        <div className="flex flex-column align-items-center justify-content-center">
            <div className='mt-5' style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, rgba(233, 30, 99, 0.4) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                <div className="w-full surface-card py-5 px-5 sm:px-8 flex flex-column align-items-center" style={{ borderRadius: '53px' }}>
                    <div className="flex justify-content-center align-items-center bg-pink-500 border-circle" style={{ height: '3.2rem', width: '3.2rem' }}>
                        <i className="pi pi-fw pi-exclamation-circle text-2xl text-white"></i>
                    </div>
                    <h1 className="text-900 font-bold text-5xl mb-2">Whoops! :(</h1>
                    <div className="text-600 mb-5">We can't seem to find the page that you're looking for</div>
                    <img src={"./demo/images/error/asset-error.svg" } alt="Error" className="mb-5" width="80%" />
                    <Button icon="pi pi-arrow-left" label="Go to Dashboard" text onClick={() => navigate('/') }  />
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;