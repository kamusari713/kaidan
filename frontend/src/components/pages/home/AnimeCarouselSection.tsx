'use client'

import { Card, CardContent, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, Skeleton } from '@/components/ui'
import { useAnimeCarousel } from '@/hooks/anime'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export const AnimeCarouselSection: FC = () => {
    const { data, isLoading, error, fetchMore, networkStatus } = useAnimeCarousel()
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [lastItemRef, inView] = useInView({ threshold: 0 })
    const carouselRef = useRef<HTMLDivElement>(null)
    const [scrollPosition, setScrollPosition] = useState(0)

    const handleBeforeFetch = () => {
        if (carouselRef.current) {
            setScrollPosition(carouselRef.current.scrollLeft)
        }
    }

    const restoreScrollPosition = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'auto',
            })
        }
    }

    useEffect(() => {
        if (!isLoading && data) {
            restoreScrollPosition()
        }
    }, [data, isLoading])

    useEffect(() => {
        if (inView && hasMore && !isLoading && networkStatus !== 3) {
            handleBeforeFetch()
            const nextPage = currentPage + 1
            fetchMore({
                variables: { page: nextPage },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult || !fetchMoreResult.page) return prev

                    const newItems = fetchMoreResult.page.media.filter((newItem) => !prev.page.media.some((prevItem) => prevItem.shikimoriId === newItem.shikimoriId))

                    setHasMore(fetchMoreResult.page.pageInfo.hasNextPage)
                    setCurrentPage(nextPage)

                    return {
                        ...prev,
                        page: {
                            ...prev.page,
                            media: [...prev.page.media, ...newItems],
                            pageInfo: fetchMoreResult.page.pageInfo,
                        },
                    }
                },
            })
        }
    }, [inView, currentPage, hasMore, isLoading, networkStatus])

    if (error) return <div className="text-red-500">{error.message}</div>
    if (!data && isLoading) return <CarouselSkeleton />

    return (
        <Carousel
            ref={carouselRef}
            opts={{
                align: 'start',
                loop: false,
                slidesToScroll: 5,
            }}
            className="w-full mx-auto"
        >
            <CarouselContent>
                {data?.page?.media?.map((anime, index) => (
                    <CarouselItem
                        key={anime.shikimoriId}
                        className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5 flex-[0_0_20%] pl-4"
                        ref={index === data.page.media.length - 1 ? lastItemRef : null}
                    >
                        <Link href={`/anime/${anime.shikimoriId}`}>
                            <Card>
                                <CardContent className="flex flex-col gap-2 p-2 group/item hover:bg-primary/20">
                                    <Image width={200} height={300} src={anime.coverImage.extraLarge!} alt={anime.title.RU} className="w-full h-72 object-cover rounded-md" />
                                    <h3 className="w-full h-4 group-hover/item:text-primary text-sm font-bold line-clamp-1">{anime.title.RU}</h3>
                                    <h3 className="w-full h-4 text-sm text-foreground/60">{anime.kind}</h3>
                                </CardContent>
                            </Card>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className={!data || isLoading ? 'hidden' : ''} />
            <CarouselNext className={!data || isLoading ? 'hidden' : ''} />
        </Carousel>
    )
}

const CarouselSkeleton = () => (
    <Carousel
        opts={{
            align: 'start',
            loop: false,
            slidesToScroll: 5,
        }}
        className="w-full mx-auto"
    >
        <CarouselContent>
            {Array.from({ length: 5 }, (_, index) => (
                <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5 flex-[0_0_20%] pl-4">
                    <Card>
                        <CardContent className="flex flex-col gap-2 p-2">
                            <Skeleton className="w-full h-72 rounded-md" />
                            <Skeleton className="w-full h-4" />
                            <Skeleton className="w-full h-4" />
                        </CardContent>
                    </Card>
                </CarouselItem>
            ))}
        </CarouselContent>
    </Carousel>
)
