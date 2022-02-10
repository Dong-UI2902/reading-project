import React from 'react';
import ListStoryProvider from "../context/list/Provider";
import InfoDeviceProvider from "../context/device/Provider";
import StoryProvider from "../context/story/Provider";
import StoreProvider from "../context/store/Provider";

const Providers: React.FC = ({children}) => {
    return (
        <>
            <InfoDeviceProvider>
                <ListStoryProvider>
                    <StoryProvider>
                        <StoreProvider>
                            {children}
                        </StoreProvider>
                    </StoryProvider>
                </ListStoryProvider>
            </InfoDeviceProvider>
        </>
    );
};

export default Providers;