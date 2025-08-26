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
