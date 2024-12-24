const { default: assets } = require('@/assets/asset');

export const ProfileCardData = [
  {
    carDetails: {
      name: 'Maruti Suzuki v1 2021',
      edition: '1 Edition',
      engineCapacity: '1200 CC',
      category: 'SUV',
      weight: '500kg',
      image: assets.ProfileListCardCar,
    },
    rating: {
      score: 4.6,
      reviews: 32,
    },
    condition: {
      new: {
        count: 16,
        price: '৳ 25.5 lakh',
      },
      old: {
        count: 8,
        price: '৳ 12.5 lakh',
      },
    },
  },
  {
    carDetails: {
      name: 'Maruti Suzuki v1 2021',
      edition: '1 Edition',
      engineCapacity: '1200 CC',
      category: 'SUV',
      weight: '500kg',
      image: assets.ProfileListCardCar,
    },
    rating: {
      score: 4.6,
      reviews: 32,
    },
    condition: {
      new: {
        count: 16,
        price: '৳ 25.5 lakh',
      },
      old: {
        count: 8,
        price: '৳ 12.5 lakh',
      },
    },
  },
  {
    carDetails: {
      name: 'Maruti Suzuki v1 2021',
      edition: '1 Edition',
      engineCapacity: '1200 CC',
      category: 'SUV',
      weight: '500kg',
      image: assets.ProfileListCardCar,
    },
    rating: {
      score: 4.6,
      reviews: 32,
    },
    condition: {
      new: {
        count: 16,
        price: '৳ 25.5 lakh',
      },
      old: {
        count: 8,
        price: '৳ 12.5 lakh',
      },
    },
  },
];

export const cartData = [
  {
    serial: 1,
    name: 'Meyle Front',
    pn: 1160100019,
    productImage: assets.SparePart1, // replace with actual image path
    supportedVehicle: 'TVS Apache RTR 160 2V 2017 Single (Front) Disl',
    origin: 'OEM',
    category: 'Suspension Balljoint',
    quantity: 1,
    price: 120,
  },
  {
    serial: 2,
    name: 'Meyle Front',
    pn: 1160100019,
    productImage: assets.SparePart1,
    supportedVehicle: 'TVS Apache RTR 160 2V 2017 Single (Front) Disl',
    origin: 'OEM',
    category: 'Suspension Balljoint',
    quantity: 1,
    price: 250,
  },
  {
    serial: 1,
    name: 'Meyle Front',
    pn: 1160100019,
    productImage: assets.SparePart1, // replace with actual image path
    supportedVehicle: 'TVS Apache RTR 160 2V 2017 Single (Front) Disl',
    origin: 'OEM',
    category: 'Suspension Balljoint',
    quantity: 1,
    price: 800,
  },
  // Add more rows as needed...
];

export const vehicleCartData = [
  {
    serial: 1,
    name: 'TVS Apache RTR 160 2V 2017',
    brand: 'TVS',
    image: assets.CartVehicle,
    condition: {
      category: 'NEW',
    },
    emi: {
      available: true,
      details: '6800 tk/mon - 4 years',
    },
    price: '25 lakh',
  },
  {
    serial: 2,
    name: 'TVS Apache RTR 160 2V 2017',
    brand: 'TVS',
    image: assets.CartVehicle,
    condition: {
      category: 'USED',
      details: '80% Fresh',
    },
    emi: {
      available: false,
      details: '6800 tk/mon - 4 years',
    },
    price: '25 lakh',
  },
  {
    serial: 3,
    name: 'TVS Apache RTR 160 2V 2017',
    brand: 'TVS',
    image: assets.CartVehicle,
    condition: {
      category: 'USED',
      details: '80% Fresh',
    },
    emi: {
      available: true,
      details: '6800 tk/mon - 4 years',
    },
    price: '25 lakh',
  },
  {
    serial: 4,
    name: 'TVS Apache RTR 160 2V 2017',
    brand: 'TVS',
    image: assets.CartVehicle,
    condition: {
      category: 'USED',
      details: '80% Fresh',
    },
    emi: {
      available: true,
      details: '6800 tk/mon - 4 years',
    },
    price: '25 lakh',
  },
];

