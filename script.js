let products = [];
let itemsToShow = 8; // Number of products initially shown

// Load products.json
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    renderProducts();
  })
  .catch((err) => console.error("Could not load JSON:", err));

// Function to render product grid
function renderProducts() {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  const visibleProducts = products.slice(0, itemsToShow);

  visibleProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.picture1}" alt="${product.title}" />
      <div class="product-info">
        <div class="product-title">${product.title}</div>
        <div class="product-price">$${product.price}</div>
      </div>
    `;

    // Show product details on click
    card.addEventListener("click", () => showProductDetails(product.id));

    grid.appendChild(card);
  });
}

// Load more button
document.getElementById("load-more-btn").addEventListener("click", () => {
  itemsToShow += 8; // Show 8 more products
  renderProducts();
});

function showProductDetails(productId) {
  const product = products.find((p) => p.id === productId);
  const detailsContainer = document.getElementById("product-details");

  if (!product) {
    detailsContainer.innerHTML = "<p>Product not found.</p>";
    return;
  }

  // Inject main HTML structure
  detailsContainer.innerHTML = `
    <div class="single-product">

      <!-- Product Image -->
      <div class="product-image-box">
        <img src="${product.picture1}" class="main-product-img" alt="${product.title}">
      </div>

      <!-- Title, Price, Add to Cart -->
      <div class="product-main-info">
        <h3 class="product-title">${product.title}</h3>
        <div class="price-cart-row">
          <span class="product-price">${product.price} :-</span>
          <button class="add-cart-btn">Add to cart</button>
        </div>
      </div>

      <!-- Accordion -->
      <div class="accordion">

        <div class="accordion-item">
          <div class="accordion-header">Size <span>›</span></div>
          <div class="accordion-content" id="size-container"></div>
        </div>

        <div class="accordion-item">
          <div class="accordion-header">Material <span>›</span></div>
          <div class="accordion-content">
            <p>${product.material}</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-header">Product Description <span>›</span></div>
          <div class="accordion-content">
            <p>${product.description}</p>
          </div>
        </div>

      </div>
    </div>
  `;

  // Hide product grid and load more button
  document.getElementById("product-grid").style.display = "none";
  document.getElementById("load-more-btn").style.display = "none";

  // Populate sizes dynamically
  const sizeContainer = document.getElementById("size-container");
  if (product.sizes && product.sizes.length > 0) {
    product.sizes.forEach(size => {
      const span = document.createElement("span");
      span.className = "size-chip";
      span.textContent = size;
      sizeContainer.appendChild(span);
    });
  } else {
    sizeContainer.innerHTML = "<p>No sizes available.</p>";
  }

  // Accordion toggle functionality
  const headers = detailsContainer.querySelectorAll(".accordion-header");
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;

      item.classList.toggle("active");

      if (content.style.maxHeight) {
        content.style.maxHeight = null; // collapse
      } else {
        content.style.maxHeight = content.scrollHeight + "px"; // expand
      }
    });
  });

  // Back button restores grid
  document.getElementById("back-btn").addEventListener("click", () => {
    detailsContainer.innerHTML = "";
    document.getElementById("product-grid").style.display = "grid";
    document.getElementById("load-more-btn").style.display = "block";
  });
}


