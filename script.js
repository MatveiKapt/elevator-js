const elevator = document.querySelector('.elevator');
const buttons = document.querySelectorAll('.buttons__button');

const STAGE_COUNT = 5;
const stageHeight = window.innerHeight / STAGE_COUNT;
let isMoving = false;
let currentStage = 1;
const callQueue = [];


const processCallQueue = () => {
  if (callQueue.length > 0) {
    isMoving = true;
    const targetStage = callQueue.shift();
    const distance = targetStage - currentStage;
    elevator.style.transitionDuration = `${distance}s`;
    elevator.style.bottom = `${stageHeight * targetStage}px`;
    currentStage = targetStage;
    setTimeout(() => {
      isMoving = false;
      setTimeout(processCallQueue, 3000);
    }, distance * 1000);
  }
};
const onButtonClick = (stage) => {
  return () => {
    if (!isMoving) {
      callQueue.push(stage);

      if (!isMoving) {
        processCallQueue();
      }
    }
  };
};

buttons.forEach((button, index) => {
  button.addEventListener('click', onButtonClick(index));
});
