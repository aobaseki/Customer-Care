import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Card from "@material-ui/core/Card/Card";
import AddedIcon from "../../../../components/ClickableIcons/AddedIcon";
import AddIcon from "../../../../components/ClickableIcons/AddIcon";

const SubCategorySingle = props => {
    const category = props.item;

    const addSubCategoryHandler = (id , event) => {
        props._addSubCategoryHandler(id);
    };

    const removeSubCategoryHandler = (id , event) => {
        props._removeSubCategoryHandler(id);
    };

    return(
        <Grid item xs={4}>

            { category.owned ?
                <Card
                
                    className="shadow1"
                    style={{margin: '5px auto' ,backgroundImage: `url(${category.image ? `https://elparah.store/admin/upload/${category.image}` : 'https://elparah.store/admin/upload/no_image.png'})` , backgroundPosition: 'center top', backgroundSize: '100%', backgroundRepeat: 'no-repeat' , width: '100%' , height: '160px', padding: '0px', position: 'relative'}}
                    onClick={(event) => removeSubCategoryHandler(category.id , event)}
                >
                
                        <div
                            
                        >
                            <AddedIcon
                                styles={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    top: '-2px',
                                    float: 'right',
                                    position: 'absolute',
                                    right: '-2px',
                                    color: '#28a745',
                                }}
                            />
                        </div>
                    
                    
                    <div style={{fontSize: '14px', width: '100%', minHeight: '40px', backgroundColor: '#3333338c', color: '#ffffff', position: 'relative', top: '70%', left:'0', right: '0', padding: '5px 0px'}}>
                        {category.name}
                    </div>
                </Card>
                :
                <Card
                    className="shadow1"
                    style={{margin: '5px auto' ,backgroundImage: `url(${category.image ? `https://elparah.store/admin/upload/${category.image}` : 'https://elparah.store/admin/upload/no_image.png'})` , backgroundPosition: 'center top', backgroundSize: '100%', backgroundRepeat: 'no-repeat' , width: '100%' , height: '160px', padding: '0px', position: 'relative'}}
                    onClick={(event) => addSubCategoryHandler(category.id , event)}
                >
                
                <div
                    
                >
                    <AddIcon
                        styles={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            top: '-2px',
                            float: 'right',
                            position: 'absolute',
                            right: '-2px',
                            color: '#DAAB59',
                        }}
                    />
                </div>          
                    
                    <div style={{fontSize: '14px', width: '100%', minHeight: '40px', backgroundColor: '#3333338c', color: '#ffffff', position: 'relative', top: '70%', left:'0', right: '0', padding: '5px 0px'}}>
                        {category.name}
                    </div>
                </Card>
            }
                
        </Grid>
    );
};

export default SubCategorySingle;
