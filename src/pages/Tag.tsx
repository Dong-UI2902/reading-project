import React from 'react';
import {Types} from "../context/story/constant";
import '../styles/Tag.scss'

const Tag = () => {

    return (
        <div className='tag-container'>
            <section>
                {Types.map(item => (
                    <a key={item.id} className='tag' href={`type/${item.id}/1`}>{item.name}</a>
                ))}
            </section>
        </div>
    );
}

export default Tag;