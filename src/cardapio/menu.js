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

const updateCartIcon = (id) => {
    if (id)
        updateCart(id);
    document.getElementById("cartCount").innerHTML = getCartLength();
}

const allowDrop = (e) => {
    e.preventDefault();
}

const drop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    updateCartIcon(id);
}

const generateProducts = async (id) => {
    getProductsByCategory(id).then(products => {
        const menu = document.getElementById(id);

        products.forEach(product => {
            const a = document.createElement('p');
            a.className = "card";
            a.ondblclick = () => updateCartIcon(product.id);
            /* Drag and Drop */
            a.draggable = true;
            a.ondragstart = (e) => {
                e.dataTransfer.setData("id", product.id);

                const img = new Image();
                img.src = '../img/avatar.png';
                e.dataTransfer.setDragImage(img, 10, 10);
            }

            a.innerHTML = `<h2>${product.nome}</h2>
            <p>${product.descricao}</p>
            <p>Preço: ${formatter.format(product.preco)}</p>
            <p>Peso: ${product.peso} Kg</p>
            `;
            menu.appendChild(a);
        });
    })
}