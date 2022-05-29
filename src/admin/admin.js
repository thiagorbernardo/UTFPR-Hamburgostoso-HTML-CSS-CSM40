const generateCategories = async () => {
    getAllCategories().then(categories => {
        console.log(categories)
        const menu = document.getElementById('categories');

        categories.forEach(category => {
            const a = document.createElement('a');
            a.className = "card";
            a.href = `products.html?id=${category.id}&name=${category.nome}`;
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

const generateProducts = async (id, name) => {
    getProductsByCategory(id).then(products => {
        console.log(products)

        const content = document.getElementById("content");
        const title = document.createElement('h2');
        title.innerHTML = `<h2>Produtos da Categoria ${name}</h2>`;
        content.replaceChild(title, content.firstChild)

        const menu = document.getElementById('categories');
        console.log(menu);

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

const generateProductForm = async (id) => {

}

const generateCategoryForm = async () => {

}
