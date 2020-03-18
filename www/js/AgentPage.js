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
              <div class="col-3">
                  <img src="../images/${this.imageUrl}" style="max-width: 240px;" class="img-fluid img-thumbnail rounded float-left" alt="Agent face"></div>
                <div class="col-3"><p>
                  ${this.firstName}</p><p>
                  ${this.lastName}</p><p>
                  ${this.email}</p><p>
                  ${this.phone.toString().replace(/(\d)(?=(\d{2})+(?!\d))/g, '$1 ')}</p>
                  ${this.region_names}
                </div>              
                <!--Form-->
                <form submit="collectFormData" class="col-6">
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
                  <input name="phone" type="phone" class="form-control">
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
        </div>
      </div>
    `;
  }
}