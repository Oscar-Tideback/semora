class AgentsPage extends Base {

  async mount() {

    this.selectedRegion = 0;

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
    this.render();
  }


  async searchAgentRegions(e) {

    this.selectedRegion = parseInt(e.target.value);
    //console.log('event target ' + e.target.value);

    //let regioID = e.target.value;
    //console.log(this.selectedRegion);
    if (this.selectedRegion === 0) {
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
      this.render();
    }
    else {
      // SQL query returns brokers that have an object to sell and is active in a region
      this.foundAgents = await sql(AgentPage, /*sql*/`
      SELECT user.id, user.firstName,  user.lastName, 
      user.phone, user.email, user.description, user.imageUrl,
      GROUP_CONCAT(region.regionName,', ') region_names
      FROM userXregion 
      INNER JOIN user ON user.id = userXregion.userId, 
      region ON region.id = userXregion.regionId
      WHERE user.isAgent = 'true'
      AND userXregion.regionId = ${this.selectedRegion}
      GROUP BY user.id
       `);
      this.render();
    }



    //$(window).on('popstate', function (event) {
    //  location.reload();
    //});
  }




  render() {
    //console.log(this.foundAgents);
    //console.log('on render' + this.selectedRegion);
    return /*html*/`
      <div class="row m-0" route="/real-estate-agents" page-title="Dhyr & Rumson - Våra mäklare">
        <div class="container my-4">

          <div class="row p-4">
            <div class="col-12"><h5></h5>
              <p>Kunskap och erfarenhet är tillgångar i alla yrken.</p>
              <p>Till Dhyr & Rumson har vi därför handplockat endast dom som heter son i efternamn och de skickligaste och mest erfarna mäklarna i Stockholm.
                  Vi har gjort det av en enda anledning för att dom HETER SON i efternamn alltid – så att rätt person kan företräda dig i din kanske största affär.</p>
              
                  <select class="form-control form-control-lg" change="searchAgentRegions" id="region_select" name="regionselect">
                  <option value="0">Alla regioner</option>
                  ${this.regionSelection.map(region => '<option value="' + region.id + '" ' + (this.selectedRegion > 0 && region.id === this.selectedRegion ? 'selected' : '') + '>' + region.regionName + '</option>')}
                  </select>
              
                  <div class="row p-3 border bg-light no-gutters">
                ${this.foundAgents.map(user => /*html*/`
                  <div class="card mb-3 col-lg-2" >
                    <a href="/real-estate-agent/${user.id}">
                    <img src="images/${user.imageUrl}" targetbrokerid="${user.id}" class="img-thumbnail rounded" alt="Agent face ${user.lastName}"></a>
                  </div>
                  <div class="card-body col-sm-4 col-md-4 col-lg-4 p-3  no-gutters" style="white-space: nowrap">
                  <div class="card-title name-nopad">
                    <a href="/real-estate-agent/${user.id}">
                    <p class="name-nopad">${user.firstName}
                    ${user.lastName}</p></a>   
                  </div>             
                  
                    <p class="card-text broker-info  name-email-phone"><span class="name-bold">E-Mail:</span>  ${user.email}</p>
                    <p class="card-text broker-info  name-email-phone"><span class="name-bold">Tel:</span>  ${user.phone.toString().replace(/\B(?=(\d{3})+(\d{4})+(?!\d))/g, " ")}</p>
                    <p class="card-text broker-info  name-region"><span class="name-bold">Region:</span> ${user.region_names}.</p>
                    <hr class="mb-5">
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