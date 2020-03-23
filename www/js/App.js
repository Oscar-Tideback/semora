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
    SELECT * FROM 
        realEstateInfo,
        user ON user.id = realEstateInfo.brokerId,
        userXregion ON realEstateInfo.userId = userXregion.userId, 
        region ON region.id = userXregion.regionId,
        realEstateAddress ON realEstateAddress.realEstateId = realEstateInfo.Id,
        areaInfo ON areaInfo.id = realEstateInfo.areaInfoId,  
        viewings ON viewings.realEstateId = realEstateInfo.Id
              
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
      { label: 'Sälja bostad', route: '/our-regions' },
      { label: 'Våra mäklare', route: '/real-estate-agents' },
      { label: 'Bostad info', route: '/real-estate-info/8' },
      { label: 'Om oss', route: '/about-us' },
      { label: 'Rikards testsida', route: '/testpage' }
    ];

    this.navBar = new NavBar({ links: this.navBarLinks });
    this.navBarSearch = new NavBarSearch();
    this.heroSection = new HeroSection();
    this.footer = new Footer();
    this.startPage = new StartPage();
    this.buyerPage = new BuyerPage({ searchResult: [] });
    this.buyerPageSearch = new BuyerPageSearch({ region: '', maxKvm: '', minKvm: '' });
    this.contactPage = new ContactPage();
    this.mapsPage = new MapsPage();
    this.aboutUsPage = new AboutUsPage();
    this.missingPage = new MissingPage();
    this.integrityPage = new IntegrityPage();
    this.agentsPage = new AgentsPage();
    this.objectPage = new ObjectPage();

    this.buyerPageRikard = new BuyerPageRikard({ searchResult: [] });
    this.buyerPageSearchRikard = new BuyerPageSearchRikard({ textInput: '', region: '' });

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

          <!-- For testing -->
          ${this.buyerPageSearchRikard} 
          ${this.buyerPageRikard} 
  
          ${this.contactPage}    
          ${this.agentsPage}
          ${this.allAgentsPage}
          ${this.allObjectPages}
          ${this.mapsPage}
          ${this.aboutUsPage}
          ${this.missingPage}
          ${this.integrityPage}
        </main>
        ${this.footer}
      </div>
    `;
  }

}