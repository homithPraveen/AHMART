/**
 * SHOPHAUS — script.js
 * Handles: Loader, Theme, Navigation, Products, Cart, Modal, Search/Filter,
 *          Newsletter, Contact, Scroll Reveal, Toast notifications
 */

/* ═══════════════════════════════════════════
   PRODUCT DATA
════════════════════════════════════════════ */
const PRODUCTS = [
  {
    id: 1,
    name: "Minimalist Chronograph",
    category: "watches",
    price: 349,
    oldPrice: 420,
    rating: 4.9,
    reviews: 128,
    badge: "Best Seller",
    featured: true,
    description: "Swiss-inspired minimalist chronograph with sapphire crystal glass and genuine leather strap. Water-resistant to 50m.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
  },
  {
    id: 2,
    name: "Obsidian Diver Watch",
    category: "watches",
    price: 289,
    oldPrice: null,
    rating: 4.7,
    reviews: 87,
    badge: null,
    featured: false,
    description: "Bold diver-style watch with luminous hands and a stainless steel case. Built for depth, designed for style.",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&q=80"
  },
  {
    id: 3,
    name: "Rose Gold Elegance",
    category: "watches",
    price: 415,
    oldPrice: 510,
    rating: 4.8,
    reviews: 64,
    badge: "Sale",
    featured: true,
    description: "An exquisite rose gold dress watch with an ultra-slim profile. Perfect for formal occasions and daily luxury.",
    image: "https://images.unsplash.com/photo-1549482199-bc1ca6f58502?w=500&q=80"
  },
  {
    id: 4,
    name: "Air Stride Pro",
    category: "footwear",
    price: 179,
    oldPrice: 220,
    rating: 4.6,
    reviews: 215,
    badge: "Sale",
    featured: false,
    description: "High-performance running shoes with advanced foam cushioning and breathable mesh upper. Engineered for endurance.",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80"
  },
  {
    id: 5,
    name: "Luxe Leather Derby",
    category: "footwear",
    price: 265,
    oldPrice: null,
    rating: 4.9,
    reviews: 72,
    badge: "New",
    featured: true,
    description: "Hand-stitched full-grain leather derby shoe. Goodyear welted construction ensures decades of wear with resoling.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"
  },
  {
    id: 6,
    name: "Velvet Court Sneaker",
    category: "footwear",
    price: 139,
    oldPrice: null,
    rating: 4.5,
    reviews: 183,
    badge: null,
    featured: false,
    description: "Court-style sneaker in premium velvet upper with vulcanized sole. Minimal, clean, and effortlessly versatile.",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80"
  },
  {
    id: 7,
    name: "Noir Oud Parfum",
    category: "fragrance",
    price: 195,
    oldPrice: 240,
    rating: 4.8,
    reviews: 54,
    badge: "Sale",
    featured: false,
    description: "A rich oriental fragrance anchored by dark oud, amber, and smoked vetiver. Bold and unmistakably luxurious.",
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80"
  },
  {
    id: 8,
    name: "Blanc Floral Eau de Parfum",
    category: "fragrance",
    price: 145,
    oldPrice: null,
    rating: 4.7,
    reviews: 96,
    badge: null,
    featured: false,
    description: "A fresh, luminous floral scent with notes of white jasmine, peony and warm musk. Timeless femininity.",
    image: "https://images.unsplash.com/photo-1631214524020-3c69b6b0c9b2?w=500&q=80"
  },
  {
    id: 9,
    name: "Ultrabook Pro 16",
    category: "tech",
    price: 1299,
    oldPrice: 1499,
    rating: 4.8,
    reviews: 312,
    badge: "Sale",
    featured: true,
    description: "Ultra-thin performance laptop with OLED display, 32GB RAM, and an all-day battery. Power meets portability.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80"
  },
  {
    id: 10,
    name: "Aura Wireless Headphones",
    category: "tech",
    price: 329,
    oldPrice: null,
    rating: 4.9,
    reviews: 407,
    badge: "Best Seller",
    featured: false,
    description: "40hr playtime, adaptive noise cancellation, and studio-grade sound in an elegant over-ear design. Audio redefined.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
  },
  {
    id: 11,
    name: "The Milano Tote",
    category: "bags",
    price: 389,
    oldPrice: 459,
    rating: 4.7,
    reviews: 61,
    badge: "Sale",
    featured: false,
    description: "Structured full-grain leather tote with polished gold hardware and suede-lined interior. Office to evening.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80"
  },
  {
    id: 12,
    name: "Summit Daypack",
    category: "bags",
    price: 218,
    oldPrice: null,
    rating: 4.6,
    reviews: 149,
    badge: "New",
    featured: false,
    description: "Water-resistant 25L backpack with laptop compartment and ergonomic shoulder straps. Urban explorer essentials.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80"
  }
];

