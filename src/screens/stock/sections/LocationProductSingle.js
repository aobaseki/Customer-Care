import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import RoomIcon from '@material-ui/icons/Room';
import LocalInfo from "../../../services/LocalInfo";

const LocationProductSingle = props => {
    const location = props.location;
    const active = location.id === LocalInfo.branchId;

    return(
        <div className={`rounded mx-1 my-2 p-2 ${active ? 'activeBorder' : 'bordered'}`}>
            <Grid container spacing={1} className={`py-1`}>
                <Grid
                    item xs={2}
                    className={`text-left pl-2`}
                >
                    <RoomIcon
                        style={{fontSize: '30px', color: `${active ? '#DAAB59' : '#333333'}`}}
                    />
                </Grid>

                <Grid
                    item xs={4}
                    className={`text-left pl-2`}
                >
                    <Typography
                        component="h6"
                        variant="h6"
                        style={{fontSize: '14px', color: `${active ? '#DAAB59' : '#333333'}`}}
                        className={`text-left`}
                    >
                        {location.name}
                    </Typography>
                </Grid>

                <Grid
                    item xs={3}
                    className={`pl-2 mx-auto`}
                >
                    <Typography
                        component="h6"
                        variant="h6"
                        style={{fontSize: '15px', color: `${active ? '#DAAB59' : '#333333'}`}}
                        className={`text-center`}
                    >
                        {location.quantity}
                    </Typography>
                </Grid>

                <Grid
                    item xs={3}
                    className={`pl-2 mx-auto`}
                >
                    <Typography
                        component="h6"
                        variant="h6"
                        style={{fontSize: '14px', color: `${active ? '#DAAB59' : '#333333'}`}}
                        className={`text-right font-weight-light`}
                    >
                        {location.id === LocalInfo.branchId ? 'current' : ''}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
};

export default LocationProductSingle;
