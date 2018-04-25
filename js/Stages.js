// don't instantiate this directly
class Stage {
  constructor(rootElement, nextStage) {
    this.rootElement = rootElement
    this.nextStage = nextStage
  }

  begin() {
    throw new Error('you must override begin()')
  }

  cleanUp() {
    throw new Error('you must override cleanUp()')
  }
}

class VideoStage extends Stage {
  constructor(rootElement, nextStage) {
    super(rootElement, nextStage)

    this.vidPreloadRoot = document.getElementById('vid-preload-rood')

    if (!this.vidPreloadRoot) {
      this.vidPreloadRoot = document.createElement('div')
      this.vidPreloadRoot.setAttribute('style', `
display: none;
      `)

      document.body.appendChild(this.vidPreloadRoot)
    }

    // set this.url when overriding
    let vidUrl = this.url()

    this.vidEl = document.createElement('video')
    this.vidEl.setAttribute('src', vidUrl)
    this.vidEl.setAttribute('style', `
width: 100%;
min-height: 100%;
    `)

    this.vidPreloadRoot.appendChild(this.vidEl)
  }

  begin() {
    // set this.cutoff when overriding
    let cutoff = this.cutoff()

    let that = this
    let calledNextStage = false

    this.vidEl.addEventListener('pause', () => {
      if (!calledNextStage) {
        calledNextStage = true
        that.nextStage()
      }
    })

    if (cutoff) {
      this.vidEl.addEventListener('play', () => {
        setTimeout(function () {
          if (!calledNextStage) {
            calledNextStage = true
            that.nextStage()
          }
        }, cutoff)
      })
    }

    this.rootElement.appendChild(this.vidEl)
    document.body.removeChild(this.vidPreloadRoot)

    this.vidEl.play()
  }

  // override to set a time to cutoff the video
  cutoff() {
    return undefined
  }

  cleanUp() {
    this.rootElement.innerHTML = ''
  }
}

class TextStage extends Stage {
  begin() {
    // set this.text when overriding
    let text = this.text()
    let delay = this.delay()

    let el = document.createElement('h1')
    el.innerText = text
    el.setAttribute('style', `
position: relative;
top: 40%;
transform: translateY(-50%);
text-align: center;
font-family: Arial;
font-size: 48px;
    `)

    this.rootElement.appendChild(el)

    let that = this
    setTimeout(function () {
      that.nextStage()
    }, delay)
  }

  delay() {
    return 1000 // default delay
  }

  cleanUp() {
    this.rootElement.innerHTML = ''
  }
}

class IntroPreface0 extends TextStage {
  text() { return '...' }
}

class IntroPreface1 extends TextStage {
  text() { return 'initializing' }
  delay() { return 500 }
}

class IntroPreface2 extends TextStage {
  text() { return 'initializing mexico' }
  delay() { return 500 }
}

class IntroPreface3 extends TextStage {
  text() { return 'initializing mexico city' }
  delay() { return 500 }
}

class IntroPreface4 extends TextStage {
  text() { return '(also known as cdmx)' }
  delay() { return 1250 }
}

class Intro extends Stage {
  begin() {
    let that = this

    let cdmx = document.createElement('h1')
    cdmx.textContent = 'CDMX'

    that.rootElement.appendChild(cdmx)

    let speed = 1

    let yDirection = 1
    let xDirection = 1

    let x = 0
    let y = 0

    let fontSize = 48

    let fontColor = 'pink'
    let bgColor = 'white'

    let fontWeight = 'normal'

    const frameInterval = 1000 / 60 // every 60th of a second

    let frameAnim
    let colorChangeAnim

    const executeFrame = function () {
      const style = `
font-family: Arial;
font-size: ${fontSize}px;
font-weight: ${fontWeight};
color: ${fontColor};
position: absolute;
top: ${y}px;
left: ${x}px;
margin: 0;
padding: 0;
      `

      cdmx.setAttribute('style', style)

      that.rootElement.setAttribute('style', `
background-color: ${bgColor};
      `)

      // below screen
      if (x + cdmx.scrollWidth > window.innerWidth) {
        xDirection = -1
      }

      // above screen
      if (x <= 0) {
        xDirection = 1
      }

      // right of screen
      if (y + cdmx.scrollHeight > window.innerHeight) {
        yDirection = -1
      }

      // left of screen
      if (y <= 0) {
        yDirection = 1
      }

      x += xDirection * speed
      y += yDirection * speed
      speed = speed * 1.005
      fontSize = fontSize * 1.002

      frameAnim = setTimeout(executeFrame, frameInterval)
    }

    const colorChangeInterval = 1000 / 2 // every 0.5 seconds
    const executeColorChange = function () {
      if (fontColor == 'pink') {
        fontColor = 'black'
        fontWeight = 'bold'
      } else {
        fontColor = 'pink'
        fontWeight = 'normal'
      }

      if (bgColor == 'white') {
        bgColor = 'pink'
      } else {
        bgColor = 'white'
      }

      colorChangeAnim = setTimeout(executeColorChange, colorChangeInterval)
    }

    frameAnim = setTimeout(executeFrame, frameInterval)
    colorChangeAnim = setTimeout(executeColorChange, colorChangeInterval)

    // cancel animation
    setTimeout(function () {
      clearTimeout(frameAnim)
      clearTimeout(colorChangeAnim)

      that.nextStage()
    }, 17500)
  }

