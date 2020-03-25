class BuyerPageSearch extends Base {

  async mount() {
    // Populate region-dropdown
    this.regionSelection = await sql(/*sql*/`SELECT * FROM region ORDER BY region.regionName`);

    this.formInput = new FormData();

  }

  async search() {
    await this.doSearch();
    this.setBoxStyles();
  }


  async doSearch() {

    // If null the form doesn't exist prior to doSearch() then perform a default search for all real estates
    if (document.querySelector('[id="buyerSearchForm"]') === null) {

      // Check if properties has been set from NavBarSearch.js otherwise default values for query will be used
      this.textInput = this.textInput.length > 0 ? this.textInput : '';
      this.regionId = this.regionId > 0 ? this.regionId : '0';

      // A default search on "page landing" or when search was performed via NavBarSearch.js
      app.buyerPage.searchResult = await sql(/*sql*/`
        SELECT * FROM 
          realEstateInfo,
          userXregion ON realEstateInfo.userId = userXregion.userId,
          region ON region.id = userXregion.regionId,
          realEstateAddress ON realEstateAddress.realEstateId = realEstateInfo.Id,
          areaInfo ON areaInfo.id = realEstateInfo.areaInfoId,
          realEstateImages ON realEstateImages.realEstateInfoId = realEstateInfo.Id
          WHERE imgUrl LIKE '%img01%'
          AND CAST(realEstateInfo.price AS int) < '999999999'    
          AND CAST(realEstateInfo.rooms AS int) >= '0'
          AND CAST(realEstateInfo.area AS int) >= '0'
          AND CASE
            WHEN CAST($regionid AS Int) < 1 THEN (region.id > 0)
            ELSE region.id = CAST($regionid AS Int)
          END
          AND CASE
            WHEN $textinput != '' THEN (
              realEstateInfo.description LIKE $textinput
              OR realEstateInfo.tenure LIKE $textinput
              OR realEstateAddress.streetName LIKE $textinput
              OR region.regionName LIKE $textinput
              OR areaInfo.description LIKE $textinput
              )
          END
          GROUP BY realEstateInfo.Id`,
        {
          textinput: ('%' + this.textInput + '%'),
          regionid: this.regionId
        });

      // Set headline etc for resultpage BuyerPage.js
      app.buyerPage.textInput = this.textInput.length > 0 ? this.textInput : '';

      // Fixa !!!!!!!!!!!!
      for (let region in this.regionSelection) {
        //app.buyerPage.regionName = this.regionSelection.map(region => region.id === this.regionId ? region.regionName : '') : 'samtliga regioner';
        region.id === this.regionId ? app.buyerPage.regionName = region.id : '';
        app.buyerPage.regionName.length < 0 ? 'samtliga regioner' : '';
      }

    }
    else {
      this.formInput = document.querySelector('[id="buyerSearchForm"]');

      // Defaults
      let opt2 = 'Villa', opt3 = 'Radhus', opt4 = 'Lägenhet', opt5 = 'Fritidshus', opt6 = 'Gård', opt7 = 'Tomt', opt8 = 'Bostadsrätt'
      // If not "Alla typer" selected then override corresponding variables from checkboxes if true
      if (!this.formInput.tenureOption1.checked) {
        this.formInput.tenureOption2.checked ? opt2 = 'Villa' : opt2 = 'foo'
        this.formInput.tenureOption3.checked ? opt3 = 'Radhus' : opt3 = 'foo'
        this.formInput.tenureOption4.checked ? opt4 = 'Lägenhet' : opt4 = 'foo'
        this.formInput.tenureOption5.checked ? opt5 = 'Fritidshus' : opt5 = 'foo'
        this.formInput.tenureOption6.checked ? opt6 = 'Gård' : opt6 = 'foo'
        this.formInput.tenureOption7.checked ? opt7 = 'Tomt' : opt7 = 'foo'
        this.formInput.tenureOption8.checked ? opt8 = 'Bostadsrätt' : opt8 = 'foo'
      }

      // Main search query from searchform
      app.buyerPage.searchResult = await sql(/*sql*/`
        SELECT * FROM 
          realEstateInfo,
          userXregion ON realEstateInfo.userId = userXregion.userId,
          region ON region.id = userXregion.regionId,
          realEstateAddress ON realEstateAddress.realEstateId = realEstateInfo.Id,
          areaInfo ON areaInfo.id = realEstateInfo.areaInfoId,
          realEstateImages ON realEstateImages.realEstateInfoId = realEstateInfo.Id
        WHERE realEstateInfo.tenure IN ($opt2,$opt3,$opt4,$opt5,$opt6,$opt7,$opt8)
        AND imgUrl LIKE '%img01%'
        AND CAST(realEstateInfo.price AS int) < $maxprice   
        AND CAST(realEstateInfo.rooms AS int) >= $minrooms
        AND CAST(realEstateInfo.area AS int) >= $minarea
        AND CASE
          WHEN CAST($regionid AS Int) < 1 THEN (region.id > 0)
          ELSE region.id = CAST($regionid AS Int)
        END
        AND CASE
          WHEN $textinput != '' THEN (
            realEstateInfo.description LIKE $textinput
            OR realEstateInfo.tenure LIKE $textinput
            OR realEstateAddress.streetName LIKE $textinput
            OR region.regionName LIKE $textinput
            OR areaInfo.description LIKE $textinput
            )
        END
        GROUP BY realEstateInfo.Id
        `,
        {
          textinput: ('%' + this.formInput.textinput.value + '%'),
          regionid: this.formInput.regionselect.value,
          maxprice: this.formInput.maxprice.value,
          minarea: this.formInput.minarea.value,
          minrooms: this.formInput.minrooms.value,
          opt2: opt2, opt3: opt3, opt4: opt4, opt5: opt5, opt6: opt6, opt7: opt7, opt8: opt8
        });

      // Setting BuyerPageSearch.properties to current text and region input values from form
      this.regionId = this.formInput.regionselect.value;
      this.textInput = this.formInput.textinput.value;

      // Set headline etc for resultpage BuyerPage.js
      app.buyerPage.textInput = this.formInput.textinput.value.length > 0 ? this.formInput.textinput.value : '';
      for (let option of this.formInput.regionselect) {
        if (option.selected) {
          app.buyerPage.regionName = option.value > 0 ? option.innerHTML : 'samtliga regioner'; break;
        }
      }

    }

    // Refresh results page (BuyerPage)
    app.buyerPage.doSort();
    app.buyerPage.render();

  }

  // Real estate tenure checkboxes behaviour. Sets true/false and active. Ugly code fix later /Rikard
  checkBoxes(e) {
    this.formInput = document.querySelector('[id="buyerSearchForm"]');
    // Set checkboxes on <label> click
    if (e.target.name === 'tenureOption1') {
      for (let formElement of this.formInput) {
        if (formElement.type === 'checkbox' && formElement.name !== 'tenureOption1') formElement.checked = false;
      }
    }
    else {
      this.formInput.tenureOption1.checked = false;
    }

    this.search();
  }

  setBoxStyles() {
    let formBoxes = document.getElementsByClassName('tenure-checkbox');
    // Adjust CSS accordingly
    for (let box of formBoxes) {
      box.checked ? box.parentElement.classList.add('active') : box.parentElement.classList.remove('active');
    }

  }

  // Addition by Thomas
  preventPageReload(e) {
    // Do not perform a hard reload of the page when someone submits the form
    e && e.preventDefault();
  }


  render() {

    // Always do a default search
    app.buyerPage.searchResult.length < 1 ? this.doSearch() : '';

    return /*html*/`
      <div class="row m-0" route="/buy-property" page-title="Testsida">
        <div class="col p-4">

          <div class="row p-2">
            <div class="col text-center">
              <h1>Sök drömbostaden...</h1>
            </div>
          </div>

            <form id="buyerSearchForm" submit="preventPageReload">
            <div class="form-group p-4 mb-0">

              <div class="row">
                <div class="col">
                  <!-- <label for="keywordsInput">Område</label> -->
                  </div>
              </div>

              <div class="row pb-2">
                <div class="col-md mt-4 input-group">
                  <input type="text" class="form-control rounded mr-4 form-control-lg" placeholder="Skriv område, adress eller nyckelord..." name="textinput" autocomplete="on" autocorrect="off" ${this.textInput.length > 0 ? ('value="' + this.textInput + '"') : ''}>
                  <button class="btn btn-default input-group-btn" type="submit" click="search" name="submitButton"><i class="icofont-search icofont-lg navbar-search-icon"></i></button>
                </div>

                <div class="col-md-auto mt-4 col-sm-12">
                  <select class="form-control form-control-lg" id="region_select" name="regionselect" change="search">
                    <option id="opt0" value="0">Alla regioner</option>
                    ${this.regionSelection.map(region => '<option id="opt' + region.id + '" value="' + region.id + '" ' + (region.id === parseInt(this.regionId) ? 'selected="selected"' : '') + '>' + region.regionName + '</option>')}
                  </select>
                </div>

              </div>

                <hr>

              <div class="row-auto pt-2">
                <div class="btn-group-toggle">

                  <div class="row">
                    <div class="col px-1 mx-0">
                      <label class="btn btn-light btn-block" click="checkBoxes" name="uncheck" style="white-space: nowrap"><input class="tenure-checkbox" type="checkbox" name="tenureOption1" id="allatyper" checked>Alla typer</label>
                    </div>
                    <div class="col px-1 mx-0">
                        <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input class="tenure-checkbox" type="checkbox" name="tenureOption2" id="villor">Villor</label>
                    </div>
                    <div class="col px-1 mx-0">
                      <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input class="tenure-checkbox" type="checkbox" name="tenureOption3" id="radhus">Radhus</label>
                    </div>
                    <div class="col px-1 mx-0">
                      <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input class="tenure-checkbox" type="checkbox" name="tenureOption4" id="lagenheter">Lägenheter</label>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col px-1 mx-0">
                      <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input class="tenure-checkbox" type="checkbox" name="tenureOption5" id="fritidshus">Fritidshus</label>
                    </div>
                    <div class="col px-1 mx-0">
                      <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input class="tenure-checkbox" type="checkbox" name="tenureOption6" id="gardar">Gårdar</label>
                    </div>
                    <div class="col px-1 mx-0">
                      <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input class="tenure-checkbox" type="checkbox" name="tenureOption7" id="tomter">Tomter</label>
                    </div>
                    <div class="col px-1 mx-0">
                      <label class="btn btn-light btn-block" click="checkBoxes" name="check"><input class="tenure-checkbox" type="checkbox" name="tenureOption8" id="ovriga">Bostadsrätter</label>
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
                    <label for="min_area">Minst boarea</label>
                  </div>
                  <div class="col">
                    <label for="max_price">Högst pris</label>
                  </div>
                </div>

                <div class="row">

                  <div class="col">
                    <select class="form-control" id="min_rooms" name="minrooms" change="search">
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
                    <select class="form-control" id="min_area" name="minarea" change="search">
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
                    <select class="form-control" id="max_price" name="maxprice" change="search">
                      <option value="999999999">Inget</option>
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
