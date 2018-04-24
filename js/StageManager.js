class StageManager {
  constructor(rootElement, stagesConfig) {
    this.rootElement = rootElement
    this.stageClasses = stagesConfig
    this.state = 'instantiated'
  }

  begin() {
    if (this.stageClasses.length == 0 ) {
      throw new Error('passed stages config is empty')
    }

    this.stages = this.stageClasses.map(stageClass => {
      return new stageClass(this.rootElement, () => this.nextStage())
    })

    this.currentStageIndex = 0
    this.currentStage = this.stages[this.currentStageIndex]

    this.state = 'begun'
    this.currentStage.begin()
  }

  nextStage() {
    if (this.state != 'begun') {
      throw new Error('manager is not currently running')
    }

    if (this.currentStageIndex+1 > this.stageClasses.length-1) {
      throw new Error('all stages complete!')
    } else {
      this.currentStage.cleanUp()
      this.currentStageIndex++
    }

    this.currentStage = this.stages[this.currentStageIndex]
    this.currentStage.begin()
  }
}
