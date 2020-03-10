class AgentsPage extends Base {

  async mount() {
    this.test = ['1', '20', '21'];
    this.foundAgents = await sql(/*sql*/`
      SELECT id, firstName, lastName, email, imageUrl, phone 
      FROM user
      WHERE isAgent = "true"
    `);


  }
  targetBroker(e) {
    app.agentPage.targetBrokerId = e.target.attributes.brokerid.value;
  }

  render() {
    return /*html*/`
      <div class="row m-0" route="/real-estate-agents" page-title="Dhyr & Rumson - Våra mäklare">  
        <div class="container my-4"> 
          <div class="row">
          
            <div class="col-12">    
              <div class="row">
                <div class="col-8"><h5>Lär känna våra våra mäklare.</h5>
                <p>Kunskap och erfarenhet är tillgångar i alla yrken.</p>
                <p>Till Dhyr & Rumson har vi därför handplockat endast dom som heter son i efternamn och de skickligaste och mest erfarna mäklarna i Stockholm.
                Vi har gjort det av en enda anledning – så att rätt person kan företräda dig i din kanske största affär.</p>
                </div>
              </div>
              <div class="row">
                ${this.foundAgents.map(user => /*html*/`
                <div class="col-2"><a href="/real-estate-agent" click="targetBroker" brokerid="${user.id}"><img src="images/${user.imageUrl}"  class="img-fluid img-thumbnail" alt="Agent face"></a></div>
                <div class="col-4"><p>${user.firstName}` + ' ' + `${user.lastName}</p></a><p>${user.email}</p><p>${user.phone}</p></div>`)}</div>              
                </div>
                <div class="row">
                <div class="col-12">
                  <p><a href="/real-estate-agent" click="targetBroker" brokerid="${this.test[0]}">test</a></p>
                  <p><a href="/real-estate-agent" click="targetBroker" brokerid="${this.test[1]}">test</a></p>
                  <p><a href="/real-estate-agent" click="targetBroker" brokerid="${this.test[2]}">test</a></p>
                </div>
                </div>
                

              </div>
              
            </div>
          </div>
        </div>
      </div>
    `;
  }
}