class BuyerPage extends Base {

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
                ${this.searchResult.map(obj => /*html*/`
                  <div class="col d-flex justify-content-center">
                    <div class="card my-4 estate-card">
                      <a href="/real-estate-info/${obj.Id}" objectid="${obj.Id}">
                      <img src="images/${obj.imgUrl}" targetbostadid="${obj.Id}" class="card-img-top" alt="Bostad picture"></a>
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