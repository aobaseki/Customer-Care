import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import SearchInput from "../../../../Components/Input/SearchInput";
import SupplierCard from '../../../../../components/Cards/SupplierCard';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
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
    iconButton: {
        padding: 10,
    }
}));

const SortSupplierView = props => {

    const branchSuppliers = props.branchSuppliers;

    const classes = useStyles();
    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    const setInputValue = async (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchSupplierHandler(value);
    };

    const addSupplierHandler = (id) => {
        console.log(id);
        props.supplierAdd(id, 0);
    };

    return(
        <div>
            <Typography className='text-dark font-weight-bold' style={{ fontSize: '15px', margin: '5px 0px' }} >
                Search for a supplier to view history
            </Typography>

            <div style={{ position: "fixed", top:"50px", width:"100%" , zIndex: '1000' , paddingBottom: '10px'}}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2} style={{marginTop: '10px'}} className={`pt-2`}>
                        <Grid item xs={11} style={{padding: '4px 8px'}} className={`mx-auto mt-7`}>
                            <SearchInput
                                inputName="Search a supplier"
                                styles={{
                                    border: '1px solid #e5e5e5',
                                    padding: '10px 0px'
                                }}
                                getValue={setInputValue.bind(this)}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </div>

            <Grid
                container
                spacing={1}
                className={`shadow1 boxMain mx-auto rounded mt-2`}
                style={{width: '100%', padding: '10px 2% 20px' , marginBottom: '60px'}}
            >
                {branchSuppliers.length === 0
                    ?
                    <Grid
                        item xs={12}
                        className={`text-left pl-2`}
                    >
                        <div className={`rounded mx-1 my-2 p-2 bordered`}>
                            <Typography
                                component="h6"
                                variant="h6"
                                style={{fontSize: '16px'}}
                                className={`text-center text-dark w-100`}
                            >
                                No supplier found
                            </Typography>
                        </div>
                    </Grid>
                    :
                    branchSuppliers.map((branchSupplier) =>
                    <Grid key={branchSupplier.id} item xs={4} style={{padding: '4px 8px' , position: 'relative'}} className={`mx-0 px-1`}>
                    <div
                        onClick={addSupplierHandler.bind(this, branchSupplier.id)}
                    >
                        <SupplierCard supplier={branchSupplier.supplier.fetch()}>
                            
                        </SupplierCard>
                    </div>
                    </Grid>
                    )
                }

            </Grid>


        </div>
    );
};

export default SortSupplierView;