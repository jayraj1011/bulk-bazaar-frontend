// Sample supplier data
        const suppliers = [
            {
                id: 1,
                name: "Sharma Vegetables",
                category: "vegetables",
                location: "delhi",
                products: ["Onions", "Tomatoes", "Potatoes", "Garlic"],
                price: "₹15-25/kg",
                rating: 4.8,
                reviews: 156,
                verified: true,
                image: "🥕",
                distance: "2.3 km",
                phone: "+91-9876543210"
            },
            {
                id: 2,
                name: "Punjab Flour Mills",
                category: "grains",
                location: "delhi",
                products: ["Wheat Flour", "Rice", "Besan", "Semolina"],
                price: "₹28-35/kg",
                rating: 4.6,
                reviews: 89,
                verified: true,
                image: "🌾",
                distance: "1.8 km",
                phone: "+91-9876543211"
            },
            {
                id: 3,
                name: "Spice Garden",
                category: "spices",
                location: "mumbai",
                products: ["Garam Masala", "Turmeric", "Chili Powder", "Cumin"],
                price: "₹80-150/kg",
                rating: 4.9,
                reviews: 234,
                verified: true,
                image: "🌶️",
                distance: "3.1 km",
                phone: "+91-9876543212"
            },
            {
                id: 4,
                name: "Golden Oil Suppliers",
                category: "oil",
                location: "pune",
                products: ["Sunflower Oil", "Mustard Oil", "Ghee", "Coconut Oil"],
                price: "₹120-180/L",
                rating: 4.7,
                reviews: 167,
                verified: true,
                image: "🛢️",
                distance: "4.2 km",
                phone: "+91-9876543213"
            },
            {
                id: 5,
                name: "Fresh Dairy Co.",
                category: "dairy",
                location: "bangalore",
                products: ["Milk", "Paneer", "Curd", "Butter"],
                price: "₹45-120/kg",
                rating: 4.5,
                reviews: 98,
                verified: false,
                image: "🥛",
                distance: "1.5 km",
                phone: "+91-9876543214"
            },
            {
                id: 6,
                name: "Metro Vegetables",
                category: "vegetables",
                location: "mumbai",
                products: ["Cabbage", "Cauliflower", "Spinach", "Carrots"],
                price: "₹12-20/kg",
                rating: 4.4,
                reviews: 76,
                verified: true,
                image: "🥬",
                distance: "2.7 km",
                phone: "+91-9876543215"
            }
        ];

        let currentLanguage = 'en';
        let currentSupplier = null;

        // Show section function
        function showSection(section) {
            // Hide all sections
            document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
            // Show selected section
            document.getElementById(section + '-section').classList.add('active');
            
            // Load suppliers if vendors section is shown
            if (section === 'vendors') {
                renderSuppliers(suppliers);
            }
        }

        // Language toggle
        function toggleLanguage() {
            currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
            document.getElementById('lang-indicator').textContent = currentLanguage === 'en' ? 'EN' : 'हिं';
            
            // Update all translatable elements
            document.querySelectorAll('[data-en]').forEach(element => {
                element.textContent = element.getAttribute('data-' + currentLanguage);
            });
        }

        // Render suppliers
        function renderSuppliers(suppliersToRender) {
            const grid = document.getElementById('supplierGrid');
            grid.innerHTML = '';

            suppliersToRender.forEach((supplier, index) => {
                const card = document.createElement('div');
                card.className = 'supplier-card animate-fadeInUp';
                card.style.animationDelay = `${index * 0.1}s`;
                
                card.innerHTML = `
                    <div class="supplier-header">
                        <div class="supplier-info">
                            <div class="supplier-avatar">${supplier.image}</div>
                            <div>
                                <h3 class="supplier-name">${supplier.name}</h3>
                                <p class="supplier-distance">${supplier.distance} away</p>
                            </div>
                        </div>
                        ${supplier.verified ? '<div class="verified-badge"><i class="fas fa-check"></i>Verified</div>' : ''}
                    </div>
                    
                    <div class="rating-container">
                        <div class="stars">
                            ${Array(5).fill().map((_, i) => 
                                `<i class="fas fa-star${i < Math.floor(supplier.rating) ? '' : i < supplier.rating ? '-half-alt' : ' text-gray-300'}"></i>`
                            ).join('')}
                        </div>
                        <span class="rating-text">${supplier.rating} (${supplier.reviews} reviews)</span>
                    </div>
                    
                    <p class="supplier-products">Products: ${supplier.products.join(', ')}</p>
                    <p class="supplier-price">${supplier.price}</p>
                    
                    <div class="supplier-actions">
                        <button onclick="openContactModal(${supplier.id})" class="btn-quote">
                            <i class="fas fa-quote-left"></i> Get Quote
                        </button>
                        <button onclick="callSupplier('${supplier.phone}')" class="btn-call">
                            <i class="fas fa-phone"></i>
                        </button>
                    </div>
                `;
                
                grid.appendChild(card);
            });
        }

        // Filter suppliers
        function filterSuppliers() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const category = document.getElementById('categoryFilter').value;
            const location = document.getElementById('locationFilter').value;
            const sortBy = document.getElementById('sortFilter').value;

            let filtered = suppliers.filter(supplier => {
                const matchesSearch = supplier.name.toLowerCase().includes(searchTerm) || 
                                    supplier.products.some(product => product.toLowerCase().includes(searchTerm));
                const matchesCategory = !category || supplier.category === category;
                const matchesLocation = !location || supplier.location === location;
                
                return matchesSearch && matchesCategory && matchesLocation;
            });

            // Sort suppliers
            switch(sortBy) {
                case 'rating':
                    filtered.sort((a, b) => b.rating - a.rating);
                    break;
                case 'price':
                    filtered.sort((a, b) => parseFloat(a.price.match(/\d+/)[0]) - parseFloat(b.price.match(/\d+/)[0]));
                    break;
                case 'distance':
                    filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
                    break;
            }

            renderSuppliers(filtered);
        }

        // Contact modal functions
        function openContactModal(supplierId) {
            currentSupplier = suppliers.find(s => s.id === supplierId);
            document.getElementById('quoteProduct').value = currentSupplier.products[0];
            document.getElementById('contactModal').classList.add('show');
        }

        function closeContactModal() {
            document.getElementById('contactModal').classList.remove('show');
            currentSupplier = null;
        }

        // Submit quote form
        function submitQuote(event) {
            event.preventDefault();
            const message = currentLanguage === 'en' ? 
                'Quote request sent successfully! The supplier will contact you soon.' : 
                'कोटेशन अनुरोध सफलतापूर्वक भेजा गया! आपूर्तिकर्ता जल्द ही आपसे संपर्क करेगा।';
            showToast(message, 'success');
            closeContactModal();
        }

        // WhatsApp message
        function sendWhatsAppMessage() {
            if (currentSupplier) {
                const message = `Hi, I'm interested in your products: ${currentSupplier.products.join(', ')}. Can you please share prices and availability?`;
                const phone = currentSupplier.phone.replace('+91-', '91');
                window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
            }
        }

        // Call supplier
        function callSupplier(phone) {
            window.open(`tel:${phone}`);
        }

        // Submit supplier form
        function submitSupplierForm(event) {
            event.preventDefault();
            const message = currentLanguage === 'en' ? 
                'Application submitted successfully! We will verify your details and contact you within 24 hours.' : 
                'आवेदन सफलतापूर्वक जमा किया गया! हम आपके विवरण की जांच करेंगे और 24 घंटे के भीतर आपसे संपर्क करेंगे।';
            showToast(message, 'success');
            event.target.reset();
        }

        // Toast notification
        function showToast(message, type = 'success') {
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => toast.classList.add('show'), 100);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => document.body.removeChild(toast), 300);
            }, 3000);
        }

        // Scroll to top
        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            const scrollTop = document.querySelector('.scroll-top');
            if (window.pageYOffset > 300) {
                scrollTop.classList.add('show');
            } else {
                scrollTop.classList.remove('show');
            }
        });

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            // Close modal when clicking outside
            document.getElementById('contactModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeContactModal();
                }
            });

            // Add animation delays to elements
            const animatedElements = document.querySelectorAll('.animate-fadeInUp, .animate-slideInLeft');
            animatedElements.forEach((el, index) => {
                el.style.animationDelay = `${index * 0.1}s`;
            });

            // Initialize suppliers
            renderSuppliers(suppliers);
        });

 document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:5000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const result = await res.json();

  if (res.ok) {
    alert("✅ Login successful!");
  } else {
    alert("❌ Login failed: " + result.message);
  }
});

