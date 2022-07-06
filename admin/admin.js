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
                document.getElementById('form_price').value = product.preco.replace('.', ',');
                document.getElementById('form_weight').value = product.peso.replace('.', ',');
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
            <p>Peso: ${product.peso.replace('.', ',')} Kg</p>
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
        document.getElementById('form_price').value.replace('.', '').replace(',', '.'),
        document.getElementById('form_image').value,
        document.getElementById('form_weight').value.replace(',', '.'),
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
        document.getElementById('form_price').value.replace('.', '').replace(',', '.'),
        document.getElementById('form_image').value,
        document.getElementById('form_weight').value.replace(',', '.'),
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

const generateOrders = async() => {
    const title = document.createElement('h2');
    const menu = document.getElementById('orders');
    const listOrders = document.createElement('ol');
    title.innerHTML = `<h2>Pedidos</h2>`
    menu.appendChild(title);
    const products = await getAllProducts();
    getAllOrders().then(orders => {
        console.log(orders)
        
        orders.forEach(order => {
            let total = 0;

            
            const div = document.createElement('div');
            const listItems = document.createElement('ul');
            listItems.class = "list-group";
            div.innerHTML =
            `
            <li class="list-group-item active">ID Pedido: ${order.id}</li>
            <li class="list-group-item">Pedido feito por: ${order.nome} às ${order.time}</li>
            <li class="list-group-item">Endereço: ${order.rua}, ${order.numero} - ${order.cep} (${order.cidade}, ${order.uf})</li>
             `;
            listItems.appendChild(div);

            getOrderItems(order.id).then(itens => {
                const itensByOrder = itens.filter((item) => item.pedido == order.id);
                console.log(itensByOrder);
    
                itensByOrder.forEach(item => {
                    const li = document.createElement('li');
                    li.className = "list-group-item";
                    const product = products.find((product) => product.id == item.produto);
                    console.log(product)
                    li.innerHTML = `${product.nome} x ${+item.qtd}: ${formatter.format(item.qtd * product.preco)}`
                    listItems.appendChild(li);
                    total += item.qtd * product.preco;
                });
                const li = document.createElement('li');
                li.className = "list-group-item";
                li.innerHTML = `Total: ${formatter.format(total)}`
                listItems.appendChild(li);
            });
            const br = document.createElement('br');
            listOrders.appendChild(listItems);
            listOrders.appendChild(br);
        });
       
    });
    menu.appendChild(listOrders);
    return orders;
}