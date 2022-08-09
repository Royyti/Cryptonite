var arrCoins = [];
var arrTrackCoins = [];
var coinCounter;
var objTrackCoins;
const DOM_TAGNAME = {
  "DIV": "DIV",
  "INPUT": "INPUT",
  "BUTTON": "BUTTON"
}
const DOM_EVENT = {
  click: "click",
  change: 'change'
}
const DOM_ATTRIBUTE = {
  checked: "checked",
  "aria_checked": "aria-checked"
}
const URL_API_COINS = "https://api.coingecko.com/api/v3/coins/list";
const homeElement = document.getElementById( "Home" );
const reportElement = document.getElementById( "Report" );
const aboutElement = document.getElementById( "About" );
const coinsElement = document.getElementById( "coins" );
const formSearch = document.getElementById( "formSearch" );
let inputRadioElement = [];
var inputRadioElementTamp;
var inputElementEditCoins;
onHTMLLoad();
async function onHTMLLoad ()
{
  modalSpinner.show()
  fetch( URL_API_COINS )
    .then( res => res.json() )
    .then( res1 => res1.slice( 1590, 1690 ) )
    .then( res2 => { res2.forEach( element => arrCoins.push( element ) ); return arrCoins } )
    .then( arr =>
    {
      arr.forEach( ( p, i ) => p.idx = i )
      return arrCoins
    } )
    .then( res3 => writeCoinsToHtml( res3 ) )
    .then( res =>
    {
      inputRadioElementTamp = res;
      return res
    } )
    .then( inputRadioElement => changeCheckedToFalse( inputRadioElement ) )
    .then( res => changeCheckedToFalse( inputRadioElementTamp ) )
    .then( res => modalSpinner.hide() )

}

async function writeCoinsToHtml ( arrCoins )
{
  arrCoins.forEach( c =>
  {
    coinsElement.innerHTML += `<div id="${ c.symbol }" data-id ="${ c.idx }" class="col-sm-4 col-lg-3">
      <div class="card">
      <div class="card-body">
       <div id = "radio" data-id = "${ c.idx }" class="form-check form-switch" onchange="radioChange(event)">
       <input  checked data-id = "${ c.idx }"  name = "myCheckBox ${ c.idx }" class="myCheckBox form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" >
       </div>
        <h5 class="card-title">${ c.symbol }</h5>
       <p class="card-text">${ c.name }</p>  
        <button data-id = "${ c.idx }" data-idx ="${ c.id }" onclick="onClickMore(event)" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${ c.idx }" aria-expanded="false" aria-controls="collapseExample${ c.idx }">
  more info
  </button>
          <div class="collapse" id="collapseExample${ c.idx }">
  <div data-id = "${ c.idx }" class="card card-body moreInfo">
                    </div>
                    </div>
               </div>
           </div >
       </div > `


  } )
  inputRadioElement = Array.from( document.querySelectorAll( ".myCheckBox" ) )
  return inputRadioElement;


}
async function changeCheckedToFalse ( arr )
{
  arr.forEach( a => a.checked = false );

  return inputRadioElement;

}
async function onclickHome ( event )
{
  event.preventDefault();
  //chartContainer.style.display = "none";
  chartContainer.innerHTML = ""
  aboutElement.classList = "nav-link"
  homeElement.classList = "nav-link active"
  reportElement.classList = "nav-link"
  modalSpinner.show()
  coinsElement.innerHTML = ""
  writeCoinsToHtml( arrCoins )
    .then( res =>
    {
      inputRadioElementTamp = res;
      return res
    } )
    .then( inputRadioElement => changeCheckedToFalse( inputRadioElement ) )
    .then( res => changeCheckedToFalse( inputRadioElementTamp ) )
    .then( res =>
    {
      return arrCoins;

    } )
    .then( res => updateCheckedStatus( arrTrackCoins, res ) )
    .then( res => modalSpinner.hide() )

}

function spliceFromArray ( arr, counter )
{
  const conIdx = arr.findIndex( arr => arr.idx == counter );

  arr.splice( conIdx, 1 );

}


function radioChange ( event )
{
  event.preventDefault();
  if ( event.target.tagName.toUpperCase() !== DOM_TAGNAME.INPUT.toUpperCase() )
  {
    return;
  }
  else
  {

    let coinCounterTamp = Number( event.target.dataset.id );
    coinCounter = inputRadioElement.findIndex( p => p.dataset.id == coinCounterTamp )


    if ( !Number.isNaN( coinCounter ) && inputRadioElement[ coinCounter ].checked === false )
    {
      if ( arrTrackCoins.length > 1 )
      {
        inputRadioElement[ coinCounter ].checked = false;
        inputRadioElementTamp[ coinCounter ].checked = false;
        spliceFromArray( arrTrackCoins, coinCounterTamp )


      }


    }
    else if ( !Number.isNaN( coinCounter ) && inputRadioElement[ coinCounter ].checked === true )
    {

      objTrackCoins = arrCoins[ coinCounterTamp ];


      if ( arrTrackCoins.length < 5 )
      {
        inputRadioElement[ coinCounter ].checked = true
        inputRadioElementTamp[ coinCounter ].checked = true;
        arrTrackCoins.push( objTrackCoins );


      }

      else if ( arrTrackCoins.length === 5 )
      {

        showModalToHTML( arrTrackCoins ).then( myModal => modal.show() );



        inputRadioElement[ coinCounter ].checked = false;


        inputElementEditCoins = document.querySelectorAll( ".coin" )





      }

    }
  }
}
function onClickClose ( event )
{
  event.preventDefault();
  const coinModal = Number( event.target.dataset.id );
}
function onClickSaveChanges ( event )
{
  event.preventDefault();
  const coinModal = Number( event.target.dataset.id );
  const inputCoinId = inputCoinArr.findIndex( arr => arr.checked == true );
  let inputCoinChecked = inputCoinArr[ inputCoinId ]
  const coinId = inputCoinChecked.dataset.id
  spliceFromArray( arrTrackCoins, coinId );
  inputRadioElementTamp[ coinId ].checked = false;
  arrTrackCoins.push( objTrackCoins );
  let idx = objTrackCoins.idx
  inputRadioElement[ coinCounter ].checked = true;
  inputRadioElementTamp[ idx ].checked = true;
  modal.hide()



}


