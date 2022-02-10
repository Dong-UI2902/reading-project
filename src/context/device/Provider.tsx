import React, {createContext, useContext, useMemo} from 'react';
import {isMobile} from "react-device-detect";
import {DeviceContext} from "./type";

const InfoDeviceContext = createContext({} as DeviceContext)
const InfoDeviceProvider = ({children}) => {

    const infoDevice = () => {
        if (isMobile) {
            return {
                urlHome: '/story/search.php?key=&status=&flexCat=&&type=',
                tagSelector: '.col-4',
                urlImage: 'url("//lxhentai.com/assets/hentai/',
                urlType: '/story/cat.php?',
            }
        }
        return {
            urlHome: '/story/index.php',
            tagSelector: '.col-md-3',
            urlImage: 'url("/assets/hentai/',
            urlType: '/story/cat.php?',
        }
    }

    const memoValue = useMemo(
        () => ({
            infoDevice,
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }), [isMobile],
    )

    return (
        <InfoDeviceContext.Provider value={memoValue}>
            {children}
        </InfoDeviceContext.Provider>
    );
};

export const useDevice = (): DeviceContext => useContext(InfoDeviceContext)

export default InfoDeviceProvider;