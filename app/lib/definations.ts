import { Prisma } from "@prisma/client";

export type ProductType = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  CartItem: CartItemType[];
  createdAt: Date;
  updatedAt: Date;
};

export type CartType = {
  id: string;
  userId: string;
  CartItem: CartItemType[];
  createdAt: Date;
  updatedAt: Date;
};

export type CartItemType = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};
export type UserType = {
  id: string;
  email: string;
  password: string;
  name: string;
  city: string;
  county: string;
  phone: string;
  address: string;
  zipcode: string;
  createdAt: Date;
  updatedAt: Date;
  Cart?: CartType;
  cartId: string;
};

export type PropsForProductDetails = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type CartWithProducts = Prisma.CartGetPayload<{
  include: {
    CartItem: {
      include: {
        product: true;
      };
    };
  };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export type CityCounty = {
  name: string;
  counties: string[];
};
