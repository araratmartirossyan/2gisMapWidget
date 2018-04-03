// стили
const styles = `
  .modalStyles {
    position: relative;
    background: #fff;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    align-self: center;
    border-radius: 8px;
    min-width: 120px;
    max-width: 440px;
  }
  .modalContainerStyles {
    background: rgba(0, 0, 0, 0.6509803921568628);
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    display: -moz-box;
    justify-content: center;
    left: 0;
    bottom: 0;
  }
  .listStyles {
    list-style-type: none;
    font-family: sans-serif;
    -webkit-padding-start: 0;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    padding-left: 0;
  }
  .listItem {
    padding: 12px 12px 12px 24px;
    border-bottom: 1px solid #ddd;
    font-weight: 100;
  }
  .listItem:last-child {
    border: 0
  }
`

// Генерация маркеров из файла
const markers = items.map((item, key) =>
  item = [item.lat, item.lang, key])

// Сортировка информации маркера
function clearedElement(element) {
  const array = ['lat', 'lang', 'id']
  return array.includes(element)
}

// Функция создания Dom элементов
function createDomElement(element, id, style) {
  const eleme = document.createElement(element)
  document.body.appendChild(eleme)
  eleme.id = id
  setStyles(style, eleme)
  if (id === 'modalContainer') {
    eleme.addEventListener('click', closeModal)
  }
  return eleme
}

// Функция вывода описание в модальном окне
function setMarkerInfo(marker) {
  const list = createDomElement('ul', 'list', 'listStyles')
  for (let info in marker) {
    if (!clearedElement(info)) {
      const listItem = createDomElement('li', 'listItem', 'listItem')
      listItem.innerText = marker[info]
      list.appendChild(listItem)
    }
  }
  return document.getElementById('modalContent').appendChild(list)
}

// Функция создания модального окна 
function createModal({ latlng }) {
  const markerInfo = items[latlng.alt]
  const container = createDomElement('div', 'modalContainer', 'modalContainerStyles')
  const content = createDomElement('div', 'modalContent', 'modalStyles')
  setMarkerInfo(markerInfo)
  return container.appendChild(content)
}

// Функция уничтожения модального окна
function closeModal() {
  const elem = document.getElementById('modalContainer')
  return elem.remove()
}

// Функция присваивания класса новым Dom элементам
function setStyles(className, element) {
  return element.setAttribute('class', className)
}

// Функция инициализации приложения
function init() {
  // Подключение стилей для IE10 и прочих браузеров
  const styleLink = document.createElement('style')
  styleLink.type = 'text/css'
  if (styleLink.styleSheet) {
    styleLink.styleSheet.cssText = styles
  } else {
    styleLink.appendChild(document.createTextNode(styles))
  }

  document.getElementsByTagName("head")[0].appendChild(styleLink)
  
  // Методы работы с картой
  DG.then(() => {
    const map = DG.map('map', {
      center: [54.98, 82.89],
      zoom: 15,
      minZoom: 5,
      maxZoom: 15
    })

    const updatedMarkers = markers.map((item, key) =>
      item = DG.marker([...item]).addTo(map))

    const group = DG.featureGroup([...updatedMarkers])

    map.fitBounds(group.getBounds())
    group.addTo(map)
    group.on('click', e => createModal(e))
  })
}

init()
