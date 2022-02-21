import React, {useEffect} from 'react';
import {Types} from "../context/list/constant";
import '../styles/Tag.scss'

const Tag = () => {

    useEffect(() => {
        document.title = 'Thể loại'
    }, [])

    return (
        <div className='tag-container'>
            <section>
                {Types.map(item => (
                    <a key={item.id} className='tag' href={`tag/${item.id}/1`}>{item.name}</a>
                ))}
            </section>
        </div>
    );
}

export default Tag;