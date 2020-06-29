import ModelAction from "./ModelAction";

export default class ProductServiceHandler {
    constructor(product){
        this.product = product;
    }

    /*
    * @var product
    * Get the selling price of product
    * @return var
    * */
    getSellingPrice(){
        return (this.product.owned === true && this.product.sellingPrice) ? (parseFloat(this.product.sellingPrice)).toFixed(2) : null;
    }

    /*
    * @var product
    * Get the most recent cost price of product
    * @return var
    * */
    getCostPrice(){
      let mostRecentCostPrice = null;
      this.product.stock.sort(function(stock1,stock2){
        return new Date(stock2.created_at) - new Date(stock1.created_at);
      });
      for (let m = this.product.stock.length - 1; m >= 0; m--) {
        if (this.product.stock[m].costPrice) {
          mostRecentCostPrice = this.product.stock[m].costPrice;
          break;
        }
      }
      return mostRecentCostPrice;
      // return this.product.stock ? (this.product.stock[((this.product.stock).length - 1)].costPrice).toFixed(2) : null;
    }

    /*
    * @var product
    * Get the cost price of product
    * @return var
    * */
    getProductStock(){
        return this.product.stock !== null ? this.product.stock : [];
    }


    /*
    * @var product
    * Get the cost price of product
    * @return var
    * */
    getProductHistory(){
        return this.product.history !== null ? this.product.history : [];
    }

    /*
    * @var product
    * Get the image of product
    * @return var
    * */
    getProductImage(){
        return this.product.image ? `https://elparah.store/admin/upload/${this.product.image}` : 'https://elparah.store/admin/upload/no_image.png';
    }

    /*
    * @var product
    * Get the stock quantity
    * @return var
    * */
    getProductQuantity(){
        return (this.getProductStock()).reduce((a, b) => a + (b['quantity'] || 0), 0);
    }

    /*
    * @var product
    * Get the name of product
    * @return var
    * */
    getProductName(){
        return this.product.name ? this.product.name : '';
    }

    /*
    * @array products
    * Return a stores products
    * @return array
    * */
    getStoreProducts(){
        return (this.product).filter((product) => product.owned === true);
    }

    /*
    * Return a stores products
    * @return boolean
    * */
    isProductSellable(){
        return !!(this.getProductQuantity() && this.getCostPrice() && this.getSellingPrice());
    }

    /*
    * @var stockEntry
    * @var new quantity
    * @return new stockEntry
    * */
   async updateStockEntryDetails(stockEntry ){
    //1. Check if quantity of product is valid
    //2. Update quantity of entry

        try {
            new ModelAction('BranchProduct').update(stockEntry.productId , {
                branchId: stockEntry.branchId,
                productId: stockEntry.productId,
                sellingPrice: stockEntry.sellingPrice,
                costPrice: stockEntry.costPrice,
                moneySource: stockEntry.moneySource,
                rememberChoice: stockEntry.rememberChoice,
                quantity: stockEntry.quantity,
            });

            return true;
        } catch (e) {
            return false;
        }

}

}
