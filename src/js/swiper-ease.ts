interface ISwiperEaseOptions {
    //
}

class SwiperEase {
    private wrapper: HTMLElement;
    private navigation: { next: HTMLElement; prev: HTMLElement };
    private activeIndex = 1;
    private slides: NodeListOf<HTMLElement>;
    private readonly slidesCount: number;
    private readonly slideWidth: number;
    
    constructor(selector: string, options: ISwiperEaseOptions) {
        const swiper = document.querySelector(selector);
        this.wrapper = swiper.querySelector('.swiper-ease-wrapper');
        this.navigation = {
            prev: swiper.querySelector('.swiper-ease-btn_prev'),
            next: swiper.querySelector('.swiper-ease-btn_next')
        }
        const slideWidth = this.slideWidth = this.wrapper.offsetWidth;
        swiper.setAttribute('style', `--swiper-ease-slide-width: ${slideWidth}px`);
        this.slides = swiper.querySelectorAll('.swiper-ease-slide');
        this.slidesCount = this.slides.length;
        
        
        
        //-----------
        this.navigation.next.addEventListener('click', () => this.slideNext());
        this.navigation.prev.addEventListener('click', () => this.slidePrev());
    }
}