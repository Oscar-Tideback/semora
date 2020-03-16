class StartPage extends Base {

  async mount() {

    // Listing (below carousel) starts where the carousel ends in realEstateData (SQL result)
    this.carouselEnd = this.listingStart = 5;
    this.showThisMany = 14;

    // Using GROUP instead of DISTINCT to avoid duplicate RANDOM results since multiple images per object in DB
    // LIMIT sets amount of objects in carousel 
    // Don't forget! to select where realEstateImages.category later on instead of matching by realEstateImages.imgUrl /Rikard
    this.realEstateData = await sql(/*sql*/`
      SELECT * FROM 
        realEstateInfo, 
        userXregion ON realEstateInfo.userId = userXregion.userId, 
        region ON region.id = userXregion.regionId,
        realEstateAddress ON realEstateAddress.realEstateId = realEstateInfo.Id,
        areaInfo ON areaInfo.id = realEstateInfo.areaInfoId,
        realEstateImages ON realEstateImages.realEstateInfoId = realEstateInfo.Id
      WHERE imgUrl LIKE '%img01%'
      ORDER BY RANDOM() LIMIT $showThisMany
    `, { showThisMany: this.showThisMany });

    //console.log(this.realEstateData);
  }

  render() {
    return /*html*/`
      <div class="row m-0 pt-4" route="/" page-title="Startsida">
        <div class="col-12 pl-0 pr-0 pb-0 mt-4">

          <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              ${this.realEstateData.map((obj, index) => (index < this.carouselEnd ? /*html*/`
                  <li data-target="#carouselExampleCaptions" data-slide-to="${index}" class="${index > 0 ? '' : 'active'}"></li>
                  ` : ''))}
            </ol>
            <div class="carousel-inner">

              <div class="carousel-relative-wrapper">
                <div class="carousel-title-container"><h2 class="carousel-title-text">Pågående budgivning</h2></div>
              </div>

              ${this.realEstateData.map((obj, index) => (index < this.carouselEnd ? /*html*/`
                <div class="carousel-item ${index > 0 ? '' : 'active'}" data-interval="5000">
                  <a href="/real-estate-info/${obj.id}" targetbostadid="${obj.id}"><img src="images/${obj.imgUrl}" class="d-block w-100" alt="..." targetbostadid="${obj.id}"></a>

                  <div class="carousel-relative-wrapper">
                    <div class="carousel-ornament-bottom"></div>
                  </div>

                  <div class="carousel-caption d-none d-sm-block">
                    <h3 class="carousel-title-caption">${obj.streetName} ${obj.streetNumber.toUpperCase()}${obj.floor === null ? '' : ', <span class="carouselAdj">' + obj.floor + ' tr'}</span></h3>
                    ${obj.areaName}, ${obj.regionName}<br>
                    ${obj.rooms} rum, ${obj.area} m², ${obj.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')} kr
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
                  <a href="/real-estate-info/10">testlänk</a>
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
                      <!-- Current SQL query join gives realEstateInfo.id instead of realEstateInfo.Id -->
                      <a href="/real-estate-info/${obj.id}">
                        <img src="images/${obj.imgUrl}" class="card-img-top" alt="..." targetbostadid="${obj.id}">
                      </a>
                      <div class="card-body">
                        <p class="card-text">
                          <a href="/real-estate-info" click="refreshBostad" targetbostadid="${obj.id}">
                            ${obj.streetName} ${obj.streetNumber.toUpperCase()}${obj.floor === null ? '' : ' (' + obj.floor + ' tr)'}<br>
                            ${obj.areaName}, ${obj.regionName}<br>
                            ${obj.rooms} rum, ${obj.area} m²<br>
                            ${obj.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')} kr
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