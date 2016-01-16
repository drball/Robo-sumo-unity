#pragma strict

//static var playerSelection : Hashtable; //--chosen characters

//--create array of the possible different player characters 
public var playerCharacters = new Array ("A", "B", "C");

public var p1GameObjects : GameObject[]; //--array of characters
public var p2GameObjects : GameObject[]; //--array of characters
public var P1Btn : GameObject;	//--ref to btn for disabling it
public var P2Btn : GameObject;	//--ref to btn for disabling it
public var LoadingPanel : GameObject;

private var numPlayers : int = 2;
private var p1VisibleChar = 0;
private var p2VisibleChar = 0;

//--the selected character - these used in the next scene
static var p1SelectedCharString; 
static var p2SelectedCharString;

function Start () {
	
	//--hide all the characters apart from the 1st
	showOnlyP1Character(p1VisibleChar);
	showOnlyP2Character(p2VisibleChar);
	
	p1SelectedCharString = "";
	p2SelectedCharString = "";
	
	LoadingPanel.SetActive(false);
	
}

function selectCharacter(playerNum : int) {
	//--when the "select" button pressed, set the variable & disable the btn
	
	if(playerNum == 1) {
		Debug.Log("p1VisibleChar] = "+p1VisibleChar);
		Debug.Log("playerCharacters[p1VisibleChar] = "+playerCharacters[p1VisibleChar]);
		p1SelectedCharString = playerCharacters[p1VisibleChar];
		P1Btn.SetActive(false);
	}else {
		p2SelectedCharString = playerCharacters[p2VisibleChar];
		P2Btn.SetActive(false);
	}
	
	//--load next level if both selected
	
	if( p1SelectedCharString && p2SelectedCharString ){
		Debug.Log("both ready!");
		
		//--show loading panel because there's a delay
		LoadingPanel.SetActive(true);
		
		//--load the main level
		Application.LoadLevel ("main");
	}
	
	
}

function showOnlyP1Character (charToShow : int) {

//	Debug.Log("there are "+p1GameObjects.length+"p1 charaters");

	//--hide all characters
	for(var i : int = 0; i < p1GameObjects.length; i++){
		p1GameObjects[i].SetActive(false);
	}
	
	//--show the selected char
	p1GameObjects[charToShow].SetActive(true);
}

function showOnlyP2Character (charToShow : int) {

//	Debug.Log("there are "+p2GameObjects.length+"p2 charaters");

	//--hide all characters
	for(var i : int = 0; i < p2GameObjects.length; i++){
		p2GameObjects[i].SetActive(false);
	}
	
	//--show the selected char
	p2GameObjects[charToShow].SetActive(true);
//	Debug.Log("p2 show "+charToShow);
}

function NextCharacter (playerNum : int) {
	
	if (playerNum == 1) {
		p1VisibleChar++;
		
		if(p1VisibleChar >= p1GameObjects.length) {
			p1VisibleChar = 0;
		}
		showOnlyP1Character(p1VisibleChar);
	}else {
		p2VisibleChar++;
		
		if(p2VisibleChar >= p2GameObjects.length) {
			p2VisibleChar = 0;
		}
		showOnlyP2Character(p2VisibleChar);
	}
	
}

function PrevCharacter (playerNum : int) {
	
	if (playerNum == 1) {
		p1VisibleChar--;
		
		if(p1VisibleChar < 0) {
			p1VisibleChar = p1GameObjects.length - 1;
		}
		showOnlyP1Character(p1VisibleChar);
	}else {
		p2VisibleChar--;
		
		if(p2VisibleChar < 0) {
			p2VisibleChar = p2GameObjects.length - 1;
		}
		showOnlyP2Character(p2VisibleChar);
	}
}