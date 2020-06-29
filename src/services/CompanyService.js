import LocalInfo from "./LocalInfo";
import ModelAction from "./ModelAction";
import isToday from "date-fns/isToday";
import isWeek from "date-fns/isThisWeek";
import isThisMonth from 'date-fns/isThisMonth'
import isYear from "date-fns/isThisYear";
import SaleService from "./SaleService";
import fromUnixTime from 'date-fns/fromUnixTime';

export default class CompanyService {
    /*constructor (suppliers_company = LocalInfo.companies[0]) {
        this.suppliers_company = suppliers_company;
        this.companyId = suppliers_company.companyId;
    }*/

    static sales() {
        const branches = (LocalInfo.branches).map(branch => branch.branchId);

        return new ModelAction('Sales').findByColumnNotObserve(
            {
                name: 'branchId',
                value: branches,
                fxn: 'oneOf'
            }
        );
    }

    static async getSales(duration) {
        const branches = (LocalInfo.branches).map(branch => branch.id);

        const sales = await new ModelAction('Sales').findByColumnNotObserve(
            {
                name: 'branchId',
                value: branches,
                fxn: 'oneOf'
            }
        );

        console.log(sales)

        switch (duration) {
            case 'today':
                return sales.filter(sale => isToday(fromUnixTime(sale.salesDate)));
            case 'week':
                return sales.filter(sale => isWeek(fromUnixTime(sale.salesDate)));
            case 'month':
                return sales.filter(sale => isThisMonth(fromUnixTime(sale.salesDate)));
            case 'year':
                return sales.filter(sale => isYear(fromUnixTime(sale.salesDate)));
            default: 
                return 'error';
        }

    }

    /*
    * Get today sales total details
    * @return number - promise
    * */
    async getSalesDetails(duration) {
        const sales = await CompanyService.getSales(duration);

        let total = 0;
        let profit = 0;
        let credit = 0;
        let purchases = 0;

        for (let step = 0; step < sales.length; step++) {
            total += parseFloat(await SaleService.getSaleEntryAmountById(sales[step].id));
        }

        for (let step = 0; step < sales.length; step++) {
            profit += parseFloat(await SaleService.getSaleEntryProfitById(sales[step].id));
        }

        for (let step = 0; step < sales.length; step++) {
            credit += parseFloat(await SaleService.getSaleEntryCreditById(sales[step].id));
        }

        console.log(sales,total,profit,credit,purchases)
        return {
            total,profit,credit,purchases
        };
    }
}
