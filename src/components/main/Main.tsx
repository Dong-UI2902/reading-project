import React from 'react';
import '../../styles/Main.scss'

const Main = ({children}) => {
    return (
        <div className='container mt-2 main'>
            {children}
        </div>
    );
};

export default Main;