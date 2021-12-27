import React from 'react';
import {ThemeProvider} from "../theme/Provider";

const Providers: React.FC = ({children}) => {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
};

export default Providers;