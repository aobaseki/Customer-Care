import React , {useState} from 'react';
import { BrowserBarcodeReader } from '@zxing/library';
import {makeStyles} from "@material-ui/core";
import './barcodeMode.scss';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import Don from '../../../../../../../assets/img/Don.jpg';
import SimpleSnackbar from "../../../../../../../components/Snackbar/SimpleSnackbar";
import MainDialog from "../../../../../../../components/Dialog/MainDialog";

const useStyles = makeStyles(theme => ({
    root: {
        width: '95%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '35px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
}));

const BarcodeMode = props => {
    const styles = useStyles();
    const [barcodeNumber , setBarcodeNumber] = useState();
    const [productName , setProductName] = useState('');
    const [productImage , setProductImage] = useState('');
    const [showProduct , setShowProduct] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const codeReader = new BrowserBarcodeReader();
    const beepSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'+Array(1e3).join(123));
    let selectedDeviceId;

    codeReader
        .listVideoInputDevices()
        .then(videoInputDevices => {
            videoInputDevices.forEach(device =>
                console.log(`${device.label}, ${device.deviceId}`)
            );

            selectedDeviceId = videoInputDevices[0].deviceId;

            let userAgent = navigator.userAgent.toLowerCase();
            let android = userAgent.indexOf("android") > -1;

            if (videoInputDevices.length >= 1) {
                if(android) {
                    selectedDeviceId = videoInputDevices[1].deviceId
                }
            }

            document.getElementById('barOverlay').addEventListener('click', () => {
                document.getElementById('barOverlay').style.display = 'none';

                codeReader
                    .decodeOnceFromVideoDevice(selectedDeviceId, 'video')
                    .then(result => {
                        alert(result.text);
                        beepSound.play();
                        setBarcodeNumber(result.text);
                        barcodeSearchHandler();
                        codeReader.reset();
                        document.getElementById('barOverlay').style.display = 'block';
                    })
                    .catch(err => {
                        //document.getElementById('barError').textContent = err;
                        console.log(err)
                    });
            });
        })
        .catch(err => console.error(err));

    const barcodeSearchHandler = async() => {
        if(barcodeNumber === '' || typeof barcodeNumber === 'undefined'){
            await setErrorMessage('Barcode empty. Please try again.');
            await setErrorDialog(true);
            return false;
        }
        const product = await props.searchBarcode(barcodeNumber);

        if(product.length === 1){
            if( product.length === 1) {
                props.setView(1);
            }
            return true
        }else if(product.length === 0) {
            await setErrorMessage('Product with this barcode does not exist');
            await setErrorDialog(true);
        }
    };

    return(
        <div className={`bCode mx-1`} style={{position: 'relative', minHeight: '65vh'}}>
            <SimpleSnackbar
                type="success"
                openState={errorDialog}
                message={errorMessage}
            />
            <MainDialog states={showProduct}>
                <Typography
                    component="h6"
                    variant="h6"
                    className={`text-center my-1`}
                    style={{fontWeight: '500', fontSize: '16px' , margin: '5px auto', paddingTop: '10px'}}
                >
                    Selected product :
                </Typography>

                <div className={`w-100 m-2`}>
                    <img className={`img-fluid mx-auto w-50 h-75`} src={productImage} alt={`${productName}`}/>
                </div>

                <Typography
                    component="p"
                    variant="h6"
                    className={`text-center my-2 font-weight-bold`}
                    style={{fontWeight: '500', fontSize: '16px' , margin: '5px auto', paddingTop: '10px'}}
                >
                    {productName}
                </Typography>

                <Box
                    className={`bg-white my-3`}
                    p={1}
                    style={{ height: '2.5rem', width:"100%" }}
                >
                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', marginRight: '10px'}}
                        onClick = {() => setShowProduct(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        style={{'backgroundColor': '#DAAB59' , color: '#333333'}}
                        onClick = {() => props.setView(1)}
                    >
                        Add
                    </Button>
                </Box>
            </MainDialog>
            <div id="barOverlay" className="text-center text-white"
                 style={{backgroundImage: `url(${Don})`, backgroundRepeat: 'no-repeat' , backgroundPosition: 'top', backgroundSize: '80% 250px', position: 'absolute', height: '65vh',zIndex: '1000',width: '100%',backgroundColor: '#919191',opacity: '0.4', outlineOffset: '0px', outline: '15px solid rgb(145, 145, 145)'}}>
                <p className="text-center w-100 font-weight-bold"
                   style={{marginTop: '30%',fontSize: '20px',color: 'black'}}>Click to scan
                    barcode of product</p>
            </div>

            <Grid container spacing={1} className={`p-3 mb-0 mx-1`}>
                <Grid
                    item xs={12}
                    className={`text-right`}
                >
                    <div className={`video_canvas`}>
                        <video
                            id="video"
                            width="235"
                            height="200"
                            muted={true}
                            style={{backgroundColor: '#ffffff'}}
                        >
                        </video>
                    </div>
                </Grid>
            </Grid>
            <div
                className={`newBox`}
                style={{position:'relative', zIndex: 1030, right: 0, left: '-3.5%', width: '100%'}}
            >
                <Box
                    className={`shadow1 bg-white`}
                    p={1}
                    style={{ position: "fixed", bottom:"0rem", width:"100%", height: '100px' }}
                >
                    <div className={`w-75 mx-auto`}>
                        <Typography
                            component="p"
                            variant="h6"
                            className={`text-center my-1 font-weight-bold`}
                            style={{fontWeight: '400', fontSize: '16px' , margin: '5px auto', paddingTop: '10px'}}
                        >
                            Sell products
                        </Typography>
                        <Grid container spacing={1} className={`mb-2`}>
                            <Grid
                                item xs={10}
                                className={`text-right`}
                            >
                                <Paper className={`${styles.root} text-center`} >
                                    <InputBase
                                        className={`${styles.input} search-box`}
                                        placeholder="Enter barcode key"
                                        value={barcodeNumber}
                                        inputProps={{ 'aria-label': 'Enter barcode key' }}
                                        onChange={(event) => setBarcodeNumber(event.target.value)}
                                    />
                                </Paper>
                            </Grid>

                            <Grid
                                item xs={2}
                                className={`text-left`}
                                style={{color: '#D34343'}}
                            >
                                <div style={{backgroundColor: '#DAAB59', color: '#333333', borderRadius: '50%', width: '40px', height: '40px'}}>
                                    <SearchIcon className={`p-2`} onClick={barcodeSearchHandler}/>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </div>
        </div>
    );
};

export default BarcodeMode;
