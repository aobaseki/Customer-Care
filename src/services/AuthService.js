import LocalInfo from "../services/LocalInfo";
import Api from './Api';
import format from "date-fns/format";
import GenerateOTP from './GenerateString';
import paths from "../utilities/paths";
import getTime from 'date-fns/getTime';
const jwt = require('jsonwebtoken');

export default class AuthService {

    /*constructor() {
        //this.auth0 = new auth0.WebAuth(auth0_config);
    }*/

    login = async (username , password) => {
        // username and password
        // try to login
        // if pass: save in localstorage
        // if fail: alert user
        const params = {
            username: username,
            password: password,
            strategy: "local",
        };

        try {
            let user = await new Api('others').create(
                params,
                {},
                {},
                'https://core-api-dev.mystoreaid.net/v1/client/users/login',
                'Logging in...'
            );

            if( user ){
                try {
                    const decoded = jwt.verify(user.data.token, 'Z7oGGqapxnMrBSd2xXFuqseC');

                    const loginInfo = decoded.data;

                    console.log(loginInfo);

                    LocalInfo.setWorkingDate(format(new Date(), 'MM/dd/yyyy'));
                    localStorage.setItem('workingDate' , format(new Date(), 'MM/dd/yyyy'));
                    localStorage.setItem('accessToken' , user.data.token);
                    localStorage.setItem('userDetails' , JSON.stringify(loginInfo.user));
                    localStorage.setItem('username' , loginInfo.user.username);
                    LocalInfo.branchId = loginInfo.companies[0].branches[0].id;
                    console.log("======================================");
                    console.log("======================================");
                    console.log(LocalInfo.branchId);
                    console.log("======================================");
                    console.log("======================================");
                    localStorage.setItem('userData', JSON.stringify(loginInfo));
                    localStorage.setItem('companyId', loginInfo.companies[0].id);
                    localStorage.setItem('collectionDate', format(new Date(), 'MM/dd/yyyy'));
                    return {
                        success: 200,
                        user: loginInfo.user
                    };
                } catch(err) {
                    return {
                        error: {
                            msg: "Invalid token",
                            status: 401
                        }

                    };
                }
            }
        }catch (error) {
            return {
                error: {
                    msg: "Invalid login credentials",
                    status: 401
                }
            };
        }


    };

    register = async( data ) => {
        // check if user exists - core-api
        // user registers : username and password on AuthService -- done
        // create suppliers_company on core-api - companies table -- done
        // create first suppliers_company on core-api and associate to user -- done
        /*
        @var { username , firstName , otherNames, phone, password}
        @todo check if user exist
        */
        let user;
        const params = {
            user: {
                "password": data.password,
                "firstName": data.firstName,
                "otherNames": data.otherNames,
                "phone": data.phone,
                "username": data.username,
                "whatsAppPhone": data.phone,
                "otp": new GenerateOTP(4).generateNumber(),
            },
            company: {
                "name": data.companyName,
                "businessCategoryId": data.businessCategoryId,
            },
            branch: {
                "name": data.companyName,
                "startDate": "",
                "location": data.companyName,
                "gps": "",
                "logo": "",
                "phone": data.phone,
                "whatsAppPhone": data.phone,
                "type": data.storeType,
            },
        };

        try{
            console.log(params)
            const response = await new Api('others').create(
                params,
                {},
                {},
                'https://core-api-dev.mystoreaid.net/v1/client/users/register'
            );

            if( response ){
                localStorage.setItem('randomString' , data.password);
                localStorage.setItem('activeBranch' , response.data.companies[0].branches[0].id);
                localStorage.setItem('userDetails' , JSON.stringify(response.data.user));
                localStorage.setItem('companyId' , JSON.stringify(response.data.companies[0].id));
                localStorage.setItem('userData' , JSON.stringify(response.data));
                localStorage.setItem('lastSyncedAt' , getTime(new Date()));

                user = response.data.user;
                console.log(user);
                //const response = await this.sendOTP(user.firstName ,user.phone , user.otp);

                return {
                    user
                };
            }
        }catch (error){
            return {
                error: {
                    msg: error.response.data.message,
                    status: 401
                }
            };
        }
    };

    registerUser = async ( data ) => {
        let res = await new Api('users').create(
            data
        );

        return res.data;
    };

    registerCompany = async ( data ) => {
        let res = await new Api('companies').create(
            data
        );

        return res.data;
    };

    logout = async () => {
        try {
            localStorage.clear();
            sessionStorage.clear();
            const dbs = await window.indexedDB.databases();
            dbs.forEach(db => { window.indexedDB.deleteDatabase(db.name) })

            window.location.href = paths.login;
        } catch (e) {
            console.log(e)
        }

        //history.push(paths.login)
        // clear local storage
        // call logout on auth0
    }
}
