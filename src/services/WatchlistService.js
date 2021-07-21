import Cookies from 'universal-cookie';
import { Watchlist } from '../services/Api/WatchlistApi'

const WatchlistService = {
    startScraping,
    sendEans,
    clearWatchlist,
    exportToPdf
};

function startScraping()
{
    Watchlist.startScraping()
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

    Watchlist.sendEans(myobj)
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
    Watchlist.clear()
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
    const cookies = new Cookies();    
    const userId = cookies.get('user') !== undefined ? cookies.get('user').user.id : null;  
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer';
    xhr.open("GET", process.env.REACT_APP_API_ENDPOINT+"users/"+userId+"/watchlist/actions/export", true);
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