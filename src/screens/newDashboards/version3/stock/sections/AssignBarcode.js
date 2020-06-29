import React, {useEffect, useState} from 'react';
import SectionNavbars from "../../../../../components/Sections/SectionNavbars";
import { BrowserBarcodeReader } from '@zxing/library';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box/Box";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import Button from "@material-ui/core/Button/Button";
import SimpleSnackbar from "../../../../../components/Snackbar/SimpleSnackbar";

const AssignBarcode = props => {

    let branchProduct = props.product[0];
    const [product , setProduct] = useState('');
    const [name , setName] = useState('');
    const [barcodeNumber , setBarcodeNumber] = useState();
    const codeReader = new BrowserBarcodeReader();
    const beepSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'+Array(1e3).join(123));
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [success , setSuccess] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');
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
                .then( async result => {
                    alert(result.text);
                    beepSound.play();
                    setBarcodeNumber(result.text);
                    await addProductBarcode();
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

    useEffect(() => {
        if (!product) {
            getProduct();
        }
    }, []);

    const getProduct = async () => {
        const newProduct = await branchProduct.product.fetch();
        console.log(newProduct);
        console.log(newProduct.barCode);
        setProduct(newProduct);
        setBarcodeNumber(newProduct.barCode);
        setName(newProduct.name);
    };

    const addProductBarcode = async () => {
        const response = props.addProductBarcode(product.id, barcodeNumber);

        if(response){
            setSuccessMsg('Product barcode was successfully changed');
            setSuccess(true);
            setTimeout(function(){
                setSuccessMsg('');
                setSuccess(false);
            }, 2000);
            setBarcodeNumber('');
            props.setView(0);
        }else{
            setErrorMsg('OOPS. Something went wrong. Please try again');
            setError(true);
            setTimeout(function(){
                setErrorMsg('');
                setError(false);
            }, 2000);
        }
    };

    const backHandler = () => {
        props.setView(1);
    };

    return (
        <div>
            <SectionNavbars title="Assign Barcode"
                leftIcon= {
                    <ArrowBackIcon
                        onClick={backHandler.bind(this)}
                        style={{fontSize: '2.5rem'}}
                    />
                }
            />

            <SimpleSnackbar
                type="success"
                openState={success}
                message={successMsg}
            />

            <SimpleSnackbar
                type="warning"
                openState={error}
                message={errorMsg}
            />

            <div className="row pt-0 mx-0 text-center shadow1" style={{marginTop: '60px'}}>
                <Typography
                    component="p"
                    variant="h6"
                    style={{fontSize: '18px' , margin: '0px 0px', padding: '8px'}}
                    className={`text-center mx-auto text-dark font-weight-bold`}
                >
                    {name}
                </Typography>
            </div>

            <div id="barOverlay" className="text-center text-white"
                 style={{backgroundSize: '80% 250px', position: 'absolute', height: '40vh',zIndex: '1000',width: '100%',backgroundColor: '#919191',opacity: '0.4', outlineOffset: '0px', outline: '15px solid rgb(145, 145, 145)', marginTop: '18px'}}>
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

            <Box
                className={`newBox shadow1 bg-white pb-3 pt-1`}
                p={1}
                style={{position:'relative', zIndex: 1030,  right: 0, left: 0, bottom: '1.0rem', width: '90%', minHeight: '250px', marginLeft: '10px'}}
            >

                <Typography
                    component="h5"
                    variant="h5"
                    style={{fontWeight: '500', fontSize: '18px', lineHeight: '1.5', marginTop: '40px', marginBottom: '20px'}}
                >
                    Scan the barcode of the product to assign it
                </Typography>

                <FormControl variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        placeholder="Barcode number appears here"
                        size="small"
                        type="number"
                        value={barcodeNumber}
                        onChange={event => setBarcodeNumber(event.target.value)}
                        style={{width: '280px'}}
                        startAdornment={<InputAdornment position="start"><GraphicEqIcon /> </InputAdornment>}
                    />
                </FormControl>

                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 70px', textTransform: 'none', marginTop: '30px', fontSize: '17px'}}
                    onClick={addProductBarcode.bind(this)}
                >
                    Finish
                </Button>

            </Box>



        </div>
    )
}

export default AssignBarcode;
