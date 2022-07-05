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

                const img = new Image(10, 10);
                img.src = product.imagem;
                img.onload = () => {
                    img.width = 10;
                    img.heigth = 10;
                }
                e.dataTransfer.setDragImage(img, 0, 0);
            }

            const weight = product.peso < 1 ? `${product.peso * 1000} g` : `${product.peso} Kg`;

            a.innerHTML = `
            <div class="card-header">
                <img src="${product.imagem}" alt="${product.descricao}" width=300px height=200px>
            </div>
            <div class="card-body" height = 100px>
                <h2>${product.nome}</h2>
                <div class="card-description">
                    <p>${product.descricao}</p>
                </div>
                    <div class="card-price">
                        <p>${weight}</p>
                        <p class="card-price-value">${formatter.format(product.preco)}</p>
                    
                    </div>
            </div>
            `;
            menu.appendChild(a);
        });
    })
}