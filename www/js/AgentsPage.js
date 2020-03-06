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
        <div class="col-12">   
          <!-- <img src="images/${this.foundAgents[3].imageUrl}" alt="Agent face">     ` + '' + /*html*/`     -->   
          <div class="row">
            <div class="col-12">Våra mäklare.</div>
          </div>

          ${this.foundAgents.map(user => /*html*/`
          <div class="row">
            <div class="col-6"><img src="images/${user.imageUrl}"  class="img-fluid img-thumbnail" alt="Agent face"></div>
            <div class="col-6"><p>${user.lastName}son?</p></div>
          </div>    
          `)}
        </div>             
      </div>
    `;
  }
  doSomeThing() {

  }

}