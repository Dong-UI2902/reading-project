import React from 'react';
import {Types} from "../context/story/constant";
import '../styles/Tag.scss'

const Tag = () => {

    const tag = (item) => {
        return <a className='tag' href={`/view/type/${item.id}`}>{item.name}</a>
    }

    return (
        <div className='tag-container'>
            <section>
                {Types.map(item => tag(item))}
            </section>
        </div>
    );
}

export default Tag;