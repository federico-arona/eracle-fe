import API from "../utlis/Api";
import Cookies from 'universal-cookie';
import { func } from "prop-types";

const WatchlistService = {
    startScraping,
    sendEans,
    clearWatchlist,
    exportToPdf
};

function startScraping()
{
    API.post('/watchlist/scrape')
    .then(response =>  {
      console.log(response);
    })
    .catch(error => {
        //this.setState({ errorMessage: error.message });
        console.log(error);
        console.error('There was an error!', error);
       
    });
}

function sendEans(data)
{
    var myobj = {eans: ""};
    myobj.eans = data; 
    console.log(myobj);

    API.post('users/1/watchlist', myobj)
        .then(response =>  {
            console.log(response);
        })
        .catch(error => {
            //this.setState({ errorMessage: error.message });
            console.log(error);
            console.error('There was an error!', error);  
        });
}

function clearWatchlist()
{
    API.post('users/1/watchlist/actions/clear')
    .then(response =>  {
        console.log(response);
        //Orders.getWatchlistData();
    })
    .catch(error => {
        //this.setState({ errorMessage: error.message });
        console.log(error);
        console.error('There was an error!', error);  
    });
}

function exportToPdf(){
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer';
    xhr.open("GET", "http://127.0.0.1:8000/api/users/1/watchlist/actions/export", true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var FileSaver = require('file-saver');
            var blob = new Blob([xhr.response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            FileSaver.saveAs(blob, 'watchlist.xlsx');
        } else {
            console.error(xhr.statusText);
        }
        }
    }.bind(this);
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
}

export default WatchlistService;