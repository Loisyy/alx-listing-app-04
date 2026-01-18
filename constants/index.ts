import { PropertyProps } from "@/interfaces";

export const API_URL = "https://api.example.com";

export const HERO_BACKGROUND_IMAGE = "/assets/hero-bg.jpg";

export const FILTERS = [
  "All",
  "Top Villa",
  "Free Reschedule",
  "Book Now, Pay Later",
  "Self Checkin",
  "Instant Book"
];

export const PROPERTYLISTINGSAMPLE: PropertyProps[] = [
  {
    id: "1",
    name: "Villa Ocean Breeze",
    description: "A luxurious villa with ocean views and private pool.",
    address: {
      state: "Seminyak",
      city: "Bali",
      country: "Indonesia"
    },
    rating: 4.89,
    category: ["Luxury Villa", "Pool", "Free Parking"],
    price: 3200,
    offers: {
      bed: "3",
      shower: "3",
      occupants: "4-6"
    },
    image: "https://example.com/image1.jpg",
    discount: ""
  },
  {
    id: "2",
    name: "Mountain Escape Chalet",
    description: "Cozy mountain cabin with breathtaking views.",
    address: {
      state: "Aspen",
      city: "Colorado",
      country: "USA"
    },
    rating: 4.70,
    category: ["Mountain View", "Fireplace", "Self Checkin"],
    price: 1800,
    offers: {
      bed: "4",
      shower: "2",
      occupants: "5-7"
    },
    image: "https://example.com/image2.jpg",
    discount: "30"
  },
  {
    id: "3",
    name: "Cozy Desert Retreat",
    description: "Relax in a private desert villa surrounded by dunes.",
    address: {
      state: "Palm Springs",
      city: "California",
      country: "USA"
    },
    rating: 4.92,
    category: ["Desert View", "Pet Friendly", "Self Checkin"],
    price: 1500,
    offers: {
      bed: "2",
      shower: "1",
      occupants: "2-3"
    },
    image: "https://example.com/image3.jpg",
    discount: ""
  },
];
