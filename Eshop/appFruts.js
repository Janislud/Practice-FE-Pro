import { newId } from './util.js';
import { fruts } from './productj.js';

const productContainer = document.getElementById("productContainer");
const addBacket = document.getElementById("addBacket")
const productNameInput = document.querySelector('#productName')
const productPriceInput = document.querySelector('#productPrice')
const productQuantityInput = document.querySelector('#productQuantity')

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
            <p>Amount: ${product.quantity}
            <button class="btnMinus">-</button>
            <button class="btnPlus">+</button>
            </p>
            <button class="addToCartButton" id="addBacket">В корзину</button>
            <button class="delete">Удалить товар</button>
        </div>`
    ).join('');

    productContainer.innerHTML = productsHTML;

    const btnPlusList = document.querySelectorAll('.btnPlus');
const btnMinusList = document.querySelectorAll('.btnMinus');

btnPlusList.forEach((btnPlus) => {
    btnPlus.addEventListener('click', (event) => {
        // Находим родительский элемент (productCard)
        const productCard = event.target.closest('.productCard');

        if (productCard) {
            // Извлекаем информацию о товаре из родительского элемента
            const productQuantityElement = productCard.querySelector('p:nth-child(3)');
            const currentQuantity = parseInt(productQuantityElement.textContent.split(': ')[1]);

            if (currentQuantity >= 0) {
                // Увеличиваем количество на 1 и обновляем текст на странице
                const newQuantity = currentQuantity + 1;
                productQuantityElement.textContent = `Amount: ${newQuantity}`;
                console.log('Плюс нажат');
            }
        }
    });
});

btnMinusList.forEach((btnMinus) => {
    btnMinus.addEventListener('click', (event) => {
        // Находим родительский элемент (productCard)
        const productCard = event.target.closest('.productCard');

        if (productCard) {
            // Извлекаем информацию о товаре из родительского элемента
            const productQuantityElement = productCard.querySelector('p:nth-child(3)');
            const currentQuantity = parseInt(productQuantityElement.textContent.split(': ')[1]);

            if (currentQuantity > 0) {
                // Уменьшаем количество на 1 и обновляем текст на странице
                const newQuantity = currentQuantity - 1;
                productQuantityElement.textContent = `Amount: ${newQuantity}`;
                console.log('Минус нажат');
            }
        }
    });
});
}

updateProducts(updatedFruts); // Вызов функции для обновления продуктов на странице



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

//Добовление по кнопке в карзину + вывод
let totalSum = 0; // Для общего количества товаров
let totalPrice = 0; // Для общей суммы товаров
let totalName = ''; // Для имен товаров

const resultQuantity = document.getElementById('resultQuantity');
resultQuantity.textContent = totalSum;

const resultPrice = document.getElementById('resultPrice');
resultPrice.textContent = totalPrice;

const resultName = document.getElementById('resultName');
resultName.textContent = totalName;




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
  
    totalSum = cart.totalQuantity; // Обновляем общее количество товаров
    totalPrice = cart.totalPrice;   // Обновляем общую сумму товаров

    // Обновляем текст контейнеров на странице
    resultQuantity.textContent = totalSum;
    resultPrice.textContent = totalPrice;

    console.log('Товар добавлен в корзину:', product);
    console.log('Общее количество товаров:', cart.totalQuantity);
    console.log('Общая сумма товаров:', cart.totalPrice);

    totalName += `${product.name}, `; // Добавляем имя товара к общей строке
    resultName.textContent = totalName; // Обновляем отображение имен товаров

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

  //Добовление карточки
  const addButton = document.querySelector('.add'); // Выбираем кнопку "Add" из формы

  // Добавляем слушатель события отправки формы
  addButton.addEventListener('click', (event) => {
    event.preventDefault(); // Предотвращаем отправку формы, чтобы страница не перезагружалась
    // Создаем новый объект продукта
    const newProduct = {
      name: productNameInput.value,
      price: parseFloat(productPriceInput.value),
      quantity: parseInt(productQuantityInput.value),
      id: newId(),
    };
    
    // Добавляем новый продукт в массив и обновляем отображение
    updatedFruts.push(newProduct);
    updateProducts(updatedFruts);
    
    // Очищаем поля формы
    productNameInput.value = ' ';
    productPriceInput.value = ' ';
    productQuantityInput.value = ' ';
  });
  

// Функция для удаления товара из корзины по его имени
function removeFromCartByName(name) {
  const productIndex = cart.items.findIndex(item => item.name === name);
  if (productIndex !== -1) {
      const deletedProduct = cart.items.splice(productIndex, 1)[0];
      cart.totalQuantity -= deletedProduct.quantity;
      cart.totalPrice -= deletedProduct.price * deletedProduct.quantity;

      // Обновляем общее количество товаров и общую сумму на странице
      updateQuantity();
      updateTotalPrice();
      updateTotalNames();

      console.log('Товар удален из корзины:', deletedProduct);
      console.log('Общее количество товаров:', cart.totalQuantity);
      console.log('Общая сумма товаров:', cart.totalPrice);
  }
}

// Обработчик события клика на кнопке "Удалить товар" в карточке товара
productContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete')) {
      // Находим родительский элемент (productCard)
      const productCard = event.target.closest('.productCard');

      if (productCard) {
          // Извлекаем имя товара из карточки
          const productName = productCard.querySelector('h2').textContent;

          // Удаляем товар из корзины по его имени
          removeFromCartByName(productName);
      }
  }
});

// Функция для обновления имен товаров
function updateTotalNames() {
  const totalNames = cart.items.map(product => ``).join("");
  resultName.innerHTML = totalNames;
}

