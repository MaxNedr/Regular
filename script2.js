'use strict';

/* 3. Создать форму обратной связи с полями: Имя, Телефон, e-mail, текст, кнопка «Отправить».
** - При нажатии на кнопку «Отправить» произвести валидацию полей следующим образом:

- Имя содержит только буквы;

** - Телефон подчиняется шаблону +7(000)000-0000;**

** - E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru**

** - Текст произвольный;**
*
** - В случае не прохождения валидации одним из полей необходимо выделять это поле красной рамкой
* и сообщать пользователю об ошибке. */
(function ($) {
    $(function () {
        $.ajax({
            url: "http://localhost:3000/towns", dataType: "json", success: function (data) {
                var getData = data;
                getData.forEach(function (element) {
                    var $nameTown = element.name;
                    var href = document.createElement('a');
                    href.href = '#';
                    href.id = element.id;
                    href.innerText = element.name;
                    if ($nameTown) {
                        $('#towns_variants').append(href);
                    }
                });
                $(window).on("click", function (event) {
                    if (event.target.id !== 'city') {
                        $('#towns_variants').removeClass('visible')
                    }
                });
                $('#city').on("click", function () {
                    $('#towns_variants').addClass('visible')
                });
                $('#towns_variants a').on('click', function (ev) {
                    console.log(ev.target.text);
                    $('#city').attr('value',ev.target.text)
                })

            }
        });
        document.getElementById('submit').addEventListener('click', function () {
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var phone = document.getElementById('phone').value;
            var city = document.getElementById('city').value;
            var message = document.getElementById('message').value;

            if (message) {
                document.getElementById('message').className = ('form_inside');
                document.getElementById('label_message').innerText = '';
                console.log('Сообщение: ' + message + ' верное');
            } else {
                document.getElementById('message').classList.add('redBorder');
                document.getElementById('label_message').innerText = 'Это поле не может быть пустым';
            }


            if (/(^\w+$)|(^\w+\s\w+$)|(^\w+\s\w+\s\w+$)/.test(name)) {
                document.getElementById('name').className = ('form_inside name');
                document.getElementById('label_name').innerText = '';
                console.log('Имя: ' + name + ' верное');
            } else if (name === "") {
                document.getElementById('name').classList.add('redBorder');
                document.getElementById('label_name').innerText = 'Это поле не может быть пустым';
            } else {
                document.getElementById('name').classList.add('redBorder');
                document.getElementById('label_name').innerText = 'Имя должно состоять только из букв';
                console.log('Имя: ' + name + ' Неверное');
            }
            if (city) {
                document.getElementById('city').className = ('form_inside');
                document.getElementById('label_city').innerText = '';
                console.log('Город: ' + city + ' верное');
            } else if (city === "") {
                document.getElementById('city').classList.add('redBorder');
                document.getElementById('label_city').innerText = 'Это поле не может быть пустым';
            } else {
                document.getElementById('city').classList.add('redBorder');
                document.getElementById('label_city').innerText = 'Название города указано неверно';
                console.log('Город: ' + city + ' Неверное');
            }

            if (/^[-._a-zA-Z0-9]+@(?:[a-zA-Z0-9][-a-zA-Z0-9]+\.)+[a-zA-Z]{2,6}$/.test(email)) {
                document.getElementById('email').className = ('form_inside');
                document.getElementById('label_email').innerText = '';
                console.log('Эл. почта: ' + email + ' верное');
            } else if (email === '') {
                document.getElementById('email').classList.add('redBorder');
                document.getElementById('label_email').innerText = 'Это поле не может быть пустым';
            } else {
                document.getElementById('email').classList.add('redBorder');
                document.getElementById('label_email').innerText = 'Email указан неверно';
                console.log('Эл. почта: ' + email + ' Неверная');
            }


            if (/^(8|\+7)(\(\d{3}\))(\d{3}-)(\d{4})$/.test(phone)) {
                document.getElementById('phone').className = ('form_inside');
                document.getElementById('label_phone').innerText = '';
                console.log('Телефон: ' + phone + ' верное');
            } else if (phone === '') {
                document.getElementById('phone').classList.add('redBorder');
                document.getElementById('label_phone').innerText = 'Это поле не может быть пустым';
            } else {
                document.getElementById('phone').classList.add('redBorder');
                document.getElementById('label_phone').innerText = 'Телефон указан неверно';
                console.log('Телефон: ' + phone + ' Неверное');
            }

            event.preventDefault();


        });
    })
})(jQuery);


