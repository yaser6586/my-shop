import { getProductBySlug } from '@/app/lib/data';
import {  PropsForProductDetails } from '@/app/lib/definations';
import AddToCartButton from '@/app/ui/productDetailPage/AddToCartButton';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React, { cache } from 'react'

/**
 * cache the result of the getProductBySlug function
 *  for different uses it make page load faster
 */
const getProduct = cache(async (slug: string) => {
    
    const product = await getProductBySlug(slug)
    
    if (!product) redirect("/not-found");
    return product;
  });
export async function generateMetadata(
    { params, searchParams }: PropsForProductDetails,
  parent: ResolvingMetadata

  ): Promise<Metadata> {
    // read route params
   
  
    // fetch data
    const product = await getProduct(decodeURI(params.slug));
  
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];
  
    return {
      title: product?.slug,
      description: product?.description,
    };
  }


export default async function ProductDetail({
    params,
  }: {
    params: {
      slug: string;
    };
  }) {
  
    const product = await getProduct(decodeURI(params.slug));
  return (

   
    <div className='w-full flex flex-col justify-center gap-5 p-10'>
      <div className='m-auto text-3xl font-bold my-4'>{product.name}</div>
      <div className='w-full flex flex-col md:flex-row gap-5 justify-center m-auto'>
        <div className='basis-1/2 flex flex-col justify-center gap-5 '>
          <Image src={`${product.image}`} alt={product.name} width={600} height={400} className='object-cover'></Image>
        </div>
        <div className='basis-1/2 flex flex-col justify-center gap-5'>
          <div className='m-auto ' dir='rtl'>{product.description}</div>
         <div className='flex flex-row justify-between'>
            <div className='ml-0 bg-yellow-100 w-fit p-1 text-center rounded-xl pt-2 whitespace-pre-wrap'
             dir='rtl'>{product.price}  ریال</div>

            <AddToCartButton productId={product.id as string} className='btn btn-wide bg-warning'
             title='افزودن به سبد خرید'/>
         </div >
        </div>

      </div>
      </div>
  )
}
