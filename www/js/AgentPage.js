class AgentPage extends Base {

  async mount() {
    //this.viewingsSelection = await sql(/*sql*/`SELECT viewings.startDatetime, viewings.endDatetime FROM viewings
    //WHERE viewings.realEstateId = 1`);

  }
  async collectFormData(e) {
    // Loop through the form and collect the input
    let data = {};
    for (let element of [...e.target.closest('form').elements]) {
      if (!element.name) { continue; }
      data[element.name] = element.value;
    }

    //Send customer message to agent in database
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

    <div class="row m-0 p-0 pt-4" route="/real-estate-agent/${this.id}" page-title="Dhyr & Rumson - Våra mäklare">
    <div class="col-12 m-1 p-2">

      <div class="container d-flex justify-content-center">

        <div class="row paragraph-maxwidth">
          <div class="col">
            <p> 
         <div class="row">
        <div class="col-12">
        <h2 class="name-bold broker-name">Lär känna, ${this.firstName} ${this.lastName}.</h2>  
        <p>${this.description}</p>
        </div>
      </div>
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-12 mt-5">
          <div class=" ml-2">
              <img src="../images/${this.imageUrl}" class="img-fluid rounded border float-bottom" alt="Agent face">
              <p class="mt-1 broker-name"><span class="name-bold">${this.firstName} ${this.lastName}</p>
              <p class="broker-name name-email-phone"><span class="name-bold">E-Mail:</span> ${this.email}</p>
              <p class="broker-name name-email-phone"><span class="name-bold">Tel:</span>  ${app.regExPhoneNumber(this.phone)}</p>
              <p class="broker-name name-region"><span class="name-bold">Region:</span> ${this.region_names}.</p>
          </div>
          </div>
            <div class="col-lg-8 col-md-8 col-sm-12">
                
            <!--Form-->
            <div class="col-12 mt-2">
            <form submit="collectFormData">
            <div class="name-bold text-secondary mt-5">Kontakta mig.</div>
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