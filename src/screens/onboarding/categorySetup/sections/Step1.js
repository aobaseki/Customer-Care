import React from 'react';
import CategorySingle from "./CategorySingle";
import Box from "@material-ui/core/Box/Box";
import Grid from "@material-ui/core/Grid/Grid";
import SubCategorySingle from "./SubCategorySingle";

const Step1 = (props) => {
    const subcategories = props.subcategories;
    const categories = props.categories;

    return(
        <div className={`mb-5`}>
            <p style={{marginTop: '60px', fontSize: '18px', fontWeight: '400', color: '#333333'}}>Select product categories you sell</p>

            <div className="scrollWrapper">
                {categories.map((item) => <CategorySingle activeItem={props.activeItem} _viewSubCategory={props.clickFnc} key={item.id} item={item}/>)}
            </div>

            <Box style={{marginTop: '5px'}} p={1}>
                <Grid container spacing={1}>
                    {subcategories.map((item) => <SubCategorySingle key={item.id} item={item} _addSubCategoryHandler={props.addSubCategory} _removeSubCategoryHandler={props.removeSubCategory}/>)}
                </Grid>
            </Box>
        </div>
    );
};

export default Step1;
