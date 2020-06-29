import React , {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
    root: {
        //width: '100%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '40px',
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

const SearchInput = (props) => {
    const initialValue = props.initialValue || '';
    const [value , setValue] = useState(initialValue);
    const inputName = props.inputName;

    const setValueHandler = (event) => {
        setValue(event.target.value);
        props.getValue(inputName , event.target.value);
    };

    const clearSearch = async() => {
        await setValue('');
        await props.getValue(inputName , '');
    };

    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.root} style={{...props.styles}}>
                <TextField
                    className={`${classes.input} search-box`}
                    placeholder="Search"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment>
                                <IconButton className={classes.iconButton}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    onClick={clearSearch}
                                    className={classes.iconButton}
                                >
                                    {value.length > 0 ?
                                        <CancelIcon/>
                                        :
                                        ''
                                    }
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    value={value}
                    name={props.inputName}
                    onChange={(event) => setValueHandler(event)}
                />
            </Paper>
        </div>
    );
};

export default SearchInput;
