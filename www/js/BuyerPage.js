class BuyerPage extends Base {

  mount() {
    this.formInput = new FormData();
  }

  doSort() {
    // If null the form doesn't exist prior to doSort()
    if (document.querySelector('[id="buyerPageSortBy"]') === null) {
      return;
    }
    else {
      this.formInput = document.querySelector('[id="buyerPageSortBy"]');
      app.buyerPageSearch.formStoredValues.sortby = parseInt(this.formInput.sortby.value);
      app.buyerPageSearch.formStoredValues.order = parseInt(this.formInput.order.value);

      switch (this.formInput.sortby.value + this.formInput.order.value) {
        case '00': this.searchResult.sort(this.byPrice); break;
        case '01': this.searchResult.reverse(this.byPrice); break;
        case '10': this.searchResult.sort(this.byArea); break;
        case '11': this.searchResult.reverse(this.byArea); break;
        case '20': this.searchResult.sort(this.byRooms); break;
        case '21': this.searchResult.reverse(this.byRooms); break;
        case '30': this.searchResult.sort(this.byRegion); break;
        case '31': this.searchResult.reverse(this.byRegion); break;
      }
    }
    this.render();
  }

  byPrice(a, b) { return a.price - b.price; }
  byArea(a, b) { return a.area - b.area; }
  byRooms(a, b) { return a.rooms - b.rooms; }
  byRegion(a, b) {
    // Avoid sort by upper/lowercase
    let regionA = a.regionName.toUpperCase();
    let regionB = b.regionName.toUpperCase();
    if (regionA < regionB) return -1;
    if (regionA > regionB) return 1;
    return 0; // if equal
  }

  // Addition by Thomas
  preventPageReload(e) {
    // Do not perform a hard reload of the page when someone submits the form
    e && e.preventDefault();
  }

  render() {
    //console.log('buyerPage searchResult: ', this.searchResult)
    //console.log('from stored:' + app.buyerPageSearch.formStoredValues.textinput);
    return /*html*/`
      <div class="row m-0" route="/buy-property" page-title="Dhyr & Rumson - Våra Bostad">  
        <div class="container mb-4"> 
          <div class="row">
          
            <div class="col-12">
            
              <div class="row form-inline">
                
                <div class="col-sm-12 col-md mx-lg-4 mx-md-0 pt-4 mt-md-2 mt-lg-0">
                  <h3>(${this.searchResult.length}) Sökresultat ${app.buyerPageSearch.formStoredValues.textinput ? 'på "' + app.buyerPageSearch.formStoredValues.textinput + '"' : ''}  ${this.regionName === '' ? 'i samtliga regioner' : 'i ' + this.regionName}</h3>
                </div>

                <div class="col-lg-auto mr-lg-4 mr-md-0 pt-4 mt-md-2 mt-lg-0">
                  <form class="form-group d-flex justify-content-end" id="buyerPageSortBy" submit="preventPageReload">

                    <div class="text-nowrap mr-2">Sortera på</div>
                    <select class="form-control btn-block mr-2" id="sortby_select" name="sortby" change="doSort">
                      ${app.buyerPageSearch.formOptions.sortBy.map(option => /*html*/`
                        <option value="${option.value}" ${app.buyerPageSearch.formStoredValues.sortby !== option.value ? '' : 'selected="selected"'}>${option.name}</option>
                        `)}
                    </select>
                    <select class="form-control btn-block mt-0" id="order_select" name="order" change="doSort">
                      ${app.buyerPageSearch.formOptions.order.map(option => /*html*/`
                        <option value="${option.value}" ${app.buyerPageSearch.formStoredValues.order !== option.value ? '' : 'selected="selected"'}>${option.name}</option>
                        `)}
                    </select>
                  </form>
                </div>

              </div>

            <div class="row">
                ${this.searchResult.map(obj => /*html*/`
                  <div class="col d-flex justify-content-center">
                    <div class="card my-4 estate-card shadow">
                      <a href="/real-estate-info/${obj.id}" objectid="${obj.id}">
                      <img src="images/${obj.imgUrl}" targetbostadid="${obj.id}" class="card-img-top" alt="Bostad picture"></a>
                      <div class="card-body">
                        <p class="card-text">
                          <div>
                            ${obj.streetName} ${obj.streetNumber.toUpperCase()}${obj.floor === null ? '' : ' (' + obj.floor + ' tr)'}<br>
                            ${obj.rooms} rum<br>
                            Pris: ${obj.price} kr<br>
                            Area: ${obj.area} kvm<br>
                            Region: ${obj.regionName}
                          </div>
                        </p>
                      </div>
                  </div>
                </div>
                `)}
            </div>   

          </div>
        </div>
          
        </div>

      </div>
    </div>
  </div>
  `;
  }
}