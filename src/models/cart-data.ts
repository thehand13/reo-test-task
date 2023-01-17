interface CartData {
  id: string;
  dealType: string;
  beginDate: Date;
  endDate: Date;
  number: string;
  vatIncluded: false;
  participants: {
    count: number;
  };
  item: {
    id: string;
    totalPrice: 340000;
    price: 10000;
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
