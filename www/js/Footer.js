class Footer extends Base {

  render() {
    return /*html*/`
      <footer class="footer p-4">
        <div class="row">

          <div class="col order-2 order-lg-1 text-center text-nowrap text-dark">
            <p>Följ oss på: </p>
            <a href="http://www.twitter.com"><img src="../images/icon/twitter.png"></a>
            <a href="http://www.facebook.com"><img src="../images/icon/facebook.png"></a>
            <a href="http://www.instagram.com"><img src="../images/icon/instagram.png"></a>
            <a href="http://www.linkedin.com"><img src="../images/icon/linkedin.png"></a>
          </div>

          <div class="col-12 col-sm-12 col-md-12 col-lg order-1 order-lg-2 text-center text-light">
            <img src="/images/Footer_badge3.png" alt="...">
          </div>

          <div class="col order-3 text-center text-dark text-nowrap">
            <p><a href="/sell-property">Kontakta oss</a></p>
            <p><a href="/integrity">Integritetspolicy</a></p>
          </div>

        </div>
        <div class="row">
          <div class="col-12 text-center text-dark">

          </div>
        </div>

      </footer>
    `;
  }

}