import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Card from "@material-ui/core/Card/Card";
import PrimaryButton from "../../../../components/Buttons/PrimaryButton";
import ProductServiceHandler from "../../../../services/ProductServiceHandler";
import BranchProductService from "../../../../services/BranchProductService";
import BranchStockService from "../../../../services/BranchStockService";
import Button from "@material-ui/core/Button/Button";

const LowStockProductSingle = props => {
    const branchProduct = props.product;
    const [product , setProduct] = useState('');
    const [lastHistory , setLastHistory] = useState('');
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    const [productQuantity , setProductQuantity] = useState(0);
    const [companyStocks , setCompanyStocks] = useState([]);

    useEffect(() => {
        if (!product) {
            getProduct();
        }
    }, []);

    const productHandler = new BranchProductService(branchProduct);

    const getProduct = async () => {
        const newProduct = await branchProduct.product.fetch();
        const fetchLastHistory = await new BranchStockService().getLastProductStock(branchProduct.productId);
        setProduct(newProduct);
        setLastHistory(fetchLastHistory);
        setName(newProduct.name);
        setImage(new ProductServiceHandler(product).getProductImage());
        setProductQuantity(await productHandler.getProductQuantity());
        setCompanyStocks(await new BranchStockService().getBranchStockQuantities(branchProduct.productId));
    };
    const addProductHandler = (id) => {
        console.log(id);
        props.addNewProductStockView(id);
    };

    return (
        <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
            <Grid item xs={2}>
                <Card
                    className="shadow1 bordered"
                    style={{margin: '5px auto' ,backgroundImage: `url(${image})` , backgroundPosition: 'center', backgroundSize: 'cover' , width: '40px' ,borderRadius: '50%', height: '40px', padding: '4px'}}
                />
            </Grid>
            <Grid item xs={7}
                  className={`pt-0`}
                  style={{fontSize: '16px', textAlign: 'left', height: '60px', margin: '8px 0px'}}
            >
                <div
                >
                    {name}
                </div>
                <div className="font-weight-light mt-1" style={{color: '#53BF77', fontSize: '14px'}}>{`Quantity remaining : ${productQuantity}`}</div>
            </Grid>

            <Grid item xs={3}
                  className={`pt-2`}
                  style={{ margin: '8px 0px'}}
            >
                <div onClick={addProductHandler.bind(this , branchProduct.id)}>
                    {/* <PrimaryButton
                        classes={`px-2 my-1`}
                    >
                        Add stock
                    </PrimaryButton> */}
                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 9px', textTransform: 'none', fontSize:'12px'}}
                    >
                        Add stock
                    </Button>
                </div>


            </Grid>
        </Grid>
    );
};

export default LowStockProductSingle;
