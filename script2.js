'use strict';

/* 1) На сайте в форме обратной связи добавьте следующие поля:
a) поле даты рождения;+
b) ошибочные поля подсветить с помощью какого-нибудь эффекта (например, Bounce).+
2) Все возвращаемые ошибки выводить с помощью виджета Dialog.
3) Создать карусель популярных товаров в шапке.*/
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
                    $('#city').attr('value', ev.target.text)
                })

            }
        });
        $('#bday').datepicker({
            changeMonth: true,
            changeYear: true, showAnim: 'fold', dateFormat: "DD, d MM, yy", yearRange: `1918:2018`
        });
        var arr = [];
        document.getElementById('submit').addEventListener('click', function () {

            var name = document.getElementById('name').value;
            var bday = document.getElementById('bday').value;
            var email = document.getElementById('email').value;
            var phone = document.getElementById('phone').value;
            var city = document.getElementById('city').value;
            var message = document.getElementById('message').value;


            if (bday === "") {
                $("#bday").effect('bounce');
                document.getElementById('bday').classList.add('redBorder');
               document.getElementById('label_bday').innerText = 'Это поле не может быть пустым';
               arr.push('Поле "День рождения": ' + $('#label_bday').text());
               /* $("#label_bday").dialog({
                    modal: true,
                    message:'Это поле не может быть пустым',
                    title: 'Ошибочка вышла',
                    buttons: {
                        'Я всё исправлю': function () {
                            $(this).dialog("close");
                            document.getElementById('bday').classList.remove('redBorder');
                            document.getElementById('message').className = ('form_inside');
                            document.getElementById('label_bday').innerText = '';
                        }
                    }
                });*/
            } else {
                document.getElementById('bday').classList.remove('redBorder');
                document.getElementById('message').className = ('form_inside');
                document.getElementById('label_bday').innerText = '';
            }
            if (message) {
                document.getElementById('message').className = ('form_inside');
                document.getElementById('label_message').innerText = '';
                console.log('Сообщение: ' + message + ' верное');
            } else {
                $("#message").effect('bounce');
                document.getElementById('message').classList.add('redBorder');
                document.getElementById('label_message').innerText = 'Это поле не может быть пустым';
                arr.push('Поле "Сообщение": ' + $('#label_message').text());
                /*$("#label_message").dialog({
                    modal: true,
                    title: 'Ошибочка вышла',
                    buttons: {
                        'Я всё исправлю': function () {
                            $(this).dialog("close");
                            document.getElementById('message').classList.remove('redBorder');
                            document.getElementById('message').className = ('form_inside');
                            document.getElementById('label_message').innerText = '';
                        }
                    }
                });*/
            }

            if (/(^\w+$)|(^\w+\s\w+$)|(^\w+\s\w+\s\w+$)/.test(name)) {
                document.getElementById('name').className = ('form_inside name');
                document.getElementById('label_name').innerText = '';
                console.log('Имя: ' + name + ' верное');
            } else if (name === "") {
                $("#name").effect('bounce');
                document.getElementById('name').classList.add('redBorder');
                document.getElementById('label_name').innerText = 'Это поле не может быть пустым';
                arr.push('Поле "Имя": ' + $('#label_name').text());
            } else {
                $("#name").effect('bounce');
                document.getElementById('name').classList.add('redBorder');
                document.getElementById('label_name').innerText = 'Имя должно состоять только из букв';
                console.log('Имя: ' + name + ' Неверное');
                arr.push('Поле "Имя": ' + $('#label_name').text());
            }
            if (city) {
                document.getElementById('city').className = ('form_inside');
                document.getElementById('label_city').innerText = '';
                console.log('Город: ' + city + ' верное');
            } else if (city === "") {
                $("#city").effect('bounce');
                document.getElementById('city').classList.add('redBorder');
                document.getElementById('label_city').innerText = 'Это поле не может быть пустым';
                arr.push('Поле "Город": ' + $('#label_city').text());
            } else {
                $("#city").effect('bounce');
                document.getElementById('city').classList.add('redBorder');
                document.getElementById('label_city').innerText = 'Название города указано неверно';
                console.log('Город: ' + city + ' Неверное');
                arr.push('Поле "Город": ' + $('#label_city').text());
            }

            if (/^[-._a-zA-Z0-9]+@(?:[a-zA-Z0-9][-a-zA-Z0-9]+\.)+[a-zA-Z]{2,6}$/.test(email)) {
                document.getElementById('email').className = ('form_inside');
                document.getElementById('label_email').innerText = '';
                console.log('Эл. почта: ' + email + ' верное');
            } else if (email === '') {
                $("#email").effect('bounce');
                document.getElementById('email').classList.add('redBorder');
                document.getElementById('label_email').innerText = 'Это поле не может быть пустым';
                arr.push('Поле "Email": ' + $('#label_email').text());
            } else {
                $("#email").effect('bounce');
                document.getElementById('email').classList.add('redBorder');
                document.getElementById('label_email').innerText = 'Email указан неверно';
                console.log('Эл. почта: ' + email + ' Неверная');
                arr.push('Поле "Email": ' + $('#label_email').text());
            }


            if (/^(8|\+7)(\(\d{3}\))(\d{3}-)(\d{4})$/.test(phone)) {
                document.getElementById('phone').className = ('form_inside');
                document.getElementById('label_phone').innerText = '';
                console.log('Телефон: ' + phone + ' верное');
            } else if (phone === '') {
                $("#phone").effect('bounce');
                document.getElementById('phone').classList.add('redBorder');
                document.getElementById('label_phone').innerText = 'Это поле не может быть пустым';
                arr.push('Поле "Телефон": ' + $('#label_phone').text());
            } else {
                $("#phone").effect('bounce');
                document.getElementById('phone').classList.add('redBorder');
                document.getElementById('label_phone').innerText = 'Телефон указан неверно';
                console.log('Телефон: ' + phone + ' Неверное');
                arr.push('Поле "Телефон": ' + $('#label_phone').text());
            }
            arr.forEach(function (elem) {
                var p = $('<p />');
                p.text(elem);
                p.addClass('p_inside');
                $('#dialog').append(p);

            });
            $('#dialog').dialog({
                    modal: true,
                    title: 'Ошибочка вышла',
                    buttons: {
                        'Я всё исправлю': function () {
                            arr = [];
                            $('.p_inside').remove();
                            $(this).dialog("close");
                            $('#message').removeClass('redBorder');
                            $('#label_message').text(" ");
                            $('#phone').removeClass('redBorder');
                            $('#label_phone').text(" ");
                            $('#email').removeClass('redBorder');
                            $('#label_email').text(" ");
                            $('#city').removeClass('redBorder');
                            $('#label_city').text(" ");
                            $('#name').removeClass('redBorder');
                            $('#label_name').text(" ");
                            $('#message').removeClass('redBorder');
                            $('#label_message').text(" ");
                            $('#bday').removeClass('redBorder');
                            $('#label_bday').text(" ");
                            
                        }
                    }
                });

            event.preventDefault();


        });

    })
})(jQuery);


