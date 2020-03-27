class ObjectPage extends Base {

    async mount() {

        //pop viewings
        this.viewingsSelection = await sql(/*sql*/`
        SELECT * from viewings
            WHERE viewings.realEstateId = ${this.Id}   
    
    `);
    }





    render() {
        return /*html*/`
            <div class= "row m-0 pt-4" route="/real-estate-info/${this.Id}" page-title="Bostad info">
          
        

 
                    <div class= "col-12 pl-0 pr-0 pb-0 mt-4">
                    <h2><strong>Försäljningsobjekt</strong></h2>
                    <div class="col-sm-13">
                        
                    <div class="col d-flex justify-content-left">
                    <div class="card my-8">
                                
                    <img src="/images/${this.Id}/img01.jpg"class="card-img-top" alt="${this.Id}" realEstateId="${this.Id}" >
            
                    <div class= "right"></div>
                              
                    <div class="card-body">
                    <div class="card-text">

                    <h2>${this.streetName} ${this.streetNumber} ${this.floor === null ? '' : ' (' + this.floor + ' tr)'}</h2>
                                            <h4><strong>${this.areaName}, ${this.regionName}<br></strong></h4>
                                            <strong>Antal rum:</strong> ${this.rooms}<br>
                                            <strong>Boarea:</strong> ${this.area} m²<br>
                                            <strong>Pris:</strong> ${this.price} kr<br>
                                            <strong>Byggår:</strong> ${this.buildYear}<br> 
                                            <strong>Driftkostnad:</strong> ${this.maintenanceCost} /år<br>
                                            <strong>Bostadstyp:</strong> ${this.tenure}<br>
                                            <strong>Visningstider:</strong> ${this.viewingsSelection.map(viewings => viewings.startDatetime + ' - ' + viewings.endDatetime)} <br>
                                            <strong>Mäklare:</strong> ${this.firstName} ${this.lastName}<br>
                                             ${this.user}
                                        
                                            </div>
                                            </div>
                                            
                                            <div class="row p-4">
                                            <h3><strong>Kontakta mäklaren</strong></h3>
                                            </div>
                                            <div class= "row  p-4 border no-gutters" >
                                        
                                            <div class= "col-auto">
                                      
                                    
                                            <img src="../images/${this.imageUrl}"class="img-thumbnail rounded float-strong-left" alt="Agent face">
                                             </div>
                                            <div class="card-body col-lg-4 p-4" style="white-space: nowrap">
                                            <div class="card-body col-lg-4 p-4" style="white-space: nowrap">
                                            <div class="card-title name-nopad">

                                            <div class="col-lg-4  col-md-4 col-sm-12 mt-4">
                                            <p class="card-text name-email-phone"><span class="name-bold" ></span>  <strong><h5>${this.firstName} ${this.lastName}<h5></p></strong>
                                            <p class="card-text name-email-phone"><span class="name-bold" ></span>  <strong><h6>Email:</strong> ${this.email}<h6></p>
                                            <p class="card-text name-email-phone"><span class="name-bold" ></span>  <strong><h6>Tel:</strong> ${this.phone}<h6></p>
                                            <hr class="mb-4">
                                            </div>
                                            </div>
                                            </div>
                                            </div>
                                            
                                            <br>
                                         
                                            </div> 
                                            <div class="row p-4 text-break">
                                            ${this.realDescription}
                                            <div>
                                            <br>
                                            <p class="text-break">${this.description}</p>
                                            <br>
                                            <br>
                                            <h5>Välkommen!</h5>
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
                            
                        
                    
                
            
            
            
            `;
    }


}