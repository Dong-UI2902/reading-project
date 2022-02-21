import React from 'react';
import ListStoryProvider from "../context/list/Provider";
import InfoDeviceProvider from "../context/device/Provider";
import StoryProvider from "../context/story/Provider";
import {AuthProvider} from "../context/auth";

const Providers: React.FC = ({children}) => {
    return (
        <>
            <AuthProvider>
                <InfoDeviceProvider>
                    <ListStoryProvider>
                        <StoryProvider>
                            {children}
                        </StoryProvider>
                    </ListStoryProvider>
                </InfoDeviceProvider>
            </AuthProvider>
        </>
    );
};

export default Providers;