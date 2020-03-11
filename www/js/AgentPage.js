class AgentPage extends Base {

  async makeSql() {
    //De bubblar upp/fram?
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
      <div class="row m-0 p-4" route="/real-estate-agent" page-title="Dhyr & Rumson - Våra mäklare">  
        <div class="container my-4"> 
          <div class="row">
                <div class="col-12"><h5>Lär känna våra våra mäklare.</h5>
                <p>Kunskap och erfarenhet är tillgångar i alla yrken.</p>
                
                </div>
              </div>
              <div class="row">               
                ${this.foundAgents.map(user => /*html*/`
                <div class="col-2"><img src="images/${user.imageUrl}" style="max-width: 130px;" class="img-fluid img-thumbnail rounded float-left" alt="Agent face"></div>
                <div class="col-6"><p>${user.firstName}` + ' ' + `${user.lastName}</p><p>${user.email}</p><p>${user.phone}</p></div>`)}</div>              
              </div>
              </div>
            </div>
        </div>
      </div>
    `;
  }
}