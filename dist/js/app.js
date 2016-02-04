/* jshint unused:false*/
'use strict';

(function(history){
    var pushState = history.pushState;
    history.pushState = function(state) {
        if (typeof history.onpushstate === 'function') {
            history.onpushstate({state: state});
        }

        return pushState.apply(history, arguments);
    };
})(window.history);

(function() {
  history.onpushstate = function() {

  };
})();

function stringToFragment(htmlStr) {
  var fragment;
  try {
    fragment = document.createRange().createContextualFragment(htmlStr);
  } catch (err) {
    var temp = document.createElement('div');

    temp.innerHTML = htmlStr;
    fragment = temp.firstChild;
  }

  return  fragment;
}

var jsButton = [].slice.call(document.querySelectorAll('.js-btn'));

jsButton.forEach(function(btn) {
  var funcs = btn.dataset.function.split(',');

  while (funcs.length) {
    var func = funcs[0].trim();

    btn.addEventListener('click', window[func]);
    funcs.splice(0,1);
  }
});

function clearPathname() {
  if (!/^\/$/.test(location.pathname)) {
    history.pushState(null, null, '/');
  }
}

function shareStory() {
  var url = location.host + '/' + location.pathname;
  FB.ui({
    method: 'share',
    href: url,
  }, function(response){});
}

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
  caption = results.querySelector('figcaption'),
  fbMeta;

  while (caption.lastChild) { caption.removeChild(caption.lastChild); }

  caption.appendChild(responseNode);

  try {
    history.pushState(null, null, btoa(xhrData.currentTarget.response));
  } catch(e){}

  fbMeta = document.head.children.item(3);

  fbMeta.setAttribute('content', '//' + location.host + 'images' + btoa(xhrData.currentTarget.response));

  toggleDynamicElements.call();
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
