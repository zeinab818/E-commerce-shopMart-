'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'


export default function ProductSlider({images,altContent}:{images:string[],altContent:string}) {
  return<>
        <Carousel  opts={{
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                    delay: 2000,
                    }),
                ]}>
                <CarouselContent>
                    {images.map((img , index)=> 
                        <CarouselItem className="flex justify-center" key={index}>
                            <Image
                            className="rounded-xl  shadow-md w-full object-cover"
                            src={img}
                            alt={`${altContent} - ${index + 1}`}
                            width={300}
                            height={300}/>
                        </CarouselItem>)}
        
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
  </>
}
