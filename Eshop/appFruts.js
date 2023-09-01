import {
    newId
} from './util.js';
import {
    fruts,
} from './productj.js';

const productContainer = document.getElementById("productContainer");
const addBacket = document.getElementById("addBacket")

const updatedFruts = fruts.map((product, index) => ({
    ...product,
    id: newId(),
}));

function updateProducts(sortedArray) {
    const productsHTML = sortedArray.map(
        (product) => `
        <div class="productCard">
            <h2>${product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Amount: ${product.quantity}</p>
            <button class="addToCartButton" id="addBacket">В корзину</button>
        </div>`
    ).join('');

    productContainer.innerHTML = productsHTML; 
}

updateProducts(updatedFruts); // Вызов функции для обновления продуктов на странице


updateProducts(updatedFruts);

const sortButton = document.getElementById('sortButton')
sortButton.addEventListener('click',() => {
    updatedFruts.sort((a, b) => a.price - b.price);
    updateProducts(updatedFruts)
});

const sortButton2 = document.getElementById('sortButton2')
sortButton2.addEventListener('click',() => {
    updatedFruts.sort((a, b) => b.price - a.price);
    updateProducts(updatedFruts)
});



// выводить общее количество товаров
const resultQuantity = document.getElementById('resultQuantity')
const totalSum = fruts.reduce((accumulator, object) => {
  return accumulator + object.quantity
}, 0)
resultQuantity.textContent = totalSum;

// через функцию reduce выводить общую сумму товаров(price)
const resultPrice = document.getElementById('resultPrice')
const totalPrice = fruts.reduce((accumulator, object) => {
  return accumulator + object.price;
}, 0);
resultPrice.textContent = totalPrice;


// Создаем пустую корзину
const cart = {
    items: [],  // Массив товаров в корзине
    totalQuantity: 0,  // Общее количество товаров в корзине
    totalPrice: 0,    // Общая сумма товаров в корзине
  };
  
  function addToCart(product) {
    cart.items.push(product); // Добавляем товар в корзину
    cart.totalQuantity += product.quantity; // Обновляем общее количество товаров
    cart.totalPrice += product.price * product.quantity; // Обновляем общую сумму
  
    // Обновляем общее количество товаров и общую сумму на странице
    updateQuantity();
    updateTotalPrice();
  
    console.log('Товар добавлен в корзину:', product);
    console.log('Общее количество товаров:', cart.totalQuantity);
    console.log('Общая сумма товаров:', cart.totalPrice);
  }
  
  // Обработчик события клика на кнопке "to cart"
  productContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('addToCartButton')) {
      // Находим родительский элемент (productCard)
      const productCard = event.target.closest('.productCard');
      
      if (productCard) {
        // Извлекаем информацию о товаре из родительского элемента
        const productName = productCard.querySelector('h2').textContent;
        const productPrice = parseFloat(productCard.querySelector('p:nth-child(2)').textContent.split(': ')[1]);
        const productQuantity = parseInt(productCard.querySelector('p:nth-child(3)').textContent.split(': ')[1]);
        
        // Создаем объект для товара
        const product = {
          name: productName,
          price: productPrice,
          quantity: productQuantity,
        };
        
        // Добавляем товар в корзину и обновляем значения
        addToCart(product);
      }
    }
  });
  
  // Функция для обновления общей суммы товаров
  function updateTotalPrice() {
    const totalSum = cart.items.reduce((accumulator, product) => {
      return accumulator + product.price * product.quantity;
    }, 0);
  
    // Обновляем значение на странице
    resultPrice.textContent = totalSum;
  }

  function updateQuantity() {
    const totalQuantity =cart.items.reduce((accumulator,product) => {
        return accumulator + product.quantity;
    },0)
    resultQuantity.textContent = totalQuantity
  }