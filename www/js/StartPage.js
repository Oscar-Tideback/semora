class StartPage extends Base {

  async mount() {

    this.cardCount = 0;

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
    return /*html*/`
      <div class="row m-0" route="/" page-title="Startsida">
        <div class="col-12 p-0">

          <div class="carousel-title-holder">
            <div class="carousel-title-container">
              <h1 class="carousel-title-text">Populära objekt just nu</h1>
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
              <div class="col-12 text-center">
                <h1>Andra bostäder till salu</h1>
              </div>
            </div>

            <div class="row pb-4">
              <div class="col text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </div>
            </div>

            <div class="row pb-4">
              <div class="col text-center">Ett objekt</div>
              <div class="col text-center">Ett objekt</div>
              <div class="col text-center">Ett objekt</div>
            </div>
            <div class="row pb-4">
              <div class="col text-center">Ett objekt</div>
              <div class="col text-center">Ett objekt</div>
              <div class="col text-center">Ett objekt</div>
            </div>
            <div class="row pb-4">
              <div class="col text-center">Ett objekt</div>
              <div class="col text-center">Ett objekt</div>
              <div class="col text-center">Ett objekt</div>
            </div>

            ${this.carouselData.map(obj => /*html*/`
            
            ${this.cardCount < 3 ? /*html*/`<div class="row pb-4">` : ''}

              <div class="col text-center">
                <div class="card" style="width: 18rem;">
                  <img src="images/${obj.imgUrl}.jpg" class="card-img-top" alt="...">
                  <div class="card-body">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </div>

            ${this.cardCount < 3 ? /*html*/`</div>` : this.cardCount = 0}

            `)}



          </div>


        </div>
      </div>
    `;
  }

}