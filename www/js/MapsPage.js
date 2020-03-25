class MapsPage extends Base {


  async mount() {
  }

  async collectFormData(e) {
    // Loop through the form and collect the input
    let data = {};
    for (let element of [...e.target.closest('form').elements]) {
      if (!element.name) { continue; }
      data[element.name] = element.value;
    }
    //send data sql;
    e.preventDefault();
    await sql(/*sql*/`
      INSERT INTO potentialCustomer (name, email, phone, subject) 
      VALUES($name, $email, $phone, $subject);
    `, data);

    $('#thanksModal').modal('toggle');
  }

  render() {
    return /*html*/`
      <div class="row p-4 m-0" route="/our-regions" page-title="Regioner och Områden">
        <div class="container my-4"> 
            <!--Section: Contact v.1-->
              <section class="section pb-5">

              <!--Section heading-->
              <h2 class="section-heading h1 pt-4 col-12 text-center">Kontakta eller besök oss.</h2>
              <!--Section description-->
              <p class="section-description pb-4"></p>

              <div class="row">

                <!--Grid column-->
                <div class="col-lg-5 mb-4">

                  <!--Form with header-->
                  <div class="card">

                    <div class="card-body">
                      <!--Header-->
                      <div class="form-header blue accent-1">
                        <h3><i class="fas fa-envelope "></i> Kontakta oss:</h3>
                      </div>


                      <!--Body-->
                      <form submit="collectFormData">
                      <div class="md-form">
                        <i class="fas fa-user prefix grey-text"></i>
                        <label>Namn:</label>
                        <input name="name" type="text" pattern="[a-ö]{2,100}" title="Skriv ditt för och efternamn" class="form-control">         
                      </div>
                      <div class="md-form">
                        <i class="fas fa-envelope prefix grey-text"></i>
                        <label>E-Mail:</label>
                        <input name="email" type="email" class="form-control">
                      </div>
                      <div class="md-form">
                      <i class="fas fa-envelope prefix grey-text"></i>
                      <label>Telefon:</label>
                      <input type="text" id="phone" name="phone" pattern="[0-9]{7,10}" title="Skriv ditt telefonnummer 7-10 siffror" class="form-control">
                    </div>
                      <div class="md-form">
                        <i class="fas fa-tag prefix grey-text"></i>
                        <label>Ditt ärende:</label>
                        <textarea name="subject" type="text" class="form-control md-textarea" rows="3"></textarea>
                      </div>
                      <div class="text-center mt-4">
                        <button type="submit"  class="btn border btn-primary" value="Send">Skicka</button>
                      </div>

                    </div>

                  </div>
                  <!--Form with header-->

                </div>
                <!--Grid column-->

                <!--Grid column-->
                <div class="col-lg-7">

                  <!--Google map-->
                  <div id="map-container-google-11" class="z-depth-1-half map-container-6" style="height: 400px">
                    <iframe src="https://maps.google.com/maps?q=Stig Lindbergs Gata 17, Gustavsberg, Sverige&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      frameborder="0" style="border:0" allowfullscreen></iframe>
                  </div>

                  <br>
                  <!--Buttons-->
                  <div class="row text-center">
                    <div class="col-md-4">
                      <a class="btn-floating blue accent-1"><i class="fas fa-map-marker-alt"></i></a>
                      <a>Stig Lindbergsg 17</a>
                      <p>Gustavsberg</p>
                      <p>Värmdö</p>
                    </div>

                    <div class="col-md-4">
                      <a class="btn-floating blue accent-1"><i class="fas fa-phone"></i></a>
                      <p>08-234 567 89</p>
                      <p>Mon-Fri 8:00-22:00</p>
                    </div>

                    <div class="col-md-4">
                      <a class="btn-floating blue accent-1"><i class="fas fa-envelope"></i></a>
                      <p>dhyr@gmail.com</p>
                      <p>rumson@gmail.com</p>
                    </div>
                  </div>

                </div>
                <!--Grid column-->

              </div>

              </section>
          <!--Section: Contact v.1-->
          <!--Thank you modal-->
          </div>
          <div class="modal fade" id="thanksModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header  alert alert-success"  role="alert">
                  <h4 class="modal-title" id="exampleModalLabel">Tack för visat intresse!</h4>
                  <button type="button" class="close"  href="/" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                  <p>Ditt meddelande har skickats!<br>
                  Vi återkommer snarast till dig via telefon eller email.</p>
                </div>
                <div class="mt-4 modal-footer">
                  <a href="/" type="button" class="btn btn-primary float-left"  data-dismiss="modal">Till startsidan!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
