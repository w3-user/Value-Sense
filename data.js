/* ==========================================================================
   ValueSense product database
   --------------------------------------------------------------------------
   Add one entry per reel. The "id" is the exact code you show at the end
   of the reel/video (keep it short — 1, 2, 3... or a simple code like "A1").
   "icon" picks one of the icon shapes defined in script.js (see ICONS).
   Swap "image" for a real product photo URL any time — if it's set, the
   photo is used instead of the icon.

   ONE PRODUCT, MULTIPLE LINKS (e.g. colours or sizes)
   --------------------------------------------------------------------------
   If the same reel/code covers more than one option — say a shirt in two
   colours, each with its own affiliate link — skip "affiliateLink" on the
   product itself and add a "variants" array instead. The page will show a
   picker and swap the link (and photo/price, if given) as the person
   chooses:

     variants: [
       { label: "Black",  affiliateLink: "https://example.com/shirt-black", image: "https://.../black.jpg" },
       { label: "Olive",  affiliateLink: "https://example.com/shirt-olive", image: "https://.../olive.jpg" }
     ]

   Each variant only needs "label" and "affiliateLink". "image", "price"
   and "originalPrice" are optional per variant — leave them out and the
   variant just falls back to the product's own image/price.

   COLLECTIONS (e.g. "keychain collection" with 5-6 separate designs)
   --------------------------------------------------------------------------
   Use this when one code should open a browsable set of DIFFERENT products
   (not colours of the same item — each entry has its own name, price,
   photo and highlights). Set "type: 'collection'" and give it an "items"
   array instead of the normal product fields. The result page shows one
   item at a time with left/right arrows and dots to flip through them.

     "9": {
       id: "9",
       type: "collection",
       name: "Charm Keychain Collection",
       category: "Accessories",
       tagline: "Six charms, one code — pick the one you want.",
       items: [
         {
           name: "Moon Charm Keychain",
           icon: "box",
           image: "",
           tagline: "Soft-touch enamel, clips onto any bag.",
           price: 149,
           originalPrice: 199,
           currency: "₹",
           rating: 4.5,
           reviews: 96,
           highlights: [
             "Enamel finish, won't chip with daily use",
             "Sturdy keyring clip",
             "Lightweight — won't weigh down your bag"
           ],
           affiliateLink: "https://example.com/moon-charm-keychain"
         }
         // ...add 4-5 more items in the same shape
       ]
     }

   Every item needs its own "affiliateLink" — there's no picker fallback
   here since each item is a distinct product, not a variant of one.
   ========================================================================== */

/* --------------------------------------------------------------------------
   A NOTE ON IMAGE SIZE (the biggest lever for speed)
   --------------------------------------------------------------------------
   The site now lazy-loads photos, fades them in, and only shows the
   trending grid in batches — but none of that helps if a photo file
   itself is 4-5MB straight off a phone. Before adding an image:
     - Resize it to roughly 800px on the longest side (these are shown as
       small thumbnails/cards, never full-screen).
     - Save/export as .webp or compressed .jpg — aim under ~150KB each.
     - A free tool like squoosh.app (drag, resize, export) takes ~10
       seconds per photo and makes the biggest difference of anything here.
   -------------------------------------------------------------------------- */

