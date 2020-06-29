import React from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import shopImg from "../../../assets/img/completion.png";
import BoxDefault from "../../../components/Box/BoxDefault";
import Button from "@material-ui/core/Button/Button";

const ViewWelcome = props => {
    const nextPageHandler = event => {
        props.step(event);
    };

    return(
        <div className="getStarted">
            <Typography
                variant="h5"
                component="h6"
                className="unFont mt-2"
            >
                Hi {props.username}!
            </Typography>
            <Box component="div" m={2}>
                <img className="img100" src={shopImg} alt={'test'}/>
            </Box>
            <div className={`sharpBorderRadius`}>
                <BoxDefault
                    styles={{
                        color: '#333333',
                        bottom: '0',
                        minHeight: '200px',
                        position: 'fixed',
                        padding: '0px',
                        margin: '0px',
                        left: 0,
                        right: 0,
                        width: '95%',
                    }}
                >
                    <Typography
                        variant="h5"
                        component="h6"
                        className="darkHeader"
                        style={{fontSize: '1.3rem'}}
                    >
                        Welcome to your store.
                    </Typography>

                    <p style={{fontSize: '18px',fontWeight: '400' , width: '75%', margin: '10px auto'}}>
                        We promise to assist you on your journey of growing your business.
                    </p>

                    <Button
                        variant="contained"
                        style={{'backgroundColor': '#DAAB59' , borderRadius: '15px', color: '#333333', padding: '8px 50px', margin: '10px auto', fontSize: '18px', fontWeight: '700'}}
                        className={`capitalization`}
                        onClick={nextPageHandler.bind(this)}
                    >
                        Get started
                    </Button>
                </BoxDefault>
            </div>

        </div>
    );
};

export default ViewWelcome;