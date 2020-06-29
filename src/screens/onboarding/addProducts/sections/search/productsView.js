import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import AddedIcon from "../../../../../components/ClickableIcons/AddedIcon";
import AddIcon from "../../../../../components/ClickableIcons/AddIcon";
import ProductCard from "../../../../../components/Cards/ProductCard";

const ProductsView = (props) => {
    const addProductHandler = (id) => {
        props.addProductHandler(id);
    };

    const removeProductHandler = (id) => {
        props.removeProductHandler(id);
    };

    return (
        <>
            {
                props.products.map((item , index) =>
                    <Grid key={index} item xs={4} style={{padding: '4px 8px', position: 'relative'}}
                          className={`mx-0 px-1`}>
                        {item.owned ?
                            <div
                                onClick={removeProductHandler.bind(this, item.id)}
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
                                        zIndex: '1500',
                                    }}
                                />
                            </div> :
                            <div
                                onClick={addProductHandler.bind(this, item.id)}
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
                                        zIndex: '1500',
                                    }}
                                />
                            </div>
                        }
                        <div key={index} onClick={addProductHandler.bind(this, item.id)}>
                            <ProductCard isAddProduct={true} product={item} notTruncate={true}/>
                        </div>
                    </Grid>
                )
            }
        </>
    )
};

export default ProductsView;
