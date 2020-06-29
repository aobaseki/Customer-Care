import React from 'react';
import {
    makeStyles,
} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    active: {
        border: '1px solid #DAAB59',
        color: '#DAAB59'
    }
}));
const CategorySingle = props => {
    const classes = useStyles();

    const _viewSubCategory = (id , event) => {
        props._viewSubCategory(id , event);
    };

    return(
        <span
            key={props.item.id}
            className={`shadow1 ${props.item.id === props.activeItem ? `activeBorder activeColor` : ''}`}
            style={{cursor: 'pointer'}}
            onClick={_viewSubCategory.bind(this, props.item.id)}
        >
            {props.item.name}
        </span>
    );
};

export default CategorySingle;
