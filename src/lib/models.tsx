export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  description: string;
  abbre_title: string;
  category: string[];
  is_published: boolean;
  image_url: string;
}
export interface Menu {
  id: number;
  title: string; //
  price: number;
  image_url: string;
}
export interface Order {
  id: number;
  name: string; //
  price: number;
  detail: string;
  count: number;
  note: string;
  is_published: boolean;
}
