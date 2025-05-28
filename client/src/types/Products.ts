export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  embedding?: string;
  addedBy: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
