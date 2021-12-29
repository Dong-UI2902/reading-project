import React from 'react';
import {ThemeProvider} from "../theme/Provider";
import StoryProvider from "../context/story/Provider";

const Providers: React.FC = ({children}) => {
    return (
        <ThemeProvider>
            <StoryProvider>
                {children}
            </StoryProvider>
        </ThemeProvider>
    );
};

export default Providers;