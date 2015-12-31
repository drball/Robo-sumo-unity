#pragma strict
import UnityEngine.UI;

public var ScoreModal : GameObject;
public var Player1 : PlayerScript;
public var Player2 : PlayerScript;
public var roundActive : boolean = true;
public var Player1ScoreText : GameObject;
public var Player2ScoreText : GameObject;
public var PlayAgainBtn : GameObject;

public var LInstruction : GameObject;
public var RInstruction : GameObject;
private var winningScore : int = 5;


function Start () {
	//--hide the score modal so we can show it later
	ScoreModal.SetActive(false);
	
	//--load the chosen player dynamically based on what was chosen
	
	
	//Player1 = player1Instance.transform.GetComponent.<PlayerScript>();
	Player1 = LoadPlayer("Player1Dummy", 1).transform.GetComponent.<PlayerScript>();
	Player2 = LoadPlayer("Player2Dummy", 2).transform.GetComponent.<PlayerScript>();
//	Player2 = GameObject.Find("Player2Dummy").GetComponent.<PlayerScript>();
	
//	Debug.Log("player 1 xpos = "+Player1.transform.position.x);
//	Debug.Log("player 2 xpos = "+Player2.transform.position.x);
	
	//--hide the "play again" button initially, so we can show it later
	PlayAgainBtn.SetActive(false);
	
//	Debug.Log("p1 = "+ PlayerSelectScript.p1SelectedCharString);
//	Debug.Log("p2 = "+ PlayerSelectScript.p2SelectedCharString);

}

function LoadPlayer(dummyObjName, playerNum){

	//--load the chosen player dynamically based on what was chosen
	var PlayerDummy : GameObject = GameObject.Find(dummyObjName);
	
	//--we should get the chosen player from playerSelection screen, if not load a default
	if(PlayerSelectScript.p1SelectedCharString && PlayerSelectScript.p2SelectedCharString){
		//--build the string of the player to replace the dummy with
		var playerToLoad = "Player" + playerNum;
		if(playerNum == 1){
			playerToLoad += PlayerSelectScript.p1SelectedCharString;
		}else {
			playerToLoad += PlayerSelectScript.p2SelectedCharString;
		}
	}else{
		playerToLoad = "Player" + playerNum + "B";
	}
	
	//--load from "resources"
	var playerInstance : GameObject = Instantiate(Resources.Load(playerToLoad, GameObject),
		PlayerDummy.transform.position, 
		PlayerDummy.transform.rotation
	);
	
	Destroy(PlayerDummy);

	return playerInstance;
}


function Reset(){

	Debug.Log("resetting scene -----------------------------------------");

	//--reset physics
	Player1.GetComponent.<Rigidbody>().angularVelocity = Vector3.zero;
	Player2.GetComponent.<Rigidbody>().angularVelocity = Vector3.zero;
	
	Player1.GetComponent.<Rigidbody>().velocity = Vector3.zero;
	Player2.GetComponent.<Rigidbody>().velocity = Vector3.zero;
	
	
	//--reset position
	Player1.Respot();
	Player2.Respot();
	

	//--reset their local variables
	Player1.alive = true;
	Player2.alive = true;
	
	roundActive = true;
	
	yield WaitForSeconds(1);
	
	//--make sure these are hidden so we can activate them later
	ScoreModal.SetActive(false);
	PlayAgainBtn.SetActive(false);

}


function EndRound() {

	roundActive = false;
	Debug.Log("ending round in 2");
	yield WaitForSeconds(1);
	Debug.Log("ending round in 1");
	yield WaitForSeconds(1);
	
	//--show modal
	ScoreModal.SetActive(true);
	
	//--determine who won
	if(!Player1.alive) {
		Player2.score++;
	}
	
	if(!Player2.alive) {
		Player1.score++;
	}
	
	
	//--update leaderboard after a few seconds
	yield WaitForSeconds(1.5);
	
	Player1ScoreText.GetComponent.<Text>().text = Player1.score.ToString();
	Player2ScoreText.GetComponent.<Text>().text = Player2.score.ToString();
	
	yield WaitForSeconds(1.5);
	
	if((Player1.score >= winningScore) || (Player2.score >= winningScore)){
		//--someone has won
		
		Debug.Log("someone has won");
		
		//--show "play again" button
		PlayAgainBtn.SetActive(true);
		
		
	}else {
		//--keep playing
		
		//--animate out
		ScoreModal.GetComponent.<Animator>().Play("PanelSlideOut");
		
		Reset();
		
	}
	
}

//function Update()
//{
//	if(Input.GetKeyDown(KeyCode.Escape) == true)
//	{
//		Application.LoadLevel ("menu");
//	}
//}


function PlayAgain (){

	//--a full reset

	Debug.Log("play again");
	
	Reset();
	
	Player1.score = 0;
	Player2.score = 0;
	
	//--animate these away
	PlayAgainBtn.GetComponent.<Animator>().Play("PanelSlideOut");
	ScoreModal.GetComponent.<Animator>().Play("PanelSlideOut");
	
	//--reset the text boxes
	Player1ScoreText.GetComponent.<Text>().text = "0";
	Player2ScoreText.GetComponent.<Text>().text = "0";
	
	//--reload entire scene
	Application.LoadLevel ("main");
	
}

function MovePlayer1(moving : boolean){

	//--called when the button is pressed or stopped pressing - pass this to player
	Player1.Move(moving);
}

function MovePlayer2(moving : boolean){

	//--called when the button is pressed or stopped pressing - pass this to player
	Player2.Move(moving);
	
}


//--for debug
function FixedUpdate () {
	if(Input.GetKey(KeyCode.LeftArrow) == true) {
		Player1.Move(true);
	}
	
	if(Input.GetKey(KeyCode.RightArrow) == true) {
		Player2.Move(true);
	}
}

