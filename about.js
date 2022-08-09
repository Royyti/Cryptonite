
function onclickAbout ( event )
{
  event.preventDefault();
  aboutElement.classList = "nav-link active"
  homeElement.classList = "nav-link"
  reportElement.classList = "nav-link"
  const chartContainer = document.getElementById( "chartContainer" )
  //chartContainer.style.display = "none";
  chartContainer.innerHTML = ""
  modalSpinner.show()
  // formSearch.innerHTML = ""
  coinsElement.innerHTML = ""
  modalSpinner.hide()
  coinsElement.innerHTML = `
               <div class="d-flex mb-3">
      <div class="p-2 flex-fill">
        <h1 class="titles">About Me...</h1>
        <div class="card text-white bg-dark mb-3" style="width: 14rem;">
   
  <img src="img/images.jpg" class="card-img-top" alt="my picture">
  <div class="card-body">
    <h5 class="card-title">Ruth Ohayon</h5>
    <p class="card-text">Age: my age</p>
    <p class="card-text">Married + children</p>
    <email>Email: xxxxx@gmail.com</email>
    <address>Address: My Address</address>
  </div>
  </div>
  </div>
   <div class="p-2 flex-fill title">
        <h1 class="title">About The Project...</h1>
        <div class="card border-dark mb-3" style="max-width: 18rem;">
          <div class="card-body text-dark">
            <h4 class="card-title">In general:</h4>
            <p class="card-text text">
              The project's purpose is to accessible information and reports from the virtual commerce world.<br>
              The app is a client-side application only, which contains API calls.<br>
            </p>
            <h4 class="card-title">Home:</h4>
            <p class="card-text text">
              This screen displays the currencies. You can click the "More Info" button for more information.<br>
              Additionally, You can search by entering a currency code in the appropriate input<br>
              By clicking the "toggle" button, the current currency will be added to the list of reports.<br>
              Please note: You can add up to five coins only.
            </p>
            <h4 class="card-title">Reports:</h4>
            <p class="card-text text">
              This screen displays a graph describing the status of the currencies selected in real time.<br>
              Every two seconds the graph is updated.
            </p>
          </div>
        </div>
      </div>
      </div>

   `
}