// Call backend API
fetch("http://localhost:5000/api/hello")
  .then(res => res.text())
  .then(data => {
    alert(data); // Should show "Hello from backend!"
  })
  .catch(err => console.error("Backend error:", err));


  // Login popup logic
const loginModal = document.getElementById('login-modal');
const openBtn = document.getElementById('open-login');
const closeBtn = document.getElementById('close-login');

openBtn.onclick = () => loginModal.style.display = 'block';
closeBtn.onclick = () => loginModal.style.display = 'none';
window.onclick = (e) => {
  if (e.target === loginModal) loginModal.style.display = 'none';
};

// Login form logic
document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:5000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const result = await res.json();

  if (res.ok) {
    alert("✅ Login successful!");
    loginModal.style.display = 'none'; // close popup
  } else {
    alert("❌ Login failed: " + result.message);
  }
});

// Register popup logic
const regModal = document.getElementById('register-modal');
const openReg = document.getElementById('open-register');
const closeReg = document.getElementById('close-register');

openReg.onclick = () => regModal.style.display = 'block';
closeReg.onclick = () => regModal.style.display = 'none';
window.onclick = (e) => {
  if (e.target === regModal) regModal.style.display = 'none';
};

// Register form logic
document.getElementById('register-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const userType = document.getElementById('reg-type').value;

  const res = await fetch('http://localhost:5000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, userType })
  });

  const result = await res.json();

  if (res.ok) {
    alert("✅ Registered successfully!");
    regModal.style.display = 'none';
  } else {
    alert("❌ Registration failed: " + result.message);
  }
});

