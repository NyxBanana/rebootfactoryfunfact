"use strict";

/**
 * Adds delay to the transition of a node
 */
function addTransitionDelay(node, delay) {
	node.style.transitionDelay = delay + 's';
	node.style.WebkitTransitionDelay = delay + 's';
}

/**
 * Adds delay to the animation of a node
 */
function addAnimationDelay(node, delay) {
	node.style.animationDelay = delay + 's';
	node.style.webkitAnimationDelay = delay + 's';
}

/**
 * Adds cascade delay to the children of a node
 */
function addCascadeTransitionDelay(node, cascadeDelay) {
	var children = node.children;

	for (var i = 0; i < children.length; i++) {
		addTransitionDelay(children[i], i * cascadeDelay);
	}
}

/**
 * Bind a function to a list of events for an element
 * @param element					the element to bind to
 * @param {string} eventTypes 		the list of event types, seperated by a spaces
 * @param {function} listener		the listener
 * @param {boolean} [useCapture]	see addEventListener doc
 * @returns element
 */
function bindEvent(element, eventTypes, listener, useCapture) {
	eventTypes.split(" ").forEach(function(type) {
		element.addEventListener(type, listener, useCapture);
	});

	return element;
}

/**
 * Shuffle randomizer Class
 */
function Shuffle(count) {
	this.cursor = count;
	this.tab = new Array(count);

	// Constructor.
	for (var i = 0 ; i < this.tab.length ; i++)
		this.tab[i] = i;

	// Draws next element.
	this.pick = function() {
		// Resets if finished.
		if (this.cursor === 0)
			this.cursor = this.tab.length;

		// Drawns next element.
		var randomNb = Math.floor(Math.random() * this.cursor);
		this.cursor = this.cursor - 1;

		// Swaps elements.
		var tmp = this.tab[randomNb];
		this.tab[randomNb] = this.tab[this.cursor];
		this.tab[this.cursor] = tmp;

		return tmp;
	};

	// Adds an additionnal element.
	this.grow = function() {
		// Resets if finished.
		if (this.cursor === 0)
			this.cursor = this.tab.length;

		// Adds new element.
		var oldLength = this.tab.length;
		this.tab.push(oldLength);

		// Swaps elements.
		var tmp = this.tab[this.cursor];
		this.tab[this.cursor] = oldLength;
		this.tab[oldLength] = tmp;

		// Update cursor.
		this.cursor++;
	};
}

/* End of library */

