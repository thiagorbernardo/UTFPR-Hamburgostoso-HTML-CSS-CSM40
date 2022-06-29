function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");
    //document.getElementById('ibge').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
        //document.getElementById('ibge').value=(conteudo.ibge);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";
            //document.getElementById('ibge').value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

function mascara(i) {

    var v = i.value;

    if (isNaN(v[v.length - 1])) { // impede entrar outro caractere que não seja número
        i.value = v.substring(0, v.length - 1);
        return;
    }

    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";

}

const validateForm = () => {
    if (document.forms["userForm"]["name"].value == "") {
        alert("Insira um nome");
        return;
    }
    if (document.forms["userForm"]["cpf"].value.length < 11) {
        alert("Coloque um cpf válido");
        return;
    }
    if (document.forms["userForm"]["cep"].value.length < 8) {
        alert("Coloque um cep válido");
        return;
    }
    if (document.forms["userForm"]["numero"].value == "") {
        alert("Coloque o número do logradouro");
        return;
    }
    if (document.forms["userForm"]["cidade"].value == "") {
        alert("Coloque a cidade");
        return;
    }
    if (document.forms["userForm"]["uf"].value == "----") {
        alert("Coloque um estado");
        return;
    }
    return true
}

const inserirPedido = () => {
    debugger
    if (!validateForm()) {
        return
    }

    insertOrder(
        document.getElementById('name').value,
        document.getElementById('cpf').value,
        document.getElementById('cep').value,
        document.getElementById('rua').value,
        document.getElementById('numero').value,
        document.getElementById('complemento').value,
        document.getElementById('bairro').value,
        document.getElementById('cidade').value,
        document.getElementById('uf').value,
    ).then(({id}) => {
        sessionStorage.setItem("orderId", id);
        alert("Pedido realizado com sucesso!");
        window.location.href = "../pedidos";
    });
}

const updateCartItem = (id, qtd) => {
    updateCart(id, qtd);
    document.getElementById("Cart-Container").innerHTML = "";
    window.location.reload();
}

const carregarCarrinho = async () => {
    let carrinho = sessionStorage.getItem('cart');
    carrinho = JSON.parse(carrinho) || [];
    const products = await getAllProducts();
    let totalPrice = 0;
    const totalItems = sessionStorage.getItem('cartLength') || 0;
    carrinho.forEach((cartItem, index) => {
        const product = products.find(product => product.id === cartItem.id);
        console.log(product)
        const a = document.createElement('div');
        a.className = index === 0 ? 'Cart-Items' : 'Cart-Items pad';

        a.innerHTML = `
        <div class="image-box" id="image-box" style="object-fit:cover;">
            <img src="${product.imagem}"  />
        </div>
        <div class="about" id="about">
            <h1 class="title">${product.nome}</h1>
            <h3 class="subtitle">${product.descricao}</h3>
        </div>
        <div class="counter" id="counter">
            <div class="quantitySigns" onClick="updateCartItem(${cartItem.id}, ${cartItem.quantity+1})">+</div>
            <div class="count" id="count">${cartItem.quantity}</div>
            <div class="quantitySigns" onClick="updateCartItem(${cartItem.id}, ${cartItem.quantity-1})">-</div>
        </div>
        <div class="prices">
            <div class="amount" id="amount">${formatter.format(cartItem.quantity * product.preco)}</div>
            <div class="remove" onClick="updateCartItem(${cartItem.id}, 0)">Remover</div>
        </div>
    `;
        totalPrice += cartItem.quantity * product.preco;
        document.getElementById("Cart-Container").appendChild(a);
    })

    const a2 = document.createElement('div');
    a2.innerHTML = `<hr>
    <div class="checkout">
        <div class="total">
            <div>
                <div class="Subtotal">Total</div>
                <div class="items">${totalItems}</div>
            </div>
            <div class="total-amount">${formatter.format(totalPrice)}</div>
        </div>
        <button type="button" class="btn btn-success btn-block" onclick="checkout()">Checkout</button>
    </div>`

    document.getElementById("Cart-Container").appendChild(a2);
}

const clearCartItens = () => {
    clearCart();
    window.location.reload()
}

const checkout = async () => {
    let cart = sessionStorage.getItem('cart');
    const orderId = sessionStorage.getItem('orderId');
    if (!cart || !cart.length || !orderId) {
        alert("O carrinho está vazio!");
    }

    cart = JSON.parse(cart);
    const reqs = cart.map(cartItem => {
        return insertOrderItem(orderId, cartItem.id, cartItem.quantity);
    });

    await Promise.all(reqs);

    sessionStorage.removeItem("orderId");
    clearCart();
    window.location.href = "../pedidos";
}