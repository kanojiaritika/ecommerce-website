document.addEventListener("DOMContentLoaded", () => {
  const cartQuantity = document.getElementById("cart-qty");
  const cartList = document.getElementById("cart-list");
  const emptyCartMsg = document.getElementById("empty-cart");
  const subtotalEl = document.querySelector(".sub-total");
  const totalEl = document.querySelector(".total");
  const clearBtn = document.querySelector(".clear-cart");

  // Load cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Render cart
  function renderCart() {
    cartList.innerHTML = "";

    // cartQuantity.textContent = `Cart ${cartItems.length}`;
    let totalQty = cartItems.reduce((sum, p) => sum + p.qty, 0);
    cartQuantity.textContent = `Cart ${totalQty}`;

    if (cartItems.length === 0) {
      emptyCartMsg.classList.remove("d-none");
      subtotalEl.textContent = "Subtotal: Rs. 0";
      totalEl.textContent = "Total: Rs. 0";
      return;
    }

    emptyCartMsg.classList.add("d-none");

    let subtotal = 0;
    cartItems.forEach((item, index) => {
      const price = parseInt(item.price.replace(/\D/g, ""));
      const itemSubtotal = price * item.qty;
      subtotal += itemSubtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.img}" width="50"></td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
          <input type="number" min="1" value="${item.qty}" data-index="${index}" class="qty-input">
        </td>
        <td>Rs. ${itemSubtotal}</td>
        <td><button class="btn btn-sm btn-danger remove-btn" data-index="${index}">Remove</button></td>
      `;
      cartList.appendChild(row);
    });

    subtotalEl.textContent = `Subtotal: Rs. ${subtotal}`;
    totalEl.textContent = `Total: Rs. ${subtotal + 40}`; // delivery = 40
  }

  // Update qty
  cartList.addEventListener("input", (e) => {
    if (e.target.classList.contains("qty-input")) {
      const idx = e.target.dataset.index;
      cartItems[idx].qty = parseInt(e.target.value) || 1;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      renderCart();
    }
  });

  // Remove item with smooth transition
  cartList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const idx = e.target.dataset.index;
      const row = e.target.closest("tr");

      // Add animation class
      row.classList.add("cart-removing");

      // After transition, update cart
      setTimeout(() => {
        cartItems.splice(idx, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        renderCart();
      }, 400); // match transition duration
    }
  });

  // Clear all with smooth animation
  clearBtn.addEventListener("click", () => {
    const rows = document.querySelectorAll("#cart-list tr");

    rows.forEach((row, i) => {
      setTimeout(() => row.classList.add("cart-removing"), i * 100); // staggered
    });

    setTimeout(() => {
      cartItems = [];
      localStorage.removeItem("cartItems");
      renderCart();
    }, rows.length * 100 + 400); // wait until last animation ends
  });

  renderCart();
});
