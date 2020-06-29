import React from 'react';
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Box from "@material-ui/core/Box/Box";
import ErrorImage from '../../../../assets/img/errorImage.png';
import Typography from '@material-ui/core/Typography';
import AppsIcon from '@material-ui/icons/Apps';
import Button from "@material-ui/core/Button/Button";
import { withRouter } from "react-router-dom";
import LocalInfo from '../../../../services/LocalInfo';
import paths from "../../../../utilities/paths";


const useStyles = makeStyles(theme => ({
    root: {
    flexGrow: 1,
    }
}));

const ErrorPage = props => {

    const classes = useStyles();
    const { history } = props;

    return(
        <div className={classes.root} >

            <SectionNavbars
                title={ LocalInfo.company.name }
                leftIcon={
                    <div onClick={() => history.goBack()} >
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                icons={
                    <div onClick={() => history.push(paths.dashboard)}>
                        <AppsIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <Box component="div" m={2} style={{marginTop: '8rem'}}>
                <img className="img100" src={ErrorImage} alt={'payment'}/>
            </Box>

            
            <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px', padding: '20px' }} >
                PAGE NOT FOUND
            </Typography>
            

            <Typography className='font-weight-light mt-1' style={{ fontSize: '17px', marginBottom: '20px' }} >
                    Sorry! It seems the page you clicked on does not exist
            </Typography>

            <Button
                variant="outlined"
                style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 20px', textTransform: 'none', fontSize:'17px'}}
                onClick={() => history.goBack()}
            >
                Go to the previous page
            </Button>

        </div>
    )

}

  export default withRouter(ErrorPage);