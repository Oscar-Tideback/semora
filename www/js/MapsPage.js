class MapsPage extends Base {

  render() {
    return /*html*/`
      <div class="row m-0" route="/our-regions" page-title="Regioner och Områden">
        <div class="col-12">
          <h5></h5>
          
            <!--Section: Contact v.1-->
<section class="section pb-5">

<!--Section heading-->
<h2 class="section-heading h1 pt-4">Kontakta eller besök oss.</h2>
<!--Section description-->
<p class="section-description pb-4">.</p>

<div class="row">

  <!--Grid column-->
  <div class="col-lg-5 mb-4">

    <!--Form with header-->
    <div class="card">

      <div class="card-body">
        <!--Header-->
        <div class="form-header blue accent-1">
          <h3><i class="fas fa-envelope"></i> Kontakta oss:</h3>
        </div>

        <p>We'll write rarely, but with only the best content.</p>
        <br>

        <!--Body-->
        <div class="md-form">
          <i class="fas fa-user prefix grey-text"></i>
          <input type="text" id="form-name" class="form-control">
          <label for="form-name">Your name</label>
        </div>

        <div class="md-form">
          <i class="fas fa-envelope prefix grey-text"></i>
          <input type="text" id="form-email" class="form-control">
          <label for="form-email">Your email</label>
        </div>

        <div class="md-form">
          <i class="fas fa-tag prefix grey-text"></i>
          <input type="text" id="form-Subject" class="form-control">
          <label for="form-Subject">Subject</label>
        </div>

        <div class="md-form">
          <i class="fas fa-pencil-alt prefix grey-text"></i>
          <textarea id="form-text" class="form-control md-textarea" rows="3"></textarea>
          <label for="form-text">Icon Prefix</label>
        </div>

        <div class="text-center mt-4">
          <button class="btn btn-light-blue">Submit</button>
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
        <a>Stig Lindbergs Gata 17</a>
        <p>Gustavsberg</p>
        <p>Värmdö</p>
      </div>

      <div class="col-md-4">
        <a class="btn-floating blue accent-1"><i class="fas fa-phone"></i></a>
        <p>+ 01 234 567 89</p>
        <p>Mon - Fri, 8:00-22:00</p>
      </div>

      <div class="col-md-4">
        <a class="btn-floating blue accent-1"><i class="fas fa-envelope"></i></a>
        <p>Dhyr@gmail.com</p>
        <p>Rumson@gmail.com</p>
      </div>
    </div>

  </div>
  <!--Grid column-->

</div>

</section>
<!--Section: Contact v.1-->

            

          </div>
      </div>
    `;
  }


}

//https://maps.google.com/maps?q=Stig Lindbergs Gata 17, Gustavsberg, Sverige&t=&z=13&ie=UTF8&iwloc=&output=embed