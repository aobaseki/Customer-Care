import React from "react";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const AddIcon = props => {
    const styles = props.styles;
    return (
        <div >
            <AddCircleOutlineIcon style={styles}/>
        </div>
    );
};

export default AddIcon;