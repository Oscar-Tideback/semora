class ObjectPage extends Base {

    async mount() {
        //Populate object viewings from Id
        this.viewingsSelection = await sql(/*sql*/`
        SELECT viewings.startDateTime, viewings.endDateTime from viewings
            WHERE viewings.realEstateId = ${this.Id}   
    
    `);
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
            <div class="row p-4 paragraph-maxwidth">
                <div class="col pt-4">           
                
                <h2 class="pb-4">
                ${this.streetName} 
                ${this.streetNumber} 
                ${this.floor === null ? '' : ' (' + this.floor + ' tr)'}</h2>              
                <p>
                ${this.description}</p>              
                </div>
            </div>
            </div>

            <div class="row m-0 p-0 d-flex" style="overflow: hidden">           
               <img src="/images/${this.Id}/img01.jpg" class="p-0 col-12" alt="${this.Id}" realEstateId="${this.Id}">
               ${this.checkViewing(this.viewingsSelection.startDatetime)}
            </div>    
        </div>
           
        <div class="row p-4 m-0 border shadow mb-5">
            <p class="paragraph-maxwidth">
            ${this.realDescription}</p>
            <p>
            <h5>Välkommen!</h5></p>       
        </div>    
    
        <div class="col" style="border: 0px">
        <div class="row p-4 m-0">
            <div class="col-lg-4 col-md-12 col-sm-12">     
                <p class="h3">${this.areaName}, ${this.regionName}</p>
                <strong>Antal rum:</strong> ${this.rooms}<br>
                <strong>Boarea:</strong> ${this.area} m²<br>
                <strong>Pris:</strong> ${app.regExPrice(this.price)} kr<br>
                <strong>Byggår:</strong> ${this.buildYear}<br>
                <strong>Driftkostnad:</strong> ${app.regExPrice(this.maintenanceCost)} /år<br>
                <strong>Bostadstyp:</strong> ${this.tenure}<br>                
            </div>
            
            <div class="col-lg-4  col-md-6 col-sm-12 p-2">
                <a href="#map"><img src="/images/${this.Id}/img14.jpg" class="img-thumbnail d-flex" alt="Floor plan ${this.Id}"></a><p class="mb-0"><a href="#map">Ritning</p></a>
            </div>

            <div class="col-lg-4 col-md-6 col-sm-12 p-2">
                <a href="#agent"><img src="../images/${this.imageUrl}" class="img-thumbnail d-flex"  alt="Agent ${this.Id} face"></a><p class="mb-0">Ansvarig mäklare: </p><a href="#agent">${this.firstName} ${this.lastName}</a>
            </div>
        </div>
        </div>

            <div class="col-12 p-0">
            <div class="row m-0">
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
                <img class="d-block w-100 shadow mb-5" src="/images/${this.Id}/img13.jpg"><br>
                <img class="d-block w-100 shadow mb-5" src="/images/${this.Id}/img14.jpg"><br>
                <a id="map"></a>
            </div>
            </div>                   
            

            <div class="col-12 mt-4">
            <div class="row"><a id="agent"></a> 
            <div class="col"></div>

            <div class="col-lg-3 col-md-4 col-sm-12 m-3">
            
                <img src="../images/${this.imageUrl}" class="img-fluid rounded border float-bottom" alt="Agent face">
                <p class="mt-1 broker-name"><span class="name-bold">${this.firstName} ${this.lastName}</p>
                <p class="broker-name name-email-phone"><span class="name-bold">E-Mail:</span> ${this.email}</p>
                <p class="broker-name name-email-phone"><span class="name-bold">Tel:</span>  ${app.regExPhoneNumber(this.phone)}</p>
                <p class="broker-name name-region"><span class="name-bold">Region:</span> ${this.regionName}.</p>
            </div>

            <div class="col-lg-7 col-md-6 col-sm-12">         
            <div class="col pb-4">
                <form submit="collectFormData">
                <div class="name-bold text-secondary">Kontakta mig som ansvarig mäklare</div>

                <div class="md-form">
                    <label class="name-email-phone">Namn:</label>

                    <input name="name" type="name" title="Skriv ditt för och efternamn" pattern=".{2,}" class="form-control"></div>

                <div class="md-form">
                    <label class="name-email-phone">E-Mail:</label>
                    <input name="email" type="email" class="form-control"></div>
                <div class="md-form">
                    <label class="name-email-phone">Telefon:</label>

                    <input type="tel" id="phone" name="phone" pattern="[0-9]{7,10}" title="Skriv ditt telefonnummer 7-10 siffror" class="form-control"></div>

                <div class="md-form">
                    <label class="name-email-phone">Ditt ärende:</label>
                    <textarea name="subject" type="subject" class="form-control md-textarea" rows="3"></textarea></div>
                <div class="text-center mt-4" >
                    <button type="submit"  class="btn col-12 border button-color" value="Send">Skicka</button>
                </div>           
                </div>
            </div>
            <div class="col"></div>

        <div class="modal fade" id="thanksModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header  alert alert-success"  role="alert">
                <h4 class="modal-title" id="exampleModalLabel">Tack för visat intresse!</h4>
                <button type="button" class="close"  href="/" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>
                <div class="modal-body">
                <p>Ditt meddelande har skickats!<br>
                <p><span class="name-bold broker-name">${this.firstName} ${this.lastName} </span>återkommer snarast till dig via telefon eller email.</p></div>
                <div class="mt-4 modal-footer">
                <a href="/" type="button" class="btn btn-primary float-left"  data-dismiss="modal">Till startsidan!</a>
            </div>
        </div>
        </div>       
      </div>
     `;
    }
    checkViewing() {

        return (/*html*/`
        <div class="relative-wrapper">
        <div class="bg-warning px-2 m-0 shadow mb-5 mt-2 pt-0 rotate text-center" style="width: 300px; right: -15px; z-index:1; position: absolute">
            ${this.viewingsSelection.length === 1 ? '<p class="font-weight-bold mt-1 mb-0">Endast en visning kvar: </p>' + ' ' + this.viewingsSelection.map(viewings => '<p class="mb-0">' + viewings.startDatetime + ' - ' + viewings.endDatetime + '</p>') : '' ||
                this.viewingsSelection.length > 1 ? '<p class="font-weight-bold mt-1 mb-0">Kommande visningar: </p>' + ' ' + this.viewingsSelection.map(viewings => '<p class="mb-0">' + viewings.startDatetime + ' - ' + viewings.endDatetime + '</p>') : ''}   
        </div>
        </div>
        `);
    }
}

