import {FC, useEffect, useState} from 'react'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import Image from 'next/image'

interface Props {
  imageList: string[]
}

const HOST = process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT

export const EducationModalSlider: FC<Props> = ({imageList}) => {
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
          const src = `${HOST}/${image as string}`
          return (
            <SwiperSlide className="project-modal__image" key={idx}>
              <Image
                src={src}
                objectFit={"cover"}
                layout="fill"
                alt={"image"}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}