/* ═══════════════════════════════════════════
   STATE
════════════════════════════════════════════ */
let cart = [];
let currentFilter = "all";
let currentSearch = "";

/* ═══════════════════════════════════════════
   UTILITY HELPERS
════════════════════════════════════════════ */

/**
 * Show a toast notification
 * @param {string} msg   - message text
 * @param {string} type  - "success" | "info"
 */
function showToast(msg, type = "info") {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = `toast show ${type}`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.className = "toast"; }, 2800);
}

/** Build star HTML from a numeric rating */
function buildStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    '<i class="fa-solid fa-star"></i>'.repeat(full) +
    (half ? '<i class="fa-solid fa-star-half-stroke"></i>' : "") +
    '<i class="fa-regular fa-star"></i>'.repeat(empty)
  );
}

/** Format price as INR */
function fmt(n) {
  return "₹" + Math.round(n * 83).toLocaleString("en-IN");
}

/* ═══════════════════════════════════════════
   LOADER
   Uses both window.load AND a hard timeout
   so it always dismisses even if CDN resources
   (fonts, Font Awesome) are slow or blocked.
════════════════════════════════════════════ */
function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hidden");
}

// Dismiss after 2.3 s no matter what
const loaderTimeout = setTimeout(hideLoader, 2300);

// Also dismiss as soon as the page is fully loaded (whichever is first)
window.addEventListener("load", () => {
  clearTimeout(loaderTimeout);
  setTimeout(hideLoader, 400); // small delay so the fill bar visually completes
});

/* ═══════════════════════════════════════════
   THEME TOGGLE (DARK / LIGHT)
════════════════════════════════════════════ */
const themeToggle = document.getElementById("themeToggle");
const themeIcon   = document.getElementById("themeIcon");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("shophaus-theme", theme);
  themeIcon.className = theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
}

// Init from saved preference
applyTheme(localStorage.getItem("shophaus-theme") || "dark");

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

/* ═══════════════════════════════════════════
   NAVIGATION
════════════════════════════════════════════ */
const navbar    = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");

// Scroll effect: add .scrolled class to nav
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
  highlightNavLink();
});

// Hamburger toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
  document.body.classList.toggle("no-scroll", navLinks.classList.contains("open"));
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
    document.body.classList.remove("no-scroll");
  });
});

/** Highlight the active nav link based on scroll position */
function highlightNavLink() {
  const sections = document.querySelectorAll("section[id], nav ~ section[id]");
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

/* ═══════════════════════════════════════════
   RENDER PRODUCTS
════════════════════════════════════════════ */

/**
 * Build product card HTML
 * @param {object} p - product object
 * @returns {string} HTML string
 */
function buildCard(p) {
  const badge = p.badge
    ? `<span class="product-badge${p.badge === "Sale" ? " sale" : ""}">${p.badge}</span>`
    : "";
  const oldPrice = p.oldPrice ? `<span class="price-old">${fmt(p.oldPrice)}</span>` : "";

  return `
    <div class="product-card" data-id="${p.id}" data-cat="${p.category}">
      <div class="product-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        ${badge}
        <div class="product-actions">
          <button class="product-action-btn" title="Quick View" onclick="openModal(${p.id})">
            <i class="fa-solid fa-eye"></i>
          </button>
          <button class="product-action-btn" title="Add to wishlist" onclick="showToast('Added to wishlist ♡', 'info')">
            <i class="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>
      <div class="product-info">
        <p class="product-cat">${p.category}</p>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-stars">
          <span class="stars">${buildStars(p.rating)}</span>
          <span class="count">(${p.reviews})</span>
        </div>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-current">${fmt(p.price)}</span>
            ${oldPrice}
          </div>
          <button class="add-cart-btn" onclick="addToCart(${p.id})">
            <i class="fa-solid fa-plus"></i> Add
          </button>
        </div>
      </div>
    </div>`;
}

/** Render the main products grid with optional stagger animation */
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const noResults = document.getElementById("noResults");

  // Filter by category
  let filtered = currentFilter === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === currentFilter);

  // Filter by search query
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";
  grid.innerHTML = filtered.map((p, i) => {
    const card = buildCard(p);
    // Stagger animation via style attribute
    return card.replace('class="product-card"', `class="product-card" style="animation-delay:${i * 0.07}s"`);
  }).join("");
}

