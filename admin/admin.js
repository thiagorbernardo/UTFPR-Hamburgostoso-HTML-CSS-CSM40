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

        return categories
    });
}

const generateCategoriesForm = async () => {
    getAllCategories().then(categories => {
        const categorias = document.getElementById('category_options')
        categories.forEach(category => {
            const a = document.createElement('option');
            a.value = category.id;
            a.href = `products.html?id=${category.id}`;
            a.innerHTML = category.nome;
            categorias.appendChild(a);
        });
    })
}

const inserirCategoria = async () => {
    elemento = document.getElementById('form_categoria').value;

    insertCategory(document.getElementById('form_categoria').value).then(() => {
        window.location.href = "index.html";
    });
}

const excluirCategoria = async () => {
    const products = document.getElementById('categories');
    if (products.childNodes.length > 1) {
        alert("Você não pode apagar uma categoria que ainda contenha produtos.")
        return
    }
    deleteCategory(urlParams.get('id')).then(() => {
        window.location.href = "index.html";
    });
}

const generateProducts = async (id, name) => {
    getProductsByCategory(id).then(products => {
        console.log(products)

        const title = document.getElementById("categoryName");
        title.innerHTML = `${title.innerHTML} ${urlParams.get('name')}`;

        const menu = document.getElementById('categories');

        products.forEach(product => {
            const a = document.createElement('a');
            a.className = "card";
            a.href = `?id=${id}&name=${name}#updateProduto`;
            a.onclick = () => {
                document.getElementById('selectedProduct').value = product.id;
                console.log(document.getElementById('selectedProduct'))
                console.log(document.getElementById('selectedProduct').value)
                document.getElementById('form_code').value = product.codigo;
                document.getElementById('form_name').value = product.nome;
                document.getElementById('form_description').value = product.descricao;
                document.getElementById('form_price').value = product.preco;
                document.getElementById('form_weight').value = product.peso;
                document.getElementById('category_options').value = product.categoria;
                document.getElementById('form_image').value = product.imagem ?? "";
            }
            console.log(product.imagem)
            a.innerHTML = `<h2>${product.nome}</h2>
            <img src="${product.imagem ?? "../img/avatar.png"}" alt="${product.descricao}" style="width:50%">
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

const inserirProduto = async () => {
    insertProduct(
        document.getElementById('form_name').value,
        document.getElementById('form_code').value,
        document.getElementById('form_description').value,
        document.getElementById('form_price').value,
        document.getElementById('form_image').value,
        document.getElementById('form_weight').value,
        document.getElementById('category_options').value
    ).then(() => {
        window.location.href = window.location.href.replace(window.location.hash, '');
    });
}

const atualizarProduto = async () => {
    updateProduct(
        document.getElementById('selectedProduct').value,
        document.getElementById('form_name').value,
        document.getElementById('form_code').value,
        document.getElementById('form_description').value,
        document.getElementById('form_price').value,
        document.getElementById('form_image').value,
        document.getElementById('form_weight').value,
        document.getElementById('category_options').value
    ).then(() => {
        window.location.href = "products.html?id=" + urlParams.get('id');
    });
}

const excluirProduto = async () => {

}