var facts = [
	{
		category : "fails",
		text : "A Detroit, un homme de 41 ans est mort noyé dans 50cm d’eau après avoir passé la tête dans une bouche d’égout et s’être bloqué… en cherchant ses clés de voiture.",
		source : "Source",
		author : "NyxBanana"
	},
	{
		category : "fails",
		text : "A Paris, une poubelle est considérée comme une arme mortelle.",
		source : "Source",
		author : "XynPapple"
	},
	{
		category : "histoire",
		text : "Le terme OK  vient de la Guerre de Sécession : ils indiquaient le nombre de tués à coté d'un K pour 'Killed'. Les bons jours sont ceux où l'on avait aucun mort, soit 0 K, devenu OK.",
		source : "Source",
		author : "XynPapple"
	},
	{
		category : "sport",
		text : "Henry Pearce s’est arrêté de ramer lors du quart des finales de la compétition d’aviron des Jeux olympiques d’Amsterdam en 1928 pour laisser passer une famille de canards. Il s’est qualifié et a remporté l’or en finale.",
		source : "Source",
		author : "NyxBanana"
	},
	{
		category : "art",
		text : "Contrairement à la croyant populaire, Molière n'est pas mort sur scène mais après la représentation du 'Malade Imaginaire'.",
		source : "Source",
		author : "NyxBanana"
	},
	{
		category : "sport",
		text : "Le temps était si mauvais lors des Jeux olympiques 1948 que les deux dernières épreuves ont dû se faire de nuit, les athlètes étant éclairés par les phares des voitures.",
		source : "Source",
		author : "NyxBanana"
	},
	{
		category : "monde",
		text : "En Alabama, il est illégal de porter une fausse moustache qui puisse causer des rires à l’église.",
		source : "Source",
		author : "NyxBanana"
	},
	{
		category : "monde",
		text : "Un milliard de Chinois se partagent 100 noms de famille.",
		source : "Source",
		author : "NyxBanana"
	},
	{
		category : "culture",
		text : "Jésus est né vers l’an 7 ou 5 avant Jésus-Christ.",
		source : "Source",
		author : "NyxBanana"
	},
	{
		category : "cinema",
		text : "Dans Iron Man et Avengers, J.A.R.V.I.S est l'acronyme de 'Just A Very Intelligent System' que l'on peut traduire par 'Juste un système très intelligent'",
		source : "Source",
		author : "NyxBanana"
	},
	{
		category : "célébrité",
		text : "Tom Baker a arrêté de boire et de fumer en publique lorsqu'il a obtenu le rôle du Docteur dans Doctor Who.",
		source : "Source",
		author : "NyxBanana"
	},
	{
		category : "sciences",
		text : "Le scarabée bousier est l'animal le plus fort au monde. Il peut soulever 1141 fois son poids.",
		source : "Source",
		author : "NyxBanana"
	},
	{
		category : "culture",
		text : "L’inventeur du Coca-Cola s’est inspiré d’un vin français à la coca.",
		source : "Source",
		author : "NyxBanana"
	},
	{
		category : "fails",
		text : "En France, il est interdit d’appeler un cochon Napoléon.",
		source : "Source",
		author : "XynPapple"
	},
	{
		category : "monde",
		text : "Au Royaume-uni, un homme peut uriner en public mais uniquement sur la roue arrière d’un véhicule motorisé sur lequel il aura préalablement posé sa main droite.",
		source : "Source",
		author : "NyxBanana"
	}
];

/* Begin of page code */

/*
 * info:
 * the anonymous functions are there to define the scope of the elements, for clarity
 * the "use strict" only need to be on the top of the main function (or on the top of the page if it is a .js file)
 */
(function() {
	if (location.hash === "") location.hash = "home";

	// Home swipper.
	var homeSection = document.getElementsByClassName("section__home")[0];
	var homeSwipper = new Hammer(homeSection);

	var isTransitionRunning = false;

	homeSwipper.get("swipe").set({ prevent_default:true, threshold: 1, velocity : 0.2, direction: Hammer.DIRECTION_ALL });

	// Filters
	(function() {
		var openFilterBtn = document.getElementsByClassName("btn--openfilter")[0],
			filterMenu = document.getElementsByClassName("section__filter")[0],
			filterList = document.getElementsByClassName("filters")[0];

		var cascadeRunningTransitionCount = 0;
		addCascadeTransitionDelay(filterList, 0.1);

		openFilterBtn.addEventListener("click", function() {
			if (isTransitionRunning === false) {
				filterMenu.classList.toggle("filter--open");
				filterMenu.classList.add("filter--transition");

				cascadeRunningTransitionCount = 9;
				isTransitionRunning = true;
			}
		});

		bindEvent(filterMenu, "webkitTransitionEnd transitionend", function() {
			if (cascadeRunningTransitionCount > 0) {
				filterMenu.classList.remove("filter--transition");
				cascadeRunningTransitionCount--;
				if (cascadeRunningTransitionCount === 0)
					isTransitionRunning = false;
			}
		});

		homeSwipper.on('swiperight', function() {
			if (isTransitionRunning === false) {
				filterMenu.classList.toggle("filter--open");
				filterMenu.classList.add("filter--transition");

				cascadeRunningTransitionCount = 9;
				isTransitionRunning = true;
			}
		});

		// Filter swipper.
		var filterSwipper = new Hammer(filterMenu);
		filterSwipper.get('swipe').set({ prevent_default:true, threshold: 1, velocity : 0.2 });

		filterSwipper.on('swipeleft', function() {
			if (isTransitionRunning === false) {
				filterMenu.classList.toggle("filter--open");
				filterMenu.classList.add("filter--transition");

				cascadeRunningTransitionCount = 9;
				isTransitionRunning = true;
			}
		});
	})();

	// Forms
	(function() {
		var floatlabels = document.getElementsByClassName("floatlabel");

		for (var i = 0; i < floatlabels.length; i++) {
			var input = floatlabels[i].getElementsByTagName("input")[0];
			var label = floatlabels[i].getElementsByTagName("label")[0];

			input.placeholder = label.innerText;

			input.addEventListener("input", function() {
				var label = this.previousElementSibling;

				if (this.value.length != 0)
					label.classList.add("visible");
				else
					label.classList.remove("visible");
			});
		}
	})();

	//Home Menu Toggle
	(function() {
		var menu = document.getElementsByClassName("menu")[0],
			menuIcon = document.getElementsByClassName("menuFact")[0],
			blackFilter = document.getElementsByClassName("blackFilter")[0];

		menuIcon.addEventListener("click", function () {
			menu.classList.toggle("unsee");
			menu.classList.add("menu--transition");
			blackFilter.classList.toggle("unsee");
			blackFilter.classList.add("blackFilter--transition");
		});

		menu.addEventListener("click", function () {
			menu.classList.remove("menu--transition");
			blackFilter.classList.remove("blackFilter--transition");
		});
	})();

	//Profil Open/Close
	(function() {
		var btnProfil = document.getElementsByClassName("btn--openprofile")[0],
			profil = document.getElementsByClassName("section__profil")[0];

		btnProfil.addEventListener("click", function() {
			if (btnProfil.classList.contains("profilIcon")) {
				openProfil();
			} else if (btnProfil.classList.contains("homeIcon")) {
				closeProfil();
			}
		});

		bindEvent(profil, "webkitAnimationEnd animationend", function() {
			if (isTransitionRunning) {
				profil.classList.remove("profilOpen--transition");
				btnProfil.classList.remove("profilIcon");
				btnProfil.classList.add("homeIcon");

				isTransitionRunning = false;
			}
		});

		bindEvent(profil, "webkitTransitionEnd transitionend", function() {
			if (isTransitionRunning) {
				profil.classList.remove("profilClose--transition");
				btnProfil.classList.add("profilIcon");
				btnProfil.classList.remove("homeIcon");

				isTransitionRunning = false;
			}
		});

		function openProfil() {
			if (isTransitionRunning === false) {
				profil.classList.remove("profilClose--open");
				profil.classList.add("profilOpen--open");
				profil.classList.add("profilOpen--transition");

				isTransitionRunning = true;
			}
		}

		function closeProfil() {
			if (isTransitionRunning === false) {
				profil.classList.remove("profilOpen--open");
				profil.classList.add("profilClose--open");
				profil.classList.add("profilClose--transition");

				isTransitionRunning = true;
			}
		}

		// Opens if swipes down.
		homeSwipper.on('swipedown', function() {
			if (btnProfil.classList.contains("profilIcon")) {
				openProfil();
			}
		});

		// Closes if swipes up.
		var profilSwipper = new Hammer(profil);
		profilSwipper.get('swipe').set({ prevent_default:true, threshold: 1, velocity : 0.2, direction: Hammer.DIRECTION_ALL });

		profilSwipper.on('swipeup', function() {
			closeProfil();
		});
	})();

	(function() {
		//Mesfacts/MesFav
		var btnMesFact = document.getElementsByClassName("btn--myfact")[0],
			btnMesFav = document.getElementsByClassName("btn--fav")[0],
			mesFacts = document.getElementsByClassName("artcile__mesFacts"),
			mesFavs = document.getElementsByClassName("article__mesFav"),
			sectionFact = document.getElementsByClassName("section__mesFacts")[0],
			sectionFav = document.getElementsByClassName("section__fav")[0];
		// ========================================
		// DELAYS
		// ========================================
		for (var i = 0; i < mesFacts.length; i++) {
			addAnimationDelay(mesFacts[i], 0.1 * i);
		}
		for (i = 0; i < mesFavs.length; i++) {
			addAnimationDelay(mesFavs[i], 0.1 * i);
		}
		// ========================================
		// BUTTON FAV (closes facts, opens fav)
		// ========================================
		function isClosed(section) {
			return section.classList.contains("inProfileClose");
		}
		btnMesFav.addEventListener("click", function() {
			if (!isClosed(sectionFav)) {
				return;
			}
			for (var i = 0; i < mesFacts.length; i++) {
				mesFacts[i].classList.add("mesFact--close");
			}
		});

		// the last fact to close inits the favs opening
		bindEvent(mesFacts[mesFacts.length - 1], "webkitAnimationEnd animationend", function() {
			if(this.classList.contains("mesFact--open")) {
				// remove the animation classes
				// do NOT close facts if the animation is the opening one.
				return;
			} else {
				for (i = 0; i < mesFacts.length; i++) {
					mesFacts[i].classList.remove("mesFact--close");
				}
			}
			// animation d'ouverture
			for (i = 0; i < mesFavs.length; i++) {
				mesFavs[i].classList.add("mesFav--open");
			}
			// cacher la section facts
			sectionFact.classList.add("inProfileClose");
			// afficher la section fav
			sectionFav.classList.remove("inProfileClose");
		});
		// ========================================
		// BUTTON FACT (closes favs, opens facts)
		// ========================================
		btnMesFact.addEventListener("click", function() {
			if (!isClosed(sectionFact)) {
				return;
			}
			// ferme les favs
			for (var i = 0; i < mesFavs.length; i++) {
				mesFavs[i].classList.add("mesFav--close");
			}
		});

		bindEvent(mesFavs[mesFavs.length - 1],  "webkitAnimationEnd animationend", function() {
			if(this.classList.contains("mesFav--open")) {
				// remove the animation classes
				// do NOT close fav if the animation is the opening one.
				for (i = 0; i < mesFavs.length; i++) {
					mesFavs[i].classList.remove("mesFav--open");
				}
				return;
			} else {
				for (i = 0; i < mesFavs.length; i++) {
					mesFavs[i].classList.remove("mesFav--close");
				}
			}
			// animation de l'ouverture des facts
			for (var i = 0; i < mesFacts.length; i++) {
				mesFacts[i].classList.add("mesFact--open");
			}
			// cachetage des favs
			sectionFav.classList.add("inProfileClose");
			// affichage des facts
			sectionFact.classList.remove("inProfileClose");
		});
		// =====================================
		// ANIMATION CLEANUP
		// =====================================
		for (i = 0; i < mesFacts.length; i++) {
			bindEvent(mesFacts[i], "webkitAnimationEnd animationend", function() {
				this.classList.remove("mesFact--open");
			});
		}
		for (i = 0; i < mesFavs.length; i++) {
			bindEvent(mesFavs[i], "webkitAnimationEnd animationend", function() {
				this.classList.remove("mesFav--open");
			});
		}
	})();

	// HOME and fact swapping.
	(function() {
		var currentFact = 0;
		var factShuffle = new Shuffle(facts.length);
		var zIndex;

		// Writes first fact if avaible.
		if(facts.length > 0) {
			currentFact = factShuffle.pick();
			$(".visible_fact .fact").html(facts[currentFact].text);
			$(".visible_fact .source").html(facts[currentFact].source);
			$(".visible_fact .author").html(facts[currentFact].author);
			$(".visible_fact .category").html(facts[currentFact].category);
		}

		var visibleFact = document.getElementsByClassName("visible_fact")[0],
			hiddenFact = document.getElementsByClassName("hidden_fact")[0];

		homeSwipper.on('swipeleft', function() {
			if (isTransitionRunning === false) {
				// Chooses next fact
				currentFact = factShuffle.pick();

				// Writes new fact.
				$(".hidden_fact .fact").html(facts[currentFact].text);
				$(".hidden_fact .source").html(facts[currentFact].source);
				$(".hidden_fact .author").html(facts[currentFact].author);
				$(".hidden_fact .category").html(facts[currentFact].category);

				// hidden --> visible
				hiddenFact.classList.remove("hidden_fact");
				hiddenFact.classList.add("visible_fact");
				hiddenFact.classList.add("transition_fact");

				// New fact on top.
				zIndex = window.getComputedStyle(hiddenFact).getPropertyValue('z-index');
				hiddenFact.style.zIndex = zIndex + 1;

				isTransitionRunning = true;
			}
		});

		bindEvent(visibleFact, "webkitTransitionEnd transitionend", function() {
			if (isTransitionRunning) {
				ExchangeFacts();
				isTransitionRunning = false;
			}
		});

		bindEvent(hiddenFact, "webkitTransitionEnd transitionend", function() {
			if (isTransitionRunning) {
				ExchangeFacts();
				isTransitionRunning = false;
			}
		});

		function ExchangeFacts() {
			// end of transition
			hiddenFact.classList.remove("transition_fact");

			// visible --> hidden (instant)
			visibleFact.classList.remove("visible_fact");
			visibleFact.classList.add("hidden_fact");

			// Reset z-index.
			zIndex = window.getComputedStyle(hiddenFact).getPropertyValue('z-index');
			hiddenFact.style.zIndex = zIndex - 1;

			// Swap svariables
			var tmp = visibleFact;
			visibleFact = hiddenFact;
			hiddenFact = tmp;
		}
	})();

	//AddFact Open/Close
	(function() {
		var btnAdd = document.getElementsByClassName("addfact")[0],
			addBg = document.getElementsByClassName("addfact--btn")[0],
			btnVal = document.getElementsByClassName("validFact")[0],
			valBg = document.getElementsByClassName("validfact--btn")[0],
			targetHome = document.getElementsByClassName("section__home")[0],
			targetAddFact = document.getElementsByClassName("section__addFact")[0],
			goHome = document.getElementsByClassName("goHome")[0],
			validMessage = document.getElementsByClassName("validMessage")[0],
			blackFilter = document.getElementsByClassName("blackFilter")[0];

		goHome.addEventListener("click", function() {
			if (targetHome.classList.contains("unsee")) {
				targetHome.classList.remove("unsee");
			}
			if (addBg.classList.contains("addFact--open")) {
				addBg.classList.remove("addFact--open");
				addBg.classList.remove("addFact--transition");
			}
			if (btnAdd.classList.contains("btnAdd--gone")) {
				btnAdd.classList.remove("btnAdd--gone");
			}
			if (!targetAddFact.classList.contains("unsee")) {
				targetAddFact.classList.add("unsee");
			}
			valBg.classList.remove("valBg--close");
			btnVal.classList.remove("btnVal--open");
		});

		btnAdd.addEventListener("click", function() {
			addBg.classList.add("addFact--open");
			addBg.classList.add("addFact--transition");
			btnAdd.classList.add("btnAdd--gone");
			btnAdd.classList.add("btnAdd--transition");
		});

		bindEvent(addBg, "webkitTransitionEnd transitionend", function() {
			setTimeout(function(){
				location.hash = "addFact";
				btnAdd.classList.remove("btnAdd--transition");
				targetHome.classList.add("unsee");
				targetAddFact.classList.remove("unsee");
				valBg.classList.add("valBg--close");
				valBg.classList.add("valBg--transition");
				btnVal.classList.add("btnVal--open"); //ouverture du bouton V
				btnVal.classList.add("btnVal--transition");
			}, 200);
		});

		bindEvent(valBg, "webkitTransitionEnd transitionend", function() {
			valBg.classList.remove("valBg--transition");
			btnVal.classList.remove("btnVal--transition");
			valBg.classList.add("valBg--bounce");
			valBg.classList.add("valBg--bounceTransition");
		});

		btnVal.addEventListener("click", function() {
			validMessage.classList.add("validMessage--open"); //attention, il est en unsee, il aura donc besoin que tu ajoute le changement d'opacité dans la transition
			validMessage.classList.add("validMessage--transition");
			blackFilter.classList.add("blackFilter--open"); //pareil que validMessage, il est en unsee de base
			blackFilter.classList.add("blackFilter--transition");
		});

		bindEvent(validMessage, "webkitTransitionEnd transitionend", function() {
			setTimeout(function() {
				validMessage.classList.remove("validMessage--open");
				blackFilter.classList.remove("blackFilter--open");
				validMessage.classList.remove("validMessage--transition");
				blackFilter.classList.remove("blackFilter--transition");
				location.hash = "home";
				targetAddFact.classList.add("unsee");
				targetHome.classList.remove("unsee");
			}, 800);
		});
	})();
})();
