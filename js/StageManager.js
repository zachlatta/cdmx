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

    this.currentStageIndex = 0

    const currentStageClass = this.stageClasses[this.currentStageIndex]

    this.currentStage = new currentStageClass(
      this.rootElement,
      () => this.nextStage() // need to do this to preserve 'this'
    )

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

    this.currentStage = new this.stageClasses[this.currentStageIndex](
      this.rootElement,
      () => this.nextStage() // need to do to preserve 'this'
    )

    this.currentStage.begin()
  }
}
