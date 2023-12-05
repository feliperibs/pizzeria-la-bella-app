export interface IPizza {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}
export interface IPizzaRequest {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}
