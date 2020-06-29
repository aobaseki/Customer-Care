import React , {useState} from 'react';
import SectionNavbars from '../../../../components/Sections/SectionNavbars';
import Box from "@material-ui/core/Box/Box";
import Wallet from '../../../../assets/img/wallet.png';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dates from '../../../../components/Date/Date';
import Button from "@material-ui/core/Button/Button";
import DateTogglerGrouped from "../../../../components/DateToggle/DateTogglerGrouped";
import subDays from 'date-fns/subDays';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "../../../../components/Drawer/Drawer";

const MainPage = props => {
    const [variant, setVariant] = useState('day');
    const [startDay , setDay] = useState(subDays(new Date() , 1));
    const [endDay , setEndDay] = useState(new Date());
    const [isDrawerShow , setIsDrawerShow] = useState(false);

    // const changeView = (event) => {
    //     props.setView(6);
    // };

    const viewHistory = (event) => {
        props.setView(7);
    };

    // const setView = (view) => {
    //     props.setView(view);
    // };

    const setValue = value => {
      setVariant(value);
    };

    const setStartDate = (value) => {
        console.log(value)
    };

    const setEndDate = (value) => {
        console.log(value)
    };

    const generateReport = async () => {
        props.generateReport(variant, startDay, endDay);
    };

    return (
        <div>
            <SectionNavbars
                title={`Reconciliation`}
                leftIcon={
                    <div onClick={() => setIsDrawerShow(true)}>
                        <MenuIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <div
                onClick={() => setIsDrawerShow(false)}
                onKeyDown={() => setIsDrawerShow(false)}
            >
                <Drawer isShow={isDrawerShow} />
            </div>

            <Box component="div" m={2} style={{marginTop: '100px'}}>
                <img className="img100" src={Wallet} alt={'test'}/>
            </Box>

            <Paper variant="outlined" >
                <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px', margin: '20px 0px' }} >
                    Generate reconciliation report
                </Typography>

                <div className={`my-3 mx-3`} >
                    <DateTogglerGrouped
                        initialValue={variant}
                        setValue={setValue.bind(this)}
                        values={[
                            'day',
                            'week',
                            'month',
                            'year'
                        ]}
                    />
                </div>

                <Grid container spacing={1} className={`mx-auto`} >
                    <Grid item xs={5}>
                        <label className={`text-left font-weight-bold`} style={{fontSize: '16px', color: '#707070', marginBottom: '10px'}}>Start date</label>

                        {
                            variant === "day" ?
                                <Dates
                                    style={{
                                        padding: '3px 0px',
                                        marginLeft: '5px',
                                        border: '1px solid #e5e5e5',
                                        backgroundColor: '#FFFFFF',
                                        float: 'center',
                                        fontWeight: '400',
                                        fontSize: '18px' ,
                                        lineHeight: '1.6' ,
                                        marginTop: '2px'
                                    }}
                                    initialDate={startDay}
                                    getValue={setStartDate.bind(this)}
                                />
                                :
                                ""
                        }
                    </Grid>

                    <Grid item xs={1}>
                        <p  className='text-dark text-center font-weight-bold' style={{marginTop: '30px'}}>to</p>
                    </Grid>

                    <Grid item xs={5}>
                        <label className={`text-left font-weight-bold`} style={{fontSize: '16px', color: '#707070', marginBottom: '10px'}}>End date</label>
                        {
                            variant === "day" ?
                                <Dates
                                    style={{
                                        padding: '3px 0px',
                                        marginLeft: '5px',
                                        border: '1px solid #e5e5e5',
                                        backgroundColor: '#FFFFFF',
                                        float: 'center',
                                        fontWeight: '400',
                                        fontSize: '18px',
                                        lineHeight: '1.6',
                                        marginTop: '2px'
                                    }}
                                    initialDate={endDay}
                                    getValue={setEndDate.bind(this)}
                                />
                                :
                                ""
                        }
                    </Grid>
                </Grid>

                <Grid container spacing={1} style={{justifyContent: 'center'}}>
                    <Button
                        variant="contained"
                        style={{
                            'backgroundColor': '#DAAB59' ,
                            color: '#333333',
                            padding: '5px 40px',
                            textTransform: 'none',
                            fontSize:'17px',
                            margin: '30px'
                        }}
                        onClick={generateReport.bind(this)}
                    >
                        Generate report
                    </Button>
                </Grid>

                <Button
                    variant="outlined"
                    style={{
                        border: '1px solid #DAAB59',
                        color: '#DAAB59',
                        padding: '5px 20px',
                        textTransform: 'none',
                        fontSize:'13px',
                        justifyContent: 'center',
                        marginBottom: '10px'
                    }}
                    onClick={viewHistory.bind(this)}
                >
                    View history
                </Button>

            </Paper>

        </div>
    )
}

export default MainPage;
