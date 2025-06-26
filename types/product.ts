export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  stock: number;
  rating: number;
  discountPercentage: number;
  brand: string;
  category: string;
  availabilityStatus: string;
  tags: string[];
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  minimumOrderQuantity: number;
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  reviews: Review[];
}
