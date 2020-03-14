class TestPage extends Base {






  render() {
    return /*html*/`
      <div class="row m-0" route="/testpage" page-title="En testsida">
        <div class="col p-4">

               

          <form><div class="form-group">

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
                <button class="btn btn-primary" type="submit">Submit form</button>
              </div>              
            </div>

            <div class="row-auto m-2"><div class="btn-group-toggle" data-toggle="buttons">

              <div class="row">
                <div class="col px-1 mx-0">
                  <label class="btn btn-light btn-block active"><input type="radio" name="tenaryType" id="option1">Alla typer</label>
                </div>

                <div class="col px-1 mx-0">
                  <label class="btn btn-light btn-block"><input type="radio" name="tenaryType" id="option2">Villor</label>
                </div>

                <div class="col px-1 mx-0">
                  <label class="btn btn-light btn-block"><input type="radio" name="tenaryType" id="option3">Radhus</label>
                </div>

                <div class="col px-1 mx-0">
                  <label class="btn btn-light btn-block"><input type="radio" name="tenaryType" id="option4">Lägenheter</label>
                </div>
              </div>

              <div class="row">       
                <div class="col px-1 mx-0">
                  <label class="btn btn-light btn-block"><input type="radio" name="tenaryType" id="option5">Fritidshus</label>
                </div>

                <div class="col px-1 mx-0">
                  <label class="btn btn-light btn-block"><input type="radio" name="tenaryType" id="option6">Gårdar</label>
                </div>             

                <div class="col px-1 mx-0">                      
                  <label class="btn btn-light btn-block"><input type="radio" name="tenaryType" id="option7">Tomter</label>
                </div>

                <div class="col px-1 mx-0">                    
                  <label class="btn btn-light btn-block"><input type="radio" name="tenaryType" id="option8">Övriga</label>
                </div>   
              </div>                                  

              <div class="col">
                123
              </div>

            </div></div>
          </div></form>      
                  

        </div>
      </div>
    `;
  }

}