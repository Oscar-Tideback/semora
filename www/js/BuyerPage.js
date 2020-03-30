class BuyerPage extends Base {

  mount() {
    this.formInput = new FormData();
  }

  doListLayout() { app.buyerPageSearch.formStoredValues.layout = 0; this.render(); }
  doGridLayout() { app.buyerPageSearch.formStoredValues.layout = 1; this.render(); }
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
          <div class="row m-0 pb-0" route="/buy-property" page-title="Dhyr & Rumson - Våra Bostad">            
            <div class="col-12">            

              <div class="row pt-4 mt-4">
                <div class="col">
                  <h3>(${this.searchResult.length}) Sökresultat ${app.buyerPageSearch.formStoredValues.textinput ? 'på "' + app.buyerPageSearch.formStoredValues.textinput + '"' : ''}  ${this.regionName === '' ? 'i samtliga regioner' : 'i ' + this.regionName}</h3>
                </div>
              </div>

              <div class="row">
                <div class="col"><hr class="hidden-hr"></div>
                <div class="col-auto">
                  <form class="form-group form-inline" id="buyerPageSortBy" submit="preventPageReload">
                    <div class="text-nowrap mt-2">Sortera på</div>
                    <select class="form-control mt-2 mx-1" id="sortby_select" name="sortby" change="doSort">
                      ${app.buyerPageSearch.formOptions.sortBy.map(option => /*html*/`
                        <option value="${option.value}" ${app.buyerPageSearch.formStoredValues.sortby !== option.value ? '' : 'selected="selected"'}>${option.name}</option>
                        `)}
                    </select>
                    <select class="form-control mt-2 mx-1" id="order_select" name="order" change="doSort">
                      ${app.buyerPageSearch.formOptions.order.map(option => /*html*/`
                        <option value="${option.value}" ${app.buyerPageSearch.formStoredValues.order !== option.value ? '' : 'selected="selected"'}>${option.name}</option>
                        `)}
                    </select>
                    <div class="col col-sm-auto pr-2 text-nowrap text-right">
                      <button class="btn mt-2" click="doListLayout"><i class="icofont-listing-box icofont-lg icofont-gray"></i></button>
                      <button class="btn mt-2" click="doGridLayout"><i class="icofont-layout icofont-lg icofont-gray"></i></button>
                    </div>
                  </form>
                </div>                 
              </div>

              <!-- new row -->
              ${app.buyerPageSearch.formStoredValues.layout < 1 ? this.listLayout(this.searchResult) : this.gridLayout(this.searchResult)}            
            </div>       
          </div>
          `;
  }


  listLayout(objsData) {
    return /*html*/`
            <div class="row">
              ${objsData.map(obj => /*html*/`
                <div class="card mb-3 rounded-0 shadow w-100">
                  <div class="row no-gutters">
                    <div class="col-6 col-sm-auto order-1">
                      <img src="images/${obj.imgUrl}" class="card-img rounded-0 shadow" style="max-width: 285px;" alt="...">
                    </div>
                    <div class="col-12 col-sm-12 col-md order-3 order-sm-3 order-md-2 order-lg-2">
                      <div class="card-body pl-3 pt-3">
                        <h5 >${obj.streetName} ${obj.streetNumber.toUpperCase()}${obj.floor === null ? '' : ' (' + obj.floor + ' tr)'}</h5>
                        <p class="card-text mb-1">${obj.areaName}, ${obj.regionName}, ${obj.rooms} rum, ${obj.area} m²</p>
                      </div>
                    </div>
                    <div class="col-sm col-6 order-2 order-sm-2 order-md-3 order-lg-3">
                      <div class="row card-body pt-3 no-gutters">
                        <div class="col text-right">
                          <p>${obj.tenure}</p>
                        </div>                        
                      </div>

                      <div class="row card-body py-0 no-gutters">
                        <div class="col text-right">
                          <p class="card-text"><b>${obj.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')} kr</b></p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              `)}
            </div>
  `;
  }

  gridLayout(objsData, startAtIndex = 0) {
    return /*html*/`
              <div class="row">
                ${objsData.map((obj, index) => (index >= startAtIndex ? /*html*/`
                  <div class="col d-flex justify-content-center">
                    <div class="card my-4 estate-card shadow">
                      <a href="/real-estate-info/${obj.id}" objectid="${obj.id}">
                      <img src="images/${obj.imgUrl}" targetbostadid="${obj.id}" class="card-img-top" alt="Bostad picture"></a>
                      <div class="card-body pr-4">
                        <p class="card-text">
                          <div>                              
                            <h5>${obj.streetName} ${obj.streetNumber.toUpperCase()}${obj.floor === null ? '' : ' (' + obj.floor + ' tr)'}</h5>
                            ${obj.areaName}, ${obj.regionName}<br>
                            ${obj.rooms} rum, ${obj.area} m²
                          </div>
                        </p>
                        <div class="row">
                          <div class="col">
                            <div class="card-text">
                              <b>${obj.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')} kr</b>                            
                            </div>
                          </div>
                          <div class="col-auto">
                            <div class="card-text text-right">${obj.tenure}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ` : ''))}
              </div>  
    `;
  }

}