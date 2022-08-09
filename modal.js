var myModal = document.getElementById( 'myModal' );
var spinnerModal = document.getElementById( 'spinner' );
var modal = new bootstrap.Modal( myModal );
var modalSpinner = new bootstrap.Modal( spinnerModal );
const formCoin = document.forms[ 1 ];
var inputCoinObj = {
  inputCoinOne: formCoin[ 0 ],
  inputCoinTwo: formCoin[ 1 ],
  inputCoinThr: formCoin[ 2 ],
  inputCoinFore: formCoin[ 3 ],
  inputCoinFive: formCoin[ 4 ]
}

const inputCoinOne = formCoin[ 0 ]
const inputCoinTwo = formCoin[ 1 ]
const inputCoinThr = formCoin[ 2 ];
const inputCoinFore = formCoin[ 3 ];
const inputCoinFive = formCoin[ 4 ];
const labelCoinOne = document.querySelector( ".coin1" )
const labelCoinTwo = document.querySelector( ".coin2" )
const labelCoinThr = document.querySelector( ".coin3" )
const labelCoinFore = document.querySelector( ".coin4" )
const labelCoinFive = document.querySelector( ".coin5" )
var inputCoinArr = [ inputCoinOne, inputCoinTwo, inputCoinThr, inputCoinFore, inputCoinFive ];
async function showModalToHTML ( arrTrackCoins )
{
  inputCoinOne.dataset.id = arrTrackCoins[ 0 ].idx;
  inputCoinTwo.dataset.id = arrTrackCoins[ 1 ].idx;
  inputCoinThr.dataset.id = arrTrackCoins[ 2 ].idx;
  inputCoinFore.dataset.id = arrTrackCoins[ 3 ].idx;
  inputCoinFive.dataset.id = arrTrackCoins[ 4 ].idx;
  labelCoinOne.innerHTML = arrTrackCoins[ 0 ].symbol;
  inputCoinOne.value = arrTrackCoins[ 0 ].symbol;
  labelCoinTwo.innerHTML = arrTrackCoins[ 1 ].symbol;
  labelCoinThr.innerHTML = arrTrackCoins[ 2 ].symbol;
  labelCoinFore.innerHTML = arrTrackCoins[ 3 ].symbol;
  labelCoinFive.innerHTML = arrTrackCoins[ 4 ].symbol;
  return myModal


}
