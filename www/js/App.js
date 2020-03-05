class App extends Base {

  mount() {
    this.navBarLinks = [
      { label: 'Köpa bostad', route: '/buy-property' },
      { label: 'Sälja bostad', route: '/sell-property' },
      { label: 'Här finns vi', route: '/our-regions' },
      { label: 'Våra mäklare', route: '/real-estate-agents' },
      { label: 'Om oss', route: '/about-us' }
    ];
    this.navBar = new NavBar({ links: this.navBarLinks });
    this.navBarSearch = new NavBarSearch();
    this.footer = new Footer();
    this.startPage = new StartPage();
    this.buyerPage = new BuyerPage();
    this.sellerPage = new SellerPage();
    this.agentsPage = new AgentsPage();
    this.mapsPage = new MapsPage();
    this.aboutUsPage = new AboutUsPage();
    this.missingPage = new MissingPage();
  }

  render() {
    return /*html*/`
      <div base-title="Minimal: ">
        <header>
          ${this.navBar}
          ${this.navBarSearch}
        </header>
        <main class="container my-4">
          ${this.startPage}
          ${this.buyerPage} 
          ${this.sellerPage}
          ${this.agentsPage}
          ${this.mapsPage}
          ${this.aboutUsPage}
          ${this.missingPage}
        </main>
        ${this.footer}
      </div>
    `;
  }

}