class AgentsPage extends Base {

  async mount() {
    this.foundAgents = await sql(/*sql*/`
      SELECT Id, firstName, lastName, email, imageUrl 
      FROM user
      WHERE isAgent = "true"
    `);
  }


  render() {
    return /*html*/`
      <div class="row m-0" route="/real-estate-agents" page-title="Dhyr & Rumson - Våra mäklare">  
        <div class="container my-4"> 
          <div class="row">
            <div class="col-12">   
              <!-- this.foundAgents.filter(user => user.id  % 2).map(); -->   
              <div class="row">
                <div class="col-8"><h5>Lär känna våra våra mäklare.</h5>
                <p>Kunskap och erfarenhet är tillgångar i alla yrken.</p>
                <p>Till Dhyr & Rumson har vi därför handplockat endast dom som heter son i efternamn och de skickligaste och mest erfarna mäklarna i Stockholm.
                Vi har gjort det av en enda anledning – så att rätt person kan företräda dig i din kanske största affär.</p>
                </div>
              </div>
              <div class="row">
                ${this.foundAgents.map(user => /*html*/`
                <div class="col-2"><img src="images/${user.imageUrl}"  class="img-fluid img-thumbnail" alt="Agent face"></div>
                <div class="col-4"><p>${user.firstName}` + ' ' + `${user.lastName}son</p><p>${user.email}</p></div>`)} </div>              
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}