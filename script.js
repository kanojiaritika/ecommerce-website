// // let cartQuantity = document.getElementById("cart-qty");
// // let addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
// // let searchInput = document.getElementById("search-input");
// // let searchBtn = document.getElementById("search-btn");
// // let productCards = document.querySelectorAll(".card");
// // let cartToastEl = document.getElementById("cart-toast");
// // let toastMessageEl = document.getElementById("toast-message");
// // let cartToast = new bootstrap.Toast(cartToastEl, { delay: 2000 }); // auto-hide in 2s

// // // Load existing items from localstorage or initialise empty array
// // let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// // // Initial navbar update
// // cartQuantity.innerText = `Cart ${cartItems.length}`;

// // addToCartBtns.forEach((btn) => {
// //   btn.addEventListener("click", (event) => {
// //     event.preventDefault(); // prevent page reload

// //     let card = event.target.closest(".card"); // parent card
// //     let productName = card.querySelector(".card-title").innerText;
// //     let productPrice = card.querySelector(".card-text").innerText;
// //     let productImg = card.querySelector("img").src;
// //     const productId = productName + productImg;

// //     let existingProduct = cartItems.find((p) => p.id === productId);

// //     if (existingProduct) {
// //       existingProduct.qty++;
// //     } else {
// //       cartItems.push({
// //         id: productId,
// //         name: productName,
// //         price: productPrice,
// //         img: productImg,
// //         qty: 1,
// //       });
// //     }

// //     // Save updated cart to localStorage
// //     localStorage.setItem("cartItems", JSON.stringify(cartItems));

// //     // ✅ Update navbar cart text LIVE
// //     cartQuantity.innerText = `Cart ${cartItems.length}`;

// //     // ✅ Show toast with product name
// //     toastMessageEl.innerText = `✅ ${productName} added to cart!`;
// //     cartToast.show();
// //   });
// // });

// // // ✅ Search filter
// // searchBtn.addEventListener("click", function (e) {
// //   e.preventDefault(); // stop page reload

// //   let query = searchInput.value.toLowerCase();

// //   productCards.forEach((card) => {
// //     let productName = card.querySelector(".card-title").innerText.toLowerCase();

// //     if (productName.includes(query)) {
// //       card.parentElement.style.display = "block"; // show parent col
// //     } else {
// //       card.parentElement.style.display = "none"; // hide parent col
// //     }
// //   });
// // });

// // ------------------------------------------ AJAX VERSION JQUERY----------------------------------------- //
// $(document).ready(function () {
//   let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//   let cartQuantity = $("#cart-qty");
//   let productGrid = $("#product-list");

//   function updateCartCount() {
//     cartQuantity.text(`Cart (${cartItems.length})`);
//   }
//   updateCartCount();

//   // Load products.json
//   $.getJSON("products.json", function (products) {
//     products.forEach((product) => {
//       let card = $(`
//         <div class="col-12 col-md-6 col-lg-3 mb-4">
//           <div class="card">
//             <img src="${product.img}" class="card-img-top product-img" alt="${product.name}" data-description="${product.description}">
//             <div class="card-body">
//               <h5 class="card-title">${product.name}</h5>
//               <p class="card-text">Rs. ${product.price}</p>
//               <a href="#" class="btn btn-primary add-to-cart-btn">Add to Cart</a>
//             </div>
//           </div>
//         </div>
//       `);
//       productGrid.append(card);
//     });

//     // Add to cart functionality after rendering
//     $(".add-to-cart-btn").click(function (e) {
//       e.preventDefault();
//       let card = $(this).closest(".card");
//       let name = card.find(".card-title").text();
//       let price = card.find(".card-text").text();
//       let img = card.find("img").attr("src");
//       let id = name + img;

//       let existing = cartItems.find((p) => p.id === id);
//       if (existing) {
//         existing.qty++;
//       } else {
//         cartItems.push({ id, name, price, img, qty: 1 });
//       }
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//       updateCartCount();
//     });

//     // Product image click → show modal
//     $(".product-img").click(function () {
//       let img = $(this).attr("src");
//       let name = $(this).siblings(".card-body").find(".card-title").text();
//       let desc = $(this).data("description");

//       $("#productModal .modal-title").text(name);
//       $("#productModal .modal-body").html(
//         `<img src="${img}" class="img-fluid"><p class="mt-2">${desc}</p>`
//       );
//       $("#productModal").modal("show");
//     });
//   });
// });

// THIS IS EARILTER CODE UNCOMMENT IF ANY ISSUE----------------------------------------------------------//
// $(document).ready(function () {
//   let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//   let cartQuantity = $("#cart-qty");
//   let productGrid = $("#product-list");

