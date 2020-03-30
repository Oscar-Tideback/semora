class App extends Base {


  regExPhoneNumber(phoneNumber) {
    return phoneNumber.toString().replace(/\B(?=(\d{3})+(\d{4})+(?!\d))/g, " ");
  }

  regExPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  async mount() {

    await sql(/*sql*/`USE DhyrRumson.db`);

    // SQL query must result in 20 objects with unique id for unique routes. No duplicates!
    this.allObjectPages = await sql(ObjectPage, /*sql*/`
      SELECT *, realEstateInfo.description AS realDescription, areaInfo.description AS areaDescription FROM 
        realEstateInfo,
        user ON user.id = realEstateInfo.brokerId,
        userXregion ON realEstateInfo.userId = userXregion.userId, 
        region ON region.id = userXregion.regionId,
        realEstateAddress ON realEstateAddress.realEstateId = realEstateInfo.Id,
        areaInfo ON areaInfo.id = realEstateInfo.areaInfoId
      GROUP BY realEstateInfo.Id
    `);

    // SQL query returns brokers that have an object to sell
    this.allAgentsPage = await sql(AgentPage, /*sql*/`
      SELECT user.id, user.firstName,  user.lastName, 
        user.phone, user.email, user.description, user.imageUrl,
        GROUP_CONCAT(region.regionName,', ') region_names
        FROM userXregion 
        INNER JOIN user ON user.id = userXregion.userId, 
        region ON region.id = userXregion.regionId
        WHERE user.isAgent = 'true'
        GROUP BY user.id
    `);

    this.navBarLinks = [
      { label: 'Köpa bostad', route: '/buy-property' },
      { label: 'Sälja bostad', route: '/sell-property' },
      { label: 'Våra mäklare', route: '/real-estate-agents' },
      { label: 'Om oss', route: '/about-us' }
    ];

    this.navBar = new NavBar({ links: this.navBarLinks });
    this.navBarSearch = new NavBarSearch({ searchHits: [] });
    this.heroSection = new HeroSection();
    this.footer = new Footer();
    this.startPage = new StartPage();
    this.sellerPage = new SellerPage();
    this.aboutUsPage = new AboutUsPage();
    this.missingPage = new MissingPage();
    this.integrityPage = new IntegrityPage();
    this.agentsPage = new AgentsPage();

    // Setting buyerPage... stuff here!
    this.buyerPage = new BuyerPage({ searchResult: [], textInput: '', regionName: '' });
    this.buyerPageSearch = new BuyerPageSearch({ formOptions: [], formInput: [], formStoredValues: [], regionSelection: [], });
    this.buyerPageSearch.formInput = new FormData();
    this.buyerPageSearch.popFormOptions();
    this.buyerPageSearch.setInitialFormValues();
  }


  render() {
    return /*html*/`
      <div class="container main-wrapper pl-0 pr-0 shadow-lg" base-title="Dhyr & Rumson: ">
        <header>
          ${this.heroSection}
          ${this.navBar}
          <!-- Keep navBarSearch after navBar! -->
          ${this.navBarSearch}
        </header>
        <main>
          ${this.startPage}
          ${this.buyerPageSearch}
          ${this.buyerPage} 
          ${this.contactPage}    
          ${this.agentsPage}
          ${this.allAgentsPage}
          ${this.allObjectPages}
          ${this.sellerPage}
          ${this.aboutUsPage}
          ${this.missingPage}
          ${this.integrityPage}
        </main>
        ${this.footer}
      </div>
    `;
  }

}