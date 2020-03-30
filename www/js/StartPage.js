class StartPage extends Base {

  async mount() {

    this.today = new Date();
    console.log(this.today.getDate());

    // Listing (below carousel) starts where the carousel ends in searchResult (SQL result)
    this.carouselEnd = this.listingStart = 5;
    this.showThisMany = 14;

    // LIMIT sets amount of objects in carousel 
    // Don't forget! to select where realEstateImages.category later on instead of matching by realEstateImages.imgUrl /Rikard
    this.searchResult = await sql(/*sql*/`
      SELECT * FROM realEstateInfo,
        userXregion ON realEstateInfo.userId = userXregion.userId, 
        region ON region.id = userXregion.regionId,
        realEstateAddress ON realEstateAddress.realEstateId = realEstateInfo.Id,
        areaInfo ON areaInfo.id = realEstateInfo.areaInfoId,
        realEstateImages ON realEstateImages.realEstateInfoId = realEstateInfo.Id
      LEFT JOIN viewings ON viewings.realEstateId = realEstateInfo.Id
      WHERE imgUrl LIKE '%img01%'
      GROUP BY realEstateInfo.Id
      ORDER BY RANDOM() LIMIT $showThisMany
    `, { showThisMany: this.showThisMany });
  }

  render() {
    return /*html*/`
      <div class="row m-0 p-0" route="/" page-title="Startsida">
        <div class="col-12 p-0">

          <div class="container d-flex justify-content-center">
            <div class="row p-4 paragraph-maxwidth">
              <div class="col pt-4">
                <h2 class="pb-4">Välkommen till Dhyr & Rumson</h2>
                <p>
                  Köpa eller sälja bostad? Dhyr & Rumsons mäklare ger dig den hjälp och kunskap du behöver för att göra en riktigt bra bostadsaffär.
                  Välkommen ett steg upp till det lite finare.
                </p>
              </div>
            </div>
          </div>
          <!-- Carousel container starts here -->
          <div id="carouselExampleCaptions" class="carousel slide py-4 my-4" data-ride="carousel">
            <ol class="carousel-indicators">
              ${this.searchResult.map((obj, index) => (index < this.carouselEnd ? /*html*/`
                  <li data-target="#carouselExampleCaptions" data-slide-to="${index}" class="${index > 0 ? '' : 'active'}"></li>
                  ` : ''))}
            </ol>
            <div class="carousel-inner">
              <div class="carousel-relative-wrapper">
                <div class="carousel-title-container">
                  <h2 class="carousel-title-text">Urval av bostäder</h2>
                </div>
              </div>
              ${this.searchResult.map((obj, index) => (index < this.carouselEnd ? /*html*/`
                <div class="carousel-item ${index > 0 ? '' : 'active'}" data-interval="5000">
                  <a href="/real-estate-info/${obj.id}"><img src="images/${obj.imgUrl}" class="d-block w-100" alt="..."></a>
                  <div class="carousel-relative-wrapper">
                    <div class="carousel-ornament-bottom"></div>
                  </div>
                  <div class="carousel-caption d-none d-sm-block">
                    <h3 class="carousel-title-caption">${obj.streetName} ${obj.streetNumber.toUpperCase()}${obj.floor === null ? '' : ', <span class="carouselAdj">' + obj.floor + ' tr'}</span></h3>
                    ${obj.areaName}, ${obj.regionName}<br>
                    ${obj.rooms} rum, ${obj.area} m², ${obj.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} kr 
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

          <div class="container d-flex justify-content-center">
            <div class="row py-4 paragraph-maxwidth">
              <div class="col">
                <p>
                  <h2 class="pb-4">Våra tjänster hjälper dig att köpa tryggt</h2>
                  Att köpa bostad är förknippat med en hel del känslor. Förväntan och entusiasm, men också tvivel och nervositet. 
                  Ibland känns det som att man skulle behöva vara både ekonom, jurist och byggnadsingenjör för att kunna fatta de viktiga besluten.
                </p>
                <p>
                  För att göra allt lite enklare för dig som ska byta bostad, har vi en rad tjänster och verktyg som hjälper dig både att hitta
                  drömbostaden och slå till när det väl blir dags. Till exempel kan vi hjälpa dig att hålla koll på nya bostäder som kommer ut på
                  marknaden och på prisläget där du vill bo. 
                </p>
                <p>När du väl hittat ditt drömboende har vi gjort det enkelt att delta och följa med i budgivningen.</p>
                <h5><a href="/real-estate-agents">Kontakta någon av våra mäklare så får du veta mer</a></h5>
              </div>
            </div>
          </div>

          <div class="container">
            <div class="row py-4">
              <div class="col-12 text-center">
                <h1>Andra bostäder till salu</h1>
              </div>
            </div>
            <!-- new row -->
            ${app.buyerPage.gridLayout(this.searchResult, this.listingStart)}
          </div >

        </div >
      </div >
  `;
  }

}