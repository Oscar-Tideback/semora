class App extends Base {

  async mount() {

    await sql(/*sql*/`USE DhyrRumson.db`);

    this.navBarLinks = [
      { label: 'Köpa bostad', route: '/buy-property' },
      //{ label: 'En bostad', route: '/real-estate-info' },
      { label: 'Sälja bostad', route: '/our-regions' },
      { label: 'Våra mäklare', route: '/real-estate-agents' },
      { label: 'Bostad info', route: '/real-estate-info/8' },
      { label: 'Om oss', route: '/about-us' },
    ];

    this.navBar = new NavBar({ links: this.navBarLinks });
    this.navBarSearch = new NavBarSearch();
    this.heroSection = new HeroSection();
    this.footer = new Footer();
    this.startPage = new StartPage();
    this.buyerPage = new BuyerPage({ searchResult: [] });
    this.buyerPageSearch = new BuyerPageSearch({ region: '', maxKvm: '', minKvm: '' });
    this.contactPage = new ContactPage();
    this.agentsPage = new AgentsPage();
    this.mapsPage = new MapsPage();
    this.aboutUsPage = new AboutUsPage();
    this.missingPage = new MissingPage();
    this.integrityPage = new IntegrityPage();
    this.agentPage = new AgentPage({ targetBrokerId: '21' });
    this.objectPage = new ObjectPage();

    // SQL query must result in 20 objects with unique id. No duplicates!
    this.allObjectPages = await sql(ObjectPage, /*sql*/`
      SELECT * FROM 
        realEstateInfo, 
        userXregion ON realEstateInfo.userId = userXregion.userId, 
        region ON region.id = userXregion.regionId,
        realEstateAddress ON realEstateAddress.realEstateId = realEstateInfo.Id,
        areaInfo ON areaInfo.id = realEstateInfo.areaInfoId
    `);

  }

  render() {
    return /*html*/`
      <div class="container main-wrapper pl-0 pr-0" base-title="Dhyr & Rumson: ">
        <header>
          ${this.heroSection}
          ${this.navBar}
          <!-- Keep navBarSearch after navBar -->
          ${this.navBarSearch}
        </header>
        <main>
          ${this.startPage}
          ${this.buyerPageSearch}
          ${this.buyerPage} 
          ${this.contactPage}
          ${this.agentsPage}
          ${this.allObjectPages}
          ${this.mapsPage}
          ${this.aboutUsPage}
          ${this.missingPage}
          ${this.testPage}
          ${this.agentPage}
          ${this.integrityPage}
        </main>
        ${this.footer}
      </div>
    `;
  }

}