class NavBarSearch extends Base {

  mount() {
    this.searchHits = [];
    this.selected = -1;
    this.keyword = '';

    // Clicking anywhere will close dropdown menu
    document.addEventListener("click", function (e) {
      document.querySelector('[id="dropdown-menu"]') ?
        document.querySelector('[id="dropdown-menu"]').setAttribute('style', 'visibility: hidden')
        : '';
    })

  }


  // -------------------------- Start of slightly modified Thomas example-autocomplete --------------------------
  clickKeyword(e) {
    this.searchHits = [];
    this.selected = -1;
    this.doSearch(e.target.parentElement.parentElement.value);
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
      this.doSearch((this.searchHits[this.selected] || {}).regionName);
      this.searchHits = [];
      this.selected = -1;
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
      ORDER BY totalHits DESC, regionName ASC`
      , { text: '%' + e.target.value + '%' });

    this.currentKeyword = e.target.value;

    this.render();
  }
  // -------------------------- End of slightly modified Thomas example-autocomplete --------------------------


  // Addition by Thomas. Do not perform a hard reload of the page when someone submits the form
  preventPageReload(e) {
    e && e.preventDefault();
  }


  // Not implemented yet
  doSearch(region) {
    //app.buyerPageSearch.search();
    //app.goto('/buy-property');
    alert('Gör en sökning på: ' + region);
  }

  render() {
    return /*html*/`
      <div class="search-in-hero-relative-wrapper pr-4" not-route="/buy-property">
        <form class="navbar-form search-in-hero" action="/buy-property" id="navBarSearch" submit="preventPageReload">
          <div class="input-group">
            <input type="text" class="form-control nav-bar-search-input rounded" placeholder="Snabbsök bostad här..." keyup="searchKeyword" keydown="selectWithUpDownArrows" autocomplete="off" autocorrect="off">
            ${this.searchHits.length < 1 ? '' : /*html*/`
              <div class="dropdown-menu show position-absolute" id="dropdown-menu">
                <div class="search-in-hero-item dropdown-item"><b>Antal träffar på ${'"' + this.currentKeyword + '"'} per region</b></div>
                ${this.searchHits.map((hits, index) => /*html*/`
                  <button click="clickKeyword" class="dropdown-item ${this.selected !== index ? '' : 'bg-primary text-light'}" type="button" value="${hits.regionName}">
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