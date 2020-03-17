class ObjectPage extends Base {

    render() {
        console.log(this);
        return /*html*/`
            <div class= "row m-0" route="/real-estate-info/${this.Id}" page-title="Bostad info">
          
         <div class= "container my-3">
<div class= "container my-4">
        <img src="/images/${this.user}/img12.jpg">
                    <div class= "row p-5">
                        <h1>Försäljningsobjekt.</h1>
                        <div class="col-sm-13">
                        
                            <div class="col d-flex justify-content-center">
                                <div class="card my-8">
                                
                                    <img src="/images/${this.Id}/img01.jpg" class="card-img-top" alt="${this.Id}" realEstateId="${this.Id}">

                                    <div class="card-body">
                                        <div class="card-text">
                                            <strong>
                                            <h1>${this.streetName} ${this.streetNumber}, ${this.floor} tr</h1>
                                            ${this.areaName}, ${this.regionName}<br>
                                            Antal rum: ${this.rooms}<br>
                                            Boarea: ${this.area} m²<br>
                                            Pris: ${this.price} kr<br>
                                            Byggår: ${this.buildYear}<br>
                                            Driftkostnad: ${this.maintenanceCost} /år<br>
                                            Bostadstyp: ${this.tenure}</strong>
                                            <br><br>
                                            ${this.description}<br>
                                        </div>
                                    </div>

                                    <img class="d-block w-100" src="/images/${this.Id}/img02.jpg"><br>
                                    <img class="d-block w-100" src="/images/${this.Id}/img03.jpg"><br>
                                    <img class="d-block w-100" src="/images/${this.Id}/img04.jpg"><br>
                                    <img class="d-block w-100" src="/images/${this.Id}/img05.jpg"><br>
                                    <img class="d-block w-100" src="/images/${this.Id}/img06.jpg"><br>
                                    <img class="d-block w-100" src="/images/${this.Id}/img07.jpg"><br>
                                    <img class="d-block w-100" src="/images/${this.Id}/img08.jpg"><br>
                                    <img class="d-block w-100" src="/images/${this.Id}/img09.jpg"><br>
                                    <img class="d-block w-100" src="/images/${this.Id}/img10.jpg"><br>
                                    <img class="d-block w-100" src="/images/${this.Id}/img11.jpg"><br>
                                    <img class="d-block w-100" src="/images/${this.Id}/img12.jpg"><br>
                                    <img class="d-block w-100" src="/images/${this.Id}/img13.jpg"><br>
                                    <img class="d-block w-100" src="/images/${this.Id}/img14.jpg"><br>

                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
    }


}