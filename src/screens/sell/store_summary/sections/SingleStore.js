import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import StoreMallDirectoryRoundedIcon from '@material-ui/icons/StoreMallDirectoryRounded';
import {withRouter} from 'react-router-dom';
import CardDefaultSmall from "../../../../components/Cards/CardDefaultSmall";
import Typography from "@material-ui/core/Typography/Typography";
import './singleStore.scss';
import paths from "../../../../utilities/paths";
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import Collapsible from 'react-collapsible';
import LocalInfo from "../../../../services/LocalInfo";
import BranchService from "../../../../services/BranchService";



const SingleStore = props => {
    const { history } = props;
    const [companySales , setCompanySales] = useState(false);

    const branch = props.branch;

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!companySales) {
            getCompanyDetails();
        }
    });

    const getCompanyDetails = async () => {
        setCompanySales(await new BranchService().getSalesDetails('month' , branch.id));
    };

    const setBranch = (branchId) => {
      console.log(branchId);
        LocalInfo.branchId = branchId;
        history.push(paths.sell);
    };

    return (
        <div className={`bordered rounded mb-3`}>
            <Grid container spacing={1} className={`px-2`}>
                <Grid item xs={2}>
                    <div className={`pt-3`}>
                        <StoreMallDirectoryRoundedIcon style={{fontSize: '2.5rem' , color: '#DAAB59'}}/>
                    </div>
                </Grid>
                <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle', fontSize: '14px'}}
                        className={`font-weight-bold text-uppercase`}
                    >
                        {props.companyName}
                        <div className="font-weight-light mt-1 text-capitalize text-dark" style={{fontSize: '14px'}}>{branch.name}</div>
                    </div>
                </Grid>
                <Grid item xs={4} style={{height: '60px', margin: '13px 0px'}}>
                    <div style={{textAlign: 'right' , width:'100%'}} className={`pt-2`}>
                        <span
                            style={{borderRadius: '6px' , fontSize: '12px' , fontWeight: '700', color: '#DAAB59'}}
                            className={`bordered px-2 py-2`}
                            onClick={() => setBranch(branch.id)}
                        >Open store</span>
                    </div>
                </Grid>
            </Grid>

            <Collapsible
                trigger={
                    <div className={`mx-auto w-100`}>
                        <ExpandMoreRoundedIcon/>
                    </div>
                }
                triggerWhenOpen={
                    <div className={`mx-auto w-100`}>
                        <ExpandLessRoundedIcon/>
                    </div>
                }
            >
                <div
                    style={{
                        display: 'flex',
                        width: '95%',
                        alignItems: 'center',
                        marginBottom: '5px' ,
                        margin: 'auto',
                        paddingBottom: '10px'
                    }}
                >
                    <CardDefaultSmall styles={{width: '85%',margin: '1%', marginTop: '10px', borderRadius: '10px'}} >
                        <Typography
                            component="h6"
                            variant="h6"
                            style={{fontWeight: '500', fontSize: '12px' , lineHeight: '1.3'}}
                            className={`mx-auto`}
                        >
                            Sales made
                        </Typography>
                        <Typography
                            component="h5"
                            variant="h5"
                            style={{fontWeight: '700', fontSize: '15px' , lineHeight: '1.2'}}
                        >
                            GHC {companySales.total}
                        </Typography>
                    </CardDefaultSmall>

                    <CardDefaultSmall styles={{width: '85%', margin: '1%', marginTop: '10px', borderRadius: '10px'}} >
                        <Typography
                            component="h6"
                            variant="h6"
                            style={{fontWeight: '500', fontSize: '12px' , lineHeight: '1.3'}}
                            className={`mx-2`}
                        >
                            Profit made
                        </Typography>
                        <Typography
                            component="h5"
                            variant="h5"
                            style={{fontWeight: '700', fontSize: '15px' , lineHeight: '1.2'}}
                        >
                            GHC {companySales.profit}
                        </Typography>
                    </CardDefaultSmall>

                    <CardDefaultSmall styles={{width: '85%', margin: '1%', marginTop: '10px', borderRadius: '10px'}} >
                        <Typography
                            component="h6"
                            variant="h6"
                            style={{fontWeight: '500', fontSize: '12px' , lineHeight: '1.3'}}
                            className={`mx-auto`}
                        >
                            Credit sales
                        </Typography>
                        <Typography
                            component="h5"
                            variant="h5"
                            style={{fontWeight: '700', fontSize: '15px' , lineHeight: '1.2'}}
                        >
                            GHC {companySales.credit}
                        </Typography>
                    </CardDefaultSmall>

                    <CardDefaultSmall styles={{width: '85%', margin: '1%', marginTop: '10px', borderRadius: '10px'}} >
                        <Typography
                            component="h6"
                            variant="h6"
                            style={{fontWeight: '500', fontSize: '12px' , lineHeight: '1.3'}}
                            className={`mx-auto`}
                        >
                            Purchase made
                        </Typography>
                        <Typography
                            component="h5"
                            variant="h5"
                            style={{fontWeight: '700', fontSize: '15px' , lineHeight: '1.2'}}
                        >
                            GHC {companySales.purchases}
                        </Typography>
                    </CardDefaultSmall>
                </div>
            </Collapsible>

        </div>
    );
};

export default withRouter(SingleStore);
