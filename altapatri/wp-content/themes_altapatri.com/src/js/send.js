"use strict";

function getCookie(name) {
	return document.cookie
		.split("; ")
		.find((row) => row.startsWith(`${name}=`))
		?.split("=")[1];
}

function check_ga() {
	if (typeof ga === "function") {
		const dataforinp = getCookie("_ga");
		if (dataforinp) {
			const forms = document.querySelectorAll(
				"form"
			);
			forms &&
			forms.length &&
			forms.forEach(function (elm) {
				elm.insertAdjacentHTML(
					"beforeend",
					`<input type="hidden" class="utm" id="google_client_id" name="google_client_id" value="${dataforinp}" />`
				);
			});
		} else {
			setTimeout(check_ga, 500);
		}
	} else {
		setTimeout(check_ga, 500);
	}
}
check_ga();


	var url = window.location.search;
	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());
	var utmItems = [
		"utm_source",
		"utm_medium",
		"utm_term",
		"utm_content",
		"utm_campaign",
		"matchtype",
		"device",
		"keyword",
		"adgroupid",
		"campaignid",
		"region",
		"_openstat",
		"gclid",
		"yclid",
		"fbclid",
		"wbraid",
	];
	const fieldsForReplace = [
		{
			from: "_openstat",
			to: "openstat",
		},
		{
			from: "wbraid",
			to: "gclid",
		},
	];
	if (params) {
		for (let [key, value] of Object.entries(params)) {
			document.cookie = key + "=" + value + "; path=/";
		}
	}

	const forms = document.querySelectorAll(
		"form:not(.searchform):not(#commentform)"
	);
	console.log(forms);
	if (!document.cookie.includes("utm_source")) {
		const curReferer = document.referrer;
		let urlHref = document.location.href;
		urlHref = urlHref.slice(0, 90);
		let ref;

		if (curReferer.length > 0 && !curReferer.indexOf("altapatri") != -1) {
			switch (true) {
				case curReferer.indexOf("google") != -1:
					document.cookie = "utm_source=google; path=/";
					document.cookie = "utm_medium=seo; path=/";
					break;
				case curReferer.indexOf("yandex") != -1:
					document.cookie = "utm_source=yandex; path=/";
					document.cookie = "utm_medium=seo; path=/";
					break;
				case curReferer.indexOf("rambler") != -1:
					document.cookie = "utm_source=rambler; path=/";
					document.cookie = "utm_medium=seo; path=/";
					break;
				case curReferer.indexOf("bing") != -1:
					document.cookie = "utm_source=bing; path=/";
					document.cookie = "utm_medium=seo; path=/";
					break;
				case curReferer.indexOf("mail") != -1:
					document.cookie = "utm_source=mail; path=/";
					document.cookie = "utm_medium=seo; path=/";
					break;
				case curReferer.indexOf("duckduckgo") != -1:
					document.cookie = "utm_source=duckduckgo; path=/";
					document.cookie = "utm_medium=seo; path=/";
					break;
				case curReferer.indexOf("instagram") != -1:
					document.cookie = "utm_source=instagram; path=/";
					document.cookie = "utm_medium=smm; path=/";
					break;
				case curReferer.indexOf("facebook") != -1:
					document.cookie = "utm_source=facebook; path=/";
					document.cookie = "utm_medium=smm; path=/";
					break;
				case curReferer.indexOf("vk.com") != -1:
					document.cookie = "utm_source=vk.com; path=/";
					document.cookie = "utm_medium=smm; path=/";
					break;
				case curReferer.indexOf("pinterest") != -1:
					document.cookie = "utm_source=pinterest; path=/";
					document.cookie = "utm_medium=smm; path=/";
					break;
				case curReferer.indexOf("linkedin") != -1:
					document.cookie = "utm_source=linkedin; path=/";
					document.cookie = "utm_medium=smm; path=/";
					break;
				case curReferer.indexOf("ok.ru") != -1:
					document.cookie = "utm_source=ok.ru; path=/";
					document.cookie = "utm_medium=smm; path=/";
					break;
				case curReferer.indexOf("youtube") != -1:
					document.cookie = "utm_source=youtube; path=/";
					document.cookie = "utm_medium=video; path=/";
					break;
				case curReferer.indexOf("tiktok") != -1:
					document.cookie = "utm_source=tiktok; path=/";
					document.cookie = "utm_medium=video; path=/";
					break;
				case curReferer.indexOf("rutube") != -1:
					document.cookie = "utm_source=rutube; path=/";
					document.cookie = "utm_medium=video; path=/";
					break;
				default:
					document.cookie = `utm_source=${curReferer}; path=/`;
					break;
			}
			document.cookie = "utm_campaign=organic; path=/";
			document.cookie = `utm_content=${urlHref}; path=/`;
		}
	}

	const utmItemsFormatted = utmItems.reduce((ac, item) => {
		const value = getCookie(item);
		if (value) {
			const oldUtmName = item;
			if (fieldsForReplace.some((f) => f.from === item)) {
				const newName = fieldsForReplace.find((f) => f.from === item);
				newName && (item = newName.to);
			}
			ac.push({ name: item, oldUtmName, value });
		}
		return ac;
	}, []);

	forms &&
	forms.length &&
	forms.forEach(function (form) {
		if (utmItemsFormatted.length) {
			for (let utmItem of utmItemsFormatted) {
				const currentUtmInputs = form.querySelectorAll(
					'input[name="' + utmItem.name + '"]'
				);

				currentUtmInputs &&
				!currentUtmInputs.length &&
				form.insertAdjacentHTML(
					"beforeend",
					'<input class="utm" name="' +
					utmItem.name +
					'" type="hidden" value="' +
					utmItem.value +
					'">'
				);
			}
		}

		if (window.location.href.indexOf("/grazhdanstvo-armenii") > -1) {
			form.insertAdjacentHTML(
				"beforeend",
				'<input name="' +
				"request_type" +
				'" class="utm" id="request_type" type="hidden" value="' + 'Армения' +'">'
			);
		}

		form.addEventListener("submit", (e) => {
			e.preventDefault();
			let data = new FormData(form);
			data.append("location", window.location.href.split("?")[0]);
			fetch("/justdoit.php", {
				method: "POST",
				body: data,
			})
				.then((response) => response.json())
				.then((resData) => {
					if (!resData.error) {
						// Отримання нової utm_source з justdoit-email.php
						fetch("/justdoit.php")
							.then((response) => response.json())
							.then((utmData) => {
								if (utmData.utm_source) {
									// Оновлення utm_source кукі
									document.cookie = `utm_source=${utmData.utm_source}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
								}
								window.location.href = "/thank-you";
							});
					} else {
						let errorName = resData.errors.name;
						let errorEmail = resData.errors.email;
						let errorPhone = resData.errors.phone;

						if (errorName) {
							form.querySelector(
								"input[name=name] + .error-validation"
							).innerHTML = errorName;
						} else {
							form.querySelector(
								"input[name=name] + .error-validation"
							).innerHTML = "";
						}
						if (errorPhone) {
							form.querySelector(
								"input[name=phone] + .error-validation"
							).innerHTML = errorPhone;
						} else {
							form.querySelector(
								"input[name=phone] + .error-validation"
							).innerHTML = "";
						}
						if (errorEmail) {
							form.querySelector(
								"input[name=email] + .error-validation"
							).innerHTML = errorEmail;
						} else {
							form.querySelector(
								"input[name=email] + .error-validation"
							).innerHTML = "";
						}
					}
				});
		});

	});

//Форма з фото
document.body.addEventListener('click', function (e) {
	if (e.target.classList.contains('send-form-comment')) {
		e.preventDefault();
		let form = e.target.closest('form');
		let validationFields = form.querySelectorAll('.validation-field');
		validationFields.forEach(function (field) {
			field.textContent = '';
		});
		let id = form.getAttribute('id');
		let form_data = new FormData(document.getElementById(id));
		let xhr = new XMLHttpRequest();
		xhr.open(form.getAttribute('method'), form.getAttribute('action'));
		xhr.responseType = 'json';
		xhr.onload = function () {
			if (xhr.status === 200) {
				let json = xhr.response;
				if (json.error) {
					let errors = json.errors;
					for (const property in errors) {
						let label = form.querySelector('[name=' + property + ']').closest('label');
						label.querySelector('span.validation-field').textContent = errors[property];
					}
				} else {
					document.querySelector('.overflow-bg').classList.add('show-modal-success');
					document.querySelector('.modal-success-review').classList.add('show-modal-success');
					document.querySelector('.modal-success-review').style.display = 'block';
					document.querySelector('.close-popup').addEventListener('click', function () {
						document.querySelector('.overflow-bg').classList.remove('show-modal-success');
						document.querySelector('.modal-success-review').classList.remove('show-modal-success');
					});
					form.reset();
				}
			} else {
				console.log('server error');
			}
		};
		xhr.onerror = function () {
			console.log('server error');
		};
		xhr.send(form_data);
	}
});
//Відгук
document.body.addEventListener('click', function (e) {
	if (e.target.classList.contains('send-form')) {
		e.preventDefault();
		let form = e.target.closest('form');
		let validationFields = form.querySelectorAll('.validation-field');
		validationFields.forEach(function (field) {
			field.textContent = '';
		});
		let id = form.getAttribute('id');
		let form_data = new FormData(document.getElementById(id));
		let xhr = new XMLHttpRequest();
		xhr.open(form.getAttribute('method'), form.getAttribute('action'));
		xhr.responseType = 'json';
		xhr.onload = function () {
			if (xhr.status === 200) {
				let json = xhr.response;
				if (json.error) {
					let errors = json.errors;
					for (const property in errors) {
						let label = form.querySelector('[name=' + property + ']').closest('label');
						label.querySelector('span.validation-field').textContent = errors[property];
					}
				} else {
				window.location.href = "/thank-you";
				}
			} else {
				console.log('server error');
			}
		};
		xhr.onerror = function () {
			console.log('server error');
		};
		xhr.send(form_data);
	}
});