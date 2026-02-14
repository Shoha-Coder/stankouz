/**
 * Swiper config for RelatedProducts carousel.
 * Customize here for project-wide consistency.
 */
export const relatedProductsSwiperConfig = {
  spaceBetween: 40,
  slidesPerView: 3,
  navigation: {
    prevEl: document.querySelector(".related-products-prev") as HTMLElement,
    nextEl: document.querySelector(".related-products-next") as HTMLElement,
  },
};

/**
 * Swiper config for Lab products carousel.
 */
export const labProductsSwiperConfig = {
  spaceBetween: 40,
  slidesPerView: 3,
  navigation: {
    prevEl: document.querySelector(".lab-products-prev") as HTMLElement,
    nextEl: document.querySelector(".lab-products-next") as HTMLElement,
  },
};
