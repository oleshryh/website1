import { url } from '../routes'

// Client stories, in the order of the tabs. Only the academy's story is from
// the design; the other three are sample texts written to fill the layout —
// replace them with the clients' real words before launch. `video` is the still
// on the right; clicking it plays the demo video.
export const CLIENTS = [
  {
    name: 'Desna Training Center',
    quote:
      '“We run the machine-gun course through the simulator before every live session. Recruits reach the range already confident with the weapon, and we spend far less ammunition getting them there.”',
    author: 'Head of fire training',
    product: 'Machine Gun Training System',
    video: url('clients/sbgsu-video.jpg'),
  },
  {
    name: 'Armed Forces of Ukraine',
    quote:
      '“The duel scenario changed how our crews think. Drone operators and shooters train against each other, so both sides learn from real decisions rather than scripted targets.”',
    author: 'Unit commander',
    product: 'Duel: FPV vs GUN',
    video: url('clients/sbgsu-video.jpg'),
  },
  {
    name: 'Ministry of Defence of Ukraine',
    quote:
      '“The platform gives instructors objective data on every exercise. Progress is measurable, mistakes are visible, and training time is used where it matters most.”',
    author: 'Training programme officer',
    product: 'RPG-7 Training System',
    video: url('clients/sbgsu-video.jpg'),
  },
  {
    name: 'National Academy of the SBGSU',
    quote:
      '“The training simulator has proven to be a valuable tool in our training process, providing personnel with a realistic and safe environment to develop their skills.”',
    author: 'Instructor for the Ukrainian Armed Forces',
    product: 'FPV Drone Defense System',
    video: url('clients/sbgsu-video.jpg'),
  },
]
