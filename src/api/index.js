// src/api/index.js
export const fetchCustomers = async () => {
    return [
      {
        id: 11908,
        name: 'Ram',
        color: [182, 73, 99],
        email: 'jesus_christ@church.com',
        pincode: 'Mumbai',
        location_name: 'Mumbai, Maharashtra, India',
        type: 'C',
        profile_pic: null,
        gst: ''
      },
      {
        id: 22567,
        name: 'Sita',
        color: [255, 165, 0],
        email: 'sita@ayodhya.com',
        pincode: 'Ayodhya',
        location_name: 'Ayodhya, Uttar Pradesh, India',
        type: 'B',
        profile_pic: null,
        gst: 'ABC123456789'
      },
      {
        id: 33894,
        name: 'Krishna',
        color: [0, 128, 0],
        email: 'krishna@vrindavan.com',
        pincode: 'Vrindavan',
        location_name: 'Vrindavan, Uttar Pradesh, India',
        type: 'A',
        profile_pic: null,
        gst: 'DEF987654321'
      },
      {
        id: 44782,
        name: 'Ganesha',
        color: [255, 0, 0],
        email: 'ganesha@kailash.com',
        pincode: 'Kailash',
        location_name: 'Kailash, Tibet',
        type: 'B',
        profile_pic: null,
        gst: ''
      },
      {
        id: 55123,
        name: 'Durga',
        color: [128, 0, 128],
        email: 'durga@kalighat.com',
        pincode: 'Kalighat',
        location_name: 'Kalighat, Kolkata, West Bengal, India',
        type: 'C',
        profile_pic: null,
        gst: 'GHI456789123'
      }
    ];
  };
  
  export const fetchProducts = async () => {
    return [
      {
        id: 209,
        display_id: 8,
        owner: 1079,
        name: 'New Product',
        category: 'The god of War',
        characteristics: 'New Product Characteristics',
        brand: 'New Product Brand',
        sku: [
          { id: 248, selling_price: 54, max_retail_price: 44, amount: 33, unit: 'kg', quantity_in_inventory: 0 },
          { id: 247, selling_price: 32, max_retail_price: 32, amount: 33, unit: 'kg', quantity_in_inventory: 0 },
          { id: 246, selling_price: 23, max_retail_price: 21, amount: 22, unit: 'kg', quantity_in_inventory: 1 }
        ],
        updated_on: '2024-05-24T12:46:41.995873Z',
        adding_date: '2024-05-24T12:46:41.995828Z'
      },
      {
        id: 310,
        display_id: 15,
        owner: 1087,
        name: 'Warrior Armor',
        category: 'Defensive Gear',
        characteristics: 'Strong and Durable',
        brand: 'ArmorCraft',
        sku: [
          { id: 267, selling_price: 120, max_retail_price: 150, amount: 10, unit: 'pcs', quantity_in_inventory: 5 },
          { id: 268, selling_price: 90, max_retail_price: 110, amount: 8, unit: 'pcs', quantity_in_inventory: 3 }
        ],
        updated_on: '2024-05-25T09:23:17.995873Z',
        adding_date: '2024-05-25T09:23:17.995828Z'
      },
      {
        id: 417,
        display_id: 22,
        owner: 1095,
        name: 'Battle Axe',
        category: 'Melee Weapon',
        characteristics: 'Sharp and Deadly',
        brand: 'ForgeMaster',
        sku: [
          { id: 289, selling_price: 80, max_retail_price: 100, amount: 15, unit: 'pcs', quantity_in_inventory: 7 },
          { id: 290, selling_price: 65, max_retail_price: 80, amount: 10, unit: 'pcs', quantity_in_inventory: 4 }
        ],
        updated_on: '2024-05-26T14:58:32.995873Z',
        adding_date: '2024-05-26T14:58:32.995828Z'
      },
      {
        id: 528,
        display_id: 29,
        owner: 1103,
        name: 'Divine Bow',
        category: 'Ranged Weapon',
        characteristics: 'Precision and Power',
        brand: 'SkyArms',
        sku: [
          { id: 312, selling_price: 150, max_retail_price: 180, amount: 5, unit: 'pcs', quantity_in_inventory: 2 },
          { id: 313, selling_price: 110, max_retail_price: 130, amount: 7, unit: 'pcs', quantity_in_inventory: 3 }
        ],
        updated_on: '2024-05-27T11:42:49.995873Z',
        adding_date: '2024-05-27T11:42:49.995828Z'
      }
    ]
  };
  
  export const createSaleOrder = async (order) => {
    return { success: true };
  };
  