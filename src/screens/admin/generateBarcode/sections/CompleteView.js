import React from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import shopImg from "../../../../assets/img/shop.svg";
import BoxDefault from "../../../Components/Box/BoxDefault";
import Button from "@material-ui/core/Button/Button";
import paths from "../../../../utilities/paths";
import {withRouter} from "react-router";


const CompleteView = props => {
    const { history } = props;

    return(
        <div>
            <Box component="div" m={2}>
                <img className="img100" src={shopImg} alt={'test'}/>
            </Box>
            <BoxDefault
                styles={{
                    color: '#333333',
                    bottom: '0',
                    'border-top-left-radius': '50px',
                    'border-top-right-radius': '50px',
                    minHeight: '200px',
                    position: 'fixed',
                    padding: '0px',
                    margin: '0px',
                    left: 0,
                    right: 0,
                    width: '100%',
                }}
            >
                <Typography
                    variant="h5"
                    component="h6"
                    className="darkHeader"
                >
                    Congratulations
                </Typography>

                <p style={{fontSize: '16px',fontWeight: '400' , width: '75%', margin: '0px auto'}}>
                    Your shop is all stocked up.
                </p>

                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , borderRadius: '10px', color: '#333333', padding: '8px 50px', margin: '10px auto', fontSize: '16px', fontWeight: '700'}}
                    className={`capitalization`}
                    onClick={() => history.push(paths.category_setup)}
                >
                    Start selling!
                </Button>

                <p style={{fontSize: '16px',fontWeight: '400' , width: '75%', margin: '5px auto'}}>
                    You can add another shop location, warehouse and attendants in settings.
                </p>

                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , borderRadius: '10px', color: '#333333', padding: '8px 50px', margin: '10px auto', fontSize: '16px', fontWeight: '700'}}
                    className={`capitalization`}
                    onClick={() => history.push(paths.category_setup)}
                >
                    Go to settings!
                </Button>
            </BoxDefault>
        </div>
    );
};

export default withRouter(CompleteView);