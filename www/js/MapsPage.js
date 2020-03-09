class MapsPage extends Base {

  render() {
    return /*html*/`
      <div class="row m-0" route="/our-regions" page-title="Regioner och Områden">
        <div class="col-12">
          <h1>Karta</h1>
          <p>Mockupkarta (multi-purpose: Regioner + mäklares område + kontor/här finns vi) över regioner eller specifik mäklares område</p>
            <!--Google map  https://mdbootstrap.com/docs/jquery/javascript/google-maps/ -->
            <div id="map-container-google-1" class="z-depth-1-half map-container" style="height: 500px">
            <iframe src="https://maps.google.com/maps?q=Stig Lindbergs Gata 17, Gustavsberg, Sverige&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0"
              style="border:0" allowfullscreen></iframe>
            </div>

            <!--Google Maps-->
          </div>
      </div>
    `;
  }


}
/*
.map-container{
  overflow:hidden;
  padding-bottom:56.25%;
  position:relative;
  height:0;
  }
  .map-container iframe{
  left:0;
  top:0;
  height:100%;
  width:100%;
  position:absolute;
  }
*/