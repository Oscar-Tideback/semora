class TestPage extends Base {

  render() {
    return /*html*/`
      <div class="row m-0" route="/testpage" page-title="En testsida">
        <div class="col d-flex">
          Ett testsidan... Du försökte passa följande: ${this.brokerId} 
        </div>
      </div>
    `;
  }

}