const generateCategories = () => {
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

const generateCategoriesForm = () => {
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

const inserirCategoria = () => {
    const name = document.getElementById('form_categoria').value;

    if (!name) {
        alert("Preencha o nome da categoria.")
        return
    }

    insertCategory(name).then(() => {
        window.location.href = "index.html";
    });
}

const updateCategoria = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const name = document.getElementById('form_categoria').value;

    if (!name) {
        alert("Preencha o nome da categoria.")
        return
    }

    updateCategory(id, name).then(() => {
        window.location.href = `products.html?id=${id}&name=${name}`;
    });
}

const excluirCategoria =() => {
    const products = document.getElementById('categories');
    if (products.childNodes.length > 1) {
        alert("Você não pode apagar uma categoria que ainda contenha produtos.")
        return
    }
    deleteCategory(urlParams.get('id')).then(() => {
        window.location.href = "index.html";
    });
}

const generateProducts = (id, name) => {
    getProductsByCategory(id).then(products => {
        console.log(products)

        const title = document.getElementById("categoryName");
        title.innerHTML = `${title.innerHTML} ${urlParams.get('name')}`;

        const menu = document.getElementById('categories');

        products.forEach(product => {
            const a = document.createElement('a');
            a.className = "card";
            a.onclick = () => {
                $("#updateProduto").modal()
                sessionStorage.setItem('selectedProduct', product.id);
                document.getElementById('form_code').value = product.codigo;
                document.getElementById('form_name').value = product.nome;
                document.getElementById('form_description').value = product.descricao;
                document.getElementById('form_price').value = product.preco;
                document.getElementById('form_weight').value = product.peso;
                document.getElementById('category_options').value = product.categoria;
                document.getElementById('form_image').value = product.imagem ?? "";
            }

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

const validateForm = (name) => {
    const form = document.forms[name]

    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value === '' && form.elements[i].hasAttribute('required')) {
            alert('Há campos obrigatórios vazios!');
            form.elements[i].focus();
        }

        if (form.elements[i].hasAttribute('pattern')) {
            if (!form.elements[i].value.match(form.elements[i].getAttribute('pattern'))) {
                alert('Campo com formato inválido!');
                form.elements[i].focus();
            }
        }
    }

    return true
}

const inserirProduto = async () => {
    if (!validateForm("productForm")) {
        return
    }

    await insertProduct(
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
    const urlParams = new URLSearchParams(window.location.search);
    if (!validateForm("productForm")) {
        return
    }

    await updateProduct(
        sessionStorage.getItem('selectedProduct'),
        document.getElementById('form_name').value,
        document.getElementById('form_code').value,
        document.getElementById('form_description').value,
        document.getElementById('form_price').value,
        document.getElementById('form_image').value,
        document.getElementById('form_weight').value,
        document.getElementById('category_options').value
    ).then(() => {
        window.location.href = `products.html?id=${urlParams.get("id")}&name=${urlParams.get("name")}`;
    });
}

const excluirProduto = async () => {
    await deleteProduct(
        sessionStorage.getItem('selectedProduct')
    ).then(() => {
        window.location.href = `products.html?id=${urlParams.get("id")}&name=${urlParams.get("name")}`;
    });
}

const generateOrders = () => {
    getAllOrders().then(orders => {
        console.log(orders)
        const menu = document.getElementById('orders');
        const list = document.createElement('ol');
        orders.forEach(order => {
            const p = document.createElement('div');
            const listItems = document.createElement('ul');
            listItems.class = "list-group";
            p.innerHTML =
            `
            <li class="list-group-item-dark">ID Pedido: ${order.id}</li>
            <li class="list-group-item">Pedido feito por: ${order.nome} às ${order.time}</li>
            <li class="list-group-item">Endereço: ${order.rua}, ${order.numero} - ${order.cep} (${order.cidade}, ${order.uf})</li>
        
    
          </br>
            
              
            </br></br>`;
        listItems.appendChild(p);
            getOrderItems(order.id).then(itens=> {
                const listItems = document.getElementById('')
                itens.forEach(item => {
                    const a = document.createElement('div');
                    a.innerHTML = `<li class="list-group-item>${item.produto} x${item.qtd}"`
                    listItems.appendChild(a);
                })
            })

            list.appendChild(listItems);
        });

        menu.appendChild(list)
        return orders
    });
}