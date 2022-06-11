const generateCategories = async () => {
    getAllCategories().then(categories => {
        const menu = document.getElementById('categories');

        categories.forEach(category => {
            const a = document.createElement('div');
            a.innerHTML = `<h2>${category.nome}</h2>`;
            const title = document.createElement('div');
            title.id = category.id

            generateProducts(category.id).then(_ => {
                a.appendChild(title);
                menu.appendChild(a);
            })
        });

        return categories
    });
}

const generateProducts = async (id) => {
    getProductsByCategory(id).then(products => {
        const menu = document.getElementById(id);

        products.forEach(product => {
            const a = document.createElement('a');
            a.className = "card";

            a.innerHTML = `<h2>${product.nome}</h2>
            <p>${product.descricao}</p>
            <p>Preço: ${formatter.format(product.preco)}</p>
            <p>Peso: ${product.peso} Kg</p>
            `;
            menu.appendChild(a);
        });
    })
}