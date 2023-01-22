interface CartData {
  id: string;
  dealType: string;
  beginDate: string;
  endDate: string;
  number: string;
  vatIncluded: false;
  participants: {
    count: number;
  };
  item: {
    id: string;
    totalPrice: number;
    price: number;
    measurementUnit: string;
    category: string;
    group: string;
    mark: string | null;
    quantity: number;
    description: string;
  };
  location: string | null;
  distance: number;
}

export default CartData;