const PRODUCTS = {
//   "1": {
//     id: "1",
//     name: "AeroFit Wireless Earbuds",
//     category: "Tech",
//     icon: "earbuds",
//     image: "",
//     tagline: "All-day noise cancelling, half the price of the big brands.",
//     price: 1799,
//     originalPrice: 2999,
//     currency: "₹",
//     rating: 4.6,
//     reviews: 812,
//     highlights: [
//       "28 hours total battery with the case",
//       "Active noise cancellation + transparency mode",
//       "IPX5 sweat and splash resistant"
//     ],
//     affiliateLink: "https://example.com/aerofit-earbuds"
//   },
//   "2": {
//     id: "2",
//     name: "Lumen Desk Lamp",
//     category: "Home",
//     icon: "lamp",
//     image: "",
//     tagline: "Warm-to-cool light that actually helps you focus.",
//     price: 1249,
//     originalPrice: 1799,
//     currency: "₹",
//     rating: 4.8,
//     reviews: 356,
//     highlights: [
//       "Stepless brightness and colour temperature",
//       "USB-C powered, folds flat for travel",
//       "Eye-comfort flicker-free LEDs"
//     ],
//     affiliateLink: "https://example.com/lumen-lamp"
//   },
//   "3": {
//     id: "3",
//     name: "TrailPack 22L Daypack",
//     category: "Outdoor",
//     icon: "backpack",
//     image: "",
//     tagline: "The one bag that survived every trip this year.",
//     price: 2199,
//     originalPrice: 2899,
//     currency: "₹",
//     rating: 4.7,
//     reviews: 501,
//     highlights: [
//       "Water-resistant ripstop shell",
//       "Dedicated 15\" laptop sleeve",
//       "Chest strap for long hikes"
//     ],
//     affiliateLink: "https://example.com/trailpack-22l"
//   },
//   "4": {
//     id: "4",
//     name: "PulseFit Smart Watch",
//     category: "Tech",
//     icon: "watch",
//     image: "",
//     tagline: "Tracks everything, nags about nothing.",
//     price: 3499,
//     originalPrice: 4999,
//     currency: "₹",
//     rating: 4.5,
//     reviews: 1204,
//     highlights: [
//       "7-day battery life on a single charge",
//       "Heart rate, SpO2 and sleep tracking",
//       "Works with both iOS and Android"
//     ],
//     affiliateLink: "https://example.com/pulsefit-watch"
//   },
//   "5": {
//     id: "5",
//     name: "BrewMate Pour-Over Kit",
//     category: "Kitchen",
//     icon: "kettle",
//     image: "",
//     tagline: "Café-quality coffee without the café markup.",
//     price: 999,
//     originalPrice: 1499,
//     currency: "₹",
//     rating: 4.9,
//     reviews: 289,
//     highlights: [
//       "Gooseneck kettle for precise pouring",
//       "Reusable stainless steel filter included",
//       "Dishwasher safe carafe"
//     ],
//     affiliateLink: "https://example.com/brewmate-kit"
//   },
//   "6": {
//     id: "6",
//     name: "KeyForge Mechanical Keyboard",
//     category: "Tech",
//     icon: "keyboard",
//     image: "",
//     tagline: "Satisfying clicks, serious typing speed.",
//     price: 2799,
//     originalPrice: 3999,
//     currency: "₹",
//     rating: 4.7,
//     reviews: 674,
//     highlights: [
//       "Hot-swappable switches, no soldering needed",
//       "Per-key RGB with 16 lighting modes",
//       "Detachable braided USB-C cable"
//     ],
//     affiliateLink: "https://example.com/keyforge-keyboard"
//   },
//   "7": {
//     id: "7",
//     name: "HydroFlow Insulated Bottle",
//     category: "Everyday",
//     icon: "bottle",
//     image: "",
//     tagline: "Cold at noon, still cold at midnight.",
//     price: 649,
//     originalPrice: 999,
//     currency: "₹",
//     rating: 4.8,
//     reviews: 940,
//     highlights: [
//       "Keeps drinks cold for 24 hours, hot for 12",
//       "Leak-proof flip lid, one-hand open",
//       "750ml — fits most car cup holders"
//     ],
//     affiliateLink: "https://example.com/hydroflow-bottle"
//   },
  "2": {
    id: "2",
    name: "Laptop Cleaner Kit",
    category: "Tech",
    icon: "box",
    image: "images/cleaner.jpeg",
    tagline: "Gadget Cleaning Kit",
    price: 189,
    originalPrice: 699,
    currency: "₹",
    rating: 3.7,
    reviews: 112,
    highlights: [
      "Gadget Deals - 7 in 1 Laptop Cleaner Kit",
      "Keyboard Cleaner, Screen Cleaner, Dust Blower, Cleaning Brush, Microfiber Cloth, Cleaning Gel, and Cleaning Solution",
      "Perfect for cleaning laptops, keyboards"
    ],
    affiliateLink: "https://link.amazon/B0hdWNO49"
  },
  "1": {
    id: "1",
    name: "Trendy Men Formal Shirt",
    category: "Fashion",
    icon: "box",
    image: "images/beige.jpeg",
    tagline: "Premium Everyday Wear.",
    price: 257,
    originalPrice: 302,
    currency: "₹",
    rating: 3.9,
    reviews: 180,
    highlights: [
      "Brand - PROBIZ, Platform - Meesho",
      "Men's Modern Cotton Stripped Formal",
      "Excellent shirt quality, low budget."
    ],
    /* No single affiliateLink here — each colour has its own link below.
       The page will show a colour picker and swap the link automatically. */
    variants: [
  {
    label: "Beige",
    affiliateLink: "https://www.meesho.com/af_invite/460511969:instagram_stories:10715702?p_id=657894314&ext_id=avoyi2&utm_source=instagram_stories",
    image: "images/beige.jpeg",
    price: 257,
    originalPrice: 302
  },
  {
    label: "Blue",
    affiliateLink: "https://www.meesho.com/af_invite/460511969:instagram_stories:10716132?p_id=657894315&ext_id=avoyi3&utm_source=instagram_stories",
    image: "images/blue.jpeg",
    price: 293,          // this one costs more
    originalPrice: 308
  }
]
  },

  /* Example collection — try code "9" on the site. Swap in real items,
     photos and links, or delete this block once you've added your own. */
  "9": {
    id: "9",
    type: "collection",
    name: "The Best Keychain Collection",
    category: "Accessories",
    tagline: "Six designs, one code — flip through with the arrows.",
    items: [
      {
        name: "8 Ball Dice Charm Keychain",
        icon: "box",
        image: "images/8ball.jpeg",
        tagline: "Anime Keychains",
        price: 218,
        originalPrice: 251,
        currency: "₹",
        rating: 4.3,
        reviews: 9174,
        highlights: [
          "Aesthetic Key Chain for Women Men",
          "Premium Material Keychain",
          "Anime Keychains"
        ],
        affiliateLink: "https://www.meesho.com/af_invite/460511969:instagram_stories:10777018?p_id=646350972&ext_id=aotjlo&utm_source=instagram_stories"
      },
      {
        name: "Trendy Bottle Keychain (2 Set)",
        icon: "box",
        image: "images/bottle.jpeg",
        tagline: "A little sparkle for your keys or bag.",
        price: 89,
        originalPrice: 135,
        currency: "₹",
        rating: 3.5,
        reviews: 195,
        highlights: [
          "Trendy Bottle Keychain Combo",
          "Stylish Set of 2 Keychains",
          "Great as a cool gift"
        ],
        affiliateLink: "https://www.meesho.com/af_invite/460511969:instagram_stories:10776727?p_id=604880776&ext_id=a04ozs&utm_source=instagram_stories"
      },
      {
        name: "Spider-Man Keychain (2 Set)",
        icon: "box",
        image: "images/spiderman.jpeg",
        tagline: "Modern Spider-Man.",
        price: 173,
        originalPrice: 203,
        currency: "₹",
        rating: 4.6,
        reviews: 114,
        highlights: [
          "New Spider-Man Multi Colors Characters Keychain",
          "Pack Of 2",
          "Aesthetic Silicon Keychains"
        ],
        affiliateLink: "https://www.meesho.com/af_invite/460511969:instagram_stories:10777018?p_id=782420666&ext_id=cxtzne&utm_source=instagram_stories"
      },
      {
        name: "Skeleton Keychain",
        icon: "box",
        image: "images/skeleton.jpeg",
        tagline: "Skeleton Keychain Cool Flexible",
        price: 99,
        originalPrice: 149,
        currency: "₹",
        rating: 4.4,
        reviews: 464,
        highlights: [
          "Flexible - lightweight",
          "White skeleton"
        ],
        affiliateLink: "https://www.meesho.com/af_invite/460511969:instagram_stories:10777018?p_id=557058521&ext_id=97np3t&utm_source=instagram_stories"
      },
      {
        name: "Spider-Man Spinner Keychain",
        icon: "box",
        image: "images/spinner.jpeg",
        tagline: "Spider-Man Spinner",
        price: 123,
        originalPrice: 165,
        currency: "₹",
        rating: 4.1,
        reviews: 72,
        highlights: [
          "Spider-Man Metal Spinner Keychain",
          "360° Rotating Enamel Key Ring",
          "Premium Alloy Spider-Man"
        ],
        affiliateLink: "https://www.meesho.com/af_invite/460511969:instagram_stories:10776727?p_id=995564301&ext_id=ggqebx&utm_source=instagram_stories"
      },
      {
        name: "Gun Keychain",
        icon: "box",
        image: "images/gun.jpeg",
        tagline: "Shortgun keychain.",
        price: 232,
        originalPrice: 241,
        currency: "₹",
        rating: 4.2,
        reviews: 70731,
        highlights: [
          "Premium stainless steal short gun",
          "Metal hook keychain",
        ],
        affiliateLink: "https://www.meesho.com/af_invite/460511969:instagram_stories:10776727?p_id=1075704547&ext_id=hsg2xv&utm_source=instagram_stories"
      },
      {
        name: "Spider Keychain",
        icon: "box",
        image: "images/spider.jpeg",
        tagline: "Spider spinner keychain.",
        price: 151,
        originalPrice: 192,
        currency: "₹",
        rating: 4.5,
        reviews: 76,
        highlights: [
          "Spider-Man Inspired Rotating Spider Keychain",
          "Spider Keychain (Black)",
        ],
        affiliateLink: "https://www.meesho.com/af_invite/460511969:instagram_stories:10777018?p_id=489183292&ext_id=838w8s&utm_source=instagram_stories"
      }
    ]
  }
};