//   function updateCartCount() {
//     let totalQty = cartItems.reduce((sum, p) => sum + p.qty, 0);
//     cartQuantity.text(`Cart ${totalQty}`);
//   }
//   updateCartCount();

//   // Load products.json
//   $.getJSON("products.json", function (products) {
//     products.forEach((product) => {
//       let card = $(`
//         <div class="col-12 col-md-6 col-lg-3 mb-4">
//           <div class="card">
//             <img src="${product.img}"
//                  class="card-img-top product-img"
//                  alt="${product.name}"
//                  data-description="${product.description}">
//             <div class="card-body">
//               <h5 class="card-title">${product.name}</h5>
//               <p class="card-text">Rs. ${product.price}</p>
//               <a href="#" class="btn btn-primary add-to-cart-btn">Add to Cart</a>
//             </div>
//           </div>
//         </div>
//       `);
//       productGrid.append(card);
//     });

//     // Add to cart
//     $(".add-to-cart-btn").click(function (e) {
//       e.preventDefault();
//       let card = $(this).closest(".card");
//       let name = card.find(".card-title").text();
//       let price = card.find(".card-text").text();
//       let img = card.find("img").attr("src");
//       let id = name + img;

//       let existing = cartItems.find((p) => p.id === id);
//       if (existing) {
//         existing.qty++;
//       } else {
//         cartItems.push({ id, name, price, img, qty: 1 });
//       }

//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//       updateCartCount();

//       // Show toast
//       let toast = new bootstrap.Toast($("#cart-toast")[0]);
//       toast.show();
//     });

//     // Product image click → show modal
//     $(".product-img").click(function () {
//       let img = $(this).attr("src");
//       let name = $(this).siblings(".card-body").find(".card-title").text();
//       let desc = $(this).data("description");

//       $("#productModal .modal-title").text(name);
//       $("#productModal .modal-body").html(
//         `<img src="${img}" class="img-fluid"><p class="mt-2">${desc}</p>`
//       );
//       $("#productModal").modal("show");
//     });
//   });
// });
// UNCOMMENT IF ANY ISSUE -----------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartQuantity = document.getElementById("cart-qty");
  const productGrid = document.getElementById("product-list");
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");

  function updateCartCount() {
    let totalQty = cartItems.reduce((sum, p) => sum + p.qty, 0);
    cartQuantity.textContent = `Cart ${totalQty}`;
  }
  updateCartCount();

  // Load products.json
  fetch("products.json")
    .then((res) => res.json())
    .then((products) => {
      renderProducts(products);

      // 🔎 Search button
      searchBtn.addEventListener("click", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = products.filter((p) =>
          p.name.toLowerCase().includes(query)
        );
        renderProducts(filtered);
      });

      // 🔎 Search on typing (optional)
      searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = products.filter((p) =>
          p.name.toLowerCase().includes(query)
        );
        renderProducts(filtered);
      });

      // 🔎 Search on Enter key
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          const query = searchInput.value.toLowerCase();
          const filtered = products.filter((p) =>
            p.name.toLowerCase().includes(query)
          );
          renderProducts(filtered);
        }
      });
    });

  // Render products
  function renderProducts(list) {
    productGrid.innerHTML = "";
    list.forEach((product) => {
      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-3 mb-4";
      col.innerHTML = `
        <div class="card">
          <img src="${product.img}" 
               class="card-img-top product-img" 
               alt="${product.name}" 
               data-description="${product.description}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Rs. ${product.price}</p>
            <a href="#" class="btn btn-primary add-to-cart-btn">Add to Cart</a>
          </div>
        </div>
      `;
      productGrid.appendChild(col);
    });

    // Add to cart buttons
    document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const card = e.target.closest(".card");
        const name = card.querySelector(".card-title").textContent;
        const price = card.querySelector(".card-text").textContent;
        const img = card.querySelector("img").src;
        const id = name + img;

        let existing = cartItems.find((p) => p.id === id);
        if (existing) {
          existing.qty++;
        } else {
          cartItems.push({ id, name, price, img, qty: 1 });
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateCartCount();

        // Show toast
        const toastEl = document.getElementById("cart-toast");
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
      });
    });

    // Product image click → show modal
    document.querySelectorAll(".product-img").forEach((img) => {
      img.addEventListener("click", (e) => {
        const card = e.target.closest(".card");
        const name = card.querySelector(".card-title").textContent;
        const desc = e.target.dataset.description;
        const src = e.target.src;

        document.querySelector("#productModal .modal-title").textContent = name;
        document.querySelector("#productModal .modal-body").innerHTML = `
          <img src="${src}" class="img-fluid">
          <p class="mt-2">${desc}</p>
        `;
        const modal = new bootstrap.Modal(
          document.getElementById("productModal")
        );
        modal.show();
      });
    });
  }
});
