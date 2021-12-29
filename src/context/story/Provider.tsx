import React, {createContext, useContext, useMemo, useState} from 'react';
import {StoryProps, TypeStory} from "./type";
import {Types} from "./constant";

const StoryContext = createContext({} as StoryProps)
const StoryProvider = ({children}) => {
    const [type, setType] = useState<TypeStory[]>(Types)

    const memoValue = useMemo(
        () => ({
            type,
            setType,
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }), [type],
    )
    return <StoryContext.Provider value={memoValue}>{children}</StoryContext.Provider>
};

export const useStory = (): StoryProps => useContext(StoryContext)

export default StoryProvider;