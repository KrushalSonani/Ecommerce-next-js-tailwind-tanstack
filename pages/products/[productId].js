// pages/products/[productId].js
import { useRouter } from 'next/router';
import { useGetProductById } from '../api/api';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ProductDetailPage = () => {
    const router = useRouter();
    const { productId } = router.query;
    const { isPending, error, data, isFetching } = useGetProductById(productId);
    const [curremtImg, setCurremtImg] = useState(data?.thumbnail || '')

    useEffect(() => {
        setCurremtImg(data?.thumbnail)
    }, [data])


    return (

        <div className='container h-screen max-w-screen-2xl m-auto'>
            {isPending ? <p>Fetching...</p> :
                <div className='flex flex-col justify-between pt-6'>
                    <div className="mx-auto flex flex-col sm:flex-row">
                        <div>

                            <Image
                                alt={data?.title}
                                draggable={false}
                                className="object-contain object-top"
                                src={curremtImg || data?.thumbnail}
                                width={560}
                                height={560}
                            />
                            <div>
                                <ul className='my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0'>
                                    {console.log("curremtImg", curremtImg)}
                                    {data?.images.map((item, i) => {
                                        return (
                                            <li className='h-20 w-20 cursor-pointer' onClick={() => setCurremtImg(item)} key={i}>
                                                <a className='h-full w-full'>
                                                    <div className={`${curremtImg === item ? 'border-blue-600' : 'border-neutral-200'} group p-2 flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black  dark:border-neutral-800`} >
                                                        <Image
                                                            alt="Thumbnail"
                                                            draggable={false}
                                                            className="object-cover object-top h-full w-full"
                                                            src={item}
                                                            width={80}
                                                            height={80}
                                                        />
                                                    </div>
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>

                            </div>

                        </div>
                        <div className='mt-10 flex flex-col sm:mt-0 sm:ml-10'>
                            <h1 className='mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl'>{data?.title}</h1>
                            <h2 className='mt-1 text-md font-bold uppercase text-gray-500  sm:tracking-tight '>{data?.brand}</h2>
                            <p className='mt-3 text-4xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight lg:text-3xl'>
                                ${data?.price} <small className='text-sm ml-2 text-gray-500 '>{data?.discountPercentage}% OFF</small>
                            </p>

                            <div className="mt-5 mb-5 border-t border-gray-200 pt-5 font-bold">Description</div>
                            <p className="max-w-xl">{data?.description}</p>
                            <p className="max-w-xl mt-3"> <b> Rating:</b> {data?.rating}/5</p>
                            <p className="max-w-xl mt-1"> <b> In Stock: </b> {data?.stock}</p>
                        </div>
                    </div>
                </div>
            }
        </div >
    );
};

export default ProductDetailPage;
