document.addEventListener('DOMContentLoaded', function(){

    /*var cityselector_header = document.getElementById('cityselector-header');
    cityselector_header.onchange = function () {
        $.ajax({
            type: 'POST',
            url: '/actions/select-city.php',
            data: {
                city: this.value
            },
            success: function () {
                location.reload();
            }
        });
    };*/

    var formSelectCity = document.querySelector('.formSelectCity');
	if(formSelectCity){
		formSelectCity.onchange = function () {
			$.ajax({
				type: 'POST',
				url: '/actions/getOfficesForm.php',
				data: {
					uf_xml_id: this.value
                   // uf_xml_id: 'Чебоксары'
				},
				success: function (response) {

					officesSelect.dispatchEvent(new CustomEvent("select-change", {
						detail: {options: response}
					}));
				}
			});
		};
	}
    var officesSelect = document.querySelector('#formSelectOffices');
	if(officesSelect){
		officesSelect.addEventListener('select-change', function (e) {
            var options = JSON.parse(e.detail.options);
			/* console.log(e); */
			oficcesChoise.setChoices(options, 'value', 'label', true);
			oficcesChoise.setChoiceByValue(options[0].value);
		});
	}
});


// запрет на ввод в поле ИНН больше 12 символов
document.addEventListener('DOMContentLoaded', function(){

    var innTextFields = document.querySelectorAll('input[data-check-inn]');
    
    for (var i = 0; i < innTextFields.length; i++){

        var currentInput = innTextFields[i];

        currentInput.addEventListener('keydown', function(e){

            var value = currentInput.value;

            if (((value.length + 1) == 13) && (e.key !== 'Tab') && (e.key !== 'Delete') && (e.key !== 'Backspace') && (e.key !== 'ArrowLeft') && (e.key !== 'ArrowRight')){
                e.preventDefault();
            };
        });
    };
});

// NEW

$(function () {

    let screenWidth = screen.width;

    if (screenWidth < 576) {
        $('.main-nav_footer > .main-nav__list > .main-nav__item > .main-nav__link').click(function (e) {
            e.preventDefault();
            $(this).toggleClass('open').siblings('.main-nav__sublist-wrapper_lvl-2').slideToggle()
                .parent('.main-nav__item').siblings('.main-nav__item')
                .find('.main-nav__sublist-wrapper_lvl-2').slideUp()
                .siblings('.main-nav__link').removeClass('open');
        });

        $('.main-nav_header > .main-nav__list > .main-nav__item > .main-nav__link').click(function(e) {
            e.preventDefault();
            $(this).siblings('.main-nav__sublist-wrapper_lvl-2').addClass('open')
                .parent('.main-nav__item').siblings('.main-nav__item')
                .find('.main-nav__sublist-wrapper_lvl-2').removeClass('open');
            $('body').css('overflow', 'hidden');
        });

        $('.main-nav_header .main-nav__sublist-wrapper_lvl-2').click(function() {
            $(this).removeClass('open');
            $('body').css('overflow', 'visible');
        });

        $('.main-nav_header .main-nav__sublist-wrapper_lvl-2 a').click(function(e) {
            e.stopPropagation();
        });
    }
//console.log(123);
    $('body').on('submit', '#feedback-form form.callback', function (e) {
        e.preventDefault();
        console.log("make-an-appointment-start");
        let form = $(this),
            data = new FormData(document.getElementById("form_callback")),
            errors = form.find('.errors');

        errors.html('');
        // data += '&useAjax=y';
        // data += '&submit=y';
        data.append('useAjax', 'y');
        data.append('submit', 'y');
        //data.append("file", form.find('input[type=file]').prop('files')[0]);
        $.ajax({
            type: "POST",
            data: data,
            processData: false,
            contentType: false,
            success: function (html) {
                if (html.success) {
                    var url = window.location.href;
                    if (url.indexOf('?') > -1) {
                        url += '&success=' + html.data.paramsHash
                    } else {
                        url += '?success=' + html.data.paramsHash
                    }

                    window.location.href = url;
                } else {
                    errors.html(html.data.message);
                }
            }
        });

        return false;
    });
    $('body').on('click', '.select_city_geo-close', function(){
        window.BXmakerGeoIPCity.popupHide();
    })
});