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
            <!--<img src="images/${this.foundAgents[3].imageUrl}" alt="Agent face">-->   
              <div class="col-sm-9">
               ${this.foundAgents.map(user => /*html*/`<div class="col-sm-3"><img src="images/${user.imageUrl}" alt="Agent face"></div>` + '' + /*html*/`<div class="col-sm-6">${user.lastName}</div>`)}             
            </div>
          </div>
        </div>
      </div>
    `;
  }

}