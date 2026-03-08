// Simple categorization logic based on keywords
const categorizeBrand = (name) => {
  const n = name.toLowerCase();
  if (n.includes('pizza') || n.includes('kfc') || n.includes('coffee') || n.includes('restaurant') || n.includes('biryani') || n.includes('momo') || n.includes('barbeque') || n.includes('tiffin') || n.includes('food') || n.includes('swiggy') || n.includes('zomato') || n.includes('starbucks') || n.includes('subway') || n.includes('wendy') || n.includes('oven') || n.includes('faasos') || n.includes('lunch') || n.includes('eat') || n.includes('sweet') || n.includes('baskin') || n.includes('cafe')) return 'Food & Dining';
  if (n.includes('hotel') || n.includes('trip') || n.includes('yatra') || n.includes('ixigo') || n.includes('cleartrip') || n.includes('makemytrip') || n.includes('taj') || n.includes('itc') || n.includes('air india') || n.includes('klook') || n.includes('flixbus') || n.includes('ola') || n.includes('uber')) return 'Travel & Hotels';
  if (n.includes('amazon') || n.includes('flipkart') || n.includes('myntra') || n.includes('ajio') || n.includes('tata cliq') || n.includes('nykaa') || n.includes('bigbasket') || n.includes('zepto') || n.includes('blinkit') || n.includes('reliance smart') || n.includes('spencer')) return 'E-commerce & Grocery';
  if (n.includes('solly') || n.includes('philippe') || n.includes('england') || n.includes('heusen') || n.includes('jones') || n.includes('veromoda') || n.includes('only') || n.includes('biba') || n.includes('lifestyle') || n.includes('levis') || n.includes('pantaloons') || n.includes('puma') || n.includes('raymond') || n.includes('shoppers stop') || n.includes('aurelia') || n.includes('westside') || n.includes('woodland') || n.includes('bata') || n.includes('hush puppies') || n.includes('relaxo') || n.includes('jockey') || n.includes('adidas') || n.includes('skechers') || n.includes('marks & spencer') || n.includes('american eagle') || n.includes('soch') || n.includes('manyavar') || n.includes('campus') || n.includes('liberty') || n.includes('decathlon')) return 'Fashion & Apparel';
  if (n.includes('titan') || n.includes('fastrack') || n.includes('casio') || n.includes('citizen') || n.includes('skinn') || n.includes('giva') || n.includes('estele')) return 'Watches & Jewelry';
  if (n.includes('pharmacy') || n.includes('health') || n.includes('apollo') || n.includes('netmeds') || n.includes('pharmeasy') || n.includes('fitpass') || n.includes('organic india') || n.includes('himalaya')) return 'Health & Wellness';
  if (n.includes('croma') || n.includes('reliance digital') || n.includes('vijay sales') || n.includes('hammer') || n.includes('blaupunkt') || n.includes('skullcandy') || n.includes('philips') || n.includes('apple')) return 'Electronics';
  if (n.includes('pvr') || n.includes('gaana') || n.includes('zee5') || n.includes('sonyliv') || n.includes('hoichoi') || n.includes('discovery') || n.includes('lionsgate') || n.includes('ottplay') || n.includes('vrott') || n.includes('shemaroome')) return 'Entertainment';
  if (n.includes('luxe')) return 'Luxury';
  return 'Others';
};

const CATEGORIES = ['All', 'Fashion & Apparel', 'Food & Dining', 'E-commerce & Grocery', 'Travel & Hotels', 'Entertainment', 'Health & Wellness', 'Electronics', 'Watches & Jewelry', 'Luxury', 'Others'];

const BRAND_PRIORITY = {
  "Amazon": 100,
  "Swiggy Instamart": 95,
  "Westside": 90,
  "Amazon Fresh": 85,
  "Flipkart Gift Card": 80,
  "BigBasket": 75,
  "Blinkit Gift Card": 70,
  "CLAYCO": 65,
};

let BRANDS = [];
let search = '';
let selectedCategory = 'All';

const getFilteredBrands = () => {
  return BRANDS.filter(brand => {
    const matchesSearch = brand.toLowerCase().includes(search.toLowerCase());
    const category = categorizeBrand(brand);
    const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    const priorityA = BRAND_PRIORITY[a] || 0;
    const priorityB = BRAND_PRIORITY[b] || 0;
    
    if (priorityA !== priorityB) {
      return priorityB - priorityA;
    }
    
    return a.localeCompare(b);
  });
};

const renderCategories = () => {
  const container = document.getElementById('category-filters');
  if (!container) return;
  
  container.innerHTML = CATEGORIES.map(cat => `
    <button
      data-category="${cat}"
      class="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
        selectedCategory === cat
          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
          : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
      }"
    >
      ${cat}
    </button>
  `).join('');

  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedCategory = btn.getAttribute('data-category') || 'All';
      updateUI();
    });
  });
};

const renderTable = () => {
  const brands = getFilteredBrands();
  const tbody = document.getElementById('brands-tbody');
  const countDisplay = document.getElementById('brands-count');
  
  if (countDisplay) {
    countDisplay.textContent = `${brands.length} Brands Found`;
  }

  if (!tbody) return;

  if (brands.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3" class="px-6 py-20 text-center">
          <div class="flex flex-col items-center justify-center">
            <div class="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <h3 class="text-sm font-semibold text-zinc-900">No brands found</h3>
            <p class="text-xs text-zinc-500 mt-1">Try adjusting your search or category filter.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = brands.map(brand => `
    <tr class="hover:bg-zinc-50/50 transition-colors group">
      <td class="px-6 py-4">
        <span class="text-sm font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">
          ${brand}
        </span>
      </td>
      <td class="px-6 py-4">
        <span class="inline-flex items-center px-2 py-1 rounded-md bg-zinc-100 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
          ${categorizeBrand(brand)}
        </span>
      </td>
      <td class="px-6 py-4 text-right">
        <a 
          href="https://www.gyftr.com/hdfcsmartbuy/search?q=${encodeURIComponent(brand)}"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View Deals 
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
      </td>
    </tr>
  `).join('');
};

const updateUI = () => {
  renderCategories();
  renderTable();
};

// Initial Setup
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('src/data/brands.json');
    BRANDS = await response.json();
  } catch (error) {
    console.error('Failed to load brands:', error);
    BRANDS = [];
  }

  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search');
  const clearFiltersBtn = document.getElementById('clear-filters');

  searchInput?.addEventListener('input', (e) => {
    search = e.target.value;
    updateUI();
    if (clearSearchBtn) {
      clearSearchBtn.classList.toggle('hidden', !search);
    }
  });

  clearSearchBtn?.addEventListener('click', () => {
    search = '';
    if (searchInput) searchInput.value = '';
    updateUI();
    clearSearchBtn.classList.add('hidden');
  });

  clearFiltersBtn?.addEventListener('click', () => {
    search = '';
    selectedCategory = 'All';
    if (searchInput) searchInput.value = '';
    updateUI();
    if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
  });

  updateUI();
});
