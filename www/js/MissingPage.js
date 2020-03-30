class MissingPage extends Base {

  render() {
    return /*html*/`
      <div class="row m-0 p-0 pt-4" route="404" page-title="Missing page">
        <div class="col-12 p-0">

          <div class="container d-flex justify-content-center">
           <div class="row paragraph-maxwidth">
            <div class="col">
              <p class="section-heading h1 text-center">Could not find that page! 😢</p>
              <p>We are sorry, but we could not find that page.</p>
              <p><a href="/">Click here to goto the start page</a>.</p>
             </div>
            </div>
          </div>

      </div>
    </div>
    `;
  }

}