/**
 * CSE 154 Fifteem Puzzle
 *
 * Copyright (c) 2018
 */
(function(){
	"use strict";
	var STATE = 1;//It starts out in order.STATE=1 means in order.STATE =0 means out of order.
	
	// Creates solved puzzle
    // solve();
    
    window.onload=function(){
        var puzzlearea = document.getElementById('puzzlearea');
		 solve();
        document.getElementById('puzzlearea').addEventListener('click', function(e){
            if(STATE == 1){
                // Enables sliding animation
                puzzlearea.className = 'animate';
                shiftelement(e.target);
            }
        });
	    document.getElementById('shufflebutton').addEventListener('click', scramble);
		setTimeout(scramble,1000);
	};

	/**
	 * Creates solved puzzlearea
	 *
	 */
	function solve(){
		var puzzlearea = document.getElementById('puzzlearea');
		if(STATE == 0){
			return;
		}
		puzzlearea.innerHTML = "";
		var n = 1;
		for(var i = 0; i <= 3; i++){
			for(var j = 0; j <= 3; j++){
				var element = document.createElement('div');
				element.id = 'element-'+i+'-'+j;
				element.style.left = (j*85+1*j+1)+'px';
                element.style.top = (i*85+1*i+1)+'px';
				if(n <= 15){
					element.classList.add('number');
					switch(n){
						case 1:element.classList.add('first');break;
						case 2:element.classList.add('second');break;
						case 3:element.classList.add('third');break;
						case 4:element.classList.add('fourth');break;
						case 5:element.classList.add('fifth');break;
						case 6:element.classList.add('sixth');break;
						case 7:element.classList.add('seventh');break;
						case 8:element.classList.add('eighth');break;
						case 9:element.classList.add('ninth');break;
						case 10:element.classList.add('tenth');break;
						case 11:element.classList.add('eleventh');break;
						case 12:element.classList.add('twelfth');break;
						case 13:element.classList.add('thirteenth');break;
						case 14:element.classList.add('fourteenth');break;
						case 15:element.classList.add('fifteenth');break;
					}
					element.innerHTML = (n++).toString();
				} else {
					element.className = 'empty';
				}
				puzzlearea.appendChild(element);
			}
		}
	}

	/**
	 * Shifts number element to the empty element
	 * 
	 */
	function shiftelement(element){
		// Checks if selected element has number
		if(element.clasName != 'empty'){
			// Tries to get empty adjacent element
			var emptyelement = getEmptyAdjacentelement(element);
			if(emptyelement){
				// Temporary data
				var tmp = {style: element.style.cssText, id: element.id};
				// Exchanges id and style values
				element.style.cssText = emptyelement.style.cssText;
				element.id = emptyelement.id;
				emptyelement.style.cssText = tmp.style;
				emptyelement.id = tmp.id;
				if(STATE == 1){
					// Checks the order of numbers
					checkOrder();
				}
			}
		}
	}

	/**
	 * Gets specific element by row and column
	 *
	 */
	function getelement(row, col){
		return document.getElementById('element-'+row+'-'+col);
	}

	/**
	 * Gets empty element
	 *
	 */
	function getEmptyelement(){
		return document.getElementById('puzzlearea').querySelector('.empty');
	}
	
	/**
	 * Gets empty adjacent element if it exists
	 *
	 */
	function getEmptyAdjacentelement(element){
		// Gets all adjacent elements
		var adjacent = getAdjacentelements(element);
		// Searches for empty element
		for(var i = 0; i < adjacent.length; i++){
			if(adjacent[i].className == 'empty'){
				return adjacent[i];
			}
		}
		// Empty adjacent element was not found
		return false;
	}

	/**
	 * Gets all adjacent elements
	 *
	 */
	function getAdjacentelements(element){
		
		var id = element.id.split('-');
		// Gets element position indexes
		var row = parseInt(id[1]);
		var col = parseInt(id[2]);
		var adjacent = [];
		
		// Gets all possible adjacent elements
		if(row < 3){adjacent.push(getelement(row+1, col));}			
		if(row > 0){adjacent.push(getelement(row-1, col));}
		if(col < 3){adjacent.push(getelement(row, col+1));}
		if(col > 0){adjacent.push(getelement(row, col-1));}
		return adjacent;
	}
	
	/**
	 * Chechs if the order of numbers is correct
	 *
	 */
	function checkOrder(){
		
		// Checks if the empty element is in correct position
		if(getelement(3, 3).className != 'empty'){
			return;
		}
	
		var n = 1;
		// Goes through all elements and checks numbers
		for(var i = 0; i <= 3; i++){
			for(var j = 0; j <= 3; j++){
				if(n <= 15 && getelement(i, j).innerHTML != n.toString()){
					// Order is not correct
					return;
				}
				n++;
			}
		}
		
		// puzzlearea is solved, offers to scramble it
		if(confirm('Congrats, You did it! \nScramble the puzzlearea?')){
			scramble();
		}
	
	}

	/**
	 * Scrambles puzzlearea
	 *
	 */
	function scramble(){
	
		if(STATE == 0){
			return;
		}
		
		document.getElementById('puzzlearea').removeAttribute('class');
		STATE = 0;
		
		var previouselement;
		var i = 1;
		var interval = setInterval(function(){
			if(i <= 100){
				var adjacent = getAdjacentelements(getEmptyelement());
				if(previouselement){
					for(var j = adjacent.length-1; j >= 0; j--){
						if(adjacent[j].innerHTML == previouselement.innerHTML){
							adjacent.splice(j, 1);
						}
					}
				}
				// Gets random adjacent element and memorizes it for the next iteration
				previouselement = adjacent[rand(0, adjacent.length-1)];
				shiftelement(previouselement);
				i++;
			} else {
				clearInterval(interval);
				STATE = 1;
			}
		}, 5);

	}
	
	/**
	 * Generates random number
	 *
	 */
	function rand(from, to){

		return Math.floor(Math.random() * (to - from + 1)) + from;

	}

}());
