import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import Drawer from "../../../components/Drawer/Drawer";
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box";
import SingleStore from "./sections/SingleStore";
import Button from "@material-ui/core/Button/Button";
import LocalInfo from "../../../services/LocalInfo";
import CompanyService from "../../../services/CompanyService";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import Carts from "../../../models/carts/Carts";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import confirmImg from "../../../assets/img/dashboard.png";
import CardDefault from "../../../components/Cards/CardDefault";

const StoreSummary = props => {
    const [companySales , setCompanySales] = useState(false);
    const [isDrawerShow , setIsDrawerShow] = useState(false);
    const [branchList , setBranchList] = useState([]);
    const [companyName , setCompanyName] = useState(false);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!companySales) {
            getCompanyDetails();
        }
    });

    const getCompanyDetails = async () => {
        const result = await new CompanyService().getSalesDetails('month');
        setBranchList(LocalInfo.branches);
        setCompanyName(LocalInfo.company.name)
        setCompanySales(result);
    };

    const { history, database } = props;

    /*
    * @todo replace user name with localInfo details.
    * */
    const username = LocalInfo.username;

    return (
        <div>
            <React.Fragment>
                <CssBaseline />

                <SectionNavbars
                    title={`Welcome ${username}`}
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

                <Box component="div" m={2} style={{paddingTop: '0px' , marginTop: '40px' , marginBottom: '0px' , height: '190px'}}>
                    <img className={`img-responsive w-100`} src={confirmImg} alt={'test'}/>
                </Box>

                <div
                    p={1}
                    className="rounded bordered mx-2 px-1 mt-2"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        paddingBottom: '10px'
                        //border: '0.5px solid #e5e5e5'
                    }}
                >
                    <Typography
                        component="p"
                        variant="h6"
                        style={{fontWeight: '700', fontSize: '1.00rem'}}
                    >
                        Company summary
                    </Typography>

                    <div
                        style={{
                            display: 'flex',
                            width: '85%',
                            alignItems: 'center',
                            marginBottom: '5px' ,
                        }}
                    >
                        <CardDefault
                            styles={{
                                marginTop: '10px' ,
                                flex: 1,
                                marginRight: '10px',
                                borderRadius: '5px',
                                border: '0.5px solid #e5e5e5'
                            }}
                        >
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '500', fontSize: '0.9rem'}}
                            >
                                Today's sales
                            </Typography>

                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '1.2rem'}}
                            >
                                GHC {companySales.total}
                            </Typography>

                        </CardDefault>

                        <CardDefault
                            styles={{
                                marginTop: '10px' ,
                                flex: 1,
                                marginLeft: '10px',
                                borderRadius: '5px',
                                border: '0.5px solid #e5e5e5'
                            }}
                        >
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '500', fontSize: '0.9rem'}}
                            >
                                Today's profit
                            </Typography>

                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '1.2rem'}}
                            >
                                GHC {companySales.profit}
                            </Typography>
                        </CardDefault>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            width: '85%',
                            alignItems: 'center',
                            marginBottom: '5px' ,
                        }}
                    >
                        <CardDefault
                            styles={{
                                marginTop: '10px' ,
                                flex: 1,
                                marginRight: '10px',
                                borderRadius: '5px',
                                border: '0.5px solid #e5e5e5'
                            }}
                        >
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '500', fontSize: '0.9rem'}}
                            >
                                Credit sales
                            </Typography>

                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '1.2rem'}}
                            >
                                GHC {companySales.credit}
                            </Typography>
                        </CardDefault>

                        <CardDefault
                            styles={{
                                marginTop: '10px' ,
                                flex: 1,
                                marginLeft: '10px',
                                borderRadius: '5px',
                                border: '0.5px solid #e5e5e5'
                            }}
                        >
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '500', fontSize: '0.9rem'}}
                            >
                                Purchases
                            </Typography>

                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '1.2rem'}}
                            >
                                GHC {companySales.purchases}
                            </Typography>
                        </CardDefault>
                    </div>

                </div>

                <div className={`rounded bordered mb-7 mx-2 px-1 mt-2`}>
                    <Typography
                        component="h5"
                        variant="h5"
                        style={{fontWeight: '500', fontSize: '18px' , margin: '0px 0px', padding: '10px 14px 0px'}}
                        className={`text-center mx-auto text-dark`}
                    >
                        Select a shop location to continue
                    </Typography>

                    <Box style={{marginTop: '5px' , paddingBottom: '5px'}} p={1} className={`mt-2 mb-1 mx-1`}>
                        {branchList.map((item) => <SingleStore key={item.branchId} branch={item} companyName={companyName} />)}
                    </Box>
                </div>
                <Box
                    className={`shadow1 bg-white`}
                    p={1}
                    style={{ height: '3.5rem', position: "fixed", bottom:"0", width:"100%" }}
                >
                    <Button
                        variant="contained"
                        style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '9px 20px', fontSize: '14px'}}
                        className={`capitalization font-weight-bold`}
                    >
                        Add new store location
                    </Button>
                </Box>
            </React.Fragment>
        </div>
    );
};

const EnhancedStoreSummary = withDatabase(
    withObservables([], ({ database }) => ({
        carts: database.collections.get(Carts.table).query().observe(),
    }))(withRouter(StoreSummary))
);

export default EnhancedStoreSummary;

