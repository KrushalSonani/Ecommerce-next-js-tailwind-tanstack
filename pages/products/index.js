"use client"


import React from 'react'
import Image from 'next/image'
import { useGetProducts } from '../api/api'


function Products() {
    const { isPending, error, data, isFetching } = useGetProducts()
    if (error) return 'An error has occurred: ' + error?.message

    return (
        <div className='container  max-w-screen-2xl m-auto py-6'>
            <div className="mb-8 text-2xl font-bold"><h1>Our Products</h1></div>

            {isPending ?
                <div
                    className=" block m-auto text-center h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                </div>
                :
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
                    {data?.products?.map((item, i) => {
                        return (
                            <a key={i} href={`/products/${item.id}`} className='shadow-xl rounded-lg border-solid border border-inherit'>
                                <li>
                                    <div className="rounded-t-lg relative border-solid border-b overflow-hidden p-4 bg-slate-50 aspect-[9/8] w-full">
                                        <Image
                                            alt={item.title}
                                            src={item.thumbnail}
                                            draggable={false}
                                            className=" object-cover object-center transition ease-in-out hover:scale-110 duration-300"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            fill
                                            priority
                                        />
                                    </div>
                                    <div className=" p-3">
                                        <p className="text-sm text-slate-500 mb-2">{item.category}</p>
                                        <div className='flex txt-compact-medium justify-between'>
                                            <h2 className="font-normal font-sans text-lg text-ui-fg-subtle">{item.title}</h2>
                                            <div className="flex items-center gap-x-2">
                                                <p className="font-normal txt-medium text-ui-fg-muted">${item.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </a>

                        )
                    })
                    }
                </ul>
            }
        </div>
    )
}

export default Products