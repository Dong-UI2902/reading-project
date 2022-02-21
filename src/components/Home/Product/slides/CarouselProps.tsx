import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: {max: 4000, min: 1200},
        items: 4
    },
    desktop: {
        breakpoint: {max: 1200, min: 768},
        items: 3
    },
    tablet: {
        breakpoint: {max: 768, min: 576},
        items: 2
    },
    mobile: {
        breakpoint: {max: 576, min: 0},
        items: 1
    }
};

const cardStyle = 'display: flex;\n' +
    '  justify-content: center;\n' +
    '  padding: 40px 0px;'

const CarouselProps = (props: any) => {
    return (
        <div>
            <Carousel responsive={responsive} itemClass={cardStyle}>
                {props.children}
            </Carousel>
        </div>
    );
};

export default CarouselProps;