import { url } from '../routes'

// Client stories, in the order of the tabs, in English and Ukrainian. Only the
// academy's story is from the design; the other three are sample texts written
// to fill the layout — replace them with the clients' real words before launch.
// `video` is the still on the right; clicking it plays the demo video.
export const CLIENTS = [
  {
    name: { en: 'Desna Training Center', ua: 'Навчальний центр «Десна»' },
    quote: {
      en: '“We run the machine-gun course through the simulator before every live session. Recruits reach the range already confident with the weapon, and we spend far less ammunition getting them there.”',
      ua: '«Перед кожним бойовим стрільбищем ми проводимо кулеметний курс на тренажері. Новобранці виходять на полігон, уже впевнено володіючи зброєю, і ми витрачаємо значно менше набоїв.»',
    },
    author: { en: 'Head of fire training', ua: 'Начальник вогневої підготовки' },
    product: { en: 'Machine Gun Training System', ua: 'Тренажер кулемета' },
    video: url('clients/sbgsu-video.jpg'),
  },
  {
    name: { en: 'Armed Forces of Ukraine', ua: 'Збройні сили України' },
    quote: {
      en: '“The duel scenario changed how our crews think. Drone operators and shooters train against each other, so both sides learn from real decisions rather than scripted targets.”',
      ua: '«Сценарій дуелі змінив мислення наших екіпажів. Оператори дронів і стрільці тренуються одне проти одного, тож обидві сторони вчаться на реальних рішеннях, а не на заздалегідь заданих цілях.»',
    },
    author: { en: 'Unit commander', ua: 'Командир підрозділу' },
    product: { en: 'Duel: FPV vs GUN', ua: 'Дуель: FPV проти стрілка' },
    video: url('clients/sbgsu-video.jpg'),
  },
  {
    name: { en: 'Ministry of Defence of Ukraine', ua: 'Міністерство оборони України' },
    quote: {
      en: '“The platform gives instructors objective data on every exercise. Progress is measurable, mistakes are visible, and training time is used where it matters most.”',
      ua: '«Платформа дає інструкторам об’єктивні дані про кожну вправу. Прогрес можна виміряти, помилки видно, а час на підготовку витрачається там, де це найважливіше.»',
    },
    author: { en: 'Training programme officer', ua: 'Офіцер програми підготовки' },
    product: { en: 'RPG-7 Training System', ua: 'Тренажер РПГ-7' },
    video: url('clients/sbgsu-video.jpg'),
  },
  {
    name: { en: 'National Academy of the SBGSU', ua: 'Національна академія ДПСУ' },
    quote: {
      en: '“The training simulator has proven to be a valuable tool in our training process, providing personnel with a realistic and safe environment to develop their skills.”',
      ua: '«Тренажер став цінним інструментом у нашому навчальному процесі: він дає особовому складу реалістичне й безпечне середовище для відпрацювання навичок.»',
    },
    author: {
      en: 'Instructor for the Ukrainian Armed Forces',
      ua: 'Інструктор Збройних сил України',
    },
    product: { en: 'FPV Drone Defense System', ua: 'Система протидії FPV-дронам' },
    video: url('clients/sbgsu-video.jpg'),
  },
]
