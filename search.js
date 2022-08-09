const $searchElement = document.getElementById( "mysearch" );
var conIdxMap;
async function onclickSrc ( event )
{
    event.preventDefault();



    const coinSymbol = $searchElement.value;
    const filtered = arrCoins.filter( c => c.symbol == coinSymbol );
    if ( filtered.length > 0 )
    {
        modalSpinner.show()
        coinsElement.innerHTML = ""
        writeCoinsToHtml( filtered )
            .then( res => changeCheckedToFalse( res ) )
            .then( res =>
            {
                return filtered;

            } )
            .then( res => updateCheckedStatus( arrTrackCoins, res ) )
            .then( res => modalSpinner.hide() )
    }
    else
    {
        alert( " No currency found !!" )


    }

}

async function updateCheckedStatus ( arr, res )
{

    conIdxMap = [];
    //let tamp =
    arr.forEach( c =>
    {
        let cIdx = c.idx;
        res.filter( e =>
        {
            if ( e.idx == cIdx )
            {
                conIdxMap.push( e )
            }
            else { }
        } );

    } )
    if ( conIdxMap.length > 0 )
    {
        conIdxMap.forEach( ( p, i ) =>
        {
            const pIdx = p.idx;

            const inputId = inputRadioElement.findIndex( p => Number( p.dataset.id ) == pIdx );

            inputRadioElement[ inputId ].checked = true;
            inputRadioElementTamp[ pIdx ].checked = true;
        } );
    }
    else
    {

    }
}