export const faqs = [
  {
    question: "What is the 'Add List' feature?",
    answer:
      "The 'Add List' feature allows you to save items you're interested in for future reference. You can easily track and revisit these items at any time.",
  },
  {
    question: 'Will I be notified if an item in my list goes on sale?',
    answer:
      'Yes, you will receive notifications if an item in your list goes on sale, provided that you have notifications enabled in your account settings.',
  },
  {
    question: "Can I access my 'Add List' on different devices?",
    answer:
      "Yes, your 'Add List' is synced across all your devices as long as you're logged into your account.",
  },
  {
    question: 'Is there a limit to how many items I can add to my list?',
    answer:
      "There is no limit to how many items you can add to your list. You can save as many items as you'd like.",
  },
  {
    question: "Do items in my 'Add List' expire?",
    answer:
      "No, items in your 'Add List' do not expire. You can keep them in your list for as long as you like.",
  },
];

// spare parts details
export const Partsfaqs = [
  {
    question: 'What types of car and bike spare parts do you offer?',
    answer:
      "We offer wide range of spare parts for cars and bikes, including engine components, breaks, suspension, electrical systems, and more. Whether you're looking for OEM or aftermarket parts, we've got you covered",
  },
  {
    question: 'How do i know if a part is compatible with my vehicle?',
    answer:
      'Each product page provides detailed compatibility information. Simple enter your vehicles make model, and year to check if the part fits. You can also contact our customer service team for assistance.',
  },
  {
    question: "Can i return or exchange a spare part if it doesn't fit?",
    answer:
      "Yes, we have a hassle-free return and exchange policy. if a part doesn't fit your vehicle, you can return it within 30 days, as long as it is unused and in its original packaging.",
  },
  {
    question: 'Do you offer any warranty on spare parts?',
    answer:
      "Yes, most of our spare parts come with a manufacturer's warranty. Warranty details can be found on the the product page or by contactibg us for more information.",
  },
  {
    question: 'How long does delivery take for spare parts?',
    answer:
      "Delivery times vary based on your location and the part's available. Typically, order are delivered within 3-7 business days. Expedited shopping options are also avalable at checkout",
  },
];

export const carDetailsCheckboxOptions = [
  {
    title: 'Ownership Changes',
    options: ['This is Newly bought', '2nd Owner', '3rd Owner', '4th Owner', 'Others'],
  },
  {
    title: 'Has the vehicle ever been in an accident?',
    options: ['Yes', 'No', 'Others'],
  },
  {
    title: 'Does the vehicle have any Frame Damage?',
    options: ['Yes', 'No'],
  },
  {
    title: 'Does the vehicle have any Water Flow Damage?',
    options: ['Yes', 'No'],
  },
  {
    title: 'Does the vehicle have any major Hail Damage?',
    options: ['Yes', 'No'],
  },
  {
    title: 'Does the vehicle have any major Rust Damage?',
    options: ['Yes', 'No'],
  },
  {
    title: 'Are any parts broken or inoperable?',
    options: ['No', 'Yes, Only 1', 'Yes, More than 1'],
  },
  {
    title: 'Are there any rips or tears in the seat cover?',
    options: ['No', 'Yes, Only 1', 'Yes, More than 1'],
  },
  {
    title: 'Are there any stains in the body?',
    options: ['No', 'Yes, Only 1', 'Yes, More than 1'],
  },
  {
    title: 'Are there any mechanical issues or warning indicators showed on the dashboard?',
    options: ['Yes', 'No'],
  },
  {
    title: 'Are any of these warning indicators showed on the dashboard?',
    options: ['Check engine', 'ABS/Brakes', 'Other'],
  },
  {
    title: 'Any of these following problems have to fix?',
    options: [
      'Problem with brakes',
      'Problem with handlebar',
      'Problem with suspension',
      'Other major mechanical concerns',
    ],
  },
  {
    title: 'Has any meter on dash console ever been broken or replaced?',
    options: ['Yes', 'No'],
  },
  {
    title: 'Are there any panels in need of paint?',
    options: ['No', 'Yes, Only 1', 'Yes, More than 1'],
  },
  {
    title: 'Are there any panels with scratch?',
    options: ['No', 'Yes, Only 1', 'Yes, More than 1'],
  },
  {
    title: 'Do any tires need to be replaced?',
    options: ['No', 'Yes, Only 1', 'Yes, More than 1'],
  },
  {
    title: 'How many keys do you have?',
    options: ['1', '2', 'More than 2'],
  },
  {
    title: 'Does the vehicle have any aftermarket modifications?',
    options: ['Yes', 'No'],
  },
];
