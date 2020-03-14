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
      VALUES($name, $email, $phone, $subject, ${app.agentPage.targetBrokerId});
    `, data);
    this.sentForm = 'true';
    this.render();
  }

  async makeSql() {

    this.foundAgents = await sql(/*sql*/`
    SELECT user.firstName,  user.lastName,
    user.phone, user.email, user.description, user.imageUrl,
    GROUP_CONCAT(region.regionName,', ') region_names
    FROM user, userXregion 
    ON user.id = userXregion.userId, 
    region ON region.id = userXregion.regionId
    WHERE user.isAgent = 'true'
    AND user.id = ${app.agentPage.targetBrokerId}
  `);
    this.render();
  }

  async mount() {
    return this.makeSql();
  }

  render() {
    return /*html*/`
      <div class="row m-0 p-4" route="/real-estate-agent" page-title="Dhyr & Rumson - Våra mäklare">  
        <div class="container my-4"> 
          <div class="row">
              <div class="col-12"><h5>Lär känna våra våra mäklare.</h5>
                <p>Kunskap och erfarenhet är tillgångar i alla yrken.</p>
              </div>
            </div>
                <div class="row">               
                    ${this.foundAgents.map(user => /*html*/`
                      <div class="col-3">
                        <img src="images/${user.imageUrl}" style="max-width: 240px;" class="img-fluid img-thumbnail rounded float-left" alt="Agent face"></div>
                      <div class="col-3"><p>
                        ${user.firstName}` + ' ' + `${user.lastName}</p><p>
                        ${user.email}</p><p>
                        ${user.phone}</p>
                        ${user.region_names}</p>
                        </div>
                    `)}
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