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