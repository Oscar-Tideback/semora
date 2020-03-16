class BuyerPage extends Base {

  async mount() {

    this.foundKeywords = [];
    this.selected = -1;

    // this.userChoices = {
    // should contain min max price, min max kvm, region etc
    //    region: '',
    // minKvm: 0, maxKvm: 150
    // }

    await this.search();
  }

  async search() {
    // If called from NavBarSearch we will get a region
    // otherwise set region to empty strings

    // Test
    //this.maxKvm = 111;

    this.foundBostads = await sql(/*sql*/`
      SELECT realEstateInfo.Id, realEstateInfo.area, realEstateInfo.rooms, 
      realEstateInfo.buildYear, realEstateInfo.maintenanceCost,
      realEstateInfo.tenure, realEstateInfo.price, realEstateInfo.floor,
      realEstateImages.realEstateInfoId, realEstateImages.imgUrl,
      region.regionName, realEstateAddress.streetName, realEstateAddress.streetNumber
      FROM  realEstateInfo, realEstateImages, region, userXRegion, realEstateAddress
      WHERE realEstateInfo.Id = realEstateImages.realEstateInfoId
      AND realEstateAddress.realEstateId = realEstateInfo.Id
      AND userXRegion.regionId = region.id 
      AND userXregion.userId = realEstateInfo.userId
      AND realEstateImages.imgUrl LIKE '%img01%'
      AND (region.regionName = $region OR $region = '')
      
    `, { $region: this.region });
    // AND region.area > $minKvm

    this.render();
  }

  clickKeyword(e) {
    this.foundKeywords = [];
    this.selected = -1;
    this.chosen = e.target.innerText;

    this.render();
  }
  selectWithUpDownArrows(e) {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      this.selected += (e.key === 'ArrowDown') - (e.key === 'ArrowUp');
      if (this.selected < 0) { this.selected = this.foundKeywords.length - 1; }
      if (this.selected >= this.foundKeywords.length) { this.selected = 0; }

      this.render();
      return;
    }
  }
  async searchKeyword(e) {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) { return; }

    if (e.key === 'Enter' && this.selected >= 0) {
      this.chosen = this.foundKeywords[this.selected].regionName;
      this.foundKeywords = [];
      this.selected = -1;
      this.render();
      return;
    }
    this.selected = 0;

    // Autocomplete region
    this.foundKeywords = e.target.value.length < 1 ? [] : await sql(/*sql*/`SELECT regionName FROM region WHERE region.regionName LIKE $text`, { text: e.target.value + '%' });

    this.render();
  }
  refreshBostad(e) {
    app.objectsPage.targetBostadId = e.target.attributes.targetbostadid.value;
    app.objectsPage.makeSql();
  }



  render() {
    console.log("RENDERING", this.foundBostads)
    return /*html*/`
      <div class="row m-0" route="/buy-property" page-title="Dhyr & Rumson - Våra Bostad">  
        <div class="container my-4"> 
          <div class="row">
          
            <div class="col-12">    
              <div class="row">
                
                <div class="col-8">
                  <h1>Bostäder till salu just nu... </h1>                
                </div>

              </div>
              
                <div class="row">
                ${this.foundBostads.map(realEstateInfo => /*html*/`
                  <div class="col d-flex justify-content-center">
                    <div class="card my-4 estate-card">
                      <a href="/real-estate-info" click="refreshBostad" targetbostadid="${realEstateInfo.Id}">
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