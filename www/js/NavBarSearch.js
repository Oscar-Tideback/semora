class NavBarSearch extends Base {

  async mount() {
    this.foundKeywords = [];
    this.selected = -1;
  }

  // Start of modified Thomas example-autocomplete --------------------------------
  clickKeyword(e) {
    this.foundKeywords = [];
    this.selected = -1;
    this.chosen = e.target.innerText;
    this.search();
    this.render();
  }
  selectWithUpDownArrows(e) {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      this.selected += (e.key === 'ArrowDown') - (e.key === 'ArrowUp');
      if (this.selected < 0) { this.selected = this.foundKeywords.length - 1; }
      if (this.selected >= this.foundKeywords.length) { this.selected = 0; }

      this.render();
      return;
    }
  }
  async searchKeyword(e) {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) { return; }

    if (e.key === 'Enter' && this.selected >= 0) {
      this.chosen = (this.foundKeywords[this.selected] || {}).regionName;
      this.search();
      this.foundKeywords = [];
      this.selected = -1;
      this.render();
      return;
    }
    this.selected = 0;

    this.foundKeywords = e.target.value.length < 1 ? [] : await sql(/*sql*/`SELECT regionName FROM region WHERE region.regionName LIKE $text`, { text: e.target.value + '%' });

    // Dev in progress: Autocomplete region with object count per region. Freetext search in description etc. but only add results to count per region 
    //this.foundKeywords = e.target.value.length < 1 ? [] : await sql(/*sql*/`
    //  SELECT * FROM (SELECT regionName FROM region UNION SELECT description FROM realEstateInfo) WHERE regionName LIKE $text`,
    //  { text: '%' + e.target.value + '%' });

    // console.log(this.foundKeywords);

    this.render();
  }
  // End of modified Thomas example-autocomplete --------------------------------

  // Addition by Thomas
  preventPageReload(e) {
    // Do not perform a hard reload of the page when someone submits the form
    e && e.preventDefault();
  }

  // Addition by Thomas. Unused but keep here anyway as referece
  //search() {
  //  document.querySelector('.nav-bar-search-input').value = this.chosen || '';
  //  app.goto('/buy-property');
  //  app.buyerPage.search(this.chosen);
  //}

  search() {
    app.buyerPage.region = this.chosen;
    app.buyerPage.search();
    app.goto('/buy-property');
  }


  render() {
    return /*html*/`
      <div class="search-in-hero-relative-wrapper pr-4" not-route="/buy-property">
        <form class="navbar-form search-in-hero" action="/buy-property" id="navBarSearch" submit="preventPageReload">
          <div class="input-group">
            <input type="text" class="form-control nav-bar-search-input rounded" placeholder="Snabbsök bostad här..." keyup="searchKeyword" keydown="selectWithUpDownArrows" autocomplete="off" autocorrect="off">
            ${this.foundKeywords.length < 1 ? '' : /*html*/`
              <div class="dropdown-menu show position-absolute">
                  ${this.foundKeywords.map((keywords, index) => /*html*/`
                    <button click="clickKeyword" class="dropdown-item ${this.selected !== index ? '' : 'bg-primary text-light'}" type="button">${keywords.regionName}</button>
                  `)}
              </div>
            `}
            <div class="input-group-btn">
              <button class="btn btn-default pull-right" type="submit"><i class="icofont-search icofont-lg navbar-search-icon"></i></button>
            </div>
          </div>
        </form>
      </div>  
      `

  }

}