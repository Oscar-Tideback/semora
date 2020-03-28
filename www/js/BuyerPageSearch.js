class BuyerPageSearch extends Base {

  async popRegionSelect() {
    this.regionSelection = await sql(/*sql*/`SELECT * FROM region ORDER BY region.regionName`);
  }

  // Unfinished.... work in progress
  setInitialFormValues() {
    this.formStoredValues = {
      isdefault: true,
      textinput: '',
      region: 0,
      options: [true, false, false, false, false, false, false, false],
      minrooms: 0,
      minarea: 0,
      maxprice: 999999999,
      sortby: 0,
      order: 0
    }
  }


  async doSearch() {

    // Check if needed resources are defined yet
    if (!this.formStoredValues.length && !this.regionSelection.length) return;
    if (document.querySelector('[id="buyerSearchForm"]') === null) {
      // Set headline etc for resultpage BuyerPage.js
      app.buyerPage.textInput = this.formStoredValues.textinput;
      // Fetch this.region.regionName using id supplied from navBarSearch 
      for (let region of this.regionSelection) {
        region.id === this.formStoredValues.region ? app.buyerPage.regionName = region.regionName : 'samtliga regioner';
      }
      console.log("form was null!");
    }
    else {
      //Fetch form and set formStoredValues
      this.formInput = document.querySelector('[id="buyerSearchForm"]');
      this.formStoredValues.textinput = this.formInput.textinput.value;
      this.formStoredValues.region = parseInt(this.formInput.regionselect.value);
      this.formStoredValues.options[0] = this.formInput.tenureOption1.checked;
      this.formStoredValues.options[1] = this.formInput.tenureOption2.checked;
      this.formStoredValues.options[2] = this.formInput.tenureOption3.checked;
      this.formStoredValues.options[3] = this.formInput.tenureOption4.checked;
      this.formStoredValues.options[4] = this.formInput.tenureOption5.checked;
      this.formStoredValues.options[5] = this.formInput.tenureOption6.checked;
      this.formStoredValues.options[6] = this.formInput.tenureOption7.checked;
      this.formStoredValues.options[7] = this.formInput.tenureOption8.checked;
      this.formStoredValues.maxprice = parseInt(this.formInput.maxprice.value);
      this.formStoredValues.minrooms = parseInt(this.formInput.minrooms.value);
      this.formStoredValues.minarea = parseInt(this.formInput.minarea.value);
      for (let option of this.formInput.regionselect) {
        if (option.selected) {
          app.buyerPage.regionName = option.value > 0 ? option.innerHTML : 'samtliga regioner'; break;
        }
      }
    }

    // Set headline etc for resultpage BuyerPage.js
    app.buyerPage.textInput = this.formStoredValues.textinput;

    // Defaults
    // Both SQL-query tenure variables and page tenure checkboxes should have been populated by occurance via DB instead
    // But don't have time. Hardcoding alot regarding checkboxes for now...
    let opt2 = 'Villa', opt3 = 'Radhus', opt4 = 'Lägenhet', opt5 = 'Fritidshus', opt6 = 'Gård', opt7 = 'Tomt', opt8 = 'Bostadsrätt'
    // If not "Alla typer" selected then override corresponding variables from checkboxes if true
    if (!this.formStoredValues.options[0]) {
      this.formStoredValues.options[1] ? opt2 = 'Villa' : opt2 = 'foo'
      this.formStoredValues.options[2] ? opt3 = 'Radhus' : opt3 = 'foo'
      this.formStoredValues.options[3] ? opt4 = 'Lägenhet' : opt4 = 'foo'
      this.formStoredValues.options[4] ? opt5 = 'Fritidshus' : opt5 = 'foo'
      this.formStoredValues.options[5] ? opt6 = 'Gård' : opt6 = 'foo'
      this.formStoredValues.options[6] ? opt7 = 'Tomt' : opt7 = 'foo'
      this.formStoredValues.options[7] ? opt8 = 'Bostadsrätt' : opt8 = 'foo'
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
        textinput: ('%' + this.formStoredValues.textinput + '%'),
        regionid: this.formStoredValues.region,
        maxprice: this.formStoredValues.maxprice,
        minarea: this.formStoredValues.minarea,
        minrooms: this.formStoredValues.minrooms,
        opt2: opt2, opt3: opt3, opt4: opt4, opt5: opt5, opt6: opt6, opt7: opt7, opt8: opt8
      });

    // Refresh buyerPage (display search results)
    app.buyerPage.doSort();
    app.buyerPage.render();

    // Refresh this page (display current form settings)
    this.render();
  }


  // Real estate tenure checkboxes behaviour. Sets true/false and active. Ugly! fix later...
  checkBoxes(e) {
    // Set checkboxes on <label> click
    if (e.target.name === 'tenureOption1' && !this.formStoredValues.options[0]) {
      this.formStoredValues.options[0] = true;
      // Start at index 1 since option1 is 0
      for (let i = 1; i < 7; i++) this.formStoredValues.options[i] = false;
      for (let formElement of this.formInput) {
        if (formElement.type === 'checkbox' && formElement.name !== 'tenureOption1') formElement.checked = false;
      }
    }

    if (e.target.name !== 'tenureOption1' && this.formStoredValues.options[0]) {
      this.formStoredValues.options[0] = false;
      for (let formElement of this.formInput) {
        if (formElement.name === 'tenureOption1') {
          formElement.checked = false;
        }
      }
    }

    this.doSearch();
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
      <div class="row m-0" route="/buy-property" page-title="Köpa bostad">
        <div class="col py-4 p-lg-4">

          <div class="row p-2">
            <div class="col text-center">
              <h1>Sök drömbostaden...</h1>
            </div>
          </div>

            <form id="buyerSearchForm" submit="preventPageReload">
            <div class="form-group p-0 p-md-4 mb-0">

              <div class="row">
                <div class="col">
                  <!-- <label for="keywordsInput">Område</label> -->
                  </div>
              </div>

              <div class="row pb-2">
                <div class="col-md mt-4 px-2 input-group">
                  <input type="text" class="form-control rounded mr-2 form-control-lg" placeholder="Skriv område, adress eller nyckelord..." name="textinput" keyup="doSearch" autocomplete="os" autocorrect="off" ${this.formStoredValues.textinput ? ('value="' + this.formStoredValues.textinput + '"') : ''}>
                  <button class="btn btn-default input-group-btn p-1" type="submit" click="doSearch" name="submitButton"><i class="icofont-search icofont-lg navbar-search-icon"></i></button>
                </div>

                <div class="col-md-auto mt-4 pl-2 pl-md-0 col-sm-12">
                  <select class="form-control form-control-lg" id="region_select" name="regionselect" change="doSearch">
                    <option id="opt0" value="0">Alla regioner</option>
                    ${this.regionSelection.map(region => '<option id="opt' + region.id + '" value="' + region.id + '" ' + (region.id === this.formStoredValues.region ? 'selected="selected"' : '') + '>' + region.regionName + '</option>')}
                  </select>
                </div >

              </div >

  <hr>

    <div class="row-auto pt-2">
      <div class="btn-group-toggle">

        <div class="row">
          <div class="col px-1 mx-0">
            <label class="btn btn-light btn-block text-nowrap ${this.formStoredValues.options[0] ? 'active' : ''}" click="checkBoxes" name="uncheck"><input class="tenure-checkbox" type="checkbox" name="tenureOption1" id="allatyper" ${this.formStoredValues.options[0] ? 'checked' : ''}>Alla typer</label>
                    </div>
            <div class="col px-1 mx-0">
              <label class="btn btn-light btn-block text-nowrap ${this.formStoredValues.options[1] ? 'active' : ''}" click="checkBoxes" name="check"><input class="tenure-checkbox" type="checkbox" name="tenureOption2" id="villor" ${this.formStoredValues.options[1] ? 'checked' : ''}>Villor</label>
                    </div>
              <div class="col px-1 mx-0">
                <label class="btn btn-light btn-block text-nowrap ${this.formStoredValues.options[2] ? 'active' : ''}" click="checkBoxes" name="check"><input class="tenure-checkbox" type="checkbox" name="tenureOption3" id="radhus" ${this.formStoredValues.options[2] ? 'checked' : ''}>Radhus</label>
                    </div>
                <div class="col px-1 mx-0">
                  <label class="btn btn-light btn-block text-nowrap ${this.formStoredValues.options[3] ? 'active' : ''}" click="checkBoxes" name="check"><input class="tenure-checkbox" type="checkbox" name="tenureOption4" id="lagenheter" ${this.formStoredValues.options[3] ? 'checked' : ''}>Lägenheter</label>
                    </div>
                </div>

                <div class="row">
                  <div class="col px-1 mx-0">
                    <label class="btn btn-light btn-block text-nowrap ${this.formStoredValues.options[4] ? 'active' : ''}" click="checkBoxes" name="check"><input class="tenure-checkbox" type="checkbox" name="tenureOption5" id="fritidshus" ${this.formStoredValues.options[4] ? 'checked' : ''}>Fritidshus</label>
                    </div>
                    <div class="col px-1 mx-0">
                      <label class="btn btn-light btn-block text-nowrap ${this.formStoredValues.options[5] ? 'active' : ''}" click="checkBoxes" name="check"><input class="tenure-checkbox" type="checkbox" name="tenureOption6" id="gardar" ${this.formStoredValues.options[5] ? 'checked' : ''}>Gårdar</label>
                    </div>
                      <div class="col px-1 mx-0">
                        <label class="btn btn-light btn-block text-nowrap ${this.formStoredValues.options[6] ? 'active' : ''}" click="checkBoxes" name="check"><input class="tenure-checkbox" type="checkbox" name="tenureOption7" id="tomter" ${this.formStoredValues.options[6] ? 'checked' : ''}>Tomter</label>
                    </div>
                        <div class="col px-1 mx-0">
                          <label class="btn btn-light btn-block text-nowrap ${this.formStoredValues.options[7] ? 'active' : ''}" click="checkBoxes" name="check"><input class="tenure-checkbox" type="checkbox" name="tenureOption8" id="ovriga" ${this.formStoredValues.options[7] ? 'checked' : ''}>Bostadsrätter</label>
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
                          <select class="form-control" id="min_rooms" name="minrooms" change="doSearch">
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
                          <select class="form-control" id="min_area" name="minarea" change="doSearch">
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
                          <select class="form-control" id="max_price" name="maxprice" change="doSearch">
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
