export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  description: string;
  abbre_title: string;
  category: string[];
  is_published: boolean;
}
export interface Menu {
  c_id: number;
  c_title: string;
  c_price: number;
}
export interface Order {
  id: number;
  name: string;
  price: number;
  detail: string;
  count: number;
  note: string;
  is_published: boolean;
}
