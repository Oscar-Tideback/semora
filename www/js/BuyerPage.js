class BuyerPage extends Base {

  refreshObjectPage(e) {
    app.objectsPage.targetObjectdId = e.target.attributes.objectid.value;
    app.objectsPage.makeSql();
  }


  render() {
    console.log("RENDERING", this.searchResult)
    return /*html*/`
      <div class="row m-0" route="/buy-property" page-title="Dhyr & Rumson - Våra Bostad">  
        <div class="container my-4"> 
          <div class="row">
          
            <div class="col-12">    
              <div class="row">
                
                <div class="col-8">
                  <h1>Bostäder till salu just nu...</h1>                
                </div>

              </div>
              
                <div class="row">
                ${this.searchResult.map(realEstateInfo => /*html*/`
                  <div class="col d-flex justify-content-center">
                    <div class="card my-4 estate-card">
                      <a href="/real-estate-info" click="refreshBostad" objectid="${realEstateInfo.Id}">
                      <img src="images/${realEstateInfo.imgUrl}" targetbostadid="${realEstateInfo.Id}" class="img-fluid img-thumbnail" alt="Bostad picture"></a>
                      <div class="card-body">
                        <p class="card-text">
                          <div>
                            ${realEstateInfo.streetName} ${realEstateInfo.streetNumber.toUpperCase()}${realEstateInfo.floor === null ? '' : ' (' + realEstateInfo.floor + ' tr)'}<br>
                            ${realEstateInfo.rooms} rum<br>
                            Pris: ${realEstateInfo.price} kr<br>
                            Område: ${realEstateInfo.area}<br>
                            Region: ${realEstateInfo.regionName}
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