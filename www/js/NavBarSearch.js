class NavBarSearch extends Base {

  render() {
    return /*html*/`
      <div style="position: relative">
        <form class="navbar-form search-in-hero" action="/" id="navBarSearch">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Sök här...">
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