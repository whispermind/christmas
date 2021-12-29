import template from "./template";
import "./stylesheet.scss";
import state, { Istate } from "../../state";
import data from "../../data";

class treeDecoration extends HTMLElement {
  audio: HTMLAudioElement = new Audio('./assets/audio/audio.mp3');
  interval: NodeJS.Timer | null = null;
  connectedCallback() {
    this.render();
    if(state.played) this.audio.play();
    if(state.snowflakes) this.interval = setInterval(this.createSnowflake, 100);
    document.body.style.overflow = 'hidden';
  }
  disconnectedCallback(){
    this.audio.pause();
    if(this.interval) clearInterval(this.interval);
    document.body.style.overflow = '';
  }

  private render() {
    this.innerHTML = template;
    this.classList.add('decorations');
    const dragArea = document.querySelector('.decorations__drag-area')! as HTMLElement;
    const tree = dragArea.querySelector('img')!;
    dragArea.style.backgroundImage = `url(./assets/bg/${state.background}.jpg)`;
    tree.src = `./assets/tree/${state.tree}.png`
    this.addToys();
    this.addConfigListeners();
  }
  private addToys(){
    const container = document.querySelector('.decorations__toys-container')!;
    if(!state.like.length){
      for(let i = 0; i < 20; i++){
        container.append(this.createToy(i));
      }
    }
    state.like.forEach((num) => {
      container.append(this.createToy(+num));
    });
  }
  private addConfigListeners(){
    const mediaContainer = document.querySelector('.decoration-config__media-container')!;
    const treesContainer = document.querySelector('.decoration-config__tree-container')!;
    const backgroundContainer = document.querySelector('.decoration-config__background-container')!;
    const dragArea = document.querySelector('.decorations__drag-area')! as HTMLElement;
    const tree = dragArea.querySelector('img')!;
    mediaContainer.addEventListener('click', (event) =>{
      const target = event.target as HTMLElement;
      if(target.classList.contains('decoration-config__sound-button')) this.toggleMusic();
      else if(target.classList.contains('decoration-config__snowflakes-button')) this.toggleSnowflakes();
    });
    treesContainer.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if(target.classList.contains('decoration-config__tree')){
        const src = target.style.backgroundImage;
        tree.src = src.slice(src.indexOf('"') + 1, src.lastIndexOf('"'));
        const num = target.dataset.num;
        if(num) state.tree = +num;
      }
    });
    backgroundContainer.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if(target.classList.contains('decoration-config__background')){
        const src = target.style.backgroundImage;
        dragArea.style.backgroundImage = src;
        const num = target.dataset.num;
        if(num) state.background = +num;
      }
    });
  }
  private createToy(num: number): HTMLElement{
    const thisComponent = document.querySelector('.decorations')!;
    const toyContainer = document.createElement('div');
    const toyImage = document.createElement('img');
    const amountContainer = document.createElement('div');
    const SRC = `./assets/toys/${data[num].num}.png`;
    toyImage.src = SRC;
    toyContainer.classList.add('decorations__toy');
    toyImage.classList.add('decorations__toy-image');
    amountContainer.classList.add('decorations__toy-amount');
    amountContainer.textContent = data[num].count;
    const dragStart = function(event: MouseEvent){
      event.preventDefault;
      const target = event.target as HTMLElement;
      const shiftX = target.clientWidth / 2;
      const shiftY = target.clientHeight / 2;
      let amount = Number(amountContainer.textContent)!;
      if(target.style.position !== 'absolute') amountContainer.textContent =  String(--amount);
      const dragEnd = function(event: MouseEvent){
        if(document.elementFromPoint(event.pageX, event.pageY)?.tagName !== 'AREA') {
          target.style.position = '';
          if(amount === 0) toyImage.src = SRC;
          amountContainer.textContent = String(++amount);
          if(target.classList.contains('clone')){
            target.remove();
          }
          return
        }
        if(amount === 0) toyImage.src = '';
        if(target.classList.contains('clone')){
          target.style.left = `${event.pageX - shiftX}px`;
          target.style.top = `${event.pageY - shiftY}px`;
          return
        }
        const clone = document.createElement('img');
        clone.src = SRC;
        clone.style.position = "absolute";
        clone.style.left = `${event.pageX - shiftX}px`;
        clone.style.top = `${event.pageY - shiftY}px`;
        clone.classList.add('decorations__toy-image', 'clone');
        clone.addEventListener('dragstart', dragStart);
        thisComponent.append(clone);
      }
      window.addEventListener('dragend', dragEnd, {once: true});
    };
    toyContainer.append(toyImage);
    toyContainer.append(amountContainer);
    toyImage.addEventListener('dragstart', dragStart);
    return toyContainer;
  }

  private toggleMusic(){
    if(state.played){
      this.audio.pause();
      state.played = false;
    }else{
      this.audio.play();
      state.played = true;
    }
  }
  private toggleSnowflakes(){
    if(state.snowflakes && this.interval){
      state.snowflakes = false;
      clearInterval(this.interval);
    }else{
      state.snowflakes = true;
      this.interval = setInterval(this.createSnowflake, 100);
    }
  }
  private createSnowflake() {
    const snowflake = document.createElement('div');
    const size = Math.random() * 10 + 10 + 'px';
    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = Math.random().toString();
    snowflake.style.width = size;
    snowflake.style.height = size;
    document.body.appendChild(snowflake);
    setTimeout(() => {
      snowflake.remove();
    }, 5000)
  }
}
customElements.define("decoration-container", treeDecoration);
