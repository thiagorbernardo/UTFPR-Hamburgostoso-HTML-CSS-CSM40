const generateCategories = async () => {
    getAllCategories().then(categories => {
        console.log(categories)
        const menu = document.getElementById('categoriesList');
        categories.forEach(category => {
            console.log(category)
            const li = document.createElement('li');
            li.innerHTML = `<a>${category.nome}</a>`;
            menu.appendChild(li);
        });
    })
}

const generateProducts = async () => {
    getAllProducts().then(products => {
        console.log(products)
        const menu = document.getElementById('productsList');
        products.forEach(product => {
            console.log(product)
            const li = document.createElement('li');
            li.innerHTML = `<a>${product.nome}</a>`;
            menu.appendChild(li);
        });
    })
}

const generateProductForm = async () => {

}

const generateCategoryForm = async () => {

}
