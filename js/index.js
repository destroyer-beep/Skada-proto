import {Process} from './Process.js';

const process = new Process();

function modalValve(name) {
  body.insertAdjacentHTML('afterbegin', `
  <div class="modal" id="modal__valve">
    <div class="modal__box">
      <h2>${name}</h2>
      <div class="modal__data">
        <button id="valve__open">Open valve</button>
        <button id="valve__close">Close valve</button>
      </div> 
        <button class="close__window" id="close__window">Exit</button>
</div>
  `)
}

function modalPump(name) {
  body.insertAdjacentHTML('afterbegin', `
  <div class="modal" id="modal__valve">
    <div class="modal__box">
      <h2>${name}</h2>
      <div class="modal__data">
        <button id="pump__start">Start</button>
        <button id="pump__stop">Stop</button>
        <input id="input__pump" placeholder="Введите расход" type="number">
      </div> 
        <button class="close__window" id="close__window">Exit</button>
</div>
  `)
}

function modalRemove(modal) {
  modal.remove();
}

const body = document.querySelector('body');
const AHP300 = document.querySelector('#AHP300');
const AHP400 = document.querySelector('#AHP400');
const AHP401 = document.querySelector('#AHP401');
const PUMP1 = document.querySelector('#PUMP1');

AHP300.addEventListener('click', () => {
  modalValve('AHP300');
  const modal = document.querySelector('.modal');
  
  modal.addEventListener('click', (e) => {

    if(e.target.id === 'valve__open') {
      process.data.state.AHP300 = true;
      AHP300.classList.remove('valve__close');
      AHP300.classList.add('valve__open');
      modalRemove(modal);
      if (!process.data.input) {
        process.startFilling();
      }
    } else if (e.target.id === 'valve__close') {
      process.data.state.AHP300 = false;
      AHP300.classList.add('valve__close');
      AHP300.classList.remove('valve__open');
      modalRemove(modal);
    } else if (e.target.id === 'close__window') {
      modalRemove(modal);
    }

  }) 
})

AHP400.addEventListener('click', () => {
  modalValve('AHP400');
  const modal = document.querySelector('.modal');
  modal.addEventListener('click', (e) => {
    if(e.target.id === 'valve__open') {
      process.data.state.AHP400 = true;
      AHP400.classList.remove('valve__close');
      AHP400.classList.add('valve__open');
      modalRemove(modal);
    } else if (e.target.id === 'valve__close') {
      process.data.state.AHP400 = false;
      AHP400.classList.add('valve__close');
      AHP400.classList.remove('valve__open');
      modalRemove(modal);
    } else if (e.target.id === 'close__window') {
      modalRemove(modal);
    }
  }) 
})

AHP401.addEventListener('click', () => {
  modalValve('AHP401');
  const modal = document.querySelector('.modal');
  modal.addEventListener('click', (e) => {
    if(e.target.id === 'valve__open') {
      process.data.state.AHP401 = true;
      AHP401.classList.remove('valve__close');
      AHP401.classList.add('valve__open');
      modalRemove(modal);
    } else if (e.target.id === 'valve__close') {
      process.data.state.AHP401 = false;
      AHP401.classList.add('valve__close');
      AHP401.classList.remove('valve__open');
      modalRemove(modal);
    } else if (e.target.id === 'close__window') {
      modalRemove(modal);
    }
  }) 
})

PUMP1.addEventListener('click', () => {
  modalPump('PUMP1');
  const modal = document.querySelector('.modal');
  modal.addEventListener('click', (e) => {
    if(e.target.id === 'pump__start') {
      process.data.state.PUMP1 = true;
      process.data.pumpPressure = 6;
      process.data.pumpIndex = 100;
      const inputValue = document.querySelector('#input__pump').value;
      if(inputValue > 0 && inputValue <= 3000) {
        process.data.pumpValue = +inputValue;
      } else {
        process.data.pumpValue = 3000;
      }
      if (!process.data.output) {
        process.startConsumption();
      }
      modalRemove(modal);
    } else if (e.target.id === 'pump__stop') {
        process.stopConsumption();
        modalRemove(modal);
    } else if (e.target.id === 'close__window') {
        modalRemove(modal);
    }
  })
  
})

