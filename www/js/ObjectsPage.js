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
                        <div class="col-sm-12">
                        ${this.foundObjects.map(realEstateInfo => /*html*/`
                        <div class="col d-flex justify-content-center">
                        <div class="card my-8">
                            <img src="images/${realEstateInfo.imgUrl}" class="card-img-top" alt="..." realEstateId="${realEstateInfo.Id}">
                      <div class="card-body">
                        <div class="card-text">
                            ${realEstateInfo.streetName} 
                            ${realEstateInfo.streetNumber}
                            ${realEstateInfo.floor === null ? '' : ' (' + realEstateInfo.floor + ' tr)'}<br>
                            ${realEstateInfo.areaName},<br>
                            ${realEstateInfo.regionName}<br>
                            ${realEstateInfo.rooms} rum,<br>
                            ${realEstateInfo.area} m²<br>
                            ${realEstateInfo.price} kr<br>
                            ${realEstateInfo.area}<br>
                            ${realEstateInfo.rooms}<br>
                            ${realEstateInfo.buildYear}<br>
                            ${realEstateInfo.maintenanceCost}<br>
                            ${realEstateInfo.tenure}<br>
                            ${realEstateInfo.price}    <br>              
                            ${realEstateInfo.description}</div>
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