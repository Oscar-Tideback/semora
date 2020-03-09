class StartPage extends Base {

  async mount() {

    this.cardCount;

    // Using GROUP instead of DISTINCT to avoid duplicate RANDOM results since multiple images per object in DB
    // LIMIT sets amount of objects in carousel 
    // Don't forget! to select where realEstateImages.category later on instead of matching by realEstateImages.imgUrl /Rikard
    this.carouselData = await sql(/*sql*/`
      SELECT 
          realEstateInfo.Id, 
          realEstateInfo.userId,
          realEstateAddress.streetName, 
          realEstateAddress.streetNumber, 
          realEstateInfo.tenure, 
          realEstateInfo.floor, 
          realEstateInfo.rooms, 
          realEstateInfo.area, 
          realEstateInfo.price, 
          areaInfo.areaName, 
          user.regionName,
          realEstateImages.imgUrl 
      FROM 
          realEstateInfo, 
          realEstateImages, 
          realEstateAddress, 
          areaInfo, 
          region
          user
      WHERE realEstateInfo.areaInfoId = areaInfo.id 
      AND realEstateInfo.userId = user.id
      AND realEstateInfo.Id = realEstateImages.realEstateInfoId 
      AND realEstateInfo.Id = realEstateAddress.realEstateId 
      AND realEstateImages.imgUrl LIKE '%img01%'
      GROUP BY realEstateInfo.Id
      ORDER BY RANDOM() LIMIT 10
    `);

    //this.cardsData = await sql(/*sql*/`

    //`);


  }

  render() {
    this.cardCount = -1;

    return /*html*/`
      <div class="row m-0" route="/" page-title="Startsida">
        <div class="col-12 p-0">

          <div class="carousel-title-holder">
            <div class="carousel-title-container">
              <h1 class="carousel-title-text">Populära bostäder just nu</h1>
            </div>
          </div>

          <div id="carouselExampleCaptions" class="carousel slide carousel-fade" data-ride="carousel">
            <ol class="carousel-indicators">
              ${this.carouselData.map((obj, index) => /*html*/`
                <li data-target="#carouselExampleCaptions" data-slide-to="${index}" class="${index > 0 ? '' : 'active'}"></li>
              `)}
            </ol>
            <div class="carousel-inner">
              ${this.carouselData.map((obj, index) => /*html*/`
                <div class="carousel-item ${index > 0 ? '' : 'active'}">
                  <img src="images/${obj.imgUrl}.jpg" class="d-block w-100" alt="...">
                  <div class="carousel-caption d-none d-md-block">
                    <h3 class="carousel-title-caption">${obj.streetName} ${obj.streetNumber.toUpperCase()}${obj.floor === null ? '' : ', <span class="carouselAdj">' + obj.floor + ' tr'}</span></h3>
                    <p>${obj.areaName}, ${obj.regionName}</p>
                    <p>${obj.rooms} rum, ${obj.area} m², ${obj.price} kr</p>
                  </div>
                </div>
              `)}
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

            <div class="row pb-4">
              <div class="col">
                <h1>Våra tjänster hjälper dig att köpa tryggt</h1>
                Att köpa bostad är förknippat med en hel del känslor. Förväntan och entusiasm, men också tvivel och nervositet. 
                Ibland känns det som att man skulle behöva vara både ekonom, jurist och byggnadsingenjör för att kunna fatta de viktiga besluten.
                För att göra allt lite enklare för dig som ska byta bostad, har vi en rad tjänster och verktyg som hjälper dig både att hitta
                drömbostaden och slå till när det väl blir dags. Till exempel kan vi hjälpa dig att hålla koll på nya bostäder som kommer ut på
                marknaden och på prisläget där du vill bo. Och när du väl hittat ditt drömboende har vi gjort det enkelt att delta och följa
                med i budgivningen.
                <a href="/testpage">Kontakta oss så får du veta mer</a>
              </div>
            </div>

            <div class="row pb-4">
              <div class="col-12 text-center">
                <h1>Andra bostäder till salu</h1>
              </div>
            </div>

            <div class="row">
              ${this.carouselData.map(obj => /*html*/`
                <div class="col d-flex justify-content-center">
                  <div class="card my-4" style="width: 18rem;">
                    <img src="images/${obj.imgUrl}.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>

              `)}
            </div>

          </div>

        </div>
      </div>
    `;
  }

}