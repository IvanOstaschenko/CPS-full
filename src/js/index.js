import '../scss/style.scss';
const windowInnerWidth = window.innerWidth;
let burgerButton = null;
let closeSlideMenuButton = null;
let overlayMenu = null;
let overlayModal = createOverlay('.page-container', 150);

function resizeBrandsBlock() {
    let showMoreButtons = document.querySelectorAll('.read-more-button');
    showMoreButtons.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('read-more-button--show');
            document.querySelector(`.${item.dataset.block}`).classList.toggle(`${item.dataset.block}--show`);
        });
    });
}

function createOverlay(target, zIndex) {
    let el = document.createElement('div');
    el.classList.add('overlay', 'overlay--hidden', `overlay--z--${zIndex}`);
    document.querySelector(target).appendChild(el);
    return el;
}

if (windowInnerWidth < 768) {
    new Swiper('.brands', {
        slidesPerView: 'auto',
        wrapperClass: 'brands__list',
        slideClass: 'brands__item',
        spaceBetween: 16,
        pagination: {
            el: '#brandsPagination',
            clickable: true,
        }
    });
    new Swiper('.categories', {
        slidesPerView: 'auto',
        wrapperClass: 'categories__list',
        slideClass: 'categories__item',
        spaceBetween: 16,
        pagination: {
            el: '#categoriesPagination',
            clickable: true,
        }
    });
    new Swiper('.prices__table', {
        slidesPerView: 'auto',
        wrapperClass: 'table__body',
        slideClass: 'table__row',
        spaceBetween: 16,
        pagination: {
            el: '#pricesPagination',
            clickable: true,
        }
    });
} else {
    resizeBrandsBlock();
}

if (windowInnerWidth < 1120) {
    overlayMenu = createOverlay('body', 50);
    overlayModal = createOverlay('.page-container', 150);

    const toggleClasses = () => {
        document.getElementById('backSlideMenu').classList.toggle('sidebar-menu--show');
        overlayMenu.classList.toggle('overlay--hidden');
    }

    burgerButton = document.getElementById('burgerButton');
    burgerButton.addEventListener('click', () => {
        toggleClasses();
    })

    closeSlideMenuButton = document.getElementById('closeSlideMenu');
    closeSlideMenuButton.addEventListener('click', () => {
        toggleClasses();
    })

    overlayMenu.addEventListener('click', () => {
        toggleClasses();
    })
}


document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('user-menu__link') && e.target.dataset.modal) {

        overlayModal.classList.toggle('overlay--hidden');
        overlayModal.dataset.modal = e.target.dataset.modal;

        const modal = document.getElementById(e.target.dataset.modal);
        modal.classList.toggle('modal--hidden--right');
    }
    if (e.target.classList.contains('modal__close-button')){
        e.target.parentNode.parentNode.classList.toggle('modal--hidden--right');
        overlayModal.classList.toggle('overlay--hidden');
    }
})

overlayModal.addEventListener('click', (e) => {
    document.getElementById(e.target.dataset.modal).classList.toggle('modal--hidden--right');
    overlayModal.classList.add('overlay--hidden');
});
