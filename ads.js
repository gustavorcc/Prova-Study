document.addEventListener('DOMContentLoaded', (event) => {
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');

    let products = JSON.parse(localStorage.getItem('products')) || [];

    const saveProducts = () => {
        localStorage.setItem('products', JSON.stringify(products));
    };

    const renderProducts = () => {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const productItem = document.createElement('li');
            productItem.innerHTML = `
                ${product.name} - $${product.price} - ${product.info}
                <button class="edit" data-index="${index}">Editar</button>
                <button class="delete" data-index="${index}">Excluir</button>
            `;
            productList.appendChild(productItem);
        }); 
        atualizarValorTotal();
    };

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('productName').value;
        const price = parseFloat(document.getElementById('productPrice').value);
        const info = document.getElementById('productInfo').value;

        const editIndex = document.getElementById('editIndex').value;
        if (editIndex) {
            products[editIndex] = { name, price, info };
        } else {
            products.push({ name, price, info });
        }
        saveProducts();
        renderProducts();
        productForm.reset();
        document.getElementById('editIndex').value = '';
    });

    productList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit')) {
            const index = e.target.getAttribute('data-index');
            const product = products[index];
            document.getElementById('productName').value = product.name;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productInfo').value = product.info;
            document.getElementById('editIndex').value = index;
        } else if (e.target.classList.contains('delete')) {
            const index = e.target.getAttribute('data-index');
            products.splice(index, 1);
            saveProducts();
            renderProducts();
        }
    });

        function atualizarValorTotal(){
        let valorTotal = clientCart.reduce((total, name) => total + name.valor, 0);
        document.getElementById(
        "valor-total"
        ).textContent = `Valor Total: R${valorTotal}`; 
        };

    renderProducts();
});
