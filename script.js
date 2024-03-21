const menu = document.getElementById('menu')
const carBtn = document.getElementById('cart-btn')
const cardModal = document.getElementById('card-modal')
const cartItems = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModal = document.getElementById('close-modal')
const cartConut = document.getElementById('cart-conut')
const address = document.getElementById('address')
const addressWarn = document.getElementById('address-warn')

let cart = [];



carBtn.addEventListener('click', function (e) {
    cardModal.style.display = 'flex'
    upadeModal()
})

cardModal.addEventListener('click', function (e) {
    if (e.target === cardModal) {
        cardModal.style.display = 'none'
    }
})

closeModal.addEventListener('click', function (e) {
    cardModal.style.display = 'none'
})

menu.addEventListener('click', function (e) {
    let parentButao = e.target.closest('.add-to-cart-btn')

    if (parentButao) {
        const name = parentButao.getAttribute("data-name")
        const price = parseFloat(parentButao.getAttribute("data-price"))
        AddTocatd(name, price)
    }
})


function AddTocatd(name, preci) {

    const verifiy = cart.find((item) => item.name === name)
    if (verifiy) {
        verifiy.quantity += 1
    } else {


        cart.push({
            name,
            preci,
            quantity: 1
        })
    }

    upadeModal()


}

function upadeModal() {
    cartItems.innerHTML = ``;
    let total = 0

    cart.forEach(item => {

        const cartInteElemt = document.createElement('div')
        cartInteElemt.classList.add('flex', 'justify-between', 'md-4', 'flex-col')

        cartInteElemt.innerHTML = `
            <div class="flex items-centerr justify-between">
                <div>
                    <p class="font-medium">
                        ${item.name}
                    </p>
                    <p >
                        Qtd:
                        ${item.quantity}
                    </p>
                    <p clas="font-medium mt-z">
                          R$
                        ${item.preci.toFixed(2)}
                    </p>
                </div>
                <button class="remover-itens font-bold" data-name="${item.name}">Remover</button>
                
            </div >

        `
        total += item.preci * item.quantity
        cartItems.appendChild(cartInteElemt)
    })
    cartTotal.innerText = total.toLocaleString('pt-BR', {
        style: "currency",
        currency: 'BRL'

    });

    cartConut.innerHTML = cart.length;

}

cartItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('remover-itens')) {
        const name = e.target.getAttribute('data-name')
        removerItemsCart(name)
    }


})


function removerItemsCart(name) {
    const index = cart.findIndex(item => item.name === name)

    if (index !== -1) {
        const item = cart[index];
        if (item.quantity > 1) {
            item.quantity -= 1;
            upadeModal()
            return;
        }

        cart.splice(index, 1);
        upadeModal()
    }
}
let inputItems
address.addEventListener('input', function (e) {
    inputItems = e.target.value;

    if (inputItems !== "") {

        address.classList.remove('border-red-500')
        addressWarn.classList.add('hidden')
    }



})

checkoutBtn.addEventListener('click', function () {
    const ioSpen = cheVerifit();

    if (!ioSpen) {
        Toastify({
            text: "Ops Estamos fechados",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#FF0000",
            },
        }).showToast();
        return;
    }

    if (cart.length === 0) return;
    if (address.value === '') {
        addressWarn.classList.remove('hidden')
        address.classList.add('border-red-500')
        return;
    }

    const cartItems = cart.map((item) => {
        return (
            `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.preci} |`
        )

    }).join('')


    const message = encodeURIComponent(cartItems)
    const phote = '98984158711';

    window.open(`https://wa.me/${phote}?text=${message} Endereço: ${inputItems.value}`, "_blank")
    cart.length = 0
})

function cheVerifit() {
    const data = new Date();
    const hora = data.getHours;
    return hora >= 18 && hora < 22
}

const gethoras = document.getElementById('gethoras')
const isOpen = cheVerifit()

if (isOpen) {
    gethoras.classList.remove('bg-red-700')
    gethoras.classList.add('bg-green-600')

} else {
    gethoras.classList.remove('bg-green-600')
    gethoras.classList.add('bg-red-700');
}
