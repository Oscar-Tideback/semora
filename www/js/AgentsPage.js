class AgentsPage extends Base {

  async mount() {

    //pop agents
    this.regionSelection = await sql(/*sql*/`
    SELECT * FROM region`);

    this.foundAgents = await sql(/*sql*/`
    SELECT user.firstName,  user.lastName, user.id,
    user.phone, user.email, user.description, user.imageUrl,
    GROUP_CONCAT(region.regionName,', ') region_names
    FROM userXregion 
    INNER JOIN user ON user.id = userXregion.userId, 
    region ON region.id = userXregion.regionId
    WHERE user.isAgent = 'true'
    GROUP BY user.id
    `);
  }
  async searchAgents() {
    this.foundAgents = await sql(/*sql*/`
    SELECT user.firstName,  user.lastName, user.id,
    user.phone, user.email, user.description, user.imageUrl,
    GROUP_CONCAT(region.regionName,', ') region_names
    FROM userXregion 
    INNER JOIN user ON user.id = userXregion.userId, 
    region ON region.id = userXregion.regionId
    AND region.regionName = ${this.region.regionName}
    WHERE user.isAgent = 'true'
    GROUP BY user.id
    `);
    this.render();
  }



  render() {
    console.log(this.foundAgents);
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
                  <div class="card mb-3 col-lg-2" >
                    <a href="/real-estate-agent/${user.id}">
                    <img src="images/${user.imageUrl}" targetbrokerid="${user.id}" class="card-img p-2" alt="Agent face ${user.lastName}"></a>
                  </div>
                  <div class="card-body col-lg-4 p-3" style="white-space: nowrap">
                  <div class="card-title">
                    <a href="/real-estate-agent/${user.id}">
                    ${user.firstName}
                    ${user.lastName}</a>   
                  </div>             
                  
                    <p class="card-text name-email-phone">E-Mail: ${user.email}</p>
                    <p class="card-text name-email-phone">Tel: ${user.phone.toString().replace(/\B(?=(\d{3})+(\d{4})+(?!\d))/g, " ")}</p>
                    <p class="card-text name-region">Region: ${user.region_names}.</p>
                </div >
                `)}
                </div>              
            </div>
           </div>  
        </div>
      </div>
  `;
  }

}