class AgentsPage extends Base {

  async mount() {
    await sql(/*sql*/`USE DhyrRumson.db`);
    this.foundAgents = await sql(/*sql*/`
    SELECT firstName, lastName, email, imageUrl FROM user, userType WHERE user.id = userType.userId AND isAgent = "true"
    `);
  }

  render() {
    return /*html*/`
      <div class="row" route="/real-estate-agents" page-title="Dhyr & Rumson - Våra mäklare">
        <div class="container">
          <div class="row">
            <div class="col-sm-3">
            <img src="images/${this.foundAgents[0].imageUrl}" alt="Agent face">
            </div>
            <div class="col-sm-6">
              ${this.foundAgents[0].firstName}<br>
              ${this.foundAgents[0].lastName}<br>
              ${this.foundAgents[0].email}
            </div>
          </div>
        </div>
      </div>
    `;
  }

}