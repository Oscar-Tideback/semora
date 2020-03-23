class ObjectPage extends Base {







    render() {
        //console.log(this.foundAgents);  // Check what properties object actually (got) has when rendering
        return /*html*/`
            <div class= "row m-0" route="/real-estate-info/${this.Id}" page-title="Bostad info">
          
        

 
                    <div class= "row p-5">
                        <h1>Försäljningsobjekt.</h1>
                        <div class="col-sm-13">
                        
                            <div class="col d-flex justify-content-center">
                                <div class="card my-8">
                                
                                    <img src="/images/${this.Id}/img01.jpg"class="card-img-top" alt="${this.Id}" realEstateId="${this.Id}">
                                    <div class= "right"></div>
                              
                                  
  
                         

                            
                                    <div class="card-body">
                                        <div class="card-text">
                                        
                                            <h1>${this.streetName} ${this.streetNumber}, ${this.floor} tr</h1>
                                            <h4><strong>${this.areaName}, ${this.regionName}<br></strong></h4>
                                            <strong>Antal rum:</strong> ${this.rooms}<br>
                                            <strong>Boarea:</strong> ${this.area} m²<br>
                                            <strong>Pris:</strong> ${this.price} kr<br>
                                            <strong>Byggår:</strong> ${this.buildYear}<br> 
                                            <strong>Driftkostnad:</strong> ${this.maintenanceCost} /år<br>
                                            <strong>Bostadstyp:</strong> ${this.tenure}<br>
                                            <strong>Visning:</strong> ${this.startDatetime} - ${this.endDatetime}<br>
                                            <strong>Mäklare:</strong> ${this.firstName} ${this.lastName}<br>
                                             ${this.user}


                                       
                                            <div class="col d-flex justify-content-right">
                                            <div class="row p-3 border bg-light no-gutters">
                                            <img src="/images/${this.imageUrl}">

                                            <p class="card-text name-email-phone"><span class="name-bold" ></span>  <strong><h6>${this.firstName} ${this.lastName}<h6></strong></p>
                                            <p class="card-text name-email-phone"><span class="name-bold" ></span>  <strong><h6>Email:</strong> ${this.email}<h6></p>
                                            <p class="card-text name-email-phone"><span class="name-bold" ></span>  <strong><h6>Tel:</strong> ${this.phone}<h6></p>
                                            <p class="card-text name-email-phone"><span class="name-bold" ></span>  <strong><h6>Region:</strong> ${this.regionName}<h6></p>

                                        
                                    </div>
                                    </div>
                                            <br>
                                            <br>
                                            ${this.description}<br>
            
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
            </div>
            `;
    }


}