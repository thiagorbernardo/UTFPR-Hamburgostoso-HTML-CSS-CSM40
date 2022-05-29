const generateCategories = async () => {
    getAllCategories().then(categories => {
        console.log(categories)
        const menu = document.getElementById('categories');

        categories.forEach(category => {
            const a = document.createElement('a');
            a.className = "card";
            a.href = "products.html?id=" + category.id;
            a.innerHTML = `<h2>${category.nome}</h2>
            <p>${category.id}</p>`;
            menu.appendChild(a);
        });
    })
}

const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const generateProducts = async (id) => {
    getProductsByCategory(id).then(products => {
        console.log(products)
        const menu = document.getElementById('categories');

        products.forEach(product => {
            const a = document.createElement('a');
            a.className = "card";
            a.href = "product.html?id=" + product.id;
            a.innerHTML = `<h2>${product.nome}</h2>
            <p>${product.descricao}</p>
            <p>ID: ${product.id}</p>
            <p>Codigo: ${product.codigo}</p>
            <p>ID Categoria: ${product.categoria}</p>
            <p>Preço: ${formatter.format(product.preco)}</p>
            <p>Peso: ${product.peso} Kg</p>
            `;
            menu.appendChild(a);
        });
    })
}



const inserirCategoria = async () => {
    insertCategory(getElementById('form_categoria').value);
}

const inserirProduto = async () => {
    insertProduct(getElementById('form_name').value, getElementById('form_code').value, getElementById('form_description').value, getElementById('form_price').value, getElementById('form_weight').value, getElementById('form_category').value);
}
