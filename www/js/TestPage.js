class TestPage extends Base {

  render() {
    return /*html*/`
      <div class="row m-0" route="/testpage" page-title="En testsida">
        <div class="col d-flex">
          <h1>Ett testsida</h1>
           Du ville visa följande: ${this.realEstateId} 
        </div>
      </div>
    `;
  }

}