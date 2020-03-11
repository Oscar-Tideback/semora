class ObjectsPage extends Base {

    async makeSql() {
        //Hämta objekt från databasen 
        this.foundObjects = await sql(/*sql*/`
    
    SELECT realEstateInfo.area, realEstateInfo.rooms,
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
                        <div class="col-sm-9"> Objekt Information.
                        ${this.foundObjects.map(realEstateInfo => /*html*/`
                            <div class="col-2"><img src="images/${realEstateInfo.imgUrl}.jpg"  class="img-fluid img-thumbnail" alt="bostad picture">
                            <div class="col-2">${realEstateInfo.area}</div>
                            <div class="col-2">${realEstateInfo.rooms}</div>
                            <div class="col-2">${realEstateInfo.buildYear}</div>
                            <div class="col-2">${realEstateInfo.maintenanceCost}</div>
                            <div class="col-2">${realEstateInfo.tenure}</div>                        
                            <!--<div class="col-1">${realEstateInfo.description}</div>-->
                        `)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}