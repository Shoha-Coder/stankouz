/**
 * Swiper config for RelatedProducts carousel.
 * Customize here for project-wide consistency.
 */
export const relatedProductsSwiperConfig = {
  spaceBetween: 40,
  slidesPerView: 3,
  navigation: {
    prevEl: ".related-products-prev",
    nextEl: ".related-products-next",
  },
  breakpoints: {
    320: {
      spaceBetween: 16,
      slidesPerView: 1.1,
    },
    640: {
      spaceBetween: 20,
      slidesPerView: 2,
    },
    1024: {
      spaceBetween: 40,
      slidesPerView: 3,
    },
  },
};

/**
 * Swiper config for Lab products carousel.
 */
export const labProductsSwiperConfig = {
  spaceBetween: 40,
  slidesPerView: 3,
  navigation: {
    prevEl: ".lab-products-prev",
    nextEl: ".lab-products-next",
  },
};
