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

private var p1StartingPos : Vector3;
private var p2StartingPos : Vector3;

private var p1StartingRotation : Quaternion;
private var p2StartingRotation : Quaternion;

private var winningScore : int = 5;


function Start () {
	ScoreModal.SetActive(false);
	
	Player1 = GameObject.Find("Player1").GetComponent.<PlayerScript>();
	Player2 = GameObject.Find("Player2").GetComponent.<PlayerScript>();
	
	//--save start locations to variables
	p1StartingPos = Player1.transform.position;
	p2StartingPos = Player2.transform.position;
	
	p1StartingRotation = Player1.transform.rotation;
	p2StartingRotation = Player2.transform.rotation;
	
	
	//--hide the "play again" button initially, so we can show it later
	PlayAgainBtn.SetActive(false);
	
	//Invoke("HideInstruction", 3);
}


//function HideInstruction(){
//	Debug.Log("hide instuction");
//	
//	LInstruction.GetComponent.<Animator>().Play("FadeOut");
//	
//}

function Reset(){

	Debug.Log("resetting scene -----------------------------------------");

	//--reset physics
	Player1.GetComponent.<Rigidbody>().angularVelocity = Vector3.zero;
	Player2.GetComponent.<Rigidbody>().angularVelocity = Vector3.zero;
	
	Player1.GetComponent.<Rigidbody>().velocity = Vector3.zero;
	Player2.GetComponent.<Rigidbody>().velocity = Vector3.zero;
	
	
	//--reset rotation
	Player1.transform.rotation = p1StartingRotation;
	Player2.transform.rotation = p2StartingRotation;
	

	//--reset position
	Player1.transform.position = p1StartingPos;
	Player2.transform.position = p2StartingPos;
	

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

function Update()
{
	if(Input.GetKeyDown(KeyCode.Escape) == true)
	{
		Application.LoadLevel ("menu");
	}
}

function PlayAgain (){

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

