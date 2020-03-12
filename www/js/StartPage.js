class StartPage extends Base {

  async mount() {

    this.carouselEnd = this.listingStart = 4;

    // Using GROUP instead of DISTINCT to avoid duplicate RANDOM results since multiple images per object in DB
    // LIMIT sets amount of objects in carousel 
    // Don't forget! to select where realEstateImages.category later on instead of matching by realEstateImages.imgUrl /Rikard
    this.realEstateData = await sql(/*sql*/`
      SELECT * FROM 
              realEstateInfo, 
              userXregion ON realEstateInfo.userId = userXregion.userId, 
              region ON region.id = userXregion.regionId,
              realEstateImages ON realEstateImages.realEstateInfoId = realEstateInfo.Id,
              realEstateAddress ON realEstateAddress.realEstateId = realEstateInfo.Id,
              areaInfo ON areaInfo.id = realEstateInfo.areaInfoId
      WHERE imgUrl LIKE '%img01%'
      ORDER BY RANDOM() LIMIT 11
    `);

  }

  refreshTargetPage(e) {
    app.testPage.brokerId = e.target.attributes.brokerid.value;
    app.testPage.render();

    //console.log(e.target);
  }

  render() {
    return /*html*/`
      <div class="row m-0" route="/" page-title="Startsida">
        <div class="col-12 p-0">
          <div class="carousel-relative-holder">
            <div class="carousel-title-container">
              <h2 class="carousel-title-text">Budgivning pågår</h2>
            </div>
          </div>
          <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              ${this.realEstateData.map((obj, index) => (index < this.carouselEnd ? /*html*/`
                  <li data-target="#carouselExampleCaptions" data-slide-to="${index}" class="${index > 0 ? '' : 'active'}"></li>
                  ` : ''))}
            </ol>
            <div class="carousel-inner">
              ${this.realEstateData.map((obj, index) => (index < this.carouselEnd ? /*html*/`
                <div class="carousel-item ${index > 0 ? '' : 'active'}" data-interval="5000">
                  <img src="images/${obj.imgUrl}" class="d-block w-100" alt="...">

                  <div class="carousel-relative-holder"><div class="carousel-ornament-bottom"></div></div>

                  <div class="carousel-caption d-none d-sm-block">
                    <h3 class="carousel-title-caption">${obj.streetName} ${obj.streetNumber.toUpperCase()}${obj.floor === null ? '' : ', <span class="carouselAdj">' + obj.floor + ' tr'}</span></h3>
                    ${obj.areaName}, ${obj.regionName}<br>
                    ${obj.rooms} rum, ${obj.area} m², ${obj.price} kr
                  </div>
                </div>
              ` : ''))}
            </div>

            <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>

          <div class="container my-4">

            <div class="row p-4">
              <div class="col">
                <h2 class="pb-4">Våra tjänster hjälper dig att köpa tryggt</h2>
                <p>
                  Att köpa bostad är förknippat med en hel del känslor. Förväntan och entusiasm, men också tvivel och nervositet. 
                  Ibland känns det som att man skulle behöva vara både ekonom, jurist och byggnadsingenjör för att kunna fatta de viktiga besluten.
                  För att göra allt lite enklare för dig som ska byta bostad, har vi en rad tjänster och verktyg som hjälper dig både att hitta
                  drömbostaden och slå till när det väl blir dags. Till exempel kan vi hjälpa dig att hålla koll på nya bostäder som kommer ut på
                  marknaden och på prisläget där du vill bo. Och när du väl hittat ditt drömboende har vi gjort det enkelt att delta och följa
                  med i budgivningen.
                </p>
                <h5><a href="/real-estate-agents">Kontakta någon av våra mäklare så får du veta mer</a></h5>
              </div>
            </div>
            <div class="row py-4">
              <div class="col-12 text-center">
                <h1>Andra bostäder till salu</h1>
              </div>
            </div>
            <div class="row">

              ${this.realEstateData.map((obj, index) => (index >= this.listingStart ? /*html*/`
                <div class="col d-flex justify-content-center">
                    <div class="card my-4 estate-card">
                      <a href="/testpage" click="refreshBroker">
                        <img src="images/${obj.imgUrl}" class="card-img-top" alt="..." realEstateId="${obj.Id}">
                      </a>
                      <div class="card-body">
                        <p class="card-text">
                          <a href="/testpage" click="refreshBroker" realEstateId="${obj.Id}">
                            ${obj.streetName} ${obj.streetNumber.toUpperCase()}${obj.floor === null ? '' : ' (' + obj.floor + ' tr)'}<br>
                            ${obj.areaName}, ${obj.regionName}<br>
                            ${obj.rooms} rum, ${obj.area} m²<br>
                            <!-- obj.price.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3') -->
                            ${obj.price} kr
                          </a>
                        </p>
                      </div>
                    </div>
                </div>
              ` : ''))}

            </div>
          </div>
        </div>
      </div>
    `;
  }

}