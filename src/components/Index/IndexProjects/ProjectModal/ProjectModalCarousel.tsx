import {FC, useEffect, useCallback, useState, useMemo} from 'react'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import Image from 'next/image'
import {ImageInterface} from '@/models/index'
import imageSource from '@/utils/imageSource'
import ImageViewer from 'react-simple-image-viewer'

interface Props {
  imageList: ImageInterface[]
}

export const ProjectModalCarousel: FC<Props> = ({imageList}) => {
  const [isMobile, changeIsMobile] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  useEffect(() => {
    changeIsMobile(document.documentElement.clientWidth < 767)
  }, [])

  const modifiedImageList = useMemo(() => {
    return imageList.map((image) => imageSource(image.src))
  }, [imageList])

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }


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
                objectFit="contain"
                layout="fill"
                alt="project image"
                onClick={() => openImageViewer(idx)}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
      {isViewerOpen && (
        <ImageViewer
          src={modifiedImageList}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={ closeImageViewer }
        />
      )}
    </div>
  )
}
