// fazendo requisito 7 (clicar em uma das cores da paleta
// faz com que ela seja selecionada e utilizada para preencher os pixels no quadro):
const colorEvents = document.querySelector('#color-palette');
const pixelsDad = document.querySelector('#pixel-board');
const button = document.querySelector('#clear-board');

colorEvents.addEventListener('click', (color) => {
  for (let index = 0; index < colorEvents.children.length; index += 1) {
    colorEvents.children[index].classList.remove('selected');
  }
  color.target.classList.add('selected');
});
// classList retorna as classes em um array e aí eu posso remover e adicionar a class que eu quero
// https://www.w3schools.com/jsref/event_target.asp

// fazendo requisito 8 (clicar em um pixel dentro do quadro após selecionar
// uma cor na paleta faz com que o pixel seja preenchido com a cor selecionada):
pixelsDad.addEventListener('click', (paint) => {
  const selected = document.querySelector('.selected');
  const p = paint;
  p.target.style.backgroundColor = selected.getAttribute('value');
});
// O getAttribute vai pegar o valor do atributo value aonde foi designado a cor.
// https://www.w3schools.com/jsref/met_element_getattribute.asp
// tive um problema com o meu parâmetro, quando cliquei pra ver o erro, abriu o site do eslint que mostrou formas de resolver o problema, usei uma delas, por isso criei uma variável e coloquei o meu parâmetro dentro, https://eslint.org/docs/rules/no-param-reassign

// fazendo requisito 9 (crie um botão que, ao ser clicado, limpa o
// quadro preenchendo a cor de todos seus pixels com branco):
button.addEventListener('click', () => {
  for (let index = 0; index < pixelsDad.children.length; index += 1) {
    pixelsDad.children[index].style.backgroundColor = 'white';
  }
});

// fazendo bônus, requisito 10 (fazer o quadro de pixels ter
// o tamanho definido pela pessoa usuária):
const inputPixels = document.querySelector('#board-size');
const buttonVqv = document.querySelector('#generate-board');

// construir um quadro de pixels 5x5 para abrir automático:
function createPixel(inputValue) {
  for (let index = 0; index < inputValue; index += 1) {
    const createDivPixel = document.createElement('div');
    createDivPixel.className = 'pixel';
    pixelsDad.appendChild(createDivPixel);
  }
}

function widthPixelsDad(pixels) {
  pixelsDad.style.width = `${pixels * 42}px`;
}
// template strings é uma forma de escrever para concatenar as coisas
// mais facilmente https://www.w3schools.com/js/js_string_templates.asp

// o requisito 11 está dentro do evento do botão, ele é os ifs dentro
// do else porque quando clicar tem que ocorrer a verificação do tamanho
// mínimo e máximo do board:
buttonVqv.addEventListener('click', () => {
  let inputValue = inputPixels.value;
  if (inputValue === '') {
    alert('Board inválido!');
  } else {
    if (inputPixels.value < 5) {
      inputValue = 5;
    }
    if (inputValue > 50) {
      inputValue = 50;
    }
  }
  const pixDadChildren = document.querySelectorAll('div#pixel-board>div.pixel');
  for (let index = pixDadChildren.length - 1; index >= 0; index -= 1) {
    pixDadChildren[index].remove();
  }
  const saveInput = inputValue * inputValue;
  createPixel(saveInput);
  widthPixelsDad(inputValue);
});

function startWithPixels() {
  createPixel(25);
  createColor();
}

window.onload = startWithPixels;

// fazendo bônus, requisito 12 (fazer com que as cores da paleta
// sejam geradas aleatoriamente ao carregar a página):
function createColor() {
  const firstColor = Math.random() * 200 + 50;
  const secondColor = Math.random() * 200 + 50;
  const thirdColor = Math.random() * 200 + 50;
  const rgbFirstColor =
    'rgb(' + firstColor + ', ' + secondColor + ', ' + thirdColor + ')';
  const rgbSecondColor =
    'rgb(' + thirdColor + ', ' + firstColor + ', ' + secondColor + ')';
  const rgbThirdColor =
    'rgb(' + secondColor + ', ' + thirdColor + ', ' + firstColor + ')';
  const redColor = document.querySelector('.red');
  const blueColor = document.querySelector('.blue');
  const greenColor = document.querySelector('.green');
  redColor.style.backgroundColor = rgbFirstColor;
  blueColor.style.backgroundColor = rgbSecondColor;
  greenColor.style.backgroundColor = rgbThirdColor;
  redColor.setAttribute('value', rgbFirstColor);
  blueColor.setAttribute('value', rgbSecondColor);
  greenColor.setAttribute('value', rgbThirdColor);
}
// Math.random é para gerar números aleatórios que podem ser entre 0 e 1,
// por isso multipliquei por 200 para aumentar o número, podendo gerar até
// 3 números e somei com 50 para ter uma margem nas cores rgb e elas não ficarem muito iguais.
// Gerando números entre 50 e 250.
// setAttribute funciona como o getAttribute, só que ao invés de pegar, ele está atribuindo.