/** Render the featured products section */
function renderFeatured() {
  const grid = document.getElementById("featuredGrid");
  const featured = PRODUCTS.filter(p => p.featured).slice(0, 3);
  grid.innerHTML = featured.map((p, i) => {
    const card = buildCard(p);
    return card.replace('class="product-card"', `class="product-card" style="animation-delay:${i * 0.1}s"`);
  }).join("");
}

/* ═══════════════════════════════════════════
   SEARCH
════════════════════════════════════════════ */
const searchInput = document.getElementById("searchInput");
const searchClear = document.getElementById("searchClear");

searchInput.addEventListener("input", () => {
  currentSearch = searchInput.value.trim();
  searchClear.classList.toggle("show", currentSearch.length > 0);
  renderProducts();
});

searchClear.addEventListener("click", () => {
  searchInput.value = "";
  currentSearch = "";
  searchClear.classList.remove("show");
  renderProducts();
});

/* ═══════════════════════════════════════════
   CATEGORY FILTER
════════════════════════════════════════════ */
const filterTabs = document.querySelectorAll(".filter-tab");

filterTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    filterTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentFilter = tab.dataset.cat;
    renderProducts();
  });
});

// Category cards (in the categories section) also trigger filter
document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    const cat = card.dataset.filter;
    currentFilter = cat;

    // Update filter tab UI
    filterTabs.forEach(t => {
      t.classList.toggle("active", t.dataset.cat === cat);
    });

    // Scroll to products section
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });

    renderProducts();
  });
});

/* ═══════════════════════════════════════════
   CART — LOCALSTORAGE PERSISTENCE
════════════════════════════════════════════ */

/** Load cart from localStorage */
function loadCart() {
  try {
    cart = JSON.parse(localStorage.getItem("shophaus-cart")) || [];
  } catch {
    cart = [];
  }
}

/** Save cart to localStorage */
function saveCart() {
  localStorage.setItem("shophaus-cart", JSON.stringify(cart));
}

/** Add a product to the cart */
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
    showToast(`${product.name} — qty updated ✓`, "success");
  } else {
    cart.push({ id, qty: 1 });
    showToast(`${product.name} added to cart ✓`, "success");
  }

  saveCart();
  updateCartUI();
}

/** Remove an item from the cart */
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartUI();
}

/** Change item quantity */
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else {
    saveCart();
    updateCartUI();
  }
}

/** Update all cart-related UI elements */
function updateCartUI() {
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const badge = document.getElementById("cartBadge");
  badge.textContent = totalItems;
  badge.classList.toggle("show", totalItems > 0);

  document.getElementById("cartCount").textContent = `(${totalItems})`;

  renderCartItems();
}

/** Render cart items list */
function renderCartItems() {
  const container = document.getElementById("cartItems");
  const emptyEl   = document.getElementById("cartEmpty");
  const footerEl  = document.getElementById("cartFooter");

  if (cart.length === 0) {
    container.innerHTML = "";
    container.appendChild(emptyEl);
    emptyEl.style.display = "flex";
    footerEl.style.display = "none";
    return;
  }

  emptyEl.style.display = "none";
  footerEl.style.display = "flex";

  let subtotal = 0;
  const html = cart.map(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if (!p) return "";
    const lineTotal = p.price * item.qty;
    subtotal += lineTotal;

    return `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
        </div>
        <div class="cart-item-info">
          <p class="cart-item-cat">${p.category}</p>
          <p class="cart-item-name" title="${p.name}">${p.name}</p>
          <p class="cart-item-price">${fmt(lineTotal)}</p>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="changeQty(${p.id}, -1)"><i class="fa-solid fa-minus"></i></button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${p.id}, 1)"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${p.id})" title="Remove">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>`;
  }).join("");

  container.innerHTML = html + emptyEl.outerHTML;
  // keep emptyEl in DOM but hidden
  document.getElementById("cartEmpty").style.display = "none";

  const shipping = subtotal >= 100 ? "Free" : fmt(9.99);
  const total    = subtotal + (subtotal >= 100 ? 0 : 9.99);

  document.getElementById("cartSubtotal").textContent = fmt(subtotal);
  document.getElementById("cartShipping").textContent = shipping;
  document.getElementById("cartTotal").textContent    = fmt(total);
}

/* Cart open / close */
const cartToggle  = document.getElementById("cartToggle");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartClose   = document.getElementById("cartClose");

function openCart() {
  cartSidebar.classList.add("open");
  cartOverlay.classList.add("show");
  document.body.classList.add("no-scroll");
}

function closeCart() {
  cartSidebar.classList.remove("open");
  cartOverlay.classList.remove("show");
  document.body.classList.remove("no-scroll");
}

cartToggle.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// "Shop" button inside empty cart
document.getElementById("cartShopBtn").addEventListener("click", closeCart);

// Checkout button (demo)
document.getElementById("checkoutBtn").addEventListener("click", () => {
  showToast("Checkout coming soon! 🛒", "info");
});

// Clear all cart items
document.getElementById("clearCartBtn").addEventListener("click", () => {
  cart = [];
  saveCart();
  updateCartUI();
  showToast("Cart cleared.", "info");
});

/* ═══════════════════════════════════════════
   PRODUCT QUICK-VIEW MODAL
════════════════════════════════════════════ */
const modal        = document.getElementById("productModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose   = document.getElementById("modalClose");
const modalBody    = document.getElementById("modalBody");

function openModal(id) {
  const p = PRODUCTS.find(pr => pr.id === id);
  if (!p) return;

  const oldPrice = p.oldPrice ? `<span class="price-old">${fmt(p.oldPrice)}</span>` : "";

  modalBody.innerHTML = `
    <div class="modal-img">
      <img src="${p.image}" alt="${p.name}" />
    </div>
    <div class="modal-info">
      <p class="modal-cat">${p.category}</p>
      <h2 class="modal-name">${p.name}</h2>
      <div class="modal-stars">
        <span class="stars">${buildStars(p.rating)}</span>
        <span style="color:var(--text-3);font-size:0.8rem">&nbsp;${p.rating} · ${p.reviews} reviews</span>
      </div>
      <p class="modal-desc">${p.description}</p>
      <div class="modal-price">${fmt(p.price)} ${oldPrice}</div>
      <button class="add-cart-btn" onclick="addToCart(${p.id}); closeModal();">
        <i class="fa-solid fa-bag-shopping"></i> Add to Cart
      </button>
    </div>`;

  modal.classList.add("open");
  modalOverlay.classList.add("show");
  document.body.classList.add("no-scroll");
}

function closeModal() {
  modal.classList.remove("open");
  modalOverlay.classList.remove("show");
  document.body.classList.remove("no-scroll");
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

// ESC key closes modal or cart
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeModal();
    closeCart();
  }
});

/* ═══════════════════════════════════════════
   NEWSLETTER FORM
════════════════════════════════════════════ */
document.getElementById("newsletterForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const input = this.querySelector("input[type='email']");
  showToast(`Subscribed with ${input.value} ✓`, "success");
  input.value = "";
});

/* ═══════════════════════════════════════════
   CONTACT FORM
════════════════════════════════════════════ */
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  showToast("Message sent! We'll be in touch soon ✓", "success");
  this.reset();
});

/* ═══════════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════════════ */
function initScrollReveal() {
  // Add reveal class to sections and key elements
  const targets = [
    ".categories-section .section-header",
    ".categories-grid .category-card",
    ".products-section .section-header",
    ".featured-section .section-header",
    ".about-container",
    ".testimonial-card",
    ".newsletter-box",
    ".contact-grid",
    ".footer-brand",
    ".footer-col"
  ];

  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════
   SMOOTH SCROLL FOR ANCHOR LINKS
════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 80; // nav height buffer
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: "smooth"
      });
    }
  });
});

/* ═══════════════════════════════════════════
   INIT — runs on DOMContentLoaded
════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  loadCart();       // Restore cart from localStorage
  renderProducts(); // Render all product cards
  renderFeatured(); // Render featured cards
  updateCartUI();   // Sync cart badge
  initScrollReveal(); // Kick off scroll animations
});