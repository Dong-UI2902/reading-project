import React, {memo, useEffect, useState} from 'react';
import Li from "./Li";
import {useParams} from "react-router-dom";
import {useStore} from "../../../context/store/Provider";

const Pagination = ({pageNumber}) => {
    const {products} = useStore()
    const [max, setMax] = useState<number>()
    const [pages, setPages] = useState<number[]>([]);

    const params = useParams();
    const page = Number(params.page);


    const updatePages = (start) => {

        if (!start) {
            start = 1;
        }

        const arr: number[] = [];
        let i = start - 1;

        if (start < 2) {
            i = 1;
        }

        let length = Number(start) + Number(pageNumber) - 1;

        if (start === 1) {
            length++;
        }

        if ((Number(start) + Number(pageNumber)) < max) {
            for (i; i < length; i++) {
                arr.push(Number(i) + 1);
            }

            return arr;
        }

        i = max - pageNumber - 1;
        for (i; i < max - 1; i++) {
            arr.push(Number(i) + 1);
        }


        return arr;
    }


    useEffect(() => {
        setPages(updatePages(page));
    }, [page]);

    useEffect(() => {
        setMax(Math.round(products.length / 8))
    }, [products.length]);

    useEffect(() => {
        setPages(updatePages(page));
    }, [max]);

    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <Li props={page === 1 && 'disabled'}>
                        Previous
                    </Li>
                    <Li props={page === 1 && 'active'}>
                        1
                    </Li>
                    {pages.map(item => {
                        return <Li key={item} props={page === item && 'active'}>{item}</Li>
                    })}
                    <Li props={page === max && 'active'}>
                        {max}
                    </Li>
                </ul>
            </nav>
        </div>
    );
};

export default memo(Pagination);