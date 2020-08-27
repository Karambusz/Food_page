//SLIDER
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width; // style from css

    let slideIndex = 1;
    let offset = 0;

    // 1 option

    if (slides.length < 10 && slides.length > 0) {
        total.innerHTML = `0${slides.length}`;
        current.innerHTML = `0${slideIndex}`;
    } else {
        total.innerHTML = `${slides.length}`;
        current.innerHTML = `${slideIndex}`;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden'; // hide items, which width are greater than width in css

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    // dots for slider
    const indicators = document.createElement('ol'),
        dots = []; // array for dots

    indicators.classList.add('carousel-indicators');

    slider.append(indicators);
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function checkZero() {
        if (slides.length < 10 && slides.length > 0) {
            current.innerHTML = `0${slideIndex}`;
        } else {
            current.innerHTML = `${slideIndex}`;
        }
    }

    function dotsOpacity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }


    next.addEventListener('click', () => {
        if (offset == parseInt(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += parseInt(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        checkZero();
        dotsOpacity();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = parseInt(width) * (slides.length - 1);
        } else {
            offset -= parseInt(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        checkZero();
        dotsOpacity();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = parseInt(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            checkZero();
            dotsOpacity();
        });
    });

    // 2 option
    // showSlides(slideIndex);

    // if(slides.length < 10 && slides.length > 0) {
    //     total.innerHTML = `0${slides.length}`;
    // } else {
    //     total.innerHTML = `${slides.length}`;
    // }



    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => {
    //         item.classList.add('hide');
    //         item.classList.remove('show', 'fade');
    //     });

    //     slides[slideIndex - 1].classList.add('show', 'fade');
    //     slides[slideIndex - 1].classList.remove('hide');

    //     if (slideIndex < 10 && slideIndex > 0) {
    //         current.innerHTML = `0${slideIndex}`;
    //     } else {
    //         current.innerHTML = `${slideIndex}`;
    //     }

    // }

    // function plusSlide(n) {
    //     showSlides(slideIndex+=n);
    // }

    // next.addEventListener('click', ()=> {
    //     plusSlide(1);
    // });

    // prev.addEventListener('click', ()=> {
    //     plusSlide(-1);
    // });

}


export default slider;