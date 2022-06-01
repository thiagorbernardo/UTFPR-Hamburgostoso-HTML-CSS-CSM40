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
    }).then(categories => {
        console.log(categories)
        const categorias = document.getElementById('category_options')
        categories.forEach(category => {
            const a = document.createElement('option');
            a.value = category.id;
            a.href = "products.html?id=" + category.id;
            a.innerHTML = category.nome
            categorias.appendChild(a);
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
            a.href = `?id=${id}&product_id=${product.id}#updateProduto`;
            a.onclick = () => {

                document.getElementById('form_code').placeholder = product.codigo;
                document.getElementById('form_name').placeholder = product.nome;
                document.getElementById('form_description').placeholder = product.descricao;
                document.getElementById('form_price').placeholder = product.codigo;
                document.getElementById('form_weight').placeholder = product.peso;
                document.getElementById('form_category').placeholder = product.categoria;
                
                //document.getElementById('form_image').innerHTML = product.image;
                
            }
            a.innerHTML = `<h2>${product.nome}</h2>
            <img src="../img/avatar.png" alt="Avatar" style="width:50%">
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
    elemento = document.getElementById('form_categoria').value;

    insertCategory(document.getElementById('form_categoria').value).then(() => {
        window.location.href = "index.html";
    });

}

const inserirProduto = async () => {
    insertProduct(document.getElementById('form_name').value, document.getElementById('form_code').value, document.getElementById('form_description').value, document.getElementById('form_price').value, document.getElementById('form_weight').value, document.getElementById('category_options').value);
}

const atualizarProduto = async () => {
    updateProduct(document.getElementById('form_name').value, document.getElementById('form_code').value, document.getElementById('form_description').value, document.getElementById('form_price').value, document.getElementById('form_weight').value, document.getElementById('category_options').value);
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