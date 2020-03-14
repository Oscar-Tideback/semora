class ObjectsPage extends Base {

    async mount() {

        this.foundObjects = [];
        this.makeSql();
    }

    async makeSql() {
        //Hämta objekt från databasen 
        this.foundObjects = await sql(/*sql*/` 
        SELECT realEstateInfo.Id, realEstateInfo.area,
            realEstateInfo.rooms, realEstateInfo.description,
            realEstateInfo.buildYear, realEstateInfo.maintenanceCost, 
            realEstateInfo.tenure, realEstateInfo.price,
            realEstateAddress.streetName, realEstateAddress.streetNumber,
            realEstateImages.realEstateInfoId, realEstateImages.imgUrl 
            FROM realEstateInfo, realEstateImages, realEstateAddress
            WHERE realEstateInfo.Id = $target
            AND realEstateImages.realEstateInfoId = $target
            AND realEstateAddress.realEstateId = $target 
            AND realEstateImages.imgUrl LIKE '%img01%'
        `, { target: this.targetBostadId });

        this.render();

        //console.log(this.foundObjects);

    }

    //Html nedan för layout och design targetBostadId
    render() {
        return /*html*/`
            <div class= "row m-0" route="/real-estate-info" page-title="Bostad info">
                <div class= "container my-3">
                    <div class= "row p-5">
                        <h1>Försäljningsobjekt.</h1>
                            <div class="col-sm-13">
                                ${this.foundObjects.map(realEstateInfo => /*html*/`
                                <div class="col d-flex justify-content-center">
                                    <div class="card my-8">
                                        <img src="images/${realEstateInfo.imgUrl}" class="card-img-top" alt="${realEstateInfo.Id}" realEstateId="${realEstateInfo.Id}">
                                        <div class="card-body">
                                            <div class="card-text">
                                            <h1><strong>${realEstateInfo.streetName}
                                                ${realEstateInfo.streetNumber}<br></h2>
                                                ${realEstateInfo.floor}
                                                ${realEstateInfo.areaName}
                                                ${realEstateInfo.regionName}
                                                Antal rum: ${realEstateInfo.rooms}<br>
                                                Boarea: ${realEstateInfo.area} m²<br>
                                                Pris: ${realEstateInfo.price} kr<br>
                                                Byggår: ${realEstateInfo.buildYear}<br>
                                                Driftkostnad: ${realEstateInfo.maintenanceCost} /år<br>
                                                Bostadstyp: ${realEstateInfo.tenure}<br></strong><br>
                                                ${realEstateInfo.description} <div><br>
                                            </div>   
                                            `)}
                                            <img class="d-block w-100" src="images/${this.targetBostadId}/img02.jpg"><br>
                                            <img class="d-block w-100" src="images/${this.targetBostadId}/img03.jpg"><br>
                                            <img class="d-block w-100" src="images/${this.targetBostadId}/img04.jpg"><br>
                                            <img class="d-block w-100" src="images/${this.targetBostadId}/img05.jpg"><br>
                                            <img class="d-block w-100" src="images/${this.targetBostadId}/img06.jpg"><br>
                                            <img class="d-block w-100" src="images/${this.targetBostadId}/img07.jpg"><br>
                                            <img class="d-block w-100" src="images/${this.targetBostadId}/img08.jpg"><br>
                                            <img class="d-block w-100" src="images/${this.targetBostadId}/img09.jpg"><br>
                                            <img class="d-block w-100" src="images/${this.targetBostadId}/img10.jpg"><br>
                                            <img class="d-block w-100" src="images/${this.targetBostadId}/img11.jpg"><br>
                                            <img class="d-block w-100" src="images/${this.targetBostadId}/img12.jpg"><br>
                                            <img class="d-block w-100" src="images/${this.targetBostadId}/img13.jpg"><br>
                                            <img class="d-block w-100" src="images/${this.targetBostadId}/img14.jpg"><br>
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