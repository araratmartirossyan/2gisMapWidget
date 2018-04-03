'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// стили
var styles = '\n  .modalStyles {\n    position: relative;\n    background: #fff;\n    top: 0;\n    right: 0;\n    left: 0;\n    bottom: 0;\n    align-self: center;\n    border-radius: 8px;\n    min-width: 120px;\n    max-width: 440px;\n  }\n  .modalContainerStyles {\n    background: rgba(0, 0, 0, 0.6509803921568628);\n    width: 100%;\n    position: fixed;\n    top: 0;\n    right: 0;\n    display: -ms-flexbox;\n    display: flex;\n    display: -webkit-flex;\n    display: -moz-box;\n    justify-content: center;\n    left: 0;\n    bottom: 0;\n  }\n  .listStyles {\n    list-style-type: none;\n    font-family: sans-serif;\n    -webkit-padding-start: 0;\n    -webkit-margin-before: 0;\n    -webkit-margin-after: 0;\n    padding-left: 0;\n  }\n  .listItem {\n    padding: 12px 12px 12px 24px;\n    border-bottom: 1px solid #ddd;\n    font-weight: 100;\n  }\n  .listItem:last-child {\n    border: 0\n  }\n';

// Генерация маркеров из файла
var markers = items.map(function (item, key) {
  return item = [item.lat, item.lang, key];
});

// Сортировка информации маркера
function clearedElement(element) {
  var array = ['lat', 'lang', 'id'];
  array.forEach(function(item) {
    return item !== element
  });
}

// Функция создания Dom элементов
function createDomElement(element, id, style) {
  var eleme = document.createElement(element);
  document.body.appendChild(eleme);
  eleme.id = id;
  setStyles(style, eleme);
  if (id === 'modalContainer') {
    eleme.addEventListener('click', closeModal);
  }
  return eleme;
}

// Функция вывода описание в модальном окне
function setMarkerInfo(marker) {
  var list = createDomElement('ul', 'list', 'listStyles');
  for (var info in marker) {
    if (!clearedElement(info)) {
      var listItem = createDomElement('li', 'listItem', 'listItem');
      listItem.innerText = marker[info];
      list.appendChild(listItem);
    }
  }
  return document.getElementById('modalContent').appendChild(list);
}

// Функция создания модального окна 
function createModal(_ref) {
  var latlng = _ref.latlng;

  var markerInfo = items[latlng.alt];
  var container = createDomElement('div', 'modalContainer', 'modalContainerStyles');
  var content = createDomElement('div', 'modalContent', 'modalStyles');
  setMarkerInfo(markerInfo);
  return container.appendChild(content);
}

// Функция уничтожения модального окна
function closeModal() {
  var elem = document.getElementById('modalContainer');
  console.log(elem.parentNode)
  return elem.parentNode.removeChild(elem);
}

// Функция присваивания класса новым Dom элементам
function setStyles(className, element) {
  return element.setAttribute('class', className);
}

// Функция инициализации приложения
function init() {
  // Подключение стилей для IE10 и прочих браузеров
  var styleLink = document.createElement('style');
  styleLink.type = 'text/css';
  if (styleLink.styleSheet) {
    styleLink.styleSheet.cssText = styles;
  } else {
    styleLink.appendChild(document.createTextNode(styles));
  }

  document.getElementsByTagName("head")[0].appendChild(styleLink);

  // Методы работы с картой
  DG.then(function () {
    var map = DG.map('map', {
      center: [54.98, 82.89],
      zoom: 15,
      minZoom: 5,
      maxZoom: 15
    });

    var updatedMarkers = markers.map(function (item, key) {
      return item = DG.marker([].concat(_toConsumableArray(item))).addTo(map);
    });

    var group = DG.featureGroup([].concat(_toConsumableArray(updatedMarkers)));

    map.fitBounds(group.getBounds());
    group.addTo(map);
    group.on('click', function (e) {
      return createModal(e);
    });
  });
}

init();
