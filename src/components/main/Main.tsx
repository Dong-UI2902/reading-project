import React from 'react';
import '../../styles/Main.css'

const Main = ({children}) => {
    return (
        <div className='container mt-2'>
            <div className='main'>
                {children}
            </div>
        </div>
    );
};

export default Main;