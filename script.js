const heroImage = document.querySelector(".hero-image");
const thumbnails = document.querySelectorAll(".thumbnail");
const quantityValue = document.querySelector(".quantity-value");
const cartCount = document.querySelector(".cart-count");
const cartButton = document.querySelector(".cart-button");
const cartPanel = document.querySelector(".cart-panel");
const lightbox = document.querySelector(".lightbox");
const lightboxMain = document.querySelector(".lightbox-main");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
let quantity = 0;
let selectedImage = 1;

function updateQuantity(value) {
  quantity = Math.max(0, value);
  quantityValue.textContent = quantity;
}

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    selectedImage = thumbnail.dataset.index;
    heroImage.src = `./images/image-product-${selectedImage}.jpg`;
    lightboxMain.src = heroImage.src;
    thumbnails.forEach((item) => item.classList.remove("active"));
    thumbnail.classList.add("active");
  });
});

document
  .querySelector(".minus")
  .addEventListener("click", () => updateQuantity(quantity - 1));
document
  .querySelector(".plus")
  .addEventListener("click", () => updateQuantity(quantity + 1));
document.querySelector(".add-to-cart").addEventListener("click", () => {
  if (quantity === 0) return;
  cartCount.textContent = quantity;
  const existingItem = cartPanel.querySelector(".cart-item");
  if (existingItem) {
    existingItem.querySelector("strong").textContent =
      `$125.00 x ${quantity} $${125 * quantity}.00`;
  } else {
    cartPanel.querySelector(".cart-empty").outerHTML =
      `<div class="cart-item"><img src="./images/image-product-1-thumbnail.jpg" alt="Sneaker"><p>Fall Limited Edition Sneakers<br><strong>$125.00 x ${quantity} $${125 * quantity}.00</strong></p><button class="delete" aria-label="Remove item"><img src="./images/icon-delete.svg" alt=""></button></div>`;
  }
});
cartButton.addEventListener("click", () => cartPanel.classList.toggle("open"));
cartPanel.addEventListener("click", (event) => {
  if (event.target.closest(".delete")) {
    cartCount.textContent = "";
    cartPanel.querySelector(".cart-item").outerHTML =
      '<p class="cart-empty">Your cart is empty.</p>';
  }
});
// دالة فتح الـ lightbox
function openLightbox() {
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.querySelector(".close-lightbox").focus();
}

// دالة إغلاق الـ lightbox
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  heroImage.focus();
}

// فتح عند الضغط على الصورة
heroImage.addEventListener("click", openLightbox);

// إغلاق عند الضغط على زر X
document
  .querySelector(".close-lightbox")
  .addEventListener("click", closeLightbox);

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "Tab") {
    event.preventDefault();
    document.querySelector(".close-lightbox").focus();
  }
});

menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", open);
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
