import fromUnixTime from "date-fns/fromUnixTime";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import eachMonthOfInterval from "date-fns/eachMonthOfInterval"
import eachYearOfInterval from "date-fns/eachYearOfInterval"
import lastDayOfMonth from "date-fns/lastDayOfMonth";
import startOfYear from "date-fns/startOfYear";
import format from "date-fns/format";
import LocalInfo from "./LocalInfo";
import getUnixTime from 'date-fns/getUnixTime';
import lastDayOfYear from 'date-fns/lastDayOfYear';
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";

export default class SystemDateHandler {
    constructor(){
        const branchCreated = LocalInfo.branches.filter(branch => branch.id === LocalInfo.branchId);

        this.branchCreated = branchCreated.length > 0 ? branchCreated[0].created_at / 1000 : getUnixTime(new Date());
    }

    getStoreWeeks(startDate = new Date(fromUnixTime(this.branchCreated)) , endDate = new Date()){
        const weeks = eachWeekOfInterval({
            start: startDate,
            end: endDate
        }, { weekStartsOn: 1 }).reverse();

        return weeks.map((week , index) => {
            const weekStart = startOfWeek(week , { weekStartsOn: 1 });
            const weekEnd = endOfWeek(week , { weekStartsOn: 1 });

            return {
                value: format(week, 'MM/dd/yyyy'),
                label: `Week ${index + 1}: ${format(weekStart , 'eee, do MMMM, yyyy')} - ${format(weekEnd , 'eee, do MMMM, yyyy')}`
            }
            /*if(weeks.length !== index + 1){
                return {
                    value: format(week, 'MM/dd/yyyy'),
                    label: `Week ${index + 1}: ${format(week , 'eee, do MMMM, yyyy')} - ${format(weeks[index + 1] , 'eee, do MMMM, yyyy')}`
                }
            }else{

            }*/
        });
    }

    getStoreMonths(startDate = new Date(startOfYear(new Date())) , endDate = new Date(lastDayOfMonth(new Date()))){
        const months = eachMonthOfInterval({
            start: startDate,
            end: endDate
        });

        return months.map((month) => {
            return {
                value: format(month, 'MM/dd/yyyy'),
                label: `${format(month , 'MMMM - yyyy')}`
            }
        });
    }

    getStoreYears(startDate = new Date(startOfYear(new Date())) , endDate = new Date(lastDayOfYear(new Date()))){
        const years = eachYearOfInterval({
            start: startDate,
            end: endDate
        });

        return years.map((year) => {
            return {
                value: format(year, 'MM/dd/yyyy'),
                label: `${format(year , 'yyyy')}`
            }
        });
    }
}
