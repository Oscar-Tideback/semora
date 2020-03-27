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

    this.foundAgents = await sql(/*sql*/`
      SELECT user.firstName,  user.lastName, user.id,
      user.phone, user.email, user.description, user.imageUrl,
      GROUP_CONCAT(region.regionName,', ') region_names
      FROM userXregion 
      INNER JOIN user ON user.id = userXregion.userId, 
      region ON region.id = userXregion.regionId
      WHERE user.isAgent = 'true'
      ${this.selectedRegion > 0 ? ('AND userXregion.regionId = ' + this.selectedRegion) : ''}
      GROUP BY user.id
    `);
    this.render();

  }

  render() {
    return /*html*/`
      <div class="row m-0" route="/real-estate-agents" page-title="Dhyr & Rumson - Våra mäklare">
        <div class="col-12 m-1 p-2">

          <div class="row m-0">
            <div class="col-12 m-0 p-2"><h4>
              Lär känna våra mäklare</h4>
              <p>Kunskap och erfarenhet är tillgångar i alla yrken.<br>
              Till Dhyr & Rumson har vi därför handplockat endast de skickligaste och mest erfarna mäklarna i Stockholm.<br>
              Vi har gjort det av en enda anledning – så att rätt person kan företräda dig i din kanske största affär.</p>
                <div class="row">
                <div class="col-12">
                    <p  class="text-black-50 mb-0 pl-1">Visa mäklare per region: </p>
                  <form>
                    <select class="form-control form-control-lg" change="searchAgentRegions" id="region_select" name="regionselect">
                    <option value="0">Alla regioner</option>
                    ${this.regionSelection.map(region => '<option value="' + region.id + '" ' + (this.selectedRegion > 0 && region.id === this.selectedRegion ? 'selected' : '') + '>' + region.regionName + '</option>')}
                    </select>
                  </form>
                  </div>
                </div>
              <div class="row p-3 no-gutter">            
                ${this.foundAgents.map(user => /*html*/`
                  <div class="mb-3 pl-3 col-lg-2 col-md-2 col-sm-3 p-md-0 p-sm-0 m-sm-0" >
                    <a href="/real-estate-agent/${user.id}">
                    <div>
                    <img src="images/${user.imageUrl}" targetbrokerid="${user.id}"  class="img-fluid d-flex p-1 border rounded" alt="Agent face ${user.lastName}"></a>
                    </div>
                  </div>
                  <div class="card-body col-sm-9 col-md-4 col-lg-4 p-0 mt-2 mt-md-0 ml-0 m-0 p-lg-3 pl-0 p-sm-0 p-md-0">
                    <div class="card-title name-nopad ml-2">
                      <a href="/real-estate-agent/${user.id}">
                      <p class="name-bold name-nopad">${user.firstName} ${user.lastName}</p></a>   
                    </div>
                    <div class="card-text pt-1  ml-2">            
                      <p class="card-text broker-info  name-email-phone"><span class="name-bold">E-Mail:</span>  ${user.email}</p>
                      <p class="card-text broker-info  name-email-phone"><span class="name-bold">Tel:</span>  ${user.phone.toString().replace(/\B(?=(\d{3})+(\d{4})+(?!\d))/g, " ")}</p>
                      <p class="card-text broker-info  name-region pb-5"><span class="name-bold">Region:</span> ${user.region_names}.</p>
                      
                    </div>
                  </div>                
                `)}
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
  }

}