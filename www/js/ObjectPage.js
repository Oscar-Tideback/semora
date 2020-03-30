class ObjectPage extends Base {

    async mount() {

        //Populate object viewings from Id
        this.viewingsSelection = await sql(/*sql*/`
        SELECT viewings.startDateTime, viewings.endDateTime from viewings
            WHERE viewings.realEstateId = ${this.Id}   
    
    `);
        console.log('Blah4: ' + this.viewingsSelection.length);
    }

    render() {

        return /*html*/`

        <div class="row m-0 p-0" route="/real-estate-info/${this.Id}" page-title="Bostad info">
        <div class="col-12 p-0">
    
          <div class="container d-flex justify-content-center">
            <div class="row paragraph-maxwidth">
                <div class="row py-4 my-4">
                    <p class="h2">Till salu: ${this.streetName} ${this.streetNumber} ${this.floor === null ? '' : ' (' + this.floor + ' tr)'} </p>
                    
                    <p class="">${this.description}</p>
                </div>
              </div>
            </div>

            <div class="row m-0 p-0 col-12 d-flex shadow mb-5">
               <img src="/images/${this.Id}/img01.jpg" class="p-0 col-12" alt="${this.Id}" realEstateId="${this.Id}">

            </div>
    
                <div class="card" style="border: 0px">
                <div class="card-body">
                  <div class="card-text">
      
                    <p class="h3">${this.areaName}, ${this.regionName}</p>
                    <strong>Antal rum:</strong> ${this.rooms}<br>
                    <strong>Boarea:</strong> ${this.area} m²<br>
                    <strong>Pris:</strong> ${app.regExPrice(this.price)} kr<br>
                    <strong>Byggår:</strong> ${this.buildYear}<br>
                    <strong>Driftkostnad:</strong> ${app.regExPrice(this.maintenanceCost)} /år<br>
                    <strong>Bostadstyp:</strong> ${this.tenure}<br>                
                    ${ this.viewingsSelection.length === 1 ? '<div><strong>Visning: </strong></div>' + this.viewingsSelection.map(viewings => '<p class="my-0">' + viewings.startDatetime + ' - ' + viewings.endDatetime + '</p>') : ''
                || this.viewingsSelection.length === 2 ? '<div><strong>Visningar: </strong></div>' + this.viewingsSelection.map(viewings => '<p class="my-0">' + viewings.startDatetime + ' - ' + viewings.endDatetime + '</p>') : ''}


                  
                </div >
                </div>
      

                <div class="row m-4 p-4 border">
                
      
                  <div class="col-12"><p class="text-center">Kontakta mäklaren</p>
                    <a href="/real-estate-agent/${this.brokerId}"><img src="../images/${this.imageUrl}"
                        class="img-thumbnail rounded float-strong-left" alt="Agent face"></a>
                  </div>
                  <div class="card-body" style="white-space: nowrap">
                    <div class="card-title">
      
                      <div class=""><a href="/real-estate-agent/${this.brokerId}">
                          <p class="card-text name-email-phone"><span class="name-bold"></span> <strong>
                              <h5>${this.firstName} ${this.lastName}<h5>
                          </p></strong></a>
                          <p class="card-text name-email-phone"><span class="name-bold"></span> <strong>
                              <h6>Email:
                            </strong> ${this.email}<h6>
                          </p>
                          <p class="card-text name-email-phone"><span class="name-bold"></span> <strong>
                              <h6>Tel:
                            </strong> ${app.regExPhoneNumber(this.phone)}<h6>
                          </p>
                        
      
                      </div>
                    </div>
                  </div>    
                </div>
                <div class="row p-4 text-break">
                  ${this.realDescription}
                  <div>
                    <h5>Välkommen!</h5>
                  </div>
                </div>    
      
                <img class="d-block w-100 shadow mb-3" src="/images/${this.Id}/img02.jpg"><br>
                <img class="d-block w-100 shadow mb-3" src="/images/${this.Id}/img03.jpg"><br>
                <img class="d-block w-100 shadow mb-3" src="/images/${this.Id}/img04.jpg"><br>
                <img class="d-block w-100 shadow mb-3" src="/images/${this.Id}/img05.jpg"><br>
                <img class="d-block w-100 shadow mb-3" src="/images/${this.Id}/img06.jpg"><br>
                <img class="d-block w-100 shadow mb-3" src="/images/${this.Id}/img07.jpg"><br>
                <img class="d-block w-100 shadow mb-3" src="/images/${this.Id}/img08.jpg"><br>
                <img class="d-block w-100 shadow mb-3" src="/images/${this.Id}/img09.jpg"><br>
                <img class="d-block w-100 shadow mb-3" src="/images/${this.Id}/img10.jpg"><br>
                <img class="d-block w-100 shadow mb-3" src="/images/${this.Id}/img11.jpg"><br>
                <img class="d-block w-100 shadow mb-3" src="/images/${this.Id}/img12.jpg"><br>
                <img class="d-block w-100 shadow mb-3" src="/images/${this.Id}/img13.jpg"><br>
                <img class="d-block w-100 shadow mb-3" src="/images/${this.Id}/img14.jpg"><br>
              </div>
            </div>
          </div>
                            
                        
                    
                
            
            
            
            `;
    }


}