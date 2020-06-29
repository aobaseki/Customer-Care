import React, {useEffect , useState} from 'react';
import SaleService from "../../../../../services/SaleService";

const SingleDayProduct = props => {
    const saleEntry = props.saleEntry;
    const [product, setProduct] = useState('');
    const [name , setName] = useState('');
    const [totalPrice , setTotalPrice] = useState('');
    const [quantity , setQuantity] = useState(false);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!product) {
            getProduct();
        }
    });

    const getProduct = async () => {
        const newProduct = await props.saleEntry.product.fetch();
        setProduct(newProduct);
        setTotalPrice(new SaleService().getSaleEntrySellingPrice(props.saleEntry));
        setName(newProduct.name);
        setQuantity(saleEntry.quantity);
    };

    return(
        <div style={{alignItems: 'right', textAlign: 'right'}}>
            <tbody style={{border: 'solid', textAlign: 'right'}}>
                <tr>
                <td style={{border: 'solid', textAlign: 'left'}}>{name}</td>
                <td style={{border: 'solid', textAlign: 'right'}}>{quantity}</td>
                <td style={{border: 'solid', textAlign: 'right'}}>{totalPrice}</td>
                <td style={{border: 'solid', textAlign: 'right'}}>{quantity * totalPrice}</td>
                </tr>
            </tbody>
        </div>
    );
};

export default SingleDayProduct;
