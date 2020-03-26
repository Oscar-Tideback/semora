class Footer extends Base {

  render() {
    return /*html*/`
      <footer class="footer p-4 border-top border-secondary">
        <div class="row">

          <div class="col-md-12 col-lg mb-sm-2 mb-lg-0 py-4 text-center text-dark">
            <p>Följ oss på: </p>
            <a href="http://www.twitter.com"><img src="../images/icon/twitter.png"></a>
            <a href="http://www.facebook.com"><img src="../images/icon/facebook.png"></a>
            <a href="http://www.instagram.com"><img src="../images/icon/instagram.png"></a>
            <a href="http://www.linkedin.com"><img src="../images/icon/linkedin.png"></a>
          </div>

          <div class="col text-center text-light">
            <img class="img-fluid" src="/images/Footer_badge3.png" alt="...">
          </div>

          <div class="col-md-12 col-lg mt-sm-2 mt-lg-0 py-4 text-center text-dark">
            <p><a href="/our-regions">Kontakta oss</a></p>
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