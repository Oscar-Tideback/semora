class AgentPage extends Base {

  async makeSql() {
    //app.agentPage.targetBrokerId = this.targetBrokerId;
    this.foundAgents = await sql(/*sql*/`
    SELECT id, firstName, lastName, email, imageUrl, phone 
    FROM user
    WHERE id = ${app.agentPage.targetBrokerId}
  `);
    this.render();
  }

  async mount() {
    return this.makeSql();
  }

  render() {
    return /*html*/`
      <div class="row m-0" route="/real-estate-agent" page-title="Dhyr & Rumson - Våra mäklare">  
        <div class="cont ainer my-4"> 
          <div class="row">
          
            <div class="col-12">    
              <div class="row">
                <div class="col-12"><h5>Lär känna våra våra mäklare.</h5>
                <p>Kunskap och erfarenhet är tillgångar i alla yrken. Ett testinnehåll... ${this.targetBrokerId} </p>
                
                </div>
              </div>
              <div class="row">
                
                ${this.foundAgents.map(user => /*html*/`
                <div class="col-3"><img src="images/${user.imageUrl}"  class="img-fluid img-thumbnail" alt="Agent face"></div>
                <div class="col-3"><p>${user.firstName}` + ' ' + `${user.lastName}</p><p>${user.email}</p><p>${user.phone}</p></div>`)}</div>              
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}