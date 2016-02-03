/* jshint unused:false*/
/* globals CRC32 */
'use strict';

// if (/\/\w+/.test(location.pathname)) {
//   (function() {
//     var results = document.getElementById('results'),
//     caption = results.querySelector('figcaption'),
//     bill = results.querySelector('.bill'),
//     captionHeight = caption.clientHeight,
//     billHeight = bill.clientHeight;

//     if (captionHeight > billHeight) {
//       bill.style.height = captionHeight + 'px';
//     }
//   })();
// }

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

function toggleDynamicElements() {
  var results = document.getElementById('results'),
  form = document.getElementById('story-generator'),
  share = document.getElementById('share'),
  toggle = document.querySelector('.toggle-all');

  form.className = (/contains-story/.test(form.className) ? form.className.replace('contains-story', '').trim() : form.className + ' contains-story');
  results.className = (/contains-story/.test(results.className) ? results.className.replace('contains-story', '').trim() : results.className + ' contains-story');
  share.className = (/contains-story/.test(share.className) ? share.className.replace('contains-story', '').trim() : share.className + ' contains-story');
  toggle.className = (/contains-story/.test(toggle.className) ? toggle.className.replace('contains-story', '').trim() : toggle.className + ' contains-story');

}

function processNihilism(xhrData) {
  var results = document.getElementById('results'),
  responseNode = stringToFragment(xhrData.currentTarget.response),
  caption = results.querySelector('figcaption');

  while (caption.lastChild) { caption.removeChild(caption.lastChild); }

  caption.appendChild(responseNode);

  try {
    history.pushState(null, null, btoa(xhrData.currentTarget.response));
  } catch(e){}

  toggleDynamicElements.call();

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

(function() {
  /**
   * EVENT LISTENERS
   */
  var nameInput = document.querySelector('[name=name]');

  nameInput.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) { generateStory.call(); }
  });
})();
