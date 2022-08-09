const CACHE_REFRESH = 120; // in seconds

function MoreInfoCoin ( data )
{
    for ( let prop in data )
    {
        this[ prop ] = data[ prop ];
    }
    this.fetchTimestamp = new Date();
}

async function onClickMore ( event )
{
    event.preventDefault();
    modalSpinner.show();
    const idx = event.target.dataset.idx;
    const idDiv = event.target.dataset.id
    const API_MORE_INFO = `https://api.coingecko.com/api/v3/coins/${ idx }`;
    var moreInfoElement = [];
    moreInfoElementList = document.querySelectorAll( ".moreInfo" )
    moreInfoElementList.forEach( element =>
    {
        moreInfoElement.push( element )

    } );

    let coinImage;
    let currentPriceObj;
    let currentPriceUsd;
    let currentPriceEUR;
    let currentPriceILS;
    let moreInfoObj;
    let moreDetailsIdx = moreInfoElement.findIndex( e => e.dataset.id == idDiv );
    if ( CACHE[ idx ] && ( new Date - CACHE[ idx ].fetchTimestamp ) / 1000 < CACHE_REFRESH )
    {
        async function returnCache ()
        {
            return CACHE[ idx ]
        }
        returnCache()
            .then( res => renderHtml( res ) )
            .then( res => modalSpinner.hide() )
    }
    else
    {
        fetch( API_MORE_INFO ).then( res => res.json() )
            .then( res =>
            {
                CACHE[ idx ] = new MoreInfoCoin( res );
                return CACHE[ idx ]

            } )
            .then( res => renderHtml( res ) )
            .then( res => modalSpinner.hide() )



    }

    async function renderHtml ( res )
    {

        async function buildObj ( res )
        {
            currentPriceObj = res.market_data.current_price;
            coinImage = res.image.thumb;
            return currentPriceObj
        }

        buildObj( res )
            .then( res =>
            {
                currentPriceUsd = res.usd + "$";
                currentPriceEUR = res.eur + "€";
                currentPriceILS = res.ils + "₪";
                moreInfoObj = {
                    currentPriceUsd: currentPriceUsd,
                    currentPriceEUR: currentPriceEUR,
                    currentPriceILS: currentPriceILS,
                    coinImage: coinImage
                };
                return moreInfoObj


            } ).then( res =>
            {


                moreInfoElementList[ moreDetailsIdx ].innerHTML = `<div>
                  <img class="float-start" src="${ res.coinImage }" alt="" style="width: min-content;">
                 <span style="font-size:small;">${ res.currentPriceUsd }, ${ res.currentPriceEUR }, ${ res.currentPriceILS }</span> 
             </div>`


            } )
    }

}




