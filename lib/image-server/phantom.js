'use strict';
/* global phantom */

var webpage = require('webpage').create();
var system = require('system');
var url = system.args[1];

webpage.customHeaders = { 'x-site-name': system.args[2] };
webpage.viewportSize = { width: 1024, height: 768 };
webpage.clipRect = {
  top: 0,
  left: 0,
  width: 675,
  height: 350
};

webpage.open(url, function() {
  webpage.evaluate(function() {
    document.body.setAttribute('style', 'width: 100%; margin: 0; padding: 0; position: absolute; height: 100%;');
    document.body.parentNode.setAttribute('style', 'background-color: #efefef;');
    document.querySelector('#results').setAttribute('style', 'text-align: left; width: 400px;');
    document.querySelector('figure').setAttribute('style', 'margin: 0; position: relative; padding: 30px;');
    document.querySelector('figure figcaption').setAttribute('style', 'display: block; width: 400px;');
    document.querySelector('svg.bill').setAttribute('style', 'position: absolute; left: 100%;top: 25px;');

    document.querySelector('.global-header').parentNode.removeChild(document.querySelector('.global-header'));
    document.getElementById('share').parentNode.removeChild(document.getElementById('share'));
  });

  window.setTimeout(function() {
    var base64 = webpage.renderBase64('JPEG');
    console.log(base64);
    phantom.exit();
  }, 200);

});
