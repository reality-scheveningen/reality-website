/* global google */
function initMap() { // eslint-disable-line
  var el = document.getElementById('contact-map')

  if (!el) {
    return
  }

  var map = new google.maps.Map(el, {
    disableDefaultUI: true,
    scrollwheel: false,
    draggable: !('ontouchend' in document),
    center: {lat: 52.0957914, lng: 4.2584797},
    zoom: 14,
    backgroundColor: 'none',
    styles: [{
      'featureType': 'all',
      'elementType': 'labels.text.fill',
      'stylers': [{'saturation': 36}, {'color': '#000000'}, {'lightness': 40}]
    }, {
      'featureType': 'all',
      'elementType': 'labels.text.stroke',
      'stylers': [{'visibility': 'on'}, {'color': '#000000'}, {'lightness': 16}]
    }, {
      'featureType': 'all',
      'elementType': 'labels.icon',
      'stylers': [{'visibility': 'off'}]
    }, {
      'featureType': 'administrative',
      'elementType': 'geometry.fill',
      'stylers': [{'color': '#000000'}, {'lightness': 20}]
    }, {
      'featureType': 'administrative',
      'elementType': 'geometry.stroke',
      'stylers': [{'color': '#000000'}, {'lightness': 17}, {'weight': 1.2}]
    }, {
      'featureType': 'landscape',
      'elementType': 'geometry',
      'stylers': [{'color': '#000000'}, {'lightness': 20}]
    }, {
      'featureType': 'poi',
      'elementType': 'geometry',
      'stylers': [{'color': '#000000'}, {'lightness': 21}]
    }, {
      'featureType': 'road.highway',
      'elementType': 'geometry.fill',
      'stylers': [{'color': '#000000'}, {'lightness': 17}]
    }, {
      'featureType': 'road.highway',
      'elementType': 'geometry.stroke',
      'stylers': [{'color': '#000000'}, {'lightness': 29}, {'weight': 0.2}]
    }, {
      'featureType': 'road.arterial',
      'elementType': 'geometry',
      'stylers': [{'color': '#000000'}, {'lightness': 18}]
    }, {
      'featureType': 'road.local',
      'elementType': 'geometry',
      'stylers': [{'color': '#000000'}, {'lightness': 16}]
    }, {
      'featureType': 'transit',
      'elementType': 'geometry',
      'stylers': [{'color': '#000000'}, {'lightness': 19}]
    }, {'featureType': 'water', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 17}]}]
  })

  var marker = new google.maps.Marker({
    position: {lat: 52.0957914, lng: 4.2606684},
    map: map,
    icon: {
      path: 'M42.9 29v-3c0-.6.4-1 1-1h6.6l-18-17.9L14.6 25h6.6c.6 0 1 .4 1 1v3c0 .6-.4 1-1 1H4.5c-1.1 0-1.4-.6-.6-1.4L31.1 1.4c.8-.8 2-.8 2.8 0L61 28.5c.8.8.5 1.4-.6 1.4H43.9c-.6.1-1-.3-1-.9zM4.5 35h16.6c.6 0 1 .4 1 1v3c0 .6-.4 1-1 1h-6.6l17.9 17.9 18-17.9h-6.6c-.6 0-1-.4-1-1v-3c0-.6.4-1 1-1h16.6c1.1 0 1.4.6.6 1.4L33.9 63.6c-.8.8-2 .8-2.8 0L3.9 36.4c-.7-.8-.5-1.4.6-1.4z',
      size: new google.maps.Size(32, 32),
      fillColor: '#ffffff',
      fillOpacity: 1,
      strokeWeight: 0,
      scale: 0.5,
      anchor: new google.maps.Point(32, 32)
    },
    title: 'Reality Scheveningen',
    url: 'https://www.google.nl/maps/place/Rode+Kruislaan,+2565+HE+Den+Haag/@52.0803677,4.260659,17z/data=!3m1!4b1!4m5!3m4!1s0x47c5b0e67a3fd6b7:0xb9b14c36ec042ca7!8m2!3d52.0803677!4d4.2628477'
  })

  google.maps.event.addListener(marker, 'click', function () {
    window.open(this.url, '_blank')
  })
}
