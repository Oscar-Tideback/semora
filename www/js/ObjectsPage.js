class ObjectsPage extends Base {

    async mount() {
        //Hämta objekt från databasen 
        this.foundObjects = await sql(/*sql*/`
    
    SELECT * FROM realEstateInfo, realEstateImages 
    where 
    realEstateInfo.Id =  realEstateImages.realEstateInfoId
    `);
        //Objekt information från databasen om respektive objekt.
        //Html nedan för layout och design
    }
    render() {
        return /*html*/`
            <div class= "row" route="/real-estate-info" page-title="Bostad info">
                <div class= "container">
                    <div class= "row">
                        <div class="col-sm-9"> Objekt Information.
                        ${this.foundObjects.map(realEstateInfo => /*html*/`
                            <div class="col-3"><img src="images/${realEstateInfo.imgUrl}"  class="img-fluid img-thumbnail" alt="Agent face">
                            <div class="col-3">${realEstateInfo.area}</div>
                            <div class="col-3">${realEstateInfo.rooms}</div>
                            <div class="col-3">${realEstateInfo.buildYear}</div>
                            <div class="col-3">${realEstateInfo.maintenanceCost}</div>
                            <div class="col-3">${realEstateInfo.tenure}</div>
                            <div class="col-3">${realEstateInfo.price}</div>
                        
                            <!--<div class="col-1">${realEstateInfo.description}</div>-->
                        `)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    doSomeThing() {

    }
}