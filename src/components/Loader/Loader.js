import React from 'react';
import Loader from 'react-loader-spinner';

const PrimaryLoader = (props) => {
    return(
        <Loader
            type={props.type}
            color={props.color}
            height={props.height}
            width={props.width}
            timeout={props.timeout}
        />
    );
};

export default PrimaryLoader;
