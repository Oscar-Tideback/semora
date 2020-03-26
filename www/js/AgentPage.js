class AgentPage extends Base {


  async collectFormData(e) {
    // Loop through the form and collect the input
    let data = {};
    for (let element of [...e.target.closest('form').elements]) {
      if (!element.name) { continue; }
      data[element.name] = element.value;
    }
    //send data sql;
    e.preventDefault();
    await sql(/*sql*/`
      INSERT INTO potentialCustomer (name, email, phone, subject, agentContact) 
      VALUES($name, $email, $phone, $subject, ${this.id});
    `, data);

    $('#thanksModal').modal('toggle');
  }





  render() {
    //console.log(this);
    return /*html*/`
    <div class="row m-0 p-4" route="/real-estate-agent/${this.id}" page-title="Dhyr & Rumson - Våra mäklare">  
    <div class="container"> 
      <div class="row">
        <div class="col-12">
        <p class="name-bold broker-name">Lär känna, ${this.firstName} ${this.lastName}.</p>  
        <p>${this.description}</p>
        </div>
      </div>
        <div class="row bg-warning ">
        


          <div class="col-lg-6 bg-info ">
              <img src="../images/${this.imageUrl}" class="img-thumbnail rounded float-bottom" alt="Agent face">
              <p class="broker-name name-email-phone"><span class="name-bold">E-Mail:</span> ${this.email}</p>
              <p class="broker-name name-email-phone"><span class="name-bold">Tel:</span>  ${this.phone.toString().replace(/\B(?=(\d{3})+(\d{4})+(?!\d))/g, " ")}</p>
              <p class="broker-name name-region"><span class="name-bold">Region:</span> ${this.region_names}.</p>
          </div>
            <div class="col-lg-6 col-md-12 col-sm-12">
            
              
                         
            <!--Form-->
            <div class="col-12 bg-danger ">
            <form submit="collectFormData" class="col-lg-12 col-md-12 col-sm-12">
            <div class="name-bold text-center">Kontakta mig.</div>
            <div class="md-form">
              <i class="fas fa-user prefix grey-text"></i>
              <label>Namn:</label>
              <input name="name" type="name" class="form-control">         
            </div>
            <div class="md-form">
              <i class="fas fa-envelope prefix grey-text"></i>
              <label>E-Mail:</label>
              <input name="email" type="email" class="form-control">
            </div>
            <div class="md-form">
              <i class="fas fa-envelope prefix grey-text"></i>
              <label>Telefon:</label>
              <input type="tel" id="phone" name="phone" pattern="[0-9]{7,10}" class="form-control">
            </div>
            <div class="md-form">
              <i class="fas fa-tag prefix grey-text"></i>
              <label>Ditt ärende:</label>
              <textarea name="subject" type="subject" class="form-control md-textarea" rows="3"></textarea>
            </div>
            <div class="text-center mt-4" >
              <button type="submit"  class="btn col-12 border btn-light-blue" value="Send">Skicka</button>
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