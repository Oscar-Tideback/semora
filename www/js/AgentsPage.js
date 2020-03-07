class AgentsPage extends Base {

  async mount() {
    //this.agents = [];
    this.foundAgents = await sql(/*sql*/`
      SELECT Id, firstName, lastName, email, imageUrl 
      FROM user
      WHERE isAgent = "true"
    `);
  }


  
  render() {
    return /*html*/`
      <div class="row" route="/real-estate-agents" page-title="Dhyr & Rumson - Våra mäklare">   
        <div class="col-12">   
          <!-- <img src="images/${this.foundAgents[3].imageUrl}" alt="Agent face">     ` + '' + /*html*/`       this.foundAgents.filter(user => user.id  % 2).map(); -->   
          <div class="row">
            <div class="col-12"><p>Våra mäklare.</p></div>
          </div>

          ${this.foundAgents.map(user => /*html*/`
          <div class="row">
            <div class="col-2"><img src="images/${user.imageUrl}"  class="img-fluid img-thumbnail" alt="Agent face"></div>
            <div class="col-10"><p>${user.lastName}son?</p></div>
          </div>    
          `)}
        </div>             
      </div>
    `;
  }
  doSomeThing() {

  }

}