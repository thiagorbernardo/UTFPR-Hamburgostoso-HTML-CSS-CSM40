const url = "http://loja.buiar.com/?key=s7ueaj&f=json"

const getAllProducts = async () => {
    const res = await fetch(`${url}&c=produto&t=listar`);
    const data = await res.json();

    return data.dados;
}

const getProductsByCategory = async (categoryId) => {
    const res = await fetch(`${url}&c=produto&t=listar&categoria=${categoryId}`);
    const data = await res.json();

    return data.dados;
}

const insertProduct = async (name, code, description, price, weight, categoryId) => {
    const res = await fetch(`${url}&c=produto&t=inserir&nome=${name}&codigo=${code}&descricao=${description}&preco=${price}&peso=${weight}&categoria=${categoryId}`);
    const data = await res.json();

    return data.dados;
}

const updateProduct = async (id, name, code, description, price, weight, categoryId) => {
    //TODO: alterar para alguns serem opcionais
    const res = await fetch(`${url}&c=produto&t=alterar&id=${id}&nome=${name}&codigo=${code}&descricao=${description}&preco=${price}&peso=${weight}&categoria=${categoryId}`);
    const data = await res.json();

    return data.dados;
}

// Categories

const getAllCategories = async () => {
    const res = await fetch(`${url}&c=categoria&t=listar`);
    const data = await res.json();

    return data.dados;
}

const insertCategory = async (name) => {
    const res = await fetch(`${url}&c=categoria&t=inserir&nome=${name}`);
    const data = await res.json();

    return data.dados;
}

const updateCategory = async (id, name) => {
    const res = await fetch(`${url}&c=categoria&t=alterar&id=${id}&nome=${name}`);
    const data = await res.json();

    return data.dados;
}

const deleteCategory = async (id) => {
    const res = await fetch(`${url}&c=categoria&t=remover&id=${id}`);
    const data = await res.json();

    return data.dados;
}