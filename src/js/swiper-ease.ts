interface ISwiperEaseOptions {
    slide?: {
        margin?: number,
        transitionDelay?: number,
        activeIndex?: number
    },

    navigation?: {
        prev: string,
        next: string
    }
}

const defaultSwiperOptions: ISwiperEaseOptions = {
    slide: {
        margin: 30,
        transitionDelay: 500,
        activeIndex: 0
    },
    navigation: {
        prev: '.swiper-ease-btn_prev',
        next: '.swiper-ease-btn_next'
    }
}


class SwiperEase {
    private readonly options: ISwiperEaseOptions;
    private readonly swiper: HTMLElement;
    private readonly wrapper: HTMLElement;
    private readonly navigation: { next: HTMLElement; prev: HTMLElement };
    private readonly slides: NodeListOf<HTMLElement>;
    private readonly slidesCount: number;
    private slideWidth: number;
    private activeIndex: number;
    
    constructor(selector: string, options: ISwiperEaseOptions = {}) {
        this.options = {
            ...defaultSwiperOptions,
            ...options
        };
        this.swiper = document.querySelector(selector);
        this.wrapper = this.swiper.querySelector('.swiper-ease-wrapper');
        this.slides = this.swiper.querySelectorAll('.swiper-ease-slide');
        this.slidesCount = this.slides.length;
        this.activeIndex = this.options.slide.activeIndex;

        const { navigation } = options;
        
        this.navigation = navigation? {
            prev: document.querySelector(navigation.prev),
            next: document.querySelector(navigation.next)
        } : {
            prev: this.swiper.querySelector(defaultSwiperOptions.navigation.prev),
            next: this.swiper.querySelector(defaultSwiperOptions.navigation.next)
        }

        this.navigation.next?.addEventListener('click', this.slideNext.bind(this));
        this.navigation.prev?.addEventListener('click', this.slidePrev.bind(this));
        
        this.updateCssProperty();
        window.addEventListener('resize', this.updateCssProperty.bind(this));
    }
    
    private updateTransform() {
        this.wrapper.style.transform = `translateX(-${this.activeIndex * (this.slideWidth + 30)}px)`;
    }
    
    slideTo(index: number) {
        const newIndex = Math.min(Math.max(index, 0), this.slidesCount - 1);
        this.activeIndex = newIndex;

        //newIndex !== index
        console.log(newIndex);
        this.updateTransform();
    }
    
    slidePrev() {
        this.slideTo(this.activeIndex - 1);
    }
    
    slideNext() {
        this.slideTo(this.activeIndex + 1);
    }
}

(window as unknown as any).swiper = new SwiperEase('.swiper-ease', {
    
});

console.log((window as unknown as any).swiper);