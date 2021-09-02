import Cookies from 'universal-cookie';
import { get, post, put, destroy } from "../../utlis/Api";

const cookies = new Cookies();    
const userId = typeof cookies.get('user') !== 'undefined' ? cookies.get('user').user.id : null;

const Watchlist = {
    
    get: () =>
      get('/users/'+userId+'/watchlist'),
    startScraping: () =>
      post('/watchlist/scrape'),
    sendEans: (params) =>
      post('/users/'+userId+'/watchlist', params),
    clear: (params) =>
      post('users/'+userId+'/watchlist/actions/clear', params),
      
}

export { Watchlist };