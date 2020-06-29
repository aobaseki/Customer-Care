import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import './ChangePrice.scss';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ProductCard from "../../../Components/Cards/ProductCard";
import AddedIcon from "../../../Components/ClickableIcons/AddedIcon";
import AddIcon from "../../../Components/ClickableIcons/AddIcon";
import ProductCardHorizontal from "../../../Components/Cards/ProductCardHorizontal";


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

const SearchMode = props => {
    const [type, setType] = useState(10);

    const handleTypeChange = event => {
        setType(event.target.value);
    };

    const addProduct = (pId , event) => {
        props.productAdd(pId);
    };

    const products = props.products;

    const classes = useStyles();

    const addProductHandler = (id) => {
        console.log(id);
        props.productAdd(id);
    };

    const removeProductHandler = (id) => {
        console.log(id);
        props.removeProduct(id);
    };

    return(
        <div className="shadow1 boxMain" style={{minHeight: '400px' , width: '96%', padding: '0px 2% 20px' , marginBottom: '60px'}}>

            <Grid container spacing={1}>
                <Grid item xs={12} style={{marginTop: '5px', padding: '4px 4px'}}>
                    <Paper className={classes.root} style={{width: '96%'}}>
                        <InputBase
                            className={`${classes.input} search-box`}
                            placeholder="Search for a product"
                            inputProps={{ 'aria-label': 'Search for a product' }}
                        />
                        <IconButton className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>


            </Grid>

            <Grid container spacing={1} className='mt-3'>
                {products.map((item) =>
                    <Grid key={item.pro_id} item xs={12} style={{padding: '4px 8px' , position: 'relative'}} className={`mx-0 px-1`}>
                        <div onClick={addProductHandler.bind(this, item.pro_id)}>
                        <ProductCardHorizontal product={item}>
                        </ProductCardHorizontal>
                        </div>


                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default SearchMode;