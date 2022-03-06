import React from 'react';
import Cards from "../components/Cards/Cards";
import SearchBox from "../components/SearchBox/SearchBox";

const Story = () => {

    return (
        <div>
            <SearchBox keys={''} type={'name'}/>
            <h3>
                Danh sách truyện
            </h3>
            <div>
                <Cards id={'new'} page={'1'}/>
            </div>
        </div>
    );
};

export default Story;