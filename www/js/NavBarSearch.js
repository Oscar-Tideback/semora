class NavBarSearch extends Base {

  mount() {
    this.selected = -1;
    this.keyword = '';
    this.isSearching = false;

    // Click anywhere hides dropdown. Try add preexisting click event on <body> instead? Test later...
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
    // Maybe try a query on event target instead later and try avoid undefined or giving multiple elements duplicate id's
    this.doSearch(e.target.id);
  }

  selectWithUpDownArrows(e) {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      this.selected += (e.key === 'ArrowDown') - (e.key === 'ArrowUp');
      // Have inserted an extra non-search generated <button> under <select> so length has to be +1
      if (this.selected < 0) { this.selected = (this.searchHits.length + 1) - 1; }
      if (this.selected >= (this.searchHits.length + 1)) { this.selected = 0; }

      this.render();
    }
  }

  async searchKeyword(e) {
    if (['ArrowUp', 'ArrowDown'].includes(e.key) || document.querySelector('[id="navBarTextInput"]').value.length < 2 || this.isSearching) return;
    if (e.key === 'Enter' && this.selected >= 0) {
      // Minus 1. Ugly adjust for +1 extra <button> under <select>
      //console.log((this.selected - 1) < 0 ? 0 : this.searchHits[this.selected - 1].regionId);
      this.doSearch((this.selected - 1) < 0 ? 0 : this.searchHits[this.selected - 1].regionId);
      this.searchHits = [];
      this.selected = -1;
      return;
    }

    this.isSearching = true;

    this.selected = 0;
    this.searchHits = e.target.value.length < 1 ? [] : await sql(/*sql*/`
        SELECT regionId, regionName, COUNT(regionName) AS totalHits FROM
            (
            SELECT * FROM 
                realEstateInfo, 
                userXregion ON realEstateInfo.userId = userXregion.userId, 
                region ON region.id = userXregion.regionId,
                realEstateAddress ON realEstateAddress.realEstateId = realEstateInfo.Id,
                areaInfo ON areaInfo.id = realEstateInfo.areaInfoId
            WHERE realEstateInfo.tenure LIKE $text
            OR realEstateAddress.streetName LIKE $text
            OR region.regionName LIKE $text
            OR CASE 
              WHEN LENGTH($text) > 3 THEN (
                areaInfo.description LIKE $text
                OR realEstateInfo.description LIKE $text
                )
            END
            GROUP BY realEstateInfo.Id
            )
        GROUP BY regionName
        ORDER BY totalHits DESC, regionName ASC`
      , { text: '%' + e.target.value + '%' });

    this.currentKeyword = e.target.value;

    this.render();

    this.isSearching = false;
  }
  // -------------------------- End of slightly modified Thomas example-autocomplete --------------------------


  // Addition by Thomas
  preventPageReload(e) {
    // Do not perform a hard reload of the page when someone submits the form
    e && e.preventDefault();
  }


  async doSearch(region) {
    // Set properties for buyerPageSearch then call buyerPageSearch.doSearch()
    app.buyerPageSearch.formStoredValues.textinput = await document.querySelector('[id="navBarTextInput"]').value.length > 0 ? document.querySelector('[id="navBarTextInput"]').value : '';
    app.buyerPageSearch.formStoredValues.region = parseInt(region);
    // Populate search results otherwise default search will be made
    app.buyerPageSearch.doSearch();
    app.goto('/buy-property');
  }


  render() {
    return /*html*/`
      <div not-route="/testpage">
      <div not-route="/real-estate-agents">
      <div not-route="/real-estate-agent">
      <div not-route="/buy-property">
      <div not-route="/our-regions">
      <!-- Wrappers above. Ugly fix for multiple not-route's -->

        <div class="search-in-hero-relative-wrapper">
          <form class="navbar-form search-in-hero" action="/buy-property" id="navBarSearch" submit="preventPageReload">
            <div class="input-group">
              <input type="text" class="form-control nav-bar-search-input rounded form-control-lg" id="navBarTextInput" placeholder="Snabbsök bland bostäder här..." keyup="searchKeyword" keyup="searchKeyword" keydown="selectWithUpDownArrows" autocomplete="off" autocorrect="off">
              ${this.searchHits.length < 1 ? '' : /*html*/`
                <div class="dropdown-menu show position-absolute" id="dropdown-menu">
                  ${this.searchHits.map((hits, index) => /*html*/`
                    <!-- Insert top button only once -->
                    ${(index < 1 ? '<button click="clickKeyword" class="dropdown-item ' + (this.selected !== index ? '' : 'bg-secondary text-light') + '" type="button" id="0"><b id="0">Antal träffar på "' + this.currentKeyword + '" per region</b></button>' : '')}
                    <button click="clickKeyword" class="dropdown-item ${this.selected !== (index + 1) ? '' : 'bg-secondary text-light'}" type="button" id="${hits.regionId}">
                      <div class="row" id="${hits.regionId}">
                        <div class="col" id="${hits.regionId}">${hits.regionName}</div>
                        <div class="col-auto" id="${hits.regionId}"><b id="${hits.regionId}">${hits.totalHits} träff${hits.totalHits > 1 ? 'ar' : ''}</b></div>
                      </div>
                    </button>
                  `)}
                </div>
              `} 
              <button class="invisible p-0 m-0" type="submit"></button>
            </div>
          </form>
        </div> 
  
      <!-- Wrappers below. Ugly fix multiple not-route's -->
      </div>
      </div>
      </div>
      </div>
      </div>
      `
  }

}