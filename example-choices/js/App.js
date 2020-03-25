class App extends Base {

  mount() {
    this.setInitialChoices();
  }

  setInitialChoices() {
    this.foodChoices = {
      'All food': true,
      'Fish dishes': false,
      'Meat dishes': false,
      'Vegan dishes': false,
      'Chocolate': false
    }
  }

  toggleChoice(e) {
    // this just toggles true/false on all choices
    let prop = e.target.innerText;
    this.foodChoices[prop] = !this.foodChoices[prop];
    // check if something else is chosen except All food
    let somethingElseChosen = Object.entries(this.foodChoices).find(([key, val]) => key !== 'All food' && val);
    // if 'All food' is clicked
    if (prop === 'All food') {
      // if set to true then reset to initial choices
      if (this.foodChoices[prop]) {
        this.setInitialChoices();
      }
      else {
        // if set to false reset to true if nothing else chosen
        if (!somethingElseChosen) {
          this.foodChoices[prop] = true;
        }
      }
    }
    // if something else than 'All food' is clicked
    else {
      this.foodChoices['All food'] = !somethingElseChosen
    }
    this.render();
  }

  render() {
    return /*html*/`
      <div class="container">
        <div class="row mt-5">
           <h1>I can eat:</h1>
        </div>
        <div class="row mt-5">
          ${Object.entries(this.foodChoices).map(([key, val]) => /*html*/`
            <div class="col-12 col-sm-6 cold-md-4">
              <h2 click="toggleChoice" class="${val ? 'bg-primary text-light' : ''} text-center">${key}</h2>
            </div>
          `)}
        </div>
      </div>
      `;
  }

}