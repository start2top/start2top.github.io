window.addEventListener('DOMContentLoaded', function() {
    const hamburger =     document.querySelector('.hamburger'),
        menu      =     document.querySelector('.menu'),
        menuClose =     document.querySelector('.menu__close'),
        overlayClose =  document.querySelector('.menu__overlay'),
        body = document.querySelector('body'),
        contactsForm = document.querySelector('.contacts__form'),
        formSuccessMessage = this.document.querySelector('.contacts__message_success'),
        formErrorMessage = this.document.querySelector('.contacts__message_error');


        hamburger.addEventListener('click', function() {
            menu.classList.add('active');
            if (window.matchMedia("(max-width: 700px)").matches) {
                body.style.overflow = 'hidden';
            }
        });

        menuClose.addEventListener('click', function() {
            menu.classList.remove('active');
            body.style.overflow = 'visible';
        });

        overlayClose.addEventListener('click', function() {
            menu.classList.remove('active');
            body.style.overflow = 'visible';

        });

        //загрузочная строка прогрузка вычисляется по значению % 
    var percentage =   document.querySelectorAll('.percentage'),
        lines = document.querySelectorAll('.skills__percentage_calc__elem__bar span');

        percentage.forEach( function (item, i) {
            lines[i].style.width = item.innerHTML;
        });
        
        let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.3;

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop  = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

                requestAnimationFrame(step);  

            function step(time) {
                if (start === null) {
                    start = time;
                }

                let progress = time - start,
                r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop 
                    + progress/speed, widthTop + toBlock));

                    document.documentElement.scrollTo(0, r);

                    if (r != widthTop + toBlock) {
                        requestAnimationFrame(step);
                    } else {
                        location.hash = hash;
                    }
            }
        });
    });

    // Отправка формы в ТГ бот
    const ajaxSend = async (formData) => {
        const response = await fetch("telegram.php", {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
        }
        return await response.text();
    };

    if (document.querySelector("form")) {
        const forms = document.querySelectorAll("form");

        forms.forEach(form => {
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                const formData = new FormData(this);

                ajaxSend(formData)
                    .then(() => {
                        formSuccessMessage.style.display = 'block';
                        setTimeout(() => {
                            formSuccessMessage.style.display = 'none';
                        }, 3000)
                        
                        form.reset(); // очищаем поля формы
                    })
                    .catch(() => {
                        formErrorMessage.style.display = 'block';
                        setTimeout(() => {
                            formErrorMessage.style.display = 'none';
                        }, 3000)
                    })
            });
        });
    }

            
});