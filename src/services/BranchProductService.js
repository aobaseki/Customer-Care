import { Q } from '@nozbe/watermelondb'
import database from '../models/database';

export default class BranchProductService {
    constructor(branchProduct){
        this.branchProduct = branchProduct;
    }

    async product(){
        return this.branchProduct.product.fetch();
    }

    getSellingPrice(){
        return this.branchProduct.sellingPrice ? this.branchProduct.sellingPrice : null;
    }

    async getProductStock(){
        return this.branchProduct.stocks();
    }

    async getProductQuantity(){
        const stock = await this.branchProduct.stocks();
        const saleEntries = await this.branchProduct.saleEntries();
        const stockMovement = await this.branchProduct.stockMovements();
        const cartEntries = await this.branchProduct.cartEntries();

        const stockQuantity = (stock).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const salesQuantity = (saleEntries).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const cartQuantity = (cartEntries).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const stockMovementQuantity = (stockMovement).reduce((a, b) => a + (b['quantity'] || 0), 0);

        return (stockQuantity - (salesQuantity + cartQuantity + stockMovementQuantity));
    }

    async getProductImage(){
        const product = await this.product();
        return product.image ? `https://elparah.store/admin/upload/${this.product.image}` : 'https://elparah.store/admin/upload/no_image.png';
    }

    /*
    *
    * Search a product of a branch
    * @var search term
    * @return array
    * */
    static async searchProduct(search){
        return database.collections.get('products').query(Q.where('name', Q.like(`%${Q.sanitizeLikeString(search)}%`))).fetch()
    }

    async getCostPrice(){
        let mostRecentCostPrice = null;
        const productStock = await this.getProductStock();

        productStock.sort(function(stock1,stock2){
            return new Date(stock2.created_at) - new Date(stock1.created_at);
        });

        for (let m = productStock.length - 1; m >= 0; m--) {
            if (productStock[m].costPrice) {
                mostRecentCostPrice = productStock[m].costPrice;
                break;
            }
        }
        return mostRecentCostPrice ? mostRecentCostPrice.toFixed(2) : 0;
        // return this.product.stock ? (this.product.stock[((this.product.stock).length - 1)].costPrice).toFixed(2) : null;
    }

    /*
    * Return a stores products
    * @return boolean
    * */
    async isProductSellable(){
        return !!(await this.getProductQuantity() > 0 && await this.getCostPrice() && this.getSellingPrice());
    }
}
