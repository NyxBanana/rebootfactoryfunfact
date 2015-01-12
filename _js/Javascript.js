// Adds delay to node.
		function AddDelay(node, delay)
		{
			node.style.transitionDelay = delay + 's';
			node.style.WebkitTransitionDelay = delay + 's';
		}
		
		// Adds cascade delays to children of node.
		function AddCascadeDelay(node, cascadeDelay)
		{
			childs = node.children;
			for (i = 0; i < childs.length; i++)
			{
				AddDelay(childs[i], i * cascadeDelay);
			}
		}
		
		// Shuffle randomizer.
		function Shuffle(count)
		{
			this.cursor = count;
			this.tab = new Array(count);
			
				// COnstructor.
			for (var i = 0 ; i < this.tab.length ; i++)
				this.tab[i] = i;
			
				// Draws next element.
			this.pick = function()
			{
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
			this.grow = function()
			{
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
				this.cursor = this.cursor + 1 ;
			};
		}

	if (location.hash === "") location.hash = "home";

		
	// Home swipper.
	var homeSection = document.getElementsByClassName("section__home")[0];

	var HomeSwipper = new Hammer(homeSection);
		HomeSwipper.get('swipe').set({ prevent_default:true, threshold: 1, velocity : 0.2, direction: Hammer.DIRECTION_ALL });
		
	// Filters
		(function() {
			"use strict";
			var openFilterBtn = document.getElementsByClassName("btn--openfilter")[0],
				filterMenu = document.getElementsByClassName("section__filter")[0],
				filterList = document.getElementsByClassName("filters")[0];

			openFilterBtn.addEventListener("click", function() {
				filterMenu.classList.toggle("filter--open");
				filterMenu.classList.add("filter--transition");
				AddCascadeDelay(filterList, 0.1);
			});

			filterMenu.addEventListener("transitionend", function() {
				filterMenu.classList.remove("filter--transition");
			});
			

			HomeSwipper.on('swiperight', function(ev) {

				filterMenu.classList.toggle("filter--open");
				filterMenu.classList.add("filter--transition");
				AddCascadeDelay(filterList, 0.1);
			});
			
				// Filter swipper.
			var FilterSwipper = new Hammer(filterMenu);
			FilterSwipper.get('swipe').set({ prevent_default:true, threshold: 1, velocity : 0.2 });
			
			FilterSwipper.on('swipeleft', function(ev) {
				filterMenu.classList.toggle("filter--open");
				filterMenu.classList.add("filter--transition");
				//AddCascadeDelay(filterList, 0.1);
			});
		})();

	// Forms
			"use strict";
			var floatlabels = document.getElementsByClassName("floatlabel");

			for (var i = 0; i < floatlabels.length; i++) {
				var input = floatlabels[i].getElementsByTagName("input")[0];
				var label = floatlabels[i].getElementsByTagName("label")[0];

				input.placeholder = label.innerText;

				input.addEventListener("input", function(e) {
					var label = this.previousElementSibling;

					if (this.value.length != 0)
						label.classList.add("visible");
					else
						label.classList.remove("visible");
				});
			}

	//AddFact
			"use strict";
			var floatlabels = document.getElementsByClassName("floatlabel");
			for (var i = 0; i < floatlabels.length; i++) {
				var input = floatlabels[i].getElementsByTagName("input")[0];
				var label = floatlabels[i].getElementsByTagName("label")[0];
				input.placeholder = label.innerText;
				input.addEventListener("input", function(e) {
					var label = this.previousElementSibling;
					if (this.value.length != 0)
						label.classList.add("visible");
					else
						label.classList.remove("visible");
				});
			}


	//Home Menu Toggle
	(function() {
		var menu = document.getElementsByClassName("menu")[0],
			menuIcon = document.getElementsByClassName("menuFact")[0],
			blackFilter = document.getElementsByClassName("blackFilter")[0];

		menuIcon.addEventListener("click", function() {
			menu.classList.toggle("unsee");
			menu.classList.add("menu--transition");
			blackFilter.classList.toggle("unsee");
			blackFilter.classList.add("blackFilter--transition");
		});

		menu.addEventListener("click", function() {
			menu.classList.remove("menu--transition");
			blackFilter.classList.remove("blackFilter--transition");
		});
	});

	//Profil Open/Close
	(function() {
		"use strict";
		var btnProfil = document.getElementsByClassName("btn--openprofile")[0],
			profil = document.getElementsByClassName("section__profil")[0];
		
		btnProfil.addEventListener("click", function() {

			if (btnProfil.classList.contains("profilIcon")) {
				OpenProfil();
			}
			else if (btnProfil.classList.contains("homeIcon")) {
				CloseProfil();
			}
		});
		
		profil.addEventListener("webkitAnimationEnd", function() {
			profil.classList.remove("profilOpen--transition");
			btnProfil.classList.remove("profilIcon");
			btnProfil.classList.add("homeIcon");
		});
		
		profil.addEventListener("transitionend", function() {
			profil.classList.remove("profilClose--transition");
			btnProfil.classList.add("profilIcon");
			btnProfil.classList.remove("homeIcon"); 
		});
		
		function OpenProfil() {
			profil.classList.remove("profilClose--open");
			profil.classList.add("profilOpen--open"); 
			profil.classList.add("profilOpen--transition");

		}
		
		function CloseProfil() {
			profil.classList.remove("profilOpen--open");
			profil.classList.add("profilClose--open"); 
			profil.classList.add("profilClose--transition");
		}
		
			// Opens if swipes down.
		HomeSwipper.on('swipedown', function(ev) {
			if (btnProfil.classList.contains("profilIcon")) {
				OpenProfil();
			}
		});
		
			// Closes if swipes up.
		var ProfilSwipper = new Hammer(profil);
		ProfilSwipper.get('swipe').set({ prevent_default:true, threshold: 1, velocity : 0.2, direction: Hammer.DIRECTION_ALL });
		
		ProfilSwipper.on('swipeup', function(ev) {
			CloseProfil();
		});

			
		//	backHome.addEventListener("transitionend", function() { //tu peux jouer avec un settimeout pour le moment ou l'anim doit de déclencher
		//			btnProfil.classList.remove("homeIcon"); 
		//			btnProfil.classList.add("profilIcon");
		//	});

		//}
	})();

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
		},
	];

	// HOME and fact swapping.
	(function() {
		var currentFact = 0;
		var factShuffle = new Shuffle(facts.length);
		
			// Writes first fact if avaible.
		if( facts.length > 0 )
		{
			currentFact = factShuffle.pick();
			$(".visible_fact .fact").html(facts[currentFact].text);
			$(".visible_fact .source").html(facts[currentFact].source);
			$(".visible_fact .author").html(facts[currentFact].author);
			$(".visible_fact .category").html(facts[currentFact].category);
		}
		
		var visibleFact = document.getElementsByClassName("visible_fact")[0],
		hiddenFact = document.getElementsByClassName("hidden_fact")[0];
		
		HomeSwipper.on('swipeleft', function(ev) {
		
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

		});
		
		visibleFact.addEventListener("transitionend", function() {
			ExchangeFacts();
		});
		
		hiddenFact.addEventListener("transitionend", function() {
			ExchangeFacts();
		});
		
		function ExchangeFacts()
		{
				// end of transition
			hiddenFact.classList.remove("transition_fact");
			
				// visible --> hidden (instant)
			visibleFact.classList.remove("visible_fact");
			visibleFact.classList.add("hidden_fact");
			
				// Reset z-index.
			zIndex = window.getComputedStyle(hiddenFact).getPropertyValue('z-index');
			hiddenFact.style.zIndex = zIndex - 1;
			
				// Swap svariables
			tmp = visibleFact;
			visibleFact = hiddenFact;
			hiddenFact = tmp;
			
		}
	})();

	//AddFact Open/Close
		(function() {
			"use strict";
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
				})
				btnAdd.addEventListener("click", function() {
					addBg.classList.add("addFact--open");
					addBg.classList.add("addFact--transition");
					btnAdd.classList.add("btnAdd--gone");
					btnAdd.classList.add("btnAdd--transition");
				});
				addBg.addEventListener("transitionend", function() {
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
				valBg.addEventListener("transitionend", function() {
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
				validMessage.addEventListener("transitionend", function() {
					setTimeout(function() {
						validMessage.classList.remove("validMessage--open");
						blackFilter.classList.remove("blackFilter--open");
						validMessage.classList.remove("validMessage--transition");
						blackFilter.classList.remove("blackFilter--transition");
						location.hash = "home";
						targetAddFact.classList.add("unsee");
						targetHome.classList.remove("unsee");
					})
				}, 800);
		})();