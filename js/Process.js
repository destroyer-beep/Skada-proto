export class Process {
  constructor() {
    this.data = {
      input: false,
      output: false,
      inputValue: 0,
      outputValue: 0,
      levelValue: 0,
      levelIndex: 0,
      pumpPressure: 0,
      pumpValue: 0,
      pumpIndex: 0, 
      state: {
        AHP300: false,
        AHP400: false,
        AHP401: false,
        pump1: false,
        pipelineInput: false,
        pipelineOutput: false
      }
    }
  }

  startFilling() {
      this.data.input = true;
      this.data.state.pipelineInput = true;
      this.data.inputValue = 2000;
      let startFillingInterval = setInterval(() => {
      if (this.data.levelValue >= 2000 || this.data.input === false || this.data.state.AHP300 === false) {
        clearInterval(startFillingInterval);
        this.stopFilling();
      }
      this.data.levelValue += this.data.inputValue / 3600;
      this.data.levelIndex = this.data.levelValue * 100 / 2000; 
      this.render();
    }, 1000)
  }

  stopFilling() {
     this.data.input = false;
     this.data.state.pipelineInput = false;
     this.data.inputValue = 0;
  }

  startConsumption() {
      this.data.output = true;
      this.data.state.pipelineOutput = true;
      this.data.outputValue = this.data.pumpValue;
      let startFillingInterval = setInterval(() => {
      if (this.data.levelValue <= 0 || this.data.output === false || this.data.state.AHP400 === false || this.data.state.AHP401 === false || this.data.state.PUMP1 === false) {
        clearInterval(startFillingInterval);
        this.stopConsumption();
      }
      this.data.levelValue -= this.data.pumpValue / 3600;
      this.data.levelIndex = this.data.levelValue * 100 / 2000; 
      this.render();
    }, 1000)
  }

  stopConsumption() {
     this.data.output = false;
     this.data.state.pipelineOutput = false;
     this.data.outputValue = 0;
     this.data.pumpPressure = 0;
     this.data.pumpIndex = 0;
     this.data.pumpValue = 0;
     this.data.state.PUMP1 = false;
  }

  render() {
    let inputValue = document.querySelector('#input__value');
    inputValue.textContent = `${this.data.inputValue} л/ч`;

    let outputValue = document.querySelector('#output__value');
    outputValue.textContent = `${this.data.outputValue} л/ч`;

    let levelValue = document.querySelector('#level__value');
    levelValue.textContent = `${this.data.levelValue.toFixed(2)} л`;

    let levelIndex = document.querySelector('#level__index');
    levelIndex.textContent = `${this.data.levelIndex.toFixed(2)} %`;

    let livelLine = document.querySelector('#level__line');
    if (this.data.levelIndex.toFixed(2) > 0) {
      livelLine.setAttribute('height', this.data.levelIndex.toFixed(2) * 1.5);
      livelLine.setAttribute('y', 695.6 - (this.data.levelIndex.toFixed(2) * 1.5));
    }

    let pumpPressure = document.querySelector('#pump__pressure');
    pumpPressure.textContent = `${this.data.pumpPressure} бар`;

    let pumpIndex = document.querySelector('#pump__index');
    pumpIndex.textContent = `${this.data.pumpIndex} %`;

    let pumpValue = document.querySelector('#pump__value');
    pumpValue.textContent = `${this.data.pumpValue} л/ч`;
    
    if(this.data.state.pipelineInput) {
      let pipeline = document.querySelector('#pipeline__input');
      let flow = document.querySelector('#CM100');
      pipeline.classList.remove('pipeline__off');
      pipeline.classList.add('pipeline__on');
      flow.classList.remove('flow__off');
      flow.classList.add('flow__on');
    } else {
      let pipeline = document.querySelector('#pipeline__input');
      let flow = document.querySelector('#CM100');
      pipeline.classList.remove('pipeline__on');
      pipeline.classList.add('pipeline__off');
      flow.classList.remove('flow__on');
      flow.classList.add('flow__off');
    }

    if(this.data.state.pipelineOutput) {
      let pipeline = document.querySelector('#pipeline__output');
      let pipeline1 = document.querySelector('#pipeline__output1');
      let flow = document.querySelector('#CM200');
      pipeline.classList.remove('pipeline__off');
      pipeline.classList.add('pipeline__on');
      pipeline1.classList.remove('pipeline__off');
      pipeline1.classList.add('pipeline__on');
      flow.classList.remove('flow__off');
      flow.classList.add('flow__on');
    } else {
      let pipeline = document.querySelector('#pipeline__output');
      let pipeline1 = document.querySelector('#pipeline__output1');
      let flow = document.querySelector('#CM200');
      pipeline.classList.remove('pipeline__on');
      pipeline.classList.add('pipeline__off');
      pipeline1.classList.remove('pipeline__on');
      pipeline1.classList.add('pipeline__off');
      flow.classList.remove('flow__on');
      flow.classList.add('flow__off');
    }

    if (this.data.pumpValue > 0) {
      PUMP1.classList.remove('pump__off');
      PUMP1.classList.add('pump__on');
    } else if (this.data.pumpValue <= 0) {
        PUMP1.classList.add('pump__off');
        PUMP1.classList.remove('pump__on');
    }
  }
}