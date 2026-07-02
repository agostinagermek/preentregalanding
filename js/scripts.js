/*!
* Start Bootstrap - New Age v6.0.7 (https://startbootstrap.com/theme/new-age)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-new-age/blob/master/LICENSE)
*/
//
// Scripts
// 

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
});

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav && window.bootstrap) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            responsiveNavItem.classList.add('is-marked');
            window.setTimeout(() => responsiveNavItem.classList.remove('is-marked'), 700);
            if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    const featureIcons = document.querySelectorAll('.interactive-feature-icon');
    featureIcons.forEach((featureIcon) => {
        const markIcon = () => {
            featureIcon.classList.remove('is-marked');
            window.requestAnimationFrame(() => featureIcon.classList.add('is-marked'));
            window.setTimeout(() => featureIcon.classList.remove('is-marked'), 800);
        };

        featureIcon.addEventListener('click', markIcon);
        featureIcon.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                markIcon();
            }
        });
    });

    const detailParts = document.querySelectorAll('.hp-detail-part[data-part]');
    const detailLabels = document.querySelectorAll('.hp-detail-callout[data-part]');
    const detailNumbers = document.querySelectorAll('.hp-detail-number[data-part]');
    const detailItems = [...detailParts, ...detailLabels, ...detailNumbers];

    const setDetailPartState = (partName, isActive) => {
        detailItems.forEach((item) => {
            if (item.dataset.part === partName) {
                item.classList.toggle('is-linked', isActive);
            }
        });
    };

    detailItems.forEach((item) => {
        const partName = item.dataset.part;

        item.addEventListener('mouseenter', () => {
            if (!window.matchMedia('(max-width: 768px)').matches) {
                setDetailPartState(partName, true);
            }
        });
        item.addEventListener('mouseleave', () => {
            if (!window.matchMedia('(max-width: 768px)').matches) {
                setDetailPartState(partName, false);
            }
        });
        item.addEventListener('focusin', () => {
            if (!window.matchMedia('(max-width: 768px)').matches) {
                setDetailPartState(partName, true);
            }
        });
        item.addEventListener('focusout', () => {
            if (!window.matchMedia('(max-width: 768px)').matches) {
                setDetailPartState(partName, false);
            }
        });
        item.addEventListener('click', (event) => {
            if (!window.matchMedia('(max-width: 768px)').matches) {
                return;
            }

            event.stopPropagation();
            const isActive = item.classList.contains('is-linked');
            detailItems.forEach((detailItem) => detailItem.classList.remove('is-linked'));
            if (!isActive) {
                setDetailPartState(partName, true);
            }
        });
    });

    const detailSection = document.querySelector('.hp-detail-section');
    detailSection?.addEventListener('click', (event) => {
        if (!window.matchMedia('(max-width: 768px)').matches) {
            return;
        }

        const target = event.target.closest('[data-part]');
        if (!target || !detailSection.contains(target)) {
            return;
        }

        const partName = target.dataset.part;
        const isActive = target.classList.contains('is-linked');
        detailItems.forEach((detailItem) => detailItem.classList.remove('is-linked'));
        if (!isActive) {
            setDetailPartState(partName, true);
        }
    });

    const hpDetailSection = document.querySelector('.hp-detail-section');
    if (hpDetailSection) {
        const detailDeployObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('is-deployed');
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.34,
            rootMargin: '0px 0px -12% 0px'
        });

        detailDeployObserver.observe(hpDetailSection);
    }

    const revealItems = [];
    const revealSet = new Set();
    const revealSections = document.querySelectorAll([
        '.reference-hero',
        '#features',
        '.product-reference-section',
        '.sticky-notes-section',
        '.how-it-works',
        'section.cta',
        '#reviews',
        '.site-footer'
    ].join(','));
    const revealGroups = [
        ['.reference-hero-copy', '.reference-hero-art'],
        ['#features .feature-item'],
        ['.product-reference-media', '.product-reference-copy'],
        ['.product-reference-list li'],
        ['.hp-detail-copy', '.hp-detail-visual'],
        ['.hp-detail-callout'],
        ['.sticky-notes-heading', '.sticky-note'],
        ['.sticky-note-photo'],
        ['.how-it-works-heading', '.how-step-card'],
        ['.how-step-frame', '.how-step-copy'],
        ['.review-glass-card'],
        ['.cta h2', '.cta .btn'],
        ['.site-footer .row > div'],
        ['.site-footer-bottom']
    ];

    revealSections.forEach((section) => {
        revealItems.push(section);
        section.classList.add('section-reveal');
        if (section.classList.contains('reference-hero')) {
            section.classList.add('is-visible');
        }
    });

    revealGroups.forEach((group) => {
        const groupItems = group.flatMap((selector) => Array.from(document.querySelectorAll(selector)));

        groupItems.forEach((item, index) => {
            if (revealSet.has(item)) {
                return;
            }

            revealSet.add(item);
            revealItems.push(item);
            item.classList.add('reveal-on-scroll');
            item.style.setProperty('--reveal-delay', `${index * 160}ms`);
        });
    });

    const revealVisibleItems = () => {
        const triggerLine = window.innerHeight * 0.78;
        revealItems.forEach((item) => {
            if (item.classList.contains('is-visible')) {
                return;
            }

            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < triggerLine) {
                item.classList.add('is-visible');
            }
        });
    };

    revealVisibleItems();
    window.addEventListener('scroll', revealVisibleItems, { passive: true });
    window.addEventListener('resize', revealVisibleItems);
    window.setTimeout(revealVisibleItems, 250);

    const reviewsTrack = document.querySelector('#reviewsTrack');
    const reviewPrev = document.querySelector('.reviews-nav-prev');
    const reviewNext = document.querySelector('.reviews-nav-next');
    const reviewCards = reviewsTrack ? Array.from(reviewsTrack.querySelectorAll('.review-glass-card')) : [];
    let activeReviewIndex = 0;

    const setActiveReview = (nextIndex) => {
        if (!reviewsTrack || !reviewCards.length) {
            return;
        }

        activeReviewIndex = (nextIndex + reviewCards.length) % reviewCards.length;
        reviewCards.forEach((card, index) => card.classList.toggle('is-active', index === activeReviewIndex));
    };

    const scrollReviews = (direction) => {
        if (!reviewsTrack || !reviewCards.length) {
            return;
        }

        setActiveReview(activeReviewIndex + direction);
    };

    setActiveReview(activeReviewIndex);
    reviewPrev?.addEventListener('click', () => scrollReviews(-1));
    reviewNext?.addEventListener('click', () => scrollReviews(1));

});

    // Glassmorphism IntersectionObserver for steps
    const glassObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                if(entry.target.classList.contains('glass-step-card')) {
                    entry.target.classList.add('glass-visible');
                } else if(entry.target.tagName.toLowerCase() === 'img') {
                    entry.target.classList.add('glass-img-visible');
                }
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass-step-card, .how-it-works-visual img').forEach(el => glassObserver.observe(el));
