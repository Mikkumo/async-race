import Context from "./context";
import GaragePage from "../pages/garage/garage";
import WinnersPage from "../pages/winners/winners";
import ErrorPage, {ErrorTypes} from "../pages/error/error";
import GarageController from "./garageController";
import Garage from "../context/garageImplementation"

const garagesPath = 'garage_page';
const winnersPath = 'winners_page';
const page_default_params = '1';
const page_name_params = 'page';
const limit_name_params = 'limit';
const garage_limit_default_params = '7';
const winners_limit_default_params = '10';

class ContextProcessors {
    buildTrueRequest(context: Context): Context {
        const hash = window.location.hash;
        const searchParam = new URLSearchParams(window.location.search);

        if (hash === "") {
            console.log('hash is empty. Hash was set by default - ' + garagesPath);
            window.location.hash = `#${garagesPath}`;
        }

        if (searchParam.get(page_name_params) === null) {
            console.log('page is null. Page was set by default: 1');
            searchParam.append(page_name_params, page_default_params);
        }

        if (window.location.hash === `#${garagesPath}`) {
            if (searchParam.get(limit_name_params) === null) {
                console.log('limit is null. Limit was set by default: 7');
                searchParam.append(limit_name_params, garage_limit_default_params);
            }
        } else if (window.location.hash === `#${winnersPath}`) {
            if (searchParam.get(limit_name_params) === null) {
                console.log('limit is null. Limit was set by default: 7');
                searchParam.append(limit_name_params, winners_limit_default_params);
            }
        }

        if (searchParam.toString() !== new URLSearchParams(window.location.search).toString()) {
            window.location.search = `?${searchParam.toString()}`;
        }

        return context;
    }

    getInfoAboutPage(context: Context): Context {
        const location = window.location;
        const hash = location.hash;
        const page = new URLSearchParams(location.search).get(page_name_params);
        
        if (hash !== '') context.urlHash = hash.slice(1);
        else context.urlHash = `#${garagesPath}`;
        if (page !== null) context.numberPage = parseInt(page);
        else context.numberPage = 1;

        return context;
    }

    createCurrentPage(context: Context): Context {
        switch (context.urlHash) {
            case garagesPath: {
                const garagePage = new GaragePage(context.urlHash);
                context.currentPage = garagePage.render(context);
                break;
            }
            case winnersPath: {
                const winnersPage = new WinnersPage(context.urlHash);
                context.currentPage = winnersPage.render(context);
                break;
            }
            case '': {
                context.urlHash = garagesPath;
                break;
            }
            default: {
                context.currentPage = new ErrorPage(context.urlHash, ErrorTypes.Error_404).render();
            }
        }

        return context;
    }

    showCurrentPage(context: Context): Context {
        document.getElementsByTagName('body')[0].innerHTML = '';
        document.getElementsByTagName('body')[0].append(context.currentPage);

        return context;
    }
}

export default ContextProcessors;
