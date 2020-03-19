class BuyerPageSearch extends Base {

  async mount() {
    // Populate region-dropdown
    this.regionSelection = await sql(/*sql*/`SELECT * FROM region`);

    this.formInput = new FormData();
  }


  async doSearch(e) {
    this.preventPageReload(e);

    this.formInput = document.querySelector('form');

    // Checkboxes checked-property is boolean true/false
    console.log("textinput:" + this.formInput.textinput.value);
    console.log("regionselect:" + this.formInput.regionselect.value);

    console.log("alla_typer:" + this.formInput.tenaryOption1.checked);
    console.log("villor:" + this.formInput.tenaryOption2.checked);
    console.log("radhus:" + this.formInput.tenaryOption3.checked);
    console.log("lagenheter:" + this.formInput.tenaryOption4.checked);
    console.log("fritidshus:" + this.formInput.tenaryOption5.checked);
    console.log("gardar:" + this.formInput.tenaryOption6.checked);
    console.log("tomter:" + this.formInput.tenaryOption7.checked);
    console.log("ovriga:" + this.formInput.tenaryOption8.checked);

    console.log("maxprice:" + this.formInput.maxprice.value);
    console.log("minarea:" + this.formInput.minarea.value);
    console.log("minrooms:" + this.formInput.minrooms.value);

    this.sqlQuery = `
    SELECT * FROM 
      realEstateInfo,
      userXregion ON realEstateInfo.userId = userXregion.userId,
      region ON region.id = userXregion.regionId,
      realEstateAddress ON realEstateAddress.realEstateId = realEstateInfo.Id,
      areaInfo ON areaInfo.id = realEstateInfo.areaInfoId,
      realEstateImages ON realEstateImages.realEstateInfoId = realEstateInfo.Id
      WHERE imgUrl LIKE '%img01%'

      AND CAST(realEstateInfo.price AS int) < '` + this.formInput.maxprice + `'    
      AND CAST(realEstateInfo.rooms AS int) >= '` + this.formInput.minrooms + `'
      AND CAST(realEstateInfo.area AS int) >= '` + this.formInput.minarea + `'

      GROUP BY realEstateInfo.Id`;

    // Refresh result page (BuyerPage)
    app.buyerPage.searchResult = await sql(/*sql*/this.sqlQuery);
    app.buyerPage.render();

  }


  // Real estate tenary checkboxes behaviour. Sets true/false and active. Ugly code fix later /Rikard
  checkBoxes(e) {
    this.boxes = document.getElementsByClassName('tenary-checkbox');

    if (e.target.attributes.name.value === 'uncheck') {
      for (let box of this.boxes) {
        if (box.name.value === 'tenaryOption1') {
          this.boxes.tenaryOption1.checked = true;
          this.boxes.tenaryOption1.parentElement.classList.add('active');
          continue;
        }
        box.checked = false;
        box.parentElement.classList.remove('active');
      }
    }
    else {
      this.boxes.tenaryOption1.checked = false;
      this.boxes.tenaryOption1.parentElement.classList.remove('active');
      e.target.checked ? e.target.checked = false : e.target.checked = true;
      e.target.parentElement.classList.toggle('active');
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

            <form id="searchForm">
            <div class="form-group p-4">

              <div class="row">
                <div class="col">
                  <!-- <label for="keywordsInput">Område</label> -->
                  </div>
              </div>

              <div class="row pb-2">
                <div class="col-md mt-4">
                  <input type="text" class="form-control rounded mr-4 form-control-lg" placeholder="Skriv område, adress eller nyckelord..." name="textinput" id="keywordsInput" keyup="searchKeyword" keydown="selectWithUpDownArrows" autocomplete="off" autocorrect="off">
                  </div>
                  <div class="col-auto mt-4">
                    <select class="form-control form-control-lg" id="region_select" name="regionselect">
                      <option value="0">Alla regioner</option>
                      ${this.regionSelection.map(region => '<option value="' + region.id + '">' + region.regionName + '</option>')}
                    </select>
                  </div>
                  <div class="col-auto mt-4">
                    <button class="btn btn-light btn-lg" style="background-color: #ffe034; width: 10rem" click="doSearch">Sök <!-- Do not make this type submit --></button>
                  </div>
                </div>

                <hr>

                  <div class="row-auto pt-2">
                    <div class="btn-group-toggle" data-toggle="buttons">

                      <div class="row">
                        <div class="col px-1 mx-0">
                          <label class="btn btn-light btn-block active" click="checkBoxes" name="uncheck" style="white-space: nowrap"><input class="tenary-checkbox" type="checkbox" name="tenaryOption1" id="allatyper" checked="true">Alla typer</label>
                        </div>
                          <div class="col px-1 mx-0">
                            <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input class="tenary-checkbox" type="checkbox" name="tenaryOption2" id="villor">Villor</label>
                        </div>
                        <div class="col px-1 mx-0">
                          <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input class="tenary-checkbox" type="checkbox" name="tenaryOption3" id="radhus">Radhus</label>
                        </div>
                        <div class="col px-1 mx-0">
                          <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input class="tenary-checkbox" type="checkbox" name="tenaryOption4" id="lagenheter">Lägenheter</label>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col px-1 mx-0">
                          <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input class="tenary-checkbox" type="checkbox" name="tenaryOption5" id="fritidshus">Fritidshus</label>
                        </div>
                        <div class="col px-1 mx-0">
                          <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input class="tenary-checkbox" type="checkbox" name="tenaryOption6" id="gardar">Gårdar</label>
                        </div>
                        <div class="col px-1 mx-0">
                          <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input class="tenary-checkbox" type="checkbox" name="tenaryOption7" id="tomter">Tomter</label>
                        </div>
                        <div class="col px-1 mx-0">
                          <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input class="tenary-checkbox" type="checkbox" name="tenaryOption8" id="ovriga">Övriga</label>
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
                        <option value="300000">300 000 kr</option>
                        <option value="400000">400 000 kr</option>
                        <option value="500000">500 000 kr</option>
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
