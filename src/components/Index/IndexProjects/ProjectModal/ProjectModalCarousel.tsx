import {FC, useEffect, useState} from 'react'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import Image from 'next/image'
import {ImageInterface} from '@/models/index'
import imageSource from '@/utils/imageSource'

interface Props {
  imageList: ImageInterface[]
}

export const ProjectModalCarousel: FC<Props> = ({imageList}) => {
  const [isMobile, changeIsMobile] = useState(false)

  useEffect(() => {
    changeIsMobile(document.documentElement.clientWidth < 767)
  }, [])

  return (
    <div className="project-modal__images">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={isMobile ? 1: 2}
        spaceBetween={0}
        navigation
        pagination={{clickable: true}}
      >
        {imageList.map((image, idx) => {
          return (
            <SwiperSlide className="project-modal__image" key={idx}>
              <Image
                src={imageSource(image.src)}
                blurDataURL={image.base64}
                placeholder="blur"
                objectFit="cover"
                layout="fill"
                alt="project image"
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
