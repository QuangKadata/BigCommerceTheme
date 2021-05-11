/*
 Import all product specific js
 */
 /* eslint-disable */
import $ from 'jquery';
import PageManager from './page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/form-utils';

export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = window.location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    }

    onReady() {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
                window.history.replaceState(null, document.title, window.location.pathname);
            }
        });

        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context, window.BCData.product_attributes);

        videoGallery();

        const $reviewForm = classifyForm('.writeReview-form');
        const review = new Review($reviewForm);

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation(this.context);
        });

        $('body').on('click', '.productView-reviewLink a[href*="#product-reviews"]', (event) => {

            if (!$(this).parents('.productView--quickView')) {
                event.preventDefault();
            }
        // Animation complete.
            let liHeight = 0;
            let elementHeight = 0;
            if ($('#Product-descrTabs a[href="#tab-reviews"]').length) {
            if($(window).width() < 769){
                if(!$('.r-tabs-accordion-title a[href="#tab-reviews"]').parent().hasClass('r-tabs-state-active')){
                $('.r-tabs-accordion-title a[href="#tab-reviews"]').trigger('click');
                }
                liHeight = $('#Product-descrTabs .r-tabs-accordion-title:eq(0)').outerHeight();
                elementHeight = $('#tab-reviews').offset().top - liHeight;
            } else {
              $('.r-tabs-tab a[href="#tab-reviews"]').trigger('click');
              liHeight = $('#Product-descrTabs ul.tabs li:eq(0)').outerHeight();

              elementHeight = $('.productView-description').offset().top - liHeight;
            }
            }
            const headerheight = $('.header').outerHeight();
            $('html, body').animate({ scrollTop: elementHeight - headerheight }, 300);

        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });

        this.productReviewHandler();
    }

    productReviewHandler() {
        if (this.url.indexOf('#write_review') !== -1) {
            this.$reviewLink.click();
        }
        if (this.url.indexOf('#product-reviews') !== -1) {
             $('.productView-reviewLink a[href*="#product-reviews"]').trigger('click');

        }
    }
}


/* eslint-enable */
