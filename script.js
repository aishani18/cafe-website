document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const item = this.getAttribute("data-item");
      const price = parseFloat(this.getAttribute("data-price"));
      addToCart(item, price);
    });
  });
});

function addToCart(item, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if item is already in cart
  const index = cart.findIndex((cartItem) => cartItem.name === item);
  if (index !== -1) {
    // Item already in cart, increase quantity
    cart[index].quantity += 1;
  } else {
    // Item not in cart, add new item
    cart.push({ name: item, price: price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Cart after adding:", cart); // Debugging
}

function removeFromCart(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Find item in cart
  const index = cart.findIndex((cartItem) => cartItem.name === item);
  if (index !== -1) {
    // Decrease quantity or remove item
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      cart.splice(index, 1);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Cart after removing:", cart); // Debugging
  displayCart();
}

// Function to display the cart items
function displayCart() {
  const orderList = document.getElementById("order-list");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let totalPrice = 0;

  orderList.innerHTML = "";

  cartItems.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td><button class="remove-button" data-item="${
        item.name
      }">Remove</button></td>
    `;
    orderList.appendChild(row);
    totalPrice += item.price * item.quantity;
  });

  document.getElementById("total-price").textContent = `$${totalPrice.toFixed(
    2
  )}`;

  // Add event listeners to remove buttons
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });
}

// Function to remove an item from the cart
function removeFromCart(event) {
  const itemName = event.target.getAttribute("data-item");
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const itemIndex = cartItems.findIndex((item) => item.name === itemName);
  if (itemIndex > -1) {
    cartItems[itemIndex].quantity--;
    if (cartItems[itemIndex].quantity === 0) {
      cartItems.splice(itemIndex, 1);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  displayCart();
}

// Initialize displayCart function when the document is loaded
document.addEventListener("DOMContentLoaded", displayCart);
