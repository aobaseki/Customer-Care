import React, {useState} from 'react';
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "../../../components/Drawer/Drawer";
import {withRouter} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import SearchInput from "../../Components/Input/SearchInput";
import Typography from '@material-ui/core/Typography';
import SingleStore from './SingleStore';
import AltStore from './AltStore';


const MainPage = props => {

    const [isDrawerShow , setIsDrawerShow] = useState(false);
    const [searchValue , setSearchValue] = useState({
        search: ''
    });
    const storeList = props.storeList;

    const altStoreList = props.altStoreList;


    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchEmployee(value);
    };

    return (
        <div>

            <SectionNavbars
                title="Welcome User"
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

            <Grid container spacing={2} style={{marginTop: '60px'}} className={`pt-2`}>
                <Typography
                    component="h5"
                    variant="h5"
                    style={{fontWeight: '500', fontSize: '18px' , margin: '0px 0px', padding: '10px 14px 0px'}}
                    className={`text-center mx-auto text-dark`}
                >
                    Select a shop location to continue
                </Typography>
            </Grid>

            
            <Grid container spacing={2} className={`pt-2`}>
                <Grid item xs={11} style={{padding: '10px 8px 15px 8px'}} className={`mx-auto mt-7`}>
                    <SearchInput
                        inputName="search"
                        styles={{
                            border: '1px solid #e5e5e5',
                            padding: '4px 0px'
                        }}
                        getValue={setInputValue.bind(this)}
                    />
                </Grid>
            </Grid>

            <Box style={{marginTop: '5px' , paddingBottom: '5px'}} p={1} className={`mt-2 mb-1 mx-1`}>
                {storeList.map((item) => <SingleStore key={item.id} store={item}/>)}

                {altStoreList.map((item) => <AltStore key={item.id} store={item}/>)}
            </Box>
            


        </div>
    )
}

export default withRouter(MainPage);