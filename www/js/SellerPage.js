class SellerPage extends Base {


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

    <div class="row m-0 p-0" route="/sell-property" page-title="Sell property">  
    <div class="col-12 p-0">

      <div class="container d-flex justify-content-center">
       <div class="row p-4 paragraph-maxwidth">     

            <!--Section: Contact-->
              <section class="col section pt-4">
    
              <!--Section heading-->
              <h2 class="section-heading">Kontakta eller besök oss</h2>
              <!--Section description-->
              <p class="section-description pb-4">Har du bestämt dig för att sälja din bostad?<br> Vi förmedlar samt värderar vissa exlusiva bostäder, villor, bostadsrätter, fritidshus, lägenheter, tomter och fastigheter från norr till söder.<br> Våra mäklare träffar dig gärna för en kostnadsfri värdering av din nuvarande bostad, helt förutsättningslöst.</p>
              </div>
              </div>
              <div class="col-12">
               <div class="row p-4">

                <!--Grid column-->
                <div class="col-lg-5">

                  <!--Form with header-->
                  <div class="card border-0 mb-3 shadow">

                    <div class="card-body">
                      <!--Header-->
                      <div class="form-header blue accent-1">
                        <h3><i class="fas fa-envelope "></i> Kontakta oss:</h3>
                      </div>


                      <!--Body-->
                      <form submit="collectFormData">
                      <div class="md-form ">
                       
                        <label class="name-email-phone">Namn:</label>
                        <input name="name" type="text"  title="Skriv ditt för och efternamn" pattern=".{2,}" class="form-control">         
                      </div>
                      <div class="md-form">

                        <label class="name-email-phone">E-Mail:</label>
                        <input name="email" type="email" class="form-control">
                      </div>
                      <div class="md-form">

                      <label class="name-email-phone">Telefon:</label>
                      <input type="text" id="phone" name="phone" pattern="[0-9]{7,10}" title="Skriv ditt telefonnummer 7-10 siffror" class="form-control">
                    </div>
                      <div class="md-form">
  
                        <label class="name-email-phone">Ditt ärende:</label>
                        <textarea name="subject" type="text" class="form-control md-textarea" rows="3"></textarea>
                      </div>
                      <div class="text-center mt-4">
                        <button type="submit"  class="btn border button-color col-12" value="Send">Skicka</button>
                      </div>

                    </div>

                  </div>
                  <!--Form with header-->

                </div>
                <!--Grid column-->

                <div class="col-lg-7 p-2">

                  <!--Google map-->
                  <div id="map-container-google-11" class="mb-4 shadow z-depth-1-half map-container-6" style="height: 400px">
                    <iframe src="https://maps.google.com/maps?q=Åsögatan 9, Stockholm, Sverige&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      frameborder="0" style="border:0" allowfullscreen></iframe>
                  </div>

                  <br>
                  <!--Address-->
                  <div class="row text-left name-email-phone">
                    <div class="col-md-4">
                      <p>Åsögatan 9<br>
                      Stockholm</p>
                    </div>

                    <div class="col-md-4">  
                      <p>08-234 567 89<br>
                      Mån-Fre 8-18</p>
                    </div>

                    <div class="col-md-4">                  
                      <p>dhyr@gmail.com<br>
                      rumson@gmail.com</p>
                    </div>
                  </div>

                </div>
                <!--Grid column-->

              </div>

              </section>
              </div>
          <!--Section: Contact-->
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
