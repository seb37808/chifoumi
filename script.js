//Variables globales
var possibilities = ["Pierre", "Feuille", "Ciseaux"];
var your_count = [0,0,0];
var his_count = [0,0,0];
var result_count = [0,0,0];
var win_row = 0;
var lost_row = 0;
var draw_row = 0;
var win_message = ['Bravo', 'Super', 'Gagné', 'Continue'];
var lost_message = ['Perdu', 'Bien essayé', 'Pas de chance', 'La prochaine fois, peut-être', 'Dommage'];
var equal_message = ['Egalite', 'Changez!'];
var medals = ['The player', 'You rock', 'Nature', 'Cut cut cut', 'Winner', 'Looser', 'Egalite', 'Lucky bastard', 'Perhaps next time', 'Think as Machine', 'The achiever'];
var medals_title = ['Vous jouez des parties','Vous utilisez la Pierre', 'Vous utilisez la feuille', 'Vous utilisez les ciseaux', 'Parties gagnées', 'Parties perdues', 'Parties nulles', 'Parties consécutives gagnées', 'Parties consécutives perdues', 'Parties nulles consécutives', 'Tous les badges de la couleur obtenus'];
var medals_level = [0,0,0,0,0,0,0,0,0,0,0];
var medals_threshold = [[10,50,100,0],[10,50,100,0], [10,50,100,0], [10,50,100,0], [10,50,100,0], [10,50,100,0], [10,50,100,0], [3,5,10,0], [3,5,10,0], [3,5,10,0], [1, 2, 3, 0]];

function medals_function(index){
	var threshold = medals_threshold[index][medals_level[index]];
	var value = 0;
	
	switch(index){
		case '0':
			value = sum(your_count);
			break;
		case '1':
			value = your_count[0];
			break;
		case '2':
			value = your_count[1];
			break;
		case '3':
			value = your_count[2];
			break;
		case '4':
			value = result_count[0];
			break;
		case '5':
			value = result_count[1];
			break;
		case '6':
			value = result_count[2];
			break;
		case '7':
			value = win_row;
			break;
		case '8':
			value = lost_row;
			break;
		case '9':
			value = draw_row;
			break;
		case '10':
			value = min(medals_level, medals_level.length - 1);
			break;
		default: return false;
	}
	
	if (threshold == 0){
		document.getElementById("medal"+index).innerHTML = value + '[MAXED]';
	}
	else {
		document.getElementById("medal"+index).innerHTML = value + '/' + threshold;
	}
	return value == threshold;
}

//Au chargement de la page
function initPage(){

	addChoices(document.getElementById('choices'));
	addMedals(document.getElementById('medals'));

}

/*Ajouter les boutons*/
function addChoices(place){
	for (index in possibilities){
		var btn = document.createElement("BUTTON");        // Create a <button> element
		var t = document.createTextNode(possibilities[index]);       // Create a text node
		btn.appendChild(t);                  		// Append the text to <button>
		btn.value = index;
		btn.onclick = function(){userBet(this.value);}
		place.appendChild(btn);
	}
}

/*Ajouter les médailles*/
function addMedals(place){
	for (index in medals){
		var sp = document.createElement("SPAN");
		var btn = document.createElement("BUTTON");        	// Create a <button> element
		var t = document.createTextNode(medals[index]);     // Create a text node pour l'affichage du nom de la médaille
		var t2 = document.createElement('DIV');       			// Create a div pour l'affichage des thresholds
		sp.className += "medals";
		/*Information popup pour expliquer le badge*/
		sp.title = medals_title[index];
		sp.title += "\nBronze: " + medals_threshold[index][0];
		sp.title += "\nArgent: " + medals_threshold[index][1];
		sp.title += "\nOr: " + medals_threshold[index][2];
		sp.appendChild(btn);
		sp.appendChild(t);
		t2.id = 'medal' + index;
		sp.appendChild(t2);
		place.appendChild(sp);

	}
			
	/*Pour initialiser l'affichage des thresholds*/
	manageMedals();
}

function manageMedals(){
	for (index in medals){
		if (medals_function(index)){
			
			medals_level[index]++;
			
			switch (medals_level[index]){
				case 1:
					document.getElementsByClassName('medals')[index].className += " bronze";
					break;
				case 2:
					document.getElementsByClassName('medals')[index].className += " silver";
					break;
				case 3:
					document.getElementsByClassName('medals')[index].className += " gold";
					break;				
				default:
			}
		}
	}
}

function sum(array){
	var total =   0;
	for(var i=0, n=array.length; i < n; i++) { 
		total += array[i]; 
	}		
	return total;
}

function min(array, nb_elements){
	/*Retourne la valeur minimale d'un tableau pour ses nb_elements premiers éléments*/
	var value = 3;
	for(var i=0, n=Math.min(array.length, nb_elements); i < n; i++) { 
		value = Math.min(value, array[i]); 
	}		
	return value;
}

function manageStat(){
	
	var stats = document.getElementsByClassName('percentage');
	
	for (index in possibilities){
		
		var perc = Math.round(100*your_count[index]/sum(your_count));
		stats[index*2].className = "yourCount percentage percentage-" + perc;
		document.getElementById("yourCount"+index).innerHTML = perc;
		
		perc = Math.round(100*his_count[index]/sum(his_count));
		stats[index*2+1].className = "hisCount percentage percentage-" + perc;
		document.getElementById("hisCount"+index).innerHTML = perc;
		
		document.getElementById("Total").innerHTML = sum(your_count);
	}
}

function win(resultBox){
	resultBox.textContent = win_message[Math.floor(Math.random() * win_message.length)];
	resultBox.className = 'win';
	//Garde les stats à jour
	result_count[0]++;
	win_row++;
	lost_row = 0;
	draw_row = 0;
}
function loose(resultBox){
	resultBox.textContent = lost_message[Math.floor(Math.random() * lost_message.length)];
	resultBox.className = 'lost';
	//Garde les stats à jour
	result_count[1]++;
	win_row = 0;
	lost_row++;
	draw_row = 0;
}
function draw(resultBox){
	resultBox.textContent = equal_message[Math.floor(Math.random() * equal_message.length)];
	resultBox.className = 'draw';
	//Garde les stats à jour
	result_count[2]++;
	win_row = 0;
	lost_row = 0;
	draw_row++;
}

//Traite le choix de l'utilisateur
function userBet(userIndex){
	
	//Obtenir le choix de l'ordi
	var computerIndex = Math.floor(Math.random() * possibilities.length);
	
	//Garde les stats à jour
	his_count[computerIndex]++;
	your_count[userIndex]++;
	
	//Donner les resultats
	resultBox = document.getElementById("result")
	
	if(userIndex == computerIndex){
		draw(resultBox);
	} else if ((userIndex - computerIndex) == 1 || (userIndex - computerIndex) ==  -2){
		win(resultBox);
	} 
	else {
		loose(resultBox);
	};

	/*Vérifier si une médaille a été obtenue*/
	manageMedals();
	/*Gerer la mise à jour de l'affichage des stats*/
	manageStat();
};