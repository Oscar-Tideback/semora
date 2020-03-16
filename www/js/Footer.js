class Footer extends Base {

  render() {
    return /*html*/`
      <footer class="footer p-4">
        <div class="row">
          <div class="col text-center text-dark">
            
            <p>Följ oss på: </p><p>
            <a href="http://www.twitter.com"><img src="images/icon/twitter.png"></a>
            <a href="http://www.facebook.com"><img src="images/icon/facebook.png"></a>
            <a href="http://www.instagram.com"><img src="images/icon/instagram.png"></a>
            <a href="http://www.linkedin.com"><img src="images/icon/linkedin.png"></a></p>
          </div>
          <div class="col text-center text-light">
            <img src="/images/Footer_badge.png">
          </div>
          <div class="col text-center text-dark">
          <p><a href="/our-regions">Kontakta oss</a></p>
            <p><a href="/integrity">Integritetspolicy</a></p>
          </div>
        </div>
      </footer>
    `;
  }

}