class AgentsPage extends Base {

  async mount() {
    //this.agents = [];
    this.foundAgents = await sql(/*sql*/`
      SELECT firstName, lastName, email, imageUrl 
      FROM user
      WHERE isAgent = "true"
    `);
  }
  render() {
    return /*html*/`
      <div class="row" route="/real-estate-agents" page-title="Dhyr & Rumson - Våra mäklare">
        <div class="container">
          <div class="row">           
            <!--<img src="images/${this.foundAgents[3].imageUrl}" alt="Agent face">     ` + '' + /*html*/`     -->   
              <div class="col-sm-9">Våra mäklare.
               ${this.foundAgents.map(user => /*html*/`
                <div class="col-3"><img src="images/${user.imageUrl}"  class="img-fluid img-thumbnail" alt="Agent face">
                <div class="col-6">${user.lastName}son?
                </div>
                </div>
              `)}             
            </div>
          </div>
        </div>
      </div>
    `;
  }
  doSomeThing() { 
    
  }

}