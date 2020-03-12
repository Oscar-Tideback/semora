class ObjectsPage extends Base {

    async makeSql() {
        //Hämta objekt från databasen 
        this.foundObjects = await sql(/*sql*/`
    
    SELECT realEstateInfo.area, realEstateInfo.rooms, realEstateInfo.description,
    realEstateInfo.buildYear, realEstateInfo.maintenanceCost, 
    realEstateInfo.tenure, realEstateInfo.price,
    realEstateImages.realEstateInfoId, realEstateImages.imgUrl 
    FROM realEstateInfo, realEstateImages
    WHERE realEstateInfo.Id = ${app.objectsPage.targetBostadId}
    AND realEstateImages.realEstateInfoId = ${app.objectsPage.targetBostadId}
    AND realEstateImages.imgUrl LIKE '%img01%'

    `);
        //Objekt information från databasen om respektive objekt.
        //Html nedan för layout och design
    }
    async mount() {
        return this.makeSql();
    }

    render() {
        return /*html*/`
            <div class= "row m-0" route="/real-estate-info" page-title="Bostad info">
                <div class= "container my-3">
                    <div class= "row p-5">
                    <h1> Objekt Information </h1>
                        <div class="col-sm-9">
                        ${this.foundObjects.map(realEstateInfo => /*html*/`
                        <div class="col d-flex justify-content-left">
                        <div class="card my-5" style="width: 50rem;">
                        <a href="/TESTSIDA" click="test">
                            <img src="images/${realEstateInfo.imgUrl}" class="card-img-top" alt="..." realEstateId="${realEstateInfo.Id}">
                            </a>
                            </a>
                      <div class="card-body">
                        <p class="card-text">
                          <a href="/testpage" click="   " realEstateId="${realEstateInfo.Id}">
                            ${realEstateInfo.streetName} ${realEstateInfo.streetNumber}${realEstateInfo.floor === null ? '' : ' (' + realEstateInfo.floor + ' tr)'}<br>
                            ${realEstateInfo.areaName}, ${realEstateInfo.regionName}<br>
                            ${realEstateInfo.rooms} rum, ${realEstateInfo.area} m²<br>
                            <!-- obj.price.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3') -->
                            ${realEstateInfo.price} kr
                          </a>
                            <div class="card body">
                            ${realEstateInfo.area}</div>
                            ${realEstateInfo.rooms}</div>
                            ${realEstateInfo.buildYear}</div>
                            ${realEstateInfo.maintenanceCost}</div>
                            ${realEstateInfo.tenure}</div>   
                            ${realEstateInfo.price}</div>                     
                            ${realEstateInfo.description}</div>-->
                        `)}
            </div>
        </div>
    </div>
</div>
</div>
</div>

        `;
    }
}