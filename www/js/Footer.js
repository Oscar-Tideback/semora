class Footer extends Base {

  render() {
    return /*html*/`
      <footer class="footer p-4 footer-margin-top">

        <div class="relative-wrapper">
          <div class="footer-badge text-center">
            <img src="/images/Footer_badge.png" alt="...">
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-sm mt-5 text-center text-nowrap text-dark">
            <p>Följ oss på: </p>
            <a href="http://www.twitter.com"><img src="../images/icon/twitter.png"></a>
            <a href="http://www.facebook.com"><img src="../images/icon/facebook.png"></a>
            <a href="http://www.instagram.com"><img src="../images/icon/instagram.png"></a>
            <a href="http://www.linkedin.com"><img src="../images/icon/linkedin.png"></a>
          </div>
          <div class="col-12 col-sm mt-4 mt-sm-5 mt-md-5 mt-lg-5 text-center text-nowrap text-dark">
            <p><a href="/sell-property">Kontakta oss</a></p>
            <p><a href="/integrity">Integritetspolicy</a></p>
          </div>

        </div>
      </footer>
    `;
  }

}