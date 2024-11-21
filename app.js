const apiUrl = 'https://fakestoreapi.com/products';
const productsContainer = document.getElementById('products');
const loadMoreButton = document.getElementById('load-more');
let limit = 6;
let page = 1; 

async function loadProducts() {
    try {
        const response = await fetch(`${apiUrl}?limit=${limit}&page=${page}`);
        const products = await response.json();
        products.forEach(product => displayProduct(product));
        page++;
    } catch (error) {
        console.error('Ошибка загрузки продуктов -', error);
    }
}

function displayProduct(product) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
        <h3>${product.title}</h3>
        <p>Цена: ${product.price} ₽</p>
        <p>${product.description}</p>
        <button onclick="deleteProduct(${product.id})">Удалить</button>
    `;
    productsContainer.appendChild(productDiv);
}

async function addProduct() {
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ title, price, description, category})
        });
        const newProduct = await response.json();
        displayProduct(newProduct);
        alert('Продукт добавлен успешно!');
    } catch (error) {
        console.error('Ошибка добавления продукта -', error);
    }
}

async function deleteProduct(id) {
    try {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE"});
        alert('Продукт удалён!');
        location.reload();
    } catch (error) {
        console.error('Ошибка удаления продукта -', error);
    }
}

document.getElementById('add-product').addEventListener('click', addProduct);
loadMoreButton.addEventListener('click', loadProducts);

loadProducts();