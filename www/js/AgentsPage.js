class AgentsPage extends Base {

  async mount() {

    // This sql question is not right at all.
    this.foundAgents = await sql(/*sql*/`
    SELECT user.firstName,  user.lastName,
    user.phone, user.email, user.description, user.imageUrl,
    GROUP_CONCAT(region.regionName,', ') region_names
    FROM userXregion 
    INNER JOIN user ON user.id = userXregion.userId, 
    region ON region.id = userXregion.regionId
    WHERE user.isAgent = 'true'
    GROUP BY user.id
    `);


  }
  refreshBroker(e) {
    app.agentPage.targetBrokerId = e.target.attributes.targetbrokerid.value;
    app.agentPage.makeSql();
  }

  render() {
    return /*html*/`
      <div class="row m-0" route="/real-estate-agents" page-title="Dhyr & Rumson - Våra mäklare">  
        <div class="container my-4"> 
              <div class="row p-4">
                <div class="col-12"><h5></h5>
                  <p>Kunskap och erfarenhet är tillgångar i alla yrken.</p>
                  <p>Till Dhyr & Rumson har vi därför handplockat endast dom som heter son i efternamn och de skickligaste och mest erfarna mäklarna i Stockholm.
                  Vi har gjort det av en enda anledning för att dom HETER SON i efternamn alltid – så att rätt person kan företräda dig i din kanske största affär.</p>
              <div class="row p-3 border bg-light no-gutters">
                ${this.foundAgents.map(user => /*html*/`
                  <div class="card col-sm-2" style="max-width: 540px;" >
                    <a href="/real-estate-agent" click="refreshBroker" targetbrokerid="${user.id}">
                    <img src="images/${user.imageUrl}" targetbrokerid="${user.id}" style="max-width: 250px;" class="img-fluid card-img p-2" alt="Agent face ${user.lastName}"></a>
                  </div>
                  <div class="card-body col-sm-4 p-3">
                    <a href="/real-estate-agent" click="refreshBroker" targetbrokerid="${user.id}">
                    ${user.firstName}` + ' ' + /*html*/`
                    ${user.lastName}</a><p>                  
                    ${user.email}<br>
                    ${user.phone}</p>
                    ${user.region_names}<br>
                  </div >
                `)}
                </div>              
              </div>
            </div>  
          </div>
        </div>
      </div>   
    `;
  }
}