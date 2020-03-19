class NavBarSearch extends Base {

  async mount() {
    this.searchHits = [];
    this.selected = -1;
    this.keyword = '';
  }

  // Start of slightly modified Thomas example-autocomplete --------------------------------
  clickKeyword(e) {
    this.searchHits = [];
    this.selected = -1;
    this.chosen = e.target.innerText;
    //this.doSearch();
    this.render();
  }
  selectWithUpDownArrows(e) {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      this.selected += (e.key === 'ArrowDown') - (e.key === 'ArrowUp');
      if (this.selected < 0) { this.selected = this.searchHits.length - 1; }
      if (this.selected >= this.searchHits.length) { this.selected = 0; }

      this.render();
      return;
    }
  }
  async searchKeyword(e) {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) { return; }

    if (e.key === 'Enter' && this.selected >= 0) {
      this.chosen = (this.searchHits[this.selected] || {}).regionName;
      //this.search();
      this.searchHits = [];
      this.selected = -1;
      this.render();
      return;
    }
    this.selected = 0;
    this.searchHits = e.target.value.length < 1 ? [] : await sql(/*sql*/`
      SELECT regionName, COUNT(regionName) AS totalHits FROM
          (
          SELECT * FROM 
              realEstateInfo, 
              userXregion ON realEstateInfo.userId = userXregion.userId, 
              region ON region.id = userXregion.regionId,
              realEstateAddress ON realEstateAddress.realEstateId = realEstateInfo.Id,
              areaInfo ON areaInfo.id = realEstateInfo.areaInfoId
          WHERE realEstateInfo.description LIKE $text
          OR realEstateInfo.tenure LIKE $text
          OR realEstateAddress.streetName LIKE $text
          OR region.regionName LIKE $text
          OR areaInfo.description LIKE $text
          GROUP BY realEstateInfo.Id
          )
      GROUP BY regionName
      ORDER BY totalHits DESC`
      , { text: '%' + e.target.value + '%' });

    this.currentKeyword = e.target.value;
    // console.log(this.searchHits);

    this.render();
  }
  // End of slightly modified Thomas example-autocomplete --------------------------------

  // Addition by Thomas
  preventPageReload(e) {
    // Do not perform a hard reload of the page when someone submits the form
    e && e.preventDefault();
  }

  // Addition by Thomas. Unused but keep here anyway as referece
  search() {
    //  document.querySelector('.nav-bar-search-input').value = this.chosen || '';
    //  app.goto('/buy-property');
    //  app.buyerPage.search(this.chosen);
  }

  // Not implemented yet
  doSearch() {
    //app.buyerPage.region = this.chosen;
    //app.buyerPage.search();
    //app.goto('/buy-property');
  }


  render() {
    return /*html*/`
      <div class="search-in-hero-relative-wrapper pr-4" not-route="/buy-property">
        <form class="navbar-form search-in-hero" action="/buy-property" id="navBarSearch" submit="preventPageReload">
          <div class="input-group">
            <input type="text" class="form-control nav-bar-search-input rounded" placeholder="Snabbsök bostad här..." keyup="searchKeyword" keydown="selectWithUpDownArrows" autocomplete="off" autocorrect="off">
            ${this.searchHits.length < 1 ? '' : /*html*/`
              <div class="dropdown-menu show position-absolute">
                <div class="search-in-hero-item dropdown-item"><b>Antal 123 träffar på ${'"' + this.currentKeyword + '"'} per region</b></div>
                ${this.searchHits.map((hits, index) => /*html*/`
                  <button click="clickKeyword" class="dropdown-item ${this.selected !== index ? '' : 'bg-primary text-light'}" type="button">
                    <div class="row">
                      <div class="col">${hits.regionName}</div>
                      <div class="col-auto"><b>${hits.totalHits} träff${hits.totalHits > 1 ? 'ar' : ''}</b></div>
                    </div>
                  </button>
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