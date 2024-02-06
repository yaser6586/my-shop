import { Cookie } from "next/font/google";
import { prisma } from "./prisma";
import { cookies } from "next/headers";
import { stringify } from "querystring";
import { ShoppingCart } from "./definations";
import { create } from "domain";

/**
 * returns all products from database
 * @returns all products from database
 */
export async function getAllProduct() {
  try {
    const allProducts = await prisma.product.findMany();
    return allProducts;
  } catch (error) {
    throw new Error("ارتباط با سرور برقرار نیست");
  }
}

/**
 * returns a product by its slug
 * @param1 slug of the product
 * @returns a specific product
 */
export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug: slug,
      },
    });
    return product;
  } catch (error) {
    throw new Error("ارتباط با سرور برقرار نیست");
  }
}
/**
 *  create a new cart if it dose not exist
 * @returns cart object besides items and size and subtotal
 */
export async function createCart(): Promise<ShoppingCart> {
  const newCart = await prisma.cart.create({
    data: {},
  });

  cookies().set("localCartId", newCart.id);

  return {
    ...newCart,
    CartItem: [],
    size: 0,
    subtotal: 0,
  };
}

/**
 * return existing cart
 * @returns cart object with size and subtotal
 */
export async function getCart(): Promise<ShoppingCart | null> {
  let localCartId = cookies().get("localCartId")?.value;
  if (!localCartId) {
  }
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },

        include: {
          CartItem: {
            include: { product: true },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      })
    : null;

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.CartItem.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.CartItem.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    ),
  };
}
