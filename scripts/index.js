const root = document.getElementById('root')
const config = [
  IntroPreface0,
  IntroPreface1,
  IntroPreface2,
  IntroPreface3,
  IntroPreface4,
  IntroPreface5,
  Intro,
  LetsBegin,
  SfBreakfastIntro,
  SfBreakfastIntro2,
  SfBreakfast,
  AirplaneTakeoffIntro,
  AirplaneTakeoff,
  AirplaneIntoClouds,
  AirplaneOverCdmx,
  AirplaneCdmxClose,
  AirplaneLanding,
  MadeIt,
  FirstStop,
  FirstStopDetail,
  RomaLead,
  RomaFountainIntro,
  RomaFountain,
  RomaNeighborhoodIntro,
  RomaNeighborhood1,
  RomaNeighborhood2,
  RomaNeighborhood3,
  RomaThingsToDoIntro,
  RomaBookIntro,
  RomaBookDetail1,
  RomaBookDetail2,
  RomaBookIntro2,
  RomaBookIntro3,
  RomaBookDetail3
]

const mngr = new StageManager(root, config)

mngr.begin()
