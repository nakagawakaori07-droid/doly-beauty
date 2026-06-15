/* =========================
   MENU XỔ XUỐNG
========================= */

const menuButtons = document.querySelectorAll(".menu-btn");

menuButtons.forEach(button => {
    button.addEventListener("click", function(e){
        e.preventDefault();

        const dropdown = this.nextElementSibling;

        if(!dropdown || !dropdown.classList.contains("dropdown-menu")){
            return;
        }

        document.querySelectorAll(".dropdown-menu").forEach(menu => {
            if(menu !== dropdown){
                menu.style.display = "none";
            }
        });

        dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });
});

document.addEventListener("click", function(e){
    if(!e.target.closest(".menu-item")){
        document.querySelectorAll(".dropdown-menu").forEach(menu => {
            menu.style.display = "none";
        });
    }
});


/* =========================
   GIỎ HÀNG
========================= */

let cartCount = 0;
let totalPrice = 0;

const cartItems = document.getElementById("cart-items");
const totalPriceText = document.getElementById("total-price");
const cartNumber = document.getElementById("cart-count");

document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", function(){

        const card = this.closest(".product-card");
        const name = card.querySelector("h3").innerText;
        const priceText = card.querySelector("p").innerText;
        const price = Number(priceText.replace(/\D/g,""));

        if(cartItems.innerHTML.includes("Chưa có sản phẩm")){
            cartItems.innerHTML = "";
        }

        const item = document.createElement("div");
        item.className = "cart-item";

        item.innerHTML = `
            <div class="cart-item-info">
                <h4>${name}</h4>
                <p>${priceText}</p>
            </div>

            <button class="remove-item">
                <i class="fas fa-trash"></i>
            </button>
        `;

        cartItems.appendChild(item);

        cartCount++;
        totalPrice += price;

        cartNumber.textContent = cartCount;
        totalPriceText.textContent =
        totalPrice.toLocaleString("vi-VN") + "đ";

        item.querySelector(".remove-item").addEventListener("click", function(){
            item.remove();

            cartCount--;
            totalPrice -= price;

            if(cartCount < 0){
                cartCount = 0;
            }

            if(totalPrice < 0){
                totalPrice = 0;
            }

            cartNumber.textContent = cartCount;
            totalPriceText.textContent =
            totalPrice.toLocaleString("vi-VN") + "đ";

            if(cartItems.children.length === 0){
                cartItems.innerHTML =
                "<p>Chưa có sản phẩm nào.</p>";
            }
        });
    });
});


/* =========================
   MỞ / ĐÓNG GIỎ HÀNG
========================= */

const openCart = document.getElementById("open-cart");
const closeCart = document.getElementById("close-cart");
const sidebar = document.getElementById("cart-sidebar");

if(openCart && closeCart && sidebar){
    openCart.addEventListener("click", () => {
        sidebar.classList.add("active");
    });

    closeCart.addEventListener("click", () => {
        sidebar.classList.remove("active");
    });
}


/* =========================
   THANH TOÁN
========================= */

const checkoutBtn = document.getElementById("checkout-btn");

if(checkoutBtn){
    checkoutBtn.addEventListener("click", () => {

        if(cartCount === 0){
            alert("Giỏ hàng đang trống!");
            return;
        }

        alert("Thanh toán thành công!\nCảm ơn bạn đã mua hàng tại DOLY BEAUTY ❤️");

        cartCount = 0;
        totalPrice = 0;

        cartNumber.textContent = "0";
        totalPriceText.textContent = "0đ";

        cartItems.innerHTML =
        "<p>Chưa có sản phẩm nào.</p>";
    });
}

/* =========================
   TÌM KIẾM
========================= */

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

function searchProduct(){
    const keyword = searchInput.value.trim().toLowerCase();

    document.querySelectorAll(".product-card").forEach(product => {
        const name = getProductName(product);

        if(name.includes(keyword)){
            product.style.display = "flex";
        }else{
            product.style.display = "none";
        }
    });
}

if(searchInput && searchBtn){
    searchBtn.addEventListener("click", searchProduct);

    searchInput.addEventListener("keyup", function(e){
        if(e.key === "Enter"){
            searchProduct();
        }
    });
}