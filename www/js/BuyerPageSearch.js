class BuyerPageSearch extends Base {

  async doSearch(e) {
    this.preventPageReload(e);

    if (document.querySelector('[id="buyerSearchForm"]') === null) {
      // Set headline etc for resultpage BuyerPage.js
      app.buyerPage.textInput = this.formStoredValues.textinput;
      // Fetch this.region.regionName using id supplied from navBarSearch 
      for (let region of this.regionSelection) {
        region.id === this.formStoredValues.region ? app.buyerPage.regionName = region.regionName : 'samtliga regioner';
      }
    }
    else {
      //Fetch form values
      this.formInput = document.querySelector('[id="buyerSearchForm"]');
      this.formStoredValues.textinput = this.formInput.textinput.value;
      this.formStoredValues.region = parseInt(this.formInput.regionselect.value);
      this.formStoredValues.maxprice = parseInt(this.formInput.maxprice.value);
      this.formStoredValues.minrooms = parseInt(this.formInput.minrooms.value);
      this.formStoredValues.minarea = parseInt(this.formInput.minarea.value);
      this.formStoredValues.options[0] = this.formInput.tenureOption1.checked;
      this.formStoredValues.options[1] = this.formInput.tenureOption2.checked;
      this.formStoredValues.options[2] = this.formInput.tenureOption3.checked;
      this.formStoredValues.options[3] = this.formInput.tenureOption4.checked;
      this.formStoredValues.options[4] = this.formInput.tenureOption5.checked;
      this.formStoredValues.options[5] = this.formInput.tenureOption6.checked;
      this.formStoredValues.options[6] = this.formInput.tenureOption7.checked;
      this.formStoredValues.options[7] = this.formInput.tenureOption8.checked;
      for (let option of this.formInput.regionselect) {
        if (option.selected) {
          app.buyerPage.regionName = option.value > 0 ? option.innerHTML : 'samtliga regioner'; break;
        }
      }
    }

    // Set headline etc for resultpage BuyerPage.js
    app.buyerPage.textInput = this.formStoredValues.textinput;

    // Hardcoding alot regarding checkboxes for now. Rewrite code so it populates tenures by occurances in DB Later on...
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
          WHEN LENGTH($textinput) > 1 THEN (
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


  // Real estate tenure checkboxes behaviour. Sets true/false and active. Ugly as f*... fix later!
  checkBoxes(e) {
    // Set checkboxes on <label> click
    if (e.target.id === 'tenureOption1' && !this.formStoredValues.options[0]) {
      this.formStoredValues.options[0] = true;
      // Start at index 1 since option1 is 0
      for (let i = 1; i < 7; i++) this.formStoredValues.options[i] = false;
      for (let formElement of this.formInput) {
        if (formElement.type === 'checkbox' && formElement.id !== 'tenureOption1') formElement.checked = false;
      }
    }

    if (e.target.id !== 'tenureOption1' && this.formStoredValues.options[0]) {
      this.formStoredValues.options[0] = false;
      for (let formElement of this.formInput) {
        if (formElement.id === 'tenureOption1') {
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
      <div class="row m-0 p-0" route="/buy-property" page-title="Köpa bostad">
        <div class="col-12">

          <div class="row p-4">
            <div class="col pt-4 text-center">
              <h2>Sök drömbostaden...</h2>
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
                  <input type="text" class="form-control rounded form-control-lg" placeholder="Ange adress eller annat..." name="textinput" keyup="doSearch" autocomplete="os" autocorrect="off" ${this.formStoredValues.textinput ? ('value="' + this.formStoredValues.textinput + '"') : ''}>
                  <div class="relative-wrapper"> 
                    <button class="btn btn-default magnifier-search-button" type="submit" click="doSearch" name="submitButton"><i class="icofont-search icofont-lg"></i></button>
                  </div>
                </div>

                <div class="col-md-auto mt-4 px-2 ml-0 ml-md-2 pl-md-0 col-sm-12">
                  <select class="form-control form-control-lg" id="region_select" name="regionselect" change="doSearch">
                    <option id="opt0" value="0">Alla regioner</option>
                    ${this.regionSelection.map(region => /*html*/`
                      <option id="opt${region.id}" value="${region.id}" ${region.id === this.formStoredValues.region ? 'selected="selected"' : ''}>${region.regionName}</option>
                    `)}
                  </select>
                </div >
              </div >

            <hr>

            <div class="row-auto pt-2">
              <div class="btn-group-toggle">

                <div class="row">
                  <div class="col px-1 mx-0">
                    <label class="btn btn-light btn-block text-nowrap shadow ${this.formStoredValues.options[0] ? 'active' : ''}" click="checkBoxes">
                      <input class="tenure-checkbox" type="checkbox" id="tenureOption1" ${this.formStoredValues.options[0] ? 'checked' : ''}>
                      Alla typer
                    </label>
                  </div>
                  <div class="col px-1 mx-0">
                    <label class="btn btn-light btn-block text-nowrap shadow ${this.formStoredValues.options[1] ? 'active' : ''}" click="checkBoxes">
                      <input class="tenure-checkbox" type="checkbox" id="tenureOption2" ${this.formStoredValues.options[1] ? 'checked' : ''}>
                      Villor
                    </label>
                  </div>
                  <div class="col px-1 mx-0">
                    <label class="btn btn-light btn-block text-nowrap shadow ${this.formStoredValues.options[2] ? 'active' : ''}" click="checkBoxes">
                      <input class="tenure-checkbox" type="checkbox" id="tenureOption3" ${this.formStoredValues.options[2] ? 'checked' : ''}>
                      Radhus
                    </label>
                  </div>
                  <div class="col px-1 mx-0">
                    <label class="btn btn-light btn-block text-nowrap shadow ${this.formStoredValues.options[3] ? 'active' : ''}" click="checkBoxes">
                      <input class="tenure-checkbox" type="checkbox" id="tenureOption4" ${this.formStoredValues.options[3] ? 'checked' : ''}>
                      Lägenheter
                    </label>
                  </div>
                </div>

                <div class="row">
                  <div class="col px-1 mx-0">
                    <label class="btn btn-light btn-block text-nowrap shadow ${this.formStoredValues.options[4] ? 'active' : ''}" click="checkBoxes">
                      <input class="tenure-checkbox" type="checkbox" id="tenureOption5" ${this.formStoredValues.options[4] ? 'checked' : ''}>
                      Fritidshus
                    </label>
                  </div>
                  <div class="col px-1 mx-0">
                    <label class="btn btn-light btn-block text-nowrap shadow ${this.formStoredValues.options[5] ? 'active' : ''}" click="checkBoxes">
                      <input class="tenure-checkbox" type="checkbox" id="tenureOption6" ${this.formStoredValues.options[5] ? 'checked' : ''}>
                      Gårdar
                    </label>
                  </div>
                  <div class="col px-1 mx-0">
                    <label class="btn btn-light btn-block text-nowrap shadow  ${this.formStoredValues.options[6] ? 'active' : ''}" click="checkBoxes">
                      <input class="tenure-checkbox" type="checkbox" id="tenureOption7" ${this.formStoredValues.options[6] ? 'checked' : ''}>
                      Tomter
                    </label>
                  </div>
                  <div class="col px-1 mx-0">
                    <label class="btn btn-light btn-block text-nowrap shadow ${this.formStoredValues.options[7] ? 'active' : ''}" click="checkBoxes">
                      <input class="tenure-checkbox" type="checkbox" id="tenureOption8" ${this.formStoredValues.options[7] ? 'checked' : ''}>
                      Bostadsrätter
                    </label>
                  </div>
                </div>

              </div>
            </div>

            <hr>

            <div class="row">
              <div class="col"><label for="min_rooms">Minst antal rum</label></div>
              <div class="col"><label for="min_area">Minst boarea</label></div>
              <div class="col"><label for="max_price">Högst pris</label></div>
            </div>

            <div class="row">
              <div class="col">
                <select class="form-control" id="min_rooms" name="minrooms" change="doSearch">
                  ${this.formOptions.minRooms.map(option => /*html*/`
                    <option value="${option.value}" ${this.formStoredValues.minrooms !== option.value ? '' : 'selected="selected"'}>${option.name}</option>
                    `)}
                </select>
              </div>
  
            <div class="col">
              <select class="form-control" id="min_area" name="minarea" change="doSearch">
                  ${this.formOptions.minArea.map(option => /*html*/`
                    <option value="${option.value}" ${this.formStoredValues.minarea !== option.value ? '' : 'selected="selected"'}>${option.name}</option>
                    `)}
              </select>
            </div>
            <div class="col">
              <select class="form-control" id="max_price" name="maxprice" change="doSearch">
                  ${this.formOptions.maxPrice.map(option => /*html*/`
                    <option value="${option.value}" ${this.formStoredValues.maxprice !== option.value ? '' : 'selected="selected"'}>${option.name}</option>
                    `)}
              </select>
            </div>
            </div >

            </div >
          </form >

      </div >
    </div >
  `;
  }

  async popFormOptions() {
    this.regionSelection = await sql(/*sql*/`SELECT * FROM region ORDER BY region.regionName`);

    this.formOptions.minRooms = [
      { name: 'Alla', value: 0 },
      { name: 'Minst 1 rum', value: 1 },
      { name: 'Minst 2 rum', value: 2 },
      { name: 'Minst 3 rum', value: 3 },
      { name: 'Minst 4 rum', value: 4 },
      { name: 'Minst 5 rum', value: 5 },
      { name: 'Minst 10 rum', value: 10 }
    ];

    this.formOptions.minArea = [
      { name: 'Alla', value: 0 },
      { name: 'Minst 20 m²', value: 20 },
      { name: 'Minst 30 m²', value: 30 },
      { name: 'Minst 40 m²', value: 40 },
      { name: 'Minst 50 m²', value: 50 },
      { name: 'Minst 75 m²', value: 75 },
      { name: 'Minst 100 m²', value: 100 },
      { name: 'Minst 125 m²', value: 125 },
      { name: 'Minst 150 m²', value: 150 },
      { name: 'Minst 175 m²', value: 175 },
      { name: 'Minst 200 m²', value: 200 },
      { name: 'Minst 250 m²', value: 250 },
      { name: 'Minst 300 m²', value: 300 },
      { name: 'Minst 350 m²', value: 350 },
      { name: 'Minst 450 m²', value: 450 },
      { name: 'Minst 500 m²', value: 500 }
    ];

    this.formOptions.maxPrice = [
      { name: 'Inget', value: 999999999 },
      { name: '100 000 kr', value: 100000 },
      { name: '200 000 kr', value: 200000 },
      { name: '300 000 kr', value: 300000 },
      { name: '400 000 kr', value: 400000 },
      { name: '500 000 kr', value: 500000 },
      { name: '750 000 kr', value: 750000 },
      { name: '1 000 000 kr', value: 1000000 },
      { name: '1 250 000 kr', value: 1250000 },
      { name: '1 500 000 kr', value: 1500000 },
      { name: '1 750 000 kr', value: 1750000 },
      { name: '2 000 000 kr', value: 2000000 },
      { name: '2 500 000 kr', value: 2500000 },
      { name: '3 000 000 kr', value: 3000000 },
      { name: '3 500 000 kr', value: 3500000 },
      { name: '4 000 000 kr', value: 4000000 },
      { name: '4 500 000 kr', value: 4500000 },
      { name: '5 000 000 kr', value: 5000000 },
      { name: '5 500 000 kr', value: 5500000 },
      { name: '6 000 000 kr', value: 6000000 },
      { name: '7 000 000 kr', value: 7000000 },
      { name: '8 000 000 kr', value: 8000000 },
      { name: '9 000 000 kr', value: 9000000 },
      { name: '10 000 000 kr', value: 10000000 },
      { name: '11 000 000 kr', value: 11000000 },
      { name: '12 000 000 kr', value: 12000000 },
      { name: '13 000 000 kr', value: 13000000 },
      { name: '14 000 000 kr', value: 14000000 },
      { name: '15 000 000 kr', value: 15000000 },
      { name: '20 000 000 kr', value: 20000000 },
      { name: '25 000 000 kr', value: 25000000 }
    ];

    this.formOptions.sortBy = [
      { name: 'pris', value: 0 },
      { name: 'boyta', value: 1 },
      { name: 'antal rum', value: 2 },
      { name: 'region', value: 3 }
    ];

    this.formOptions.order = [
      { name: 'stigande', value: 0 },
      { name: 'fallande', value: 1 }
    ];

  }

  setInitialFormValues() {
    this.formStoredValues = {
      textinput: '',
      region: 0,
      options: [true, false, false, false, false, false, false, false],
      minrooms: 0,
      minarea: 0,
      maxprice: 999999999,
      sortby: 0,
      order: 0,
      layout: 0
    }
  }

}
