## 2gis виджет для установки карты на любой сайт

Чтобы добавить виджет на Ваш сайт, просто скопируйте код для вставки на страницу, куда Вы хотите подключить виджет. Заранее скачав файлы и положив их в вашу папку. Либо воспользовавшись ссылкой.

Код для вставки:
```
  <script type="text/javascript" src="https://maps.api.2gis.ru/2.0/loader.js"></script>
  <script src="./js/items.js"></script>
  <script src="./js/map.js"></script>
  <!-- Виджет карты -->
  <div id="map" style="width: 100%; height: 700px;"></div> 
  
```

`map.js` - для старых браузерова
`mapes6.js` - для последних браузеров

Для настройки точек координат и вывода информации по ним необходимо создать файл markers.js и зарегистрировать массив объектов точек координат:

```
const items = [
  {
    lat: 54.96,
    lang: 82.889,
    id: 1,
    title: 'Мордор',
    description: 'Описание мордора',
    address: 'Появление Мордора было последствием разрушительных действий Моргота, очевидно сформированный массивными вулканическими извержениями. Ему дали название Мордор уже во времена Саурона, обосновавшегося там, из-за его вулкана Ородруина (который также называли Роковой Горой) и его пламени.',
    phone: '+6 (666) 666-66-66',
    url: 'presious.me'
  },
  {
    lat: 54.96,
    lang: 82.887,
    id: 1,
    title: 'Винтерфел',
    description: 'Винтерфелл — родовой замок дома Старков.Согласно преданию, он был построен восемь тысячелетий назад. Это большой замок, расположенный в центре Севера и являвшийся его столицей.',
    address: '200км от стены на юг',
    phone: '+7 (777) 777-77-77',
    url: 'valarmorghulis.me'
  },
  {
    lat: 54.99,
    lang: 82.896,
    id: 3,
    title: 'Хогвартс',
    description: 'Хогвартс является единственной школой магии в Великобритании и Ирландии. В неё принимаются дети, достигшие 11 лет и обладающие магическими способностями. Как только ребёнок начинает проявлять магические силы, его имя сразу вписывается Пером приёма в специальную Книгу доступа[3], затем, когда магу исполняется одиннадцать, ему приходит письмо о зачислении в Хогвартс со списком необходимых к покупке предметов. К маглорождённым магам и в особых случаях письмо приносит Специальный посланник.',
    address: 'Деревня Хогсмид, Запретный лес 1',
    phone: '+7 (888) 989-99-99',
    url: 'hewhomustnotbenamed.lord'
  }
]

``` 

Затем объявить его над вызовом карты.
