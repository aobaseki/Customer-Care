import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const AddedIcon = props => {
    const styles = props.styles;
    return (
        <div >
            <CheckCircleIcon style={styles}/>
        </div>
    );
};

export default AddedIcon;