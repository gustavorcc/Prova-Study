document.addEventListener('DOMContentLoaded', (event) => {
    const catalogList = document.getElementById('catalogList');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const renderCatalog = () => {
        catalogList.innerHTML = '';
        products.forEach((product, index) => {
            const catalogItem = document.createElement('li');
            catalogItem.innerHTML = `
                ${product.name} - $${product.price} - ${product.info}
                <button class="add-to-cart" data-index="${index}">Adicionar ao Carrinho</button>
            `;
            catalogList.appendChild(catalogItem);
        });
    };

    catalogList.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const index = e.target.getAttribute('data-index');
            const product = products[index];
            cart.push(product);
            saveCart();
            alert(`${product.name} foi adicionado ao carrinho!`);
        }
    });

    renderCatalog();
});