  cleanUp() {
    this.rootElement.removeAttribute('style')
    this.rootElement.innerHTML = ''
  }
}

class LetsBegin extends TextStage {
  text() { return "let's begin" }
  delay() { return 2000 }
}

class LetsBeginWarning extends TextStage {
  text() { return 'i apologize in advance to those with slow internet connections' }
  delay() { return 2500 }
}

class SfBreakfastIntro extends TextStage {
  text() { return 'FIRST, BREAKFAST IN SF' }
  delay() { return 1250 }
}
class SfBreakfastIntro2 extends TextStage {
  text() { return 'BAGEL SANDWICH' }
  delay() { return 600 }
}

class SfBreakfast extends VideoStage {
  url() { return 'assets/travel/1_sf_breakfast.mp4' }
  cutoff() { return 4250 }
}

class SfBreakfastPost extends TextStage {
  text() { return 'GOT IT' }
}

class AirplaneTakeoffIntro extends TextStage {
  text() { return 'AIRPLANE TIME' }
}

class AirplaneTakeoff extends VideoStage {
  url() { return 'assets/travel/2_airplane_takeoff.mp4' }
  cutoff() { return 1000 }
}

class AirplaneIntoClouds extends VideoStage {
  url() { return 'assets/travel/3_airplane_into_clouds.mp4' }
  cutoff() { return 750 }
}

class AirplaneOverCdmx extends VideoStage {
  url() { return 'assets/travel/4_airplane_over_cdmx.mp4' }
  cutoff() { return 750 }
}

class AirplaneCdmxClose extends VideoStage {
  url() { return 'assets/travel/5_airplane_cdmx_close.mp4' }
  cutoff() { return 750 }
}

class AirplaneLanding extends VideoStage {
  url() { return 'assets/travel/6_airplane_landing.mp4' }
  cutoff() { return 1000 }
}

class MadeIt extends TextStage {
  text() { return 'MADE IT' }
}

class FirstStop extends TextStage {
  text() { return 'FIRST STOP: ROMA' }
}

class FirstStopDetail extends TextStage {
  text() { return "(it's one of the 16 buroughs)" }
}

class RomaLead extends VideoStage {
  url() { return 'assets/arrival/1_street.mp4' }
  cutoff() { return 5000 }
}

class RomaFountainIntro extends TextStage {
  text() { return 'LOOK AT THIS FOUNTAIN' }
}

class RomaFountain extends VideoStage {
  url() { return 'assets/arrival/2_fountain.mp4' }
  cutoff() { return 3000 }
}

class RomaNeighborhoodIntro extends TextStage {
  text() { return "LET'S CHECK OUT THE NEIGHBORHOOD" }
}

class RomaNeighborhood1 extends VideoStage {
  url() { return 'assets/roma_streets/street_1.mp4' }
  cutoff() { return 2000 }
}

class RomaNeighborhood2 extends VideoStage {
  url() { return 'assets/arrival/4_people.mp4' }
  cutoff() { return 2000 }
}

class RomaNeighborhood3 extends VideoStage {
  url() { return 'assets/arrival/3_drive.mp4' }
  cutoff() { return 2000 }
}

class RomaThingsToDoIntro extends TextStage {
  text() { return 'ALL SORTS OF THINGS TO DO' }
}

class RomaBookIntro extends TextStage {
  text() { return 'LIKE GO TO RIDICULOUS BOOK STORES' }
}

class RomaBookDetail1 extends VideoStage {
  url() { return 'assets/arrival/5_ridiculous_book_stores.mp4' }
  cutoff() { return 4000 }
}

class RomaBookDetail2 extends VideoStage {
  url() { return 'assets/el_pendulo/atrium.mp4' }
  cutoff() { return 5000 }
}

class RomaBookIntro2 extends TextStage {
  text() { return "(this one's called el pendulo)" }
}

class RomaBookIntro3 extends TextStage {
  text() { return 'wonder why?' }
}

class RomaBookDetail3 extends VideoStage {
  url() { return 'assets/el_pendulo/pendulum.mp4' }
  cutoff() { return 3000 }
}

class RomaParkIntro1 extends TextStage {
  text() { return 'AND GO TO THE PARK' }
}

class RomaParkDetail1 extends VideoStage {
  url() { return 'assets/park/walking.mp4' }
  cutoff() { return 5000 }
}

class RomaParkIntro2 extends TextStage {
  text() { return 'EAT ICE CREAM' }
}

class RomaParkDetail2 extends VideoStage {
  url() { return 'assets/park/ice_cream.mp4'}
  cutoff() { return 2000 }
}

class RomaParkIntro3 extends TextStage {
  text() { return 'LOOK AT DOGS' }
}

class RomaParkDetail3 extends VideoStage {
  url() { return 'assets/park/dog.mp4' }
}

class RomaParkIntro4 extends TextStage {
  text() { return '(nearby streets are named after authors)' }
}

class RomaParkDetail4 extends VideoStage {
  url() { return 'assets/park/author_streets.mov' }
}

class FinalText1 extends TextStage {
  text() { return "ok that's all for now" }
}

class FinalText2 extends TextStage {
  text() { return "more content will by added by thursday" }
  delay() { return 2000 }
}

class FinalText3 extends TextStage {
  text() { return "2018-04-26" }
  delay() { return 2000 }
}
