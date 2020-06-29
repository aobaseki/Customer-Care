import React from 'react';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';


const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);

const SelectedCategorySingle = props => {
    const removeSubCategoryHandler = (id , event) => {
        props.removeSubCategory(id);
    };

    const subcategory = props.item;

    return(
        <div className={`shadow1 rounded mx-auto my-3`} style={{width: '95%'}}>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Card
                        className="shadow1"
                        style={{margin: '5px auto' ,backgroundImage: `url(${subcategory.image})` , backgroundPosition: 'center', backgroundSize: 'cover' , width: '60px' ,borderRadius: '50%', height: '60px', padding: '0px'}}
                    />
                </Grid>
                <Grid item xs={7} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        {subcategory.name}
                    </div>
                </Grid>
                <Grid item xs={2} style={{display: 'table', height: '60px', margin: '13px 0px'}}>
                    <div style={{textAlign: 'right'}}>
                        <FormControlLabel
                            control={
                                <GreenCheckbox
                                    checked={subcategory.owned}
                                    /*onChange={handleChange('checkedG')}*/
                                    value="checkedG"
                                    onClick={(event) => removeSubCategoryHandler(subcategory.id , event)}
                                    style={{display: 'table-cell', verticalAlign: 'middle'}}
                                />
                            }
                        />
                    </div>
                </Grid>

            </Grid>
        </div>
    );
};

export default SelectedCategorySingle;
