// pages/products/[productId].js
import { useRouter } from 'next/router';
import { updateProductById, useGetProductById } from '../api/api';
import Image from 'next/image';
import { useEffect, useState, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const ProductDetailPage = () => {
    const router = useRouter();
    const { productId } = router.query;
    const { isPending, error, data, isFetching } = useGetProductById(productId);

    const [productData, setProductData] = useState({})
    const [currentImg, setCurrentImg] = useState(data?.thumbnail || '')
    const [open, setOpen] = useState(false)
    const [productInfo, setProductInfo] = useState({
        title: '',
        stock: '',
    });

    const cancelButtonRef = useRef(null)

    useEffect(() => {
        setCurrentImg(data?.thumbnail)
        setProductData(data)
    }, [data])



    const handleupdate = async () => {
        let payload = productInfo
        let res = await updateProductById(productId, payload);
        if (res) {
            debugger
            setProductData(res)
            setOpen(false)
        }
    }


    return (

        <div className='container h-full max-w-screen-2xl m-auto'>
            <div className='flex flex-col justify-between pt-6'>
                {isPending ?
                    <div
                        className=" block m-auto text-center h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]" >Loading...</span>
                    </div>
                    :
                    <div className="mx-auto flex flex-col md:flex-row">
                        <div>
                            <Image
                                alt={productData?.title}
                                draggable={false}
                                className="object-contain object-top w-full"
                                src={currentImg || productData?.thumbnail}
                                width={560}
                                height={560}
                            />
                            <div>
                                <ul className='my-12 flex flex-wrap items-center justify-center gap-2 overflow-auto py-1 lg:mb-0'>
                                    {productData?.images?.map((item, i) => {
                                        return (
                                            <li className='h-20 w-20 cursor-pointer' onClick={() => setCurrentImg(item)} key={i}>
                                                <a className='h-full w-full'>
                                                    <div className={`${currentImg === item ? 'border-blue-600' : 'border-neutral-200'} group p-2 flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black  dark:border-neutral-800`} >
                                                        <Image
                                                            alt="Thumbnail"
                                                            draggable={false}
                                                            className="object-cover object-top "
                                                            src={item}
                                                            width={70}
                                                            height={70}
                                                        />
                                                    </div>
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>

                        </div>
                        <div className='mt-10 flex flex-col sm:mt-0 sm:ml-10 relative'>
                            <h1 className='mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl pr-10 '>{productData?.title}</h1>
                            <button className='flex gap-1 absolute right-0' onClick={() => setOpen(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                            <h2 className='mt-1 text-md font-bold uppercase text-gray-500  sm:tracking-tight '>{productData?.brand}</h2>
                            <p className='mt-3 text-4xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight lg:text-3xl'>
                                ${productData?.price} <small className='text-sm ml-2 text-gray-500 '>{productData?.discountPercentage}% OFF</small>
                            </p>
                            <div className="mt-5 mb-5 border-t border-gray-200 pt-5 font-bold">Description</div>
                            <p className="max-w-xl">{productData?.description}</p>
                            <p className="max-w-xl mt-3"> <b> Rating:</b> {productData?.rating}/5</p>
                            <p className="max-w-xl mt-1"> <b> In Stock: </b> {productData?.stock}</p>
                        </div>
                    </div>
                }
                {error && <div> Data Not Found </div>}
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="block">
                                            <fieldset className='mb-3'>
                                                <label> Title </label>
                                                <input
                                                    type='text'
                                                    name='title'
                                                    placeholder='Stock'
                                                    defaultValue={productData?.title}
                                                    className='block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                    onChange={(e) => setProductInfo({ ...productInfo, title: e.target.value })}
                                                />
                                            </fieldset>
                                            <fieldset>
                                                <label> Stock </label>
                                                <input
                                                    type='number'
                                                    name='stock'
                                                    defaultValue={productData?.stock}
                                                    className='block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                    onChange={(e) => setProductInfo({ ...productInfo, stock: e.target.value })}
                                                />
                                            </fieldset>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                            onClick={() => handleupdate()}
                                        >
                                            Update
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div >




    );
};

export default ProductDetailPage;
