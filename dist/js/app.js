/*jshint unused:false */
'use strict';

var jsButton = [].slice.call(document.querySelectorAll('.js-btn'));

jsButton.forEach(function(btn) { btn.addEventListener('click', window[btn.getAttribute('data-function')]); });

function processNihilism(xhrData) {
  var results = document.getElementById('results');
  var form = document.querySelector('fieldset');

  form.setAttribute('style', 'display: none;');

  results.innerHTML = xhrData.currentTarget.response;
  console.log('processNihilism:');
  console.log(xhrData.currentTarget.response);
}

function generateStory() {
  /* form data */
  var name = document.querySelector('[name=name]').value,
  gender = document.querySelector('[name=gender]').value,
  dataString = 'name=' + name + '&gender=' + gender;

  /* AJAX Stuff */
  var xhr = new XMLHttpRequest(),
  url = '/fuckit';

  xhr.addEventListener('load', processNihilism);
  xhr.open('POST', url);
  xhr.send(dataString);}
