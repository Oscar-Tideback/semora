class Footer extends Base {

  render() {
    return /*html*/`
      <footer class="footer p-4">
        <div class="row">
          <div class="col text-center text-light">
            <p><a href="/about-us">Kontakta oss</a></p>
            <p>Rådgivning</p>
            <p>Följ oss på: Twitter Facebook Instagram Linkedin etc</p>
          </div>
          <div class="col text-center text-light">
            <img src="/images/Footer_badge.png">
          </div>
          <div class="col text-center text-light">
            <p><a href="/integrity">Integritetspolicy</a></p>
            <p>Sekretess</p>
            <p>Användning av cookies</p>
          </div>
        </div>
      </footer>
    `;
  }

}