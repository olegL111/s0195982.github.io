document.addEventListener('DOMContentLoaded', function () {
    const images = [
        'https://i.pinimg.com/originals/aa/30/77/aa3077e18cb8bae18755bbabefc32d9c.jpg',
        'https://cdn.culture.ru/images/1c645038-d5ff-5337-a6ee-c9ac2df5bf88',
        'https://i.pinimg.com/736x/9c/86/05/9c8605f059819166f55aa01c93c897a7.jpg',
        'https://i.pinimg.com/originals/f8/f7/f9/f8f7f9ce4098a52f7f31f9397066bb2f.jpg',
        'https://i.pinimg.com/originals/61/c5/bc/61c5bcc2a5b999e75453c3d347f2a801.jpg',
        'https://img.freepik.com/free-photo/magical-winter-landscape_23-2151911755.jpg?semt=ais_hybrid',
        'https://cdn.culture.ru/images/892cb9bc-89de-5ffb-a69b-0b620b81eff0',
        'https://i.pinimg.com/736x/ee/30/16/ee3016bbdec407f39d6bbc82fe5aa8b0.jpg'
    ];

    const slidesHTML = images.map((image, index) => `
        <div class="gallery-slide">
            <img src="${image}" alt="Изображение ${index + 1}" class="gallery-image">
        </div>
    `).join('');

    document.querySelector('.gallery-slider').innerHTML = slidesHTML;

    $('.gallery-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }
        }]
    });
});