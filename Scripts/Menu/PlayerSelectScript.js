#pragma strict

static var playerSelection : Hashtable; //--chosen characters

//--create array of the possible different player characters 
public var playerCharacters = new Array ("A", "B");

private var numPlayers : int = 2;

function Start () {

	//--create array/object of the chosen characters 
	playerSelection = new Hashtable();
	playerSelection.Add(1,"B");
	playerSelection.Add(2,"B");
		
	//--hide all the characters apart from the 1st
	for(var i : int = 1; i <= numPlayers; i++){
	
		for(var j : int = 1; j < playerCharacters.length; j++){
			Debug.Log("hide "+i+playerCharacters[j]);
			
			GameObject.Find("Player"+i+playerCharacters[j]).SetActive(false);
		}			
	}
	
//	GameObject.Find("Player1A").SetActive(true);
//	GameObject.Find("Player2A").SetActive(true);
	
	//--load the main level
//	Application.LoadLevel ("main");
}

function NextCharacter (playerNum : int) {
	Debug.Log("next char - "+playerNum);
}

function PrevCharacter (playerNum : int) {
	Debug.Log("prev char "+playerNum);
}