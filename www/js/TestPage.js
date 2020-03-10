class TestPage extends Base {

  mount() {
    this.brokerId = -999 //Default
  }

  setBrokerId(id) {
    this.brokerId = id;
    this.render();
    return;
  }

  render() {
    return /*html*/`
      <div class="row m-0" route="/testpage" page-title="En testsida">
        <div class="col d-flex">
          Ett testinnehåll... ${this.brokerId} 
        </div>
      </div>
    `;
  }

}