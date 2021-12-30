import React from 'react';

const AlertError = ({children}) => (
    <>
        {children && <div className="alert alert-danger w-25 me-auto ms-auto text-center" role="alert">
            {children}
        </div>}
    </>
)

export default AlertError;