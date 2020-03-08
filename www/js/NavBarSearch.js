class NavBarSearch extends Base {

  async mount() {
    this.foundKeywords = [];
    this.selected = -1;
    await sql(/*sql*/`USE DhyrRumson.db`);
  }

  // Start of modified Thomas example-autocomplete
  clickKeyword(e) {
    this.foundKeywords = [];
    this.selected = -1;
    this.chosen = e.target.innerText;

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
      this.chosen = this.foundKeywords[this.selected].regionName;
      this.foundKeywords = [];
      this.selected = -1;

      this.render();
      return;
    }

    this.selected = 0;

    // Autocomplete region
    this.foundKeywords = e.target.value.length < 1 ? [] : await sql(/*sql*/`SELECT regionName FROM region WHERE region.regionName LIKE $text`, { text: e.target.value + '%' });

    // Dev in progress: Autocomplete region with object count per region. Freetext search in description etc. but only add results to count per region 
    //this.foundKeywords = e.target.value.length < 1 ? [] : await sql(/*sql*/`
    //  SELECT * FROM (SELECT regionName FROM region UNION SELECT description FROM realEstateInfo) WHERE regionName LIKE $text`,
    //  { text: '%' + e.target.value + '%' });

    // console.log(this.foundKeywords);

    this.render();
  }
  // End of modified Thomas example-autocomplete


  render() {

    return /*html*/`
      <div class="search-in-hero-holder pr-4">
        <form class="navbar-form search-in-hero" action="/" id="navBarSearch">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Snabbsök bostad här..." keyup="searchKeyword" keydown="selectWithUpDownArrows" autocomplete="off" autocorrect="off">
            ${this.foundKeywords.length < 1 ? '' : /*html*/`
              <div class="dropdown-menu show position-absolute">
                  ${this.foundKeywords.map((keywords, index) => /*html*/`
                    <button click="clickKeyword" class="dropdown-item ${this.selected !== index ? '' : 'bg-primary text-light'}" type="button">${keywords.regionName}</button>
                  `)}
              </div>
            `}
            <div class="input-group-btn">
              <button class="btn btn-default pull-right" type="submit">
                <i class="icofont-search icofont-lg navbar-search-icon"></i>
              </button>
            </div>
          </div>
        </form>
      </div>  
      `

  }

}