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
    //this.sentForm = 'true';
    //this.render();
  }


  render() {
    console.log(this);
    return /*html*/`
    <div class="row m-0 p-4" route="/real-estate-agent/${this.id}" page-title="Dhyr & Rumson - Våra mäklare">  
    <div class="container my-4"> 
      <div class="row">
        <div class="col-12"><h5>Lär känna våra våra mäklare.</h5>
          <p>Kunskap och erfarenhet är tillgångar i alla yrken.</p>
        </div>
      </div>
        <div class="row">                                  
          <div class="col-auto">
              <img src="../images/${this.imageUrl}" class="img-thumbnail rounded float-left" alt="Agent face">
          </div>
            <div class="col-md-3 col-sm-12">
            <p>${this.firstName}
              ${this.lastName}</p>
              <p class="name-email-phone">E-Mail: ${this.email}</p>
              <p class="name-email-phone">Tel: ${this.phone.toString().replace(/\B(?=(\d{3})+(\d{4})+(?!\d))/g, " ")}</p>
              <p class="name-region">Region: ${this.region_names}.</p>
            </div>              
            <!--Form-->
            <form submit="collectFormData" class="col-md-6 col-sm-12">
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
              <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" class="form-control">
            </div>
            <div class="md-form">
              <i class="fas fa-tag prefix grey-text"></i>
              <label>Ditt ärende:</label>
              <textarea name="subject" type="subject" class="form-control md-textarea" rows="3"></textarea>
            </div>
            <div class="text-center mt-4" >
              <button type="submit"  class="btn border btn-light-blue" value="Send">Skicka</button>
            </div>           
          </div>
        </div>           
      </div>
    `;
  }
}