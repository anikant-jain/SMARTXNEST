(function($) {
    "use strict";

    // Search Popup Functionality
    var searchPopup = function() {
        // Open search box
        $('#header-nav').on('click', '.search-button', function(e) {
            e.preventDefault();
            $('.search-popup').addClass('is-visible');
            setTimeout(function() {
                $('.search-popup').find('#search-form').focus();
            }, 350);
        });

        // Close search box with close button
        $('#header-nav').on('click', '.btn-close-search', function(e) {
            e.preventDefault();
            $('.search-popup').removeClass('is-visible');
        });
        
        // Close search box by clicking outside or pressing ESC
        $(document).on("click", function(e) {
            if ($(e.target).is(".search-popup-close") || 
                $(e.target).is(".search-popup-close svg") || 
                $(e.target).is(".search-popup-close path") || 
                $(e.target).is(".search-popup")) {
                e.preventDefault();
                $(".search-popup").removeClass("is-visible");
            }
        });

        $(document).keyup(function(e) {
            if (e.which === 27) { // ESC key
                $(".search-popup").removeClass("is-visible");
            }
        });
    };

    // Product Quantity Selector
    var initProductQty = function(){
        $('.product-qty').each(function(){
            var $el_product = $(this);
            var quantityInput = $el_product.find('#quantity');
            
            $el_product.find('.quantity-right-plus').click(function(e){
                e.preventDefault();
                var quantity = parseInt(quantityInput.val());
                quantityInput.val(quantity + 1);
                quantityInput.trigger('change');
            });

            $el_product.find('.quantity-left-minus').click(function(e){
                e.preventDefault();
                var quantity = parseInt(quantityInput.val());
                if(quantity > 1){
                    quantityInput.val(quantity - 1);
                    quantityInput.trigger('change');
                }
            });
        });
    };

    // Initialize Swipers
    var initSwipers = function() {
        // Main Banner Slider
        var mainSwiper = new Swiper(".main-swiper", {
            speed: 600,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".swiper-arrow-next",
                prevEl: ".swiper-arrow-prev",
            },
        });

        // Product Slider for Mobile Products
        var productSwiper = new Swiper(".product-swiper", {
            slidesPerView: 4,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: "#mobile-products .swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                }
            },
        });

        // Product Slider for Smart Watches
        var watchSwiper = new Swiper(".product-watch-swiper", {
            slidesPerView: 4,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: "#smart-watches .swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                }
            },
        });

        // Testimonial Slider
        var testimonialSwiper = new Swiper(".testimonial-swiper", {
            loop: true,
            speed: 800,
            autoplay: {
                delay: 7000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".swiper-arrow-next",
                prevEl: ".swiper-arrow-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    };

    // Header Scroll Effect
    var headerScroll = function() {
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            var header = $("#header");
            
            if (scroll >= 50) {
                header.addClass("header-scrolled");
            } else {
                header.removeClass("header-scrolled");
            }
        });
    };

    // Add to Cart Animation
    var addToCartEffect = function() {
        $('.add-to-cart').on('click', function(e) {
            e.preventDefault();
            
            var $button = $(this);
            var originalText = $button.html();
            
            // Show loading state
            $button.html('<i class="fas fa-spinner fa-spin"></i> Adding...');
            $button.prop('disabled', true);
            
            // Simulate API call
            setTimeout(function() {
                // Reset button
                $button.html(originalText);
                $button.prop('disabled', false);
                
                // Show success message
                alert('Product added to cart successfully!');
                
                // Update cart count (if exists)
                var cartCount = $('.cart-count');
                if(cartCount.length) {
                    var count = parseInt(cartCount.text()) || 0;
                    cartCount.text(count + 1);
                }
            }, 1000);
        });
    };

    // Form Validation
    var formValidation = function() {
        // Email validation
        $('input[type="email"]').on('blur', function() {
            var email = $(this).val();
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if(email && !emailRegex.test(email)) {
                $(this).addClass('is-invalid');
                $(this).siblings('.invalid-feedback').remove();
                $(this).after('<div class="invalid-feedback">Please enter a valid email address.</div>');
            } else {
                $(this).removeClass('is-invalid');
                $(this).siblings('.invalid-feedback').remove();
            }
        });
        
        // Required field validation
        $('input[required], select[required]').on('blur', function() {
            if(!$(this).val()) {
                $(this).addClass('is-invalid');
                $(this).siblings('.invalid-feedback').remove();
                $(this).after('<div class="invalid-feedback">This field is required.</div>');
            } else {
                $(this).removeClass('is-invalid');
                $(this).siblings('.invalid-feedback').remove();
            }
        });
    };

    // Initialize everything when document is ready
    $(document).ready(function() {
        searchPopup();
        initProductQty();
        initSwipers();
        headerScroll();
        addToCartEffect();
        formValidation();

        // Mobile menu toggle
        $('.navbar-toggler').on('click', function() {
            $('#bdNavbar').toggleClass('show');
        });

        // Close mobile menu when clicking nav links
        $('.navbar-nav a').on('click', function() {
            $('#bdNavbar').removeClass('show');
        });
    });

})(jQuery);
