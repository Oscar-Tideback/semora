class ObjectPage extends Base {

    async mount() {

        //Populate object viewings from Id
        this.viewingsSelection = await sql(/*sql*/`
        SELECT viewings.startDateTime, viewings.endDateTime from viewings
            WHERE viewings.realEstateId = ${this.Id}   
    
    `);
        //console.log('Antal visningar: ' + this.viewingsSelection.length);
    }
    async collectFormData(e) {
        // Loop through the form and collect the input
        let data = {};
        for (let element of [...e.target.closest('form').elements]) {
            if (!element.name) { continue; }
            data[element.name] = element.value;
        }

        //Send customer message to agent in database, using object id.
        e.preventDefault();
        await sql(/*sql*/`
          INSERT INTO potentialCustomer (name, email, phone, subject, agentContact) 
          VALUES($name, $email, $phone, $subject, ${this.id});
        `, data);

        //Toggle modal as thank you message
        $('#thanksModal').modal('toggle');

    }

    render() {

        return /*html*/`

        <div class="row m-0 p-0" route="/real-estate-info/${this.Id}" page-title="Bostad info">
        <div class="col-12 p-0">
    
          <div class="container d-flex justify-content-center">
            <div class="row paragraph-maxwidth">
                <div class="row py-4 my-4">
                <p>
                <h2 class="h2">Till salu: ${this.streetName} ${this.streetNumber} ${this.floor === null ? '' : ' (' + this.floor + ' tr)'}</h2></p>
                    
                    <p class="">${this.description}</p>
                    <h5>
                    ${ this.viewingsSelection.length === 1 ? '<p>Visning:</p>' + this.viewingsSelection.map(viewings => '<p class="my-1">' + viewings.startDatetime + ' - ' + viewings.endDatetime + '</p>') : ''
                || this.viewingsSelection.length === 2 ? '<p>Visningar:</p>' + this.viewingsSelection.map(viewings => '<p class="my-1">' + viewings.startDatetime + ' - ' + viewings.endDatetime + '</p>') : ''}                
                </h5>
                </div>
              </div>
            </div>

            <div class="row m-0 p-0 col-12 d-flex shadow mb-5">
               <img src="/images/${this.Id}/img01.jpg" class="p-0 col-12" alt="${this.Id}" realEstateId="${this.Id}">

            </div>
    
            <div class="card" style="border: 0px">
            <div class="row p-4 m-0">
                <div class="col-4">     
                <p class="h3">${this.areaName}, ${this.regionName}</p>
                <strong>Antal rum:</strong> ${this.rooms}<br>
                <strong>Boarea:</strong> ${this.area} m²<br>
                <strong>Pris:</strong> ${app.regExPrice(this.price)} kr<br>
                <strong>Byggår:</strong> ${this.buildYear}<br>
                <strong>Driftkostnad:</strong> ${app.regExPrice(this.maintenanceCost)} /år<br>
                <strong>Bostadstyp:</strong> ${this.tenure}<br>                
                </div>
                <div class="col-8 p-2">
                <a href="#map"><img class="img-thumbnail" style="height:250px;width:%;" src="/images/${this.Id}/img14.jpg"></a>
            </div>
            <div class="row p-4 border-0">    
                  <div class="col-12 border shadow mt-3">
                  <div class="row">
                  <div class="col-md-4 col-sm-12 col-lg-3 mt-3">
                    <a href="/real-estate-agent/${this.brokerId}"><img src="../images/${this.imageUrl}"
                        class="img-thumbnail rounded mb-2 float-strong-left" alt="Agent face"></a>
                        <a href="/real-estate-agent/${this.brokerId}">
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
                    <div class="card-body mt-2 pt-0" >
                    <div class="card-title">
                    <div class="col-12">
                    <!--Form-->
                    <div class="col-lg-12 col-md-12 col-sm-12">         
                    <div>
                    <form submit="collectFormData">
                    <div class="name-bold text-secondary">Kontakta mäklaren som förmedlar detta objekt.</div>
                    <div class="md-form">
        
                    <label class="name-email-phone">Namn:</label>
                    <input name="name" type="name" pattern=".{2,}" class="form-control">         
                    </div>
                    <div class="md-form">

                    <label class="name-email-phone">E-Mail:</label>
                    <input name="email" type="email" class="form-control">
                    </div>
                    <div class="md-form">

                    <label class="name-email-phone">Telefon:</label>
                    <input type="tel" id="phone" name="phone" pattern="[0-9]{7,10}" class="form-control">
                    </div>
                    <div class="md-form">

                    <label class="name-email-phone">Ditt ärende:</label>
                    <textarea name="subject" type="subject" class="form-control md-textarea" rows="3"></textarea>
                    </div>
                    <div class="text-center mt-4" >
                    <button type="submit"  class="btn col-12 border button-color" value="Send">Skicka</button>
                    </div>           
                </div>
                </div>    
                    </div>
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
                <a id="map"></a>
              </div>
            </div>
          </div>

          <div class="modal fade" id="thanksModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header  alert alert-success"  role="alert">
                  <h4 class="modal-title" id="exampleModalLabel">Tack för visat intresse!</h4>
                  <button type="button" class="close"  href="/" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                  <p>Ditt meddelande har skickats!<br>
                  <p><span class="name-bold broker-name">${this.firstName} ${this.lastName} </span>återkommer snarast till dig via telefon eller email.</p>
                </div>
                <div class="mt-4 modal-footer">
                  <a href="/" type="button" class="btn btn-primary float-left"  data-dismiss="modal">Till startsidan!</a>
                </div>
              </div>
            </div>       
      </div>
                            
                        
                    
                
            
            
            
            `;
    }


}