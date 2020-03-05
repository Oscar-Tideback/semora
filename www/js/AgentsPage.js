class AgentsPage extends Base {

  async mount() {
    this.agents = [];
    this.foundAgents = await sql(/*sql*/`
      SELECT firstName, lastName, email, imageUrl 
      FROM user, userType 
      WHERE user.id = userType.userId AND isAgent = "true"
    `); 
  }
  render() {
    return /*html*/`
      <div class="row" route="/real-estate-agents" page-title="Dhyr & Rumson - Våra mäklare">
        <div class="container">
          <div class="row">           
            <img src="images/${this.foundAgents[0].imageUrl}" alt="Agent face">    
            <div class="col-sm-3">
              ${this.foundAgents[0].firstName}<br>
              ${this.foundAgents[0].lastName}<br>
              ${this.foundAgents.map(user => /*html*/`<br>  ${user.firstName}` + ' ' + `${user.lastName}`)}<br><br>
            </div>
          </div>
        </div>
      </div>
    `;
  }

}