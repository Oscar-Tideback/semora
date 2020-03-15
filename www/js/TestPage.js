class TestPage extends Base {

  uncheckBoxes(e) {
    this.checkboxes = document.getElementsByName('tenaryOption');


    console.log(e.target);

    //e.target.attributes.reset.value ? console.log("reset was pressed") : '';

    for (let box of this.checkboxes) {
      //box.checked = false;
      //box.parentElement.classList.remove('active');
    }
  }


  render() {
    return /*html*/`
      <div class="row m-0" route="/testpage" page-title="En testsida">
        <div class="col p-4">

        
          <form id="regionf">
            <div class="form-group">

              <div class="row">
                <div class="col">
                  <label for="keywordsInput">Område</label>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <input type="text" class="form-control rounded mr-4" placeholder="Skriv område, adress eller beskrivning..." id="keywordsInput" keyup="searchKeyword" keydown="selectWithUpDownArrows" autocomplete="off" autocorrect="off">
                </div>
                <div class="col-auto">
                  <button class="btn btn-primary" type="submit">Sök</button>
                </div>              
              </div>

              <div class="row-auto m-2">
                <div class="btn-group-toggle" data-toggle="buttons">

                  <div class="row">
                    <div class="col px-1 mx-0">
                      <label class="btn btn-light btn-block active" style="white-space: nowrap" click="uncheckBoxes" id="reset"><input type="checkbox" name="tenaryOption" id="option1">Alla typer</label>
                    </div>
                    <div class="col px-1 mx-0">
                      <label class="btn btn-light btn-block" click="uncheckBoxes"><input type="checkbox" name="tenaryOption" id="option2">Villor</label>
                    </div>
                    <div class="col px-1 mx-0">
                      <label class="btn btn-light btn-block" click="uncheckBoxes"><input type="checkbox" name="tenaryOption" id="option3">Radhus</label>
                    </div>
                    <div class="col px-1 mx-0">
                      <label class="btn btn-light btn-block" click="uncheckBoxes"><input type="checkbox" name="tenaryOption" id="option4">Lägenheter</label>
                    </div>
                  </div>
                  <div class="row">       
                    <div class="col px-1 mx-0">
                      <label class="btn btn-light btn-block" click="uncheckBoxes"><input type="checkbox" name="tenaryOption" id="option5">Fritidshus</label>
                    </div>
                    <div class="col px-1 mx-0">
                      <label class="btn btn-light btn-block" click="uncheckBoxes"><input type="checkbox" name="tenaryOption" id="option6">Gårdar</label>
                    </div>             
                    <div class="col px-1 mx-0">                      
                      <label class="btn btn-light btn-block" click="uncheckBoxes"><input type="checkbox" name="tenaryOption" id="option7">Tomter</label>
                    </div>
                    <div class="col px-1 mx-0">                    
                      <label class="btn btn-light btn-block" click="uncheckBoxes"><input type="checkbox" name="tenaryOption" id="option8">Övriga</label>
                    </div>   
                  </div>  

                </div>
              </div>


            </div>
          </form>      
                  

        </div>
      </div>
    `;
  }

}