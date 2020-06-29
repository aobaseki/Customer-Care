import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { withRouter } from "react-router-dom";
import paths from "../../../utilities/paths";
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const BottomMenu = props => {
    const { history } = props;
    const setView = (step) => {
        props.setView(step);
    };

    return (
        <Grid
            container
            spacing={1}
            className={`py-1`}
            style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <div
                className={`text-center icon-color`}
                style={{
                    flex: 1,
                }}
                onClick={() => history.push(paths.dashboard)}
            >
                <HomeIcon
                    style={{fontSize: '25px'}}
                />

                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontSize: '12px'}}
                    onClick={() => setView(5)}
                >
                    Home
                </Typography>
            </div>

           
            <div
                style={{flex: 1}}
                className={`text-center icon-color`}
            >
                <AccountCircleIcon
                    style={{fontSize: '25px'}}
                />
                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontSize: '12px'}}
                >
                    Account
                </Typography>
            </div>
              
            <div
                style={{flex: 1}}
                className={`text-center icon-color`}
                onClick={() => history.push(paths.sales_history)}
            >
                <AccessTimeIcon
                    style={{fontSize: '25px'}}
                />

                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontSize: '12px'}}
                >
                    History
                </Typography>
            </div>
            <div
                style={{flex: 1}}
                className={`text-center icon-color`}
            >
                <MoreHorizIcon
                    style={{fontSize: '25px'}}
                />

                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontSize: '12px'}}
                >
                    More
                </Typography>
            </div>
        </Grid>
    );
};

export default withRouter(BottomMenu);

