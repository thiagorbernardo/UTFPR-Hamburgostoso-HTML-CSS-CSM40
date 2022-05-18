const generateMenu = async (products) => {
    const menu = document.getElementById('menuOptions');
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `<a>${product.nome}</a>`;
        menu.appendChild(li);
    });
}