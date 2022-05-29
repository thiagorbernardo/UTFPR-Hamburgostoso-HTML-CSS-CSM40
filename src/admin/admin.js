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
    insertCategory(getElementById('form_categoria'));
}

const inserirProduto = async () => {
    insertProduct(getElementById('form_name'), getElementById('form_code'), getElementById('form_description'), getElementById('form_price'), getElementById('form_weight'), getElementById('form_category'));
}
