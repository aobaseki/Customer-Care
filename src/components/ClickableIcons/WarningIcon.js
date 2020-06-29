import React from 'react';
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';

const WarningIcon = props => {
    const styles = props.styles;
    return (
        <div >
            <WarningOutlinedIcon style={styles}/>
        </div>
    );
};

export default WarningIcon;