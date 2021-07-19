import { get, post, put, destroy } from "../../utlis/Api";

const Watchlist = {
    get: () =>
      get('/users/1/watchlist'),
    startScraping: () =>
      post('/watchlist/scrape'),
    sendEans: (params) =>
      post('/watchlist/scrape', params),
    sendEans: (params) =>
      post('users/1/watchlist/actions/clear', params),
      
}

export { Watchlist };