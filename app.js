const productContainer = document.querySelector('.product-container')
const pageContainer = document.querySelector('.page-container')
const shoppingCartModal= document.querySelector('.shopping-cart-page-container')
const cartAddConfirm = document.querySelector('.modal-add-to-cart')
let cartQuantity = 0

pageContainer.addEventListener('click', (e)=>{
    if (e.target.classList.value === "cart-icon-container" || e.target.classList.value === "fas fa-shopping-cart" ){
       shoppingCartModal.classList.add('open-shopping-modal')

       updateQuantity()
    } else {
        shoppingCartModal.classList.remove('open-shopping-modal')}
    }
)



const updateQuantity = ()=>{
    document.querySelector('.shopping-cart-content-container').innerHTML=""
    let totalPrice = 0
    updateCartIcon()
    if (cartQuantity == 0){
        document.querySelector('.shopping-cart-content-container').insertAdjacentHTML('beforeend', ` <div class="message-container"><h3 class="message"> Your cart is currently empty </h3></div>`)
        document.querySelector('.check-out').style.display="none"
        return document.querySelector('.total-price').style.display="none"
    }
    product.forEach((e)=>{
        if (e.quantity >=1 ){
        let output = ` <div class="shopping-cart-item" id="${e.id}">
        <div class="icon-container">
            <i class="fas fa-tag"></i>
        </div>
        <div class="image-container item-flex">
            <img src="${e.image}">
        </div>
        <div class="item-flex">${e.title}</div>
        <div class="item-flex">$ <span id="product-price">${e.price}</span></div>
        <div class="item-flex cart-item-quantity"> <i class="fas fa-minus"></i> <span id="product-quality"> ${e.quantity} </span> <i class="fas fa-plus"></i> </div>

    </div>`
    totalPrice = totalPrice + (e.price*e.quantity)
    document.querySelector('.shopping-cart-content-container').insertAdjacentHTML('beforeend', output)  }
    })
    document.querySelector('.check-out').style.display="block"
    document.querySelector('.total-price').style.display="block"
    document.getElementById('shopping-cart-total').innerHTML= totalPrice.toFixed(2)

}


productContainer.addEventListener('click', (e)=>{
    if (e.target.classList.value === "product-cart"){
        let productID = e.target.parentNode.parentNode.id
        cartQuantity ++
        updateCartIcon()
        document.body.insertAdjacentHTML('beforeend', ` <div class="modal-add-to-cart">
        <p> Item added</p>
    </div>`)
        product.forEach((e)=>{
            if (e.id === productID){
                e.quantity++
            }
        })
    }
})

shoppingCartModal.addEventListener('click', (e)=>{
    let Btn = e.target.classList.value
    if (Btn ==="close-modal"){
        shoppingCartModal.classList.remove('open-shopping-modal')
    }
    if (Btn === "fas fa-minus" || Btn === "fas fa-plus"){
        let productID = e.target.parentNode.parentNode.id
       if(Btn === "fas fa-minus") {
           cartQuantity = cartQuantity - 1
           product.forEach((e)=>{
               if(e.id === productID){
               return e.quantity = e.quantity - 1}
           })
       } else if (Btn === "fas fa-plus"){
        cartQuantity++
        product.forEach((e)=>{
            if (e.id === productID){
            e.quantity = e.quantity + 1}
        })
       }
       updateQuantity()
       updateCartIcon()
    }
})

const updateCartIcon = ()=>{
    if (cartQuantity == 0){
        return document.querySelector('.cart-quantity').style.display="none"
    }
    if (cartQuantity > 0){
        document.querySelector('.cart-quantity').style.display="block"
        document.querySelector('.cart-quantity').innerHTML= cartQuantity
    }
 
}

let product = []

product.push({
    id: 'product-1',
    title: 'Camera',
    image: "Product1.jpg",
    price: 699.99,
    quantity:0,
})
product.push({
    id: 'product-2',
    title: 'Air Pod',
    image: "Product2.jpg",
    price: 99.99,
    quantity:0,
})
product.push({
    id: 'product-3',
    title: 'Play Station',
    image: "Product3.jpg",
    price: 599.99,
    quantity:0,
})


const init = (product)=>{
    document.querySelector('.cart-quantity').style.display="none"
    product.forEach((e)=>{
        let output = ` <div class="product-card" id="${e.id}">
        <div class="product-image-container">
            <img src="${e.image}">
        </div>
        <div class="product-details-container">
            <span class="product-title">${e.title}</span> <span class="product-price">$<span id="product-price">${e.price}</span></span>
            <span class="product-cart"><i class="fas fa-cart-arrow-down"></i>Add to Cart</span>
        </div>
    </div>`
    productContainer.insertAdjacentHTML('beforeend', output)
    })
}

init(product)