const url = "http://loja.buiar.com/?key=s7ueaj&f=json"

const postOptions = {
    method: 'POST',
};

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

const insertProduct = async (name, code, description, price, img, weight, categoryId) => {
    const res = await fetch(`${url}&c=produto&t=inserir&nome=${name}&codigo=${code}&descricao=${description}&preco=${price}&peso=${weight}&categoria=${categoryId}&imagem=${img}`, postOptions);
    const data = await res.json();

    return data.dados;
}

const updateProduct = async (id, name, code, description, price, img, weight, categoryId) => {
    //TODO: alterar para alguns serem opcionais
    const res = await fetch(`${url}&c=produto&t=alterar&id=${id}&nome=${name}&codigo=${code}&descricao=${description}&preco=${price}&peso=${weight}&categoria=${categoryId}&imagem=${img}`, postOptions);
    const data = await res.json();

    return data.dados;
}

const deleteProduct = async (id) => {
    const res = await fetch(`${url}&c=produto&t=remover&id=${id}`, postOptions);
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
    const res = await fetch(`${url}&c=categoria&t=inserir&nome=${name}`, postOptions);
    const data = await res.json();

    return data.dados;
}

const updateCategory = async (id, name) => {
    const res = await fetch(`${url}&c=categoria&t=alterar&id=${id}&nome=${name}`, postOptions);
    const data = await res.json();

    return data.dados;
}

const deleteCategory = async (id) => {
    const res = await fetch(`${url}&c=categoria&t=remover&id=${id}`, postOptions);
    const data = await res.json();

    return data.dados;
}

const insertOrder = async (nome, cpf, cep, rua, numero, complemento, bairro, cidade, uf) => {
    const res = await fetch(`${url}&c=pedido&t=inserir&nome=${nome}&cpf=${cpf}&cep=${cep}&rua=${rua}&numero=${numero}&complemento=${complemento}&bairro=${bairro}&cidade=${cidade}&uf=${uf}`, postOptions);
    const data = await res.json();

    return data.dados;
}

const getAllOrders = async () => {
    const res = await fetch(`${url}&c=pedido&t=listar`);
    const data = await res.json();

    return data.dados;
}

const getOrder = async (id) => {
    const res = await fetch(`${url}&c=pedido&t=listar&id=${id}`);
    const data = await res.json();

    return data.dados;
}

const getOrderItems = async (id) => {
    const res = await fetch(`${url}&c=item&t=listar&id=${id}`);
    const data = await res.json();

    return data.dados;
}

const insertOrderItem = async (id, productId, quantity) => {
    const res = await fetch(`${url}&c=item&t=inserir&pedido=${id}&produto=${productId}&qtd=${quantity}`, postOptions);
    const data = await res.json();

    return data.dados;
}


const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});
