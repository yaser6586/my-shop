"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { createCart, getCart } from "./data";
import { redirect } from "next/navigation";
import { hash } from "bcrypt";

/**
 * add new prduct to database
 * @param prevState
 * @param formData
 * @returns void
 */
export async function handleAddProduct(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const url = formData.get("imageUrl") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  let trimmedSlug = slug.trim();
  let formattedSlug = trimmedSlug.replace(/\s+/g, "-");
  const numberedPrice = Number(price);

  //check if slug repetitive
  const slugExisted = await prisma.product.findUnique({
    where: { slug: formattedSlug },
  });
  if (slugExisted) {
    return {
      status: "error",
      message: "اسلاگ تکراری است",
    };
  }

  // adding product to database

  await prisma.product.create({
    data: {
      name: name,
      slug: formattedSlug,
      description: description,
      price: numberedPrice,
      image: url,
    },
  });

  return {
    status: "successful",
    message: "محصول با موفقیت آپلود شد",
  };
}

/**
 * add productId to cart
 * @returns result of action
 */
export async function handleAddProductIdToCart(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart?.CartItem.find(
    (item) => item.product.id === productId
  );

  if (articleInCart) {
    await prisma.cartItem.update({
      where: { id: articleInCart.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  }
  revalidatePath("/products/[id]");
  return {
    status: "successful",
    message: "محصول به سبد خرید اضافه شد",
  };
}

/**
 * change quantity of specific cartItem
 * @param newQuantity
 * @param cartItemId
 * @returns
 */

export async function ChangeQuantityOfCartItem(
  newQuantity: number,
  cartItemId: string
) {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
  });

  await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity: newQuantity },
  });
  revalidatePath("/products/[id]");
  return {
    status: "successful",
    message: `    تعداد محصول در سبد خرید تغییر کرد به ${newQuantity.toLocaleString("fa-IR")}  عدد    `,
  };
}

/**
 * remove item form cart
 * @param cardItemId
 * @returns status and message
 */
export async function removeCartItem(cardItemId: string) {
  await prisma.cartItem.delete({
    where: { id: cardItemId },
  });
  revalidatePath("/products/[id]");
  return {
    status: "successful",
    message: "محصول از سبد خرید حذف شد",
  };
}

export async function handleSignUpForm(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const city = formData.get("city") as string;
  const county = formData.get("county") as string;
  const phone = formData.get("phone") as string;
  const zipCode = formData.get("zipCode") as string;
  const address = formData.get("address") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("confirmPassword") as string;

  if (city === "--استان--" || county === "--شهرستان--") {
    return {
      status: "error",
      message: "لطفا استان و شهر خود را انتخاب کنید",
    };
  }

  if (password !== passwordConfirm) {
    return {
      status: "error",
      message: "رمزهای وارد شده مطابقت ندارند",
    };
  }

  const userExisted = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (userExisted) {
    return { status: "error", message: "این ایمیل قبلا ثبت شده است" };
  }

  const hashPass = await hash(password, 6);

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      city: city,
      county: county,
      address: address,
      phone: phone,
      zipcode: zipCode,
      password: hashPass,
    },
  });
  revalidatePath("/sign-up");
  return {
    status: "successful",
    message: ` ثبت نام با موفقیت انجام شد 
    عزیر خوش آمدید ${newUser.name}`,
  };
}
