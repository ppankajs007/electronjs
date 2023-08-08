import React, { useState } from "react";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
const Login = () => {
    const [checked,setChecked] = useState('');
    const [loading, setLoading] = useState(true);
    const [email,setEmail] = useState('')


 return(
        <React.Fragment>

            <div class="px-5 min-h-screen flex justify-content-center align-items-center">
                <div class="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
                    <div class="mb-4">
                        <div class="text-900 text-xl font-bold mb-2">Log in</div>
                        <span class="text-600 font-medium">Please enter your details</span>
                    </div>
                    <div class="flex flex-column">
                        <span class="p-input-icon-left w-full mb-4"><i class="pi pi-envelope"></i>
                            <InputText id="email" type="text" placeholder="Email address" className="w-full md:w-25rem" />
                        </span>
                        <span class="p-input-icon-left w-full mb-4">
                            <i class="pi pi-lock"></i>
                            <InputText id="password" type="password" placeholder="Password" className="w-full md:w-25rem" />
                        </span>
                        <div class="mb-4 flex flex-wrap gap-3">
                            <div>
                                <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
                                <label htmlFor="rememberme" className="text-900">Remember me</label>
                            </div>
                        </div>
                        <Button label="Sign In" icon="pi pi-user"  className="w-full cp" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}

export default Login;
