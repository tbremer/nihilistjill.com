/*jshint unused:false */
'use strict';

if (/\/\w+/.test(location.pathname)) {
  (function() {
    var results = document.getElementById('results'),
    caption = results.querySelector('figcaption'),
    bill = results.querySelector('.bill'),
    captionHeight = caption.clientHeight;

    bill.style.height = captionHeight + 'px';
  })();
}


function stringToFragment(htmlStr) {
  return document.createRange().createContextualFragment(htmlStr);
}

// function createImage(node) {
//   var canvas = document.getElementById('image-maker'),
//   ctx = canvas.getContext('2d');

//   canvas.width = node.clientWidth;
//   canvas.height = node.clientHeight;

//   ctx.font = '30px Lato';
//   ctx.fillText(node.textContent, 10, 50);
// }

var jsButton = [].slice.call(document.querySelectorAll('.js-btn'));

jsButton.forEach(function(btn) { btn.addEventListener('click', window[btn.getAttribute('data-function')]); });

function processNihilism(xhrData) {
  var results = document.getElementById('results'),
  form = document.getElementById('story-generator'),
  share = document.getElementById('share'),
  responseNode = stringToFragment(xhrData.currentTarget.response),
  responseHeight;

  form.className = (/contains-story/.test(form.className) ? form.className.replace('contains-story', '').trim() : form.className + ' contains-story');
  share.className = (/contains-story/.test(share.className) ? share.className.replace('contains-story', '').trim() : share.className + ' contains-story');
  results.className = (/contains-story/.test(results.className) ? results.className.replace('contains-story', '').trim() : results.className + ' contains-story');

  results.querySelector('figcaption').appendChild(responseNode);

  responseHeight = results.querySelector('figcaption').clientHeight;
  results.querySelector('.bill').setAttribute('style', 'height: ' + responseHeight + 'px');

  try {
    history.pushState(null, null, btoa(xhrData.currentTarget.response));
  } catch(e){}

  // createImage(results);
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
  xhr.send(dataString);
}
