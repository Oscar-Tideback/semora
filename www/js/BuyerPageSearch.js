class BuyerPageSearch extends Base {

  async mount() {
    this.regionSelection = await sql(/*sql*/`SELECT * FROM region`);

    // this.userChoices = {
    // should contain min max price, min max kvm, region etc
    //    region: '',
    // minKvm: 0, maxKvm: 150
    // }

    await this.doSearch();
  }



  // On submit (click) from search form
  fetchForm() {

    // Test
    //this.maxKvm = 111;

    // Formdata reference here: developer.mozilla.org/en-US/docs/Web/API/FormData
    this.searchForm = document.getElementById('searchForm');
    this.formData = new FormData(this.searchForm);

    // Testing retrieving form data
    //console.log(this.formData.get('inputField'));
    //console.log(this.formData.get('regionselect'));
    //console.log(this.formData.get('tenaryOption2') ? 'true' : 'false');
    //console.log(this.formData.get('tenaryOption4') ? 'true' : 'false');
    //console.log(this.formData.get('minrooms'));

    // Display keys (iterator) of form elements
    //for (let key of this.formData.keys()) {
    //  console.log(key);
    //}

    // Display the value of form element keys
    for (let value of this.formData.values()) {
      console.log(value);
    }
  }

  async doSearch() {
    // If called from NavBarSearch we will get a region
    // otherwise set region to empty strings

    // Test
    //this.maxKvm = 111;

    app.buyerPage.searchResult = await sql(/*sql*/`
      SELECT realEstateInfo.Id, realEstateInfo.area, realEstateInfo.rooms, 
      realEstateInfo.buildYear, realEstateInfo.maintenanceCost,
      realEstateInfo.tenure, realEstateInfo.price, realEstateInfo.floor,
      realEstateImages.realEstateInfoId, realEstateImages.imgUrl,
      region.regionName, realEstateAddress.streetName, realEstateAddress.streetNumber
      FROM  realEstateInfo, realEstateImages, region, userXRegion, realEstateAddress
      WHERE realEstateInfo.Id = realEstateImages.realEstateInfoId
      AND realEstateAddress.realEstateId = realEstateInfo.Id
      AND userXRegion.regionId = region.id 
      AND userXregion.userId = realEstateInfo.userId
      AND realEstateImages.imgUrl LIKE '%img01%'
      AND (region.regionName = $region OR $region = '')
      
    `, { $region: this.region });
    // AND region.area > $minKvm

    // Refresh result page (BuyerPage)
    app.buyerPage.render();

  }

  // Real estate renary checkboxes behaviour. Sets true/false and active
  checkBoxes(e) {
    this.checkboxes = document.getElementsByName('tenaryOption');
    this.uncheckbox = document.getElementById('option1');

    if (e.target.attributes.name.value === 'showall') {
      for (let box of this.checkboxes) {
        box.checked = false;
        box.parentElement.classList.remove('active');
      };
    }
    else {
      this.uncheckbox.checked = false;
      this.uncheckbox.parentElement.classList.remove('active');
    }

  }

  // Addition by Thomas
  preventPageReload(e) {
    // Do not perform a hard reload of the page when someone submits the form
    e && e.preventDefault();
  }


  render() {
    return /*html*/`
      <div class="row m-0" route="/buy-property" page-title="Testsida">
        <div class="col p-4">

          <div class="row p-2">
            <div class="col text-center">
              <h1>Sök drömbostaden...</h1>
            </div>
          </div>

            <form id="searchForm"  submit="preventPageReload">
            <div class="form-group p-4">

              <div class="row">
                <div class="col">
                  <!-- <label for="keywordsInput">Område</label> -->
                  </div>
              </div>

              <div class="row pb-2">
                <div class="col-md mt-4">
                  <input type="text" class="form-control rounded mr-4 form-control-lg" placeholder="Skriv område, adress eller nyckelord..." name="inputField" id="keywordsInput" keyup="searchKeyword" keydown="selectWithUpDownArrows" autocomplete="off" autocorrect="off">
                  </div>
                  <div class="col-auto mt-4">
                    <select class="form-control form-control-lg" id="region_select" name="regionselect">
                      <option value="0">Alla regioner</option>
                      ${this.regionSelection.map(region => '<option value="' + region.id + '">' + region.regionName + '</option>')}
                    </select>
                  </div>
                  <div class="col-auto mt-4">
                    <button class="btn btn-light btn-lg" style="background-color: #ffe034; width: 10rem" type="submit" click="fetchForm">Sök</button>
                  </div>
                </div>

                <hr>

                  <div class="row-auto pt-2">
                    <div class="btn-group-toggle" data-toggle="buttons">

                      <div class="row">
                        <div class="col px-1 mx-0">
                          <label class="btn btn-light btn-block active" style="white-space: nowrap" click="checkBoxes" name="showall"><input type="checkbox" name="tenaryOption1" id="option1" checked>Alla typer</label>
                        </div>
                          <div class="col px-1 mx-0">
                            <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input type="checkbox" name="tenaryOption2" id="option2">Villor</label>
                        </div>
                        <div class="col px-1 mx-0">
                          <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input type="checkbox" name="tenaryOption3" id="option3">Radhus</label>
                        </div>
                        <div class="col px-1 mx-0">
                          <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input type="checkbox" name="tenaryOption4" id="option4">Lägenheter</label>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col px-1 mx-0">
                          <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input type="checkbox" name="tenaryOption5" id="option5">Fritidshus</label>
                        </div>
                        <div class="col px-1 mx-0">
                          <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input type="checkbox" name="tenaryOption6" id="option6">Gårdar</label>
                        </div>
                        <div class="col px-1 mx-0">
                          <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input type="checkbox" name="tenaryOption7" id="option7">Tomter</label>
                        </div>
                        <div class="col px-1 mx-0">
                          <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input type="checkbox" name="tenaryOption8" id="option8">Övriga</label>
                        </div>
                      </div>

                    </div>
                  </div>

                  <hr>

                  <div class="row">
                    <div class="col">
                      <label for="min_rooms">Minst antal rum</label>
                    </div>
                    <div class="col">
                      <label for="min_area">Boarea</label>
                    </div>
                    <div class="col">
                      <label for="max_price">Högst pris</label>
                    </div>
                  </div>

                  <div class="row">

                    <div class="col">
                      <select class="form-control" id="min_rooms" name="minrooms">
                        <option value="0">Alla</option>
                        <option value="1">Minst 1 rum</option>
                        <option value="2">Minst 2 rum</option>
                        <option value="3">Minst 3 rum</option>
                        <option value="4">Minst 4 rum</option>
                        <option value="5">Minst 5 rum</option>
                        <option value="10">Minst 10 rum</option>
                      </select>
                    </div>

                    <div class="col">
                      <select class="form-control" id="min_area" name="minarea">
                        <option value="0">Alla</option>
                        <option value="20">Minst 20 m²</option>
                        <option value="30">Minst 30 m²</option>
                        <option value="40">Minst 40 m²</option>
                        <option value="50">Minst 50 m²</option>
                        <option value="75">Minst 75 m²</option>
                        <option value="100">Minst 100 m²</option>
                        <option value="125">Minst 125 m²</option>
                        <option value="150">Minst 150 m²</option>
                        <option value="175">Minst 175 m²</option>
                        <option value="200">Minst 200 m²</option>
                        <option value="250">Minst 250 m²</option>
                        <option value="300">Minst 300 m²</option>
                        <option value="350">Minst 350 m²</option>
                        <option value="450">Minst 450 m²</option>
                        <option value="500">Minst 500 m²</option>
                      </select>
                    </div>

                    <div class="col">
                      <select class="form-control" id="max_price" name="maxprice">
                        <option value="0">Inget</option>
                        <option value="100000">100 000 kr</option>
                        <option value="200000">200 000 kr</option>
                        <option value="400000">300 000 kr</option>
                        <option value="500000">400 000 kr</option>
                        <option value="600000">500 000 kr</option>
                        <option value="700000">750 000 kr</option>
                        <option value="1000000">1 000 000 kr</option>
                        <option value="1250000">1 250 000 kr</option>
                        <option value="1500000">1 500 000 kr</option>
                        <option value="1750000">1 750 000 kr</option>
                        <option value="2000000">2 000 000 kr</option>
                        <option value="2500000">2 500 000 kr</option>
                        <option value="3000000">3 000 000 kr</option>
                        <option value="3500000">3 500 000 kr</option>
                        <option value="4000000">4 000 000 kr</option>
                        <option value="4500000">4 500 000 kr</option>
                        <option value="5000000">5 000 000 kr</option>
                        <option value="5500000">5 500 000 kr</option>
                        <option value="6000000">6 000 000 kr</option>
                        <option value="7000000">7 000 000 kr</option>
                        <option value="8000000">8 000 000 kr</option>
                        <option value="9000000">9 000 000 kr</option>
                        <option value="10000000">10 000 000 kr</option>
                        <option value="11000000">11 000 000 kr</option>
                        <option value="12000000">12 000 000 kr</option>
                        <option value="13000000">13 000 000 kr</option>
                        <option value="14000000">14 000 000 kr</option>
                        <option value="15000000">15 000 000 kr</option>
                        <option value="20000000">20 000 000 kr</option>
                        <option value="25000000">25 000 000 kr</option>
                      </select>
                    </div>

                  </div>

            </div>
            </form>

        </div>
      </div>
    `;
  }

}
