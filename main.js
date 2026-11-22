 //DISPLAY MENU
 
const menuButton = document.getElementById("menuButton");
const navBar = document.getElementById("nav");

menuButton.addEventListener("click", function(){
    navBar.classList.toggle("display");
});

//  SEARCH SECTION FUNCTION
const searchPost = () =>{
    const searchpost = document.getElementById('searchBox').value.toUpperCase();
    const posts = document.querySelectorAll('.product-card');
    const postTile = document.querySelectorAll('.product-category');

    for(let p = 0; p < postTile.length; p++){
        let get = posts[p].querySelectorAll('.product-category')[0];
 
        if(get){
            let text = get.textContent || get.innerHTML;

            if(text.toLocaleUpperCase().indexOf(searchpost) > -1){
                posts[p].style.display = "";
            }else{
                posts[p].style.display = "none";
            }
        }
    }
}




let cart = [];

const cartOverlay = document.getElementById("cartOverlay");
const cartItem = document.getElementById("cartItem");
const cartTotal = document.getElementById("cartTotal");
const closeCart = document.getElementById("closeCart");
const checkoutButton = document.getElementById("checkoutButton");
const cartCount = document.getElementById("cartCount");
const cartButton = document.getElementById("cartButton");


cartButton.addEventListener("click", function(){
    cartOverlay.classList.add("display");
});

closeCart.addEventListener("click", function(){
    cartOverlay.classList.remove("display");
});



//ADD TO CART
const addButton = document.querySelectorAll(".add-to-cart");

addButton.forEach(function(button){
    button.addEventListener("click", function(){
        const productName = button.dataset.name;
        const productPrice = Number(button.dataset.price);

        const existingProduct = cart.find(function(item){
            return item.name === productName;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        }else{
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

         updateCart();

        //cartOverlay.classList.add("display");
        
    });
});

//FUNCTION OF UPDATING CART

function updateCart(){
    cartItem.innerHTML = "";
    
    if (cart.length === 0) {
        cartItem.innerHTML = `
            <p class="empty-cart">
                Your cart is Empty.
            </p>
        `;
        cartCount.textContent = "0";
        cartTotal.textContent = "<s>N</s>0";

        return;
    }

    let total = 0;
    let numberOfItems = 0;

    cart.forEach(function (item, index) {
        total += item.price * item.quantity;
        numberOfItems += item.quantity;

        const cartItemElement = document.createElement("div");

        cartItemElement.classList.add("cart-item");
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>
                    <s>N</s>${item.price.toLocaleString()} 
                </p> 
            </div>

            <div class="quantity-controls">
                <button 
                    class="decrease-item"
                    data-index="${index}"
                    >
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button 
                    class="increase-item"
                    data-index="${index}"
                    >
                    +
                </button>
            </div>

            <button 
                    class="remove-item"
                    data-index"${index}
                    >
                    Remove
                </button>
        `;
          
        cartItem.appendChild(cartItemElement);
    });

    cartCount.textContent = numberOfItems;
    cartTotal.textContent = "#" + total.toLocaleString();

    addCartButtonEvents();
}


//INCREASE THE NUMBER OF PRODUCT IN CART
function addCartButtonEvents() {
    const increaseButtons = document.querySelectorAll(".increase-item");
    
    increaseButtons.forEach(function (button) {
        button.addEventListener("click", function(){
            const index = Number(button.dataset.index);
            cart[index].quantity++;
            updateCart();            
        });
    });

    //DECREASE THE NUMBER OF PRODUCT IN CART
    const decreaseButtons = document.querySelectorAll(".decrease-item");

    decreaseButtons.forEach(function (button) {
        button.addEventListener("click", function(){
            const index = Number(button.dataset.index);

            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            updateCart();     
        });
    });


    //REMOVE ITEM FROM CART

    const removeButtons = document.querySelectorAll(".remove-item");
    
    removeButtons.forEach(function (button) {

        button.addEventListener("click", function(){
            const index = Number(button.dataset.index);

        cart.splice(index, 1);

        updateCart();
        });
    });
}

checkoutButton.addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    alert("You checked out sucessfully");
});
