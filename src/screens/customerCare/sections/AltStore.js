import React from 'react';
import Grid from "@material-ui/core/Grid";
import StoreMallDirectoryRoundedIcon from '@material-ui/icons/StoreMallDirectoryRounded';
import {withRouter} from 'react-router-dom';
import './singleStore.scss';
// import paths from "../../../../utilities/paths";
// import LocalInfo from "../../../../services/LocalInfo";
// import BranchService from "../../../../services/BranchService";



const AltStore = props => {
    // const { history } = props;
    // const [companySales , setCompanySales] = useState(false);

    const store = props.store;

    // useEffect(() => {
    //     // You need to restrict it at some point
    //     // This is just dummy code and should be replaced by actual
    //     if (!companySales) {
    //         getCompanyDetails();
    //     }
    // });

    // const getCompanyDetails = async () => {
    //     setCompanySales(await new BranchService().getSalesDetails('month' , branch.id));
    // };

    // const setBranch = (branchId) => {
    //   console.log(branchId);
    //     LocalInfo.branchId = branchId;
    //     history.push(paths.sell);
    // };

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
                        {/* {props.companyName} */} {store.name}
                        {/* <div className="font-weight-light mt-1 text-capitalize text-dark" style={{fontSize: '14px'}}>{branch.name}</div> */}
                    </div>
                </Grid>
                <Grid item xs={4} style={{height: '60px', margin: '13px 0px'}}>
                    <div style={{textAlign: 'right' , width:'100%'}} className={`pt-2`}>
                        <span
                            style={{borderRadius: '6px' , fontSize: '12px' , fontWeight: '700', color: '#DAAB59'}}
                            className={`bordered px-2 py-2`}
                            // onClick={() => setBranch(branch.id)}
                        >Open store</span>
                    </div>
                </Grid>
            </Grid>

        </div>
    );
};

export default withRouter(AltStore);
