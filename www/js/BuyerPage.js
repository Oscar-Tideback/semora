class BuyerPage extends Base {

  async mount() {

    this.foundBostads = await sql(/*sql*/`
      SELECT realEstateInfo.area, realEstateInfo.rooms,
    realEstateInfo.buildYear, realEstateInfo.maintenanceCost,
    realEstateInfo.tenure, realEstateInfo.price,
    realEstateImages.realEstateInfoId, realEstateImages.imgUrl
    FROM realEstateInfo, realEstateImages
    WHERE realEstateInfo.Id = realEstateImages.realEstateInfoId
    AND realEstateImages.imgUrl LIKE '%img01%'
    `);

  }
  refreshBostad(e) {
    app.objectsPage.targetBostadId = e.target.attributes.targetBostadId.value;
    app.objectsPage.makeSql();
  }

  render() {
    return /*html*/`
      <div class="row m-0" route="/buy-property" page-title="Dhyr & Rumson - Våra Bostad">  
        <div class="container my-4"> 
          <div class="row">
          
            <div class="col-12">    
              <div class="row">
                <div class="col-8"><h5>Resultat av all bostad i hela Sverige.</h5>
                
                <p>Skriv lite text.....</p>
                </div>
              </div>
              <div class="row">
                ${this.foundBostads.map(realEstateInfo => /*html*/`
                <div class="col-2"><a href="/real-estate-info" click="refreshBostad" targetBostadId="${realEstateInfo.Id}"><img src="images/${realEstateInfo.imgUrl}.jpg"  targetBostadId="${realEstateInfo.id}"  class="img-fluid img-thumbnail" alt="Bostad picture"></a></div>
                <div class="col-4"><p  targetBostadId="${realEstateInfo.Id}">${realEstateInfo.rooms}` + ' ' + `${realEstateInfo.tenure}</p></a><p>${realEstateInfo.price}</p><p>${realEstateInfo.area}</p></div>`)}</div>              
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    `;
  }
}