import React, {useState , Suspense} from 'react';
import '../AddProducts.scss';
import {
    makeStyles,
} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import clsx from 'clsx';
import SearchInput from "../../../../Components/Input/SearchInput";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PrimaryLoader from "../../../../../components/Loader/Loader";
//import ProductsView from "./productsView";
//import ProductCard from "../../../../../components/Cards/ProductCard";
const ProductsView = React.lazy(() => import("./productsView"));

const optionGroupStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: '0.9rem',
    },
    select: {
        '&:before': {
            borderColor: '#DAAB59',
        },
        '&:hover:not(.Mui-disabled):before': {
            borderColor: '#DAAB59',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '95%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    margin: {
        margin: '1px auto',
        width: '95%',
        'text-align': 'center',
    },
    left: {
        'text-align': 'left',
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: 'green',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: 'green',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: 'green',
        },
    },
}));

// Inspired by blueprintjs
function StyledRadio(props) {
    const classes = optionGroupStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="primary"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}
const SearchMode = props => {
    const [searchValue , setSearchValue] = useState({
        search: props.searchValue,
        productOption: 'all',
    });

    const products = props.products;

    const optionGroupClasses = optionGroupStyles();

    const addProductHandler = (id) => {
        props.productAdd(id);
    };

    const removeProductHandler = (id) => {
        props.removeProduct(id);
    };

    const requestProduct = () => {
        props.setView(5);
    };

    const OptionChangeHandler = async (event) => {
        await props.optionFilter(event.target.value);
    };

    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchHandler(value);
    };

    return(
        <div className="shadow1 boxMain" style={{minHeight: '400px' , width: '96%', padding: '0px 2% 20px' , marginBottom: '60px'}}>
            <Grid item xs={12} className={optionGroupClasses.margin}>
                <FormControl className={`${optionGroupClasses.margin} optionAdd`} component="fieldset" style={{fontSize: '0.9rem'}}>
                    <RadioGroup
                        className={optionGroupClasses.margin}
                        onChange={OptionChangeHandler}
                        aria-label="store_type"
                        name="storeType"
                        defaultValue={searchValue.productOption}
                    >
                        <FormControlLabel value="all" control={<StyledRadio />} label="All" />
                        <FormControlLabel value="stocked" control={<StyledRadio />} label="Stocked" />
                        <FormControlLabel value="incomplete" control={<StyledRadio />} label="Incomplete" />
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid container spacing={1}>
                <Grid item xs={11} style={{padding: '4px 8px'}} className={`mx-auto`}>
                    <SearchInput
                        initialValue={searchValue.search}
                        inputName="search"
                        getValue={setInputValue.bind(this)}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={1} className='mt-3'>
                {
                    products.length > 0 ?
                        <Suspense fallback={<PrimaryLoader text={`Loading products`}/>}>
                            {<ProductsView addProductHandler={addProductHandler.bind(this)} removeProductHandler={removeProductHandler.bind(this)} products={products} />}
                        </Suspense>
                    :
                        <div style={{
                            display: 'flex',
                            alignItem: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100%'
                        }}>
                            <div className={`mx-auto mt-5`}>
                                <Typography
                                    component="h5"
                                    variant="h5"
                                    style={{fontWeight: '400', fontSize: '16px' , margin: '0px 0px', padding: '14px'}}
                                    className={`text-center mx-auto text-dark`}
                                >
                                    This product is not in our database. <br/>
                                    Click button below to add to store
                                </Typography>

                                <Button
                                    variant="contained"
                                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 30px'}}
                                    onClick={requestProduct}
                                >
                                    Add product to database
                                </Button>
                            </div>
                        </div>
                }

            </Grid>
        </div>
    );
};

export default SearchMode;
