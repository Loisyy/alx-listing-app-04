export interface PropertyProps {
  id: string;
  name: string;
  description: string;          // property description
  address: {
    state: string;
    city: string;
    country: string;
  };
  rating: number;
  category: string[];           // amenities or categories
  price: number;
  offers: {
    bed: string;
    shower: string;
    occupants: string;
  };
  image: string;                // main image
  images?: string[];            // optional extra images
  discount?: string;            // optional discount
}
