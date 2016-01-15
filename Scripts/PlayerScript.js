#pragma strict

public var rotationSpeed : float = .5;
public var speed : float = 1;
public var moving : boolean = false;
public var GameController : GameControllerScript;
public var alive = true;
public var score : int = 0;
public var hasMoved = false; //--use this to determine when to hide instruction
public var vfxObj : GameObject;
public var playerNum : int = 1;
public var playerCharacter : String;

private var count = 0;
private var fallingYPos : float = -2;
private var badRotationTimer : int;
private var startingPos : Vector3;
private var startingRotation : Quaternion;
private var Btn : GameObject; //--the button for this player (used for hiding the instruction)


function Start () {
	GameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();
	
	InvokeRepeating("Timer", 1, 1);
	
	//--save start locations to variables
	startingPos = transform.position;
	
	startingRotation = transform.rotation;
	
	Respot();
	
//	Debug.Log("ypos"+transform.position.y);
	
	if(playerNum == 1){
		Btn = GameObject.Find("LInstruction");
		

		
	} else {
		Btn = GameObject.Find("RInstruction");
		
	}
	
	
}


function FixedUpdate () 
{
		
	if ((moving == true) && (alive == true)){
	
		//-- stop it rotating
		GetComponent.<Rigidbody>().angularVelocity = Vector3.zero;
	
		//-- move forward
		GetComponent.<Rigidbody>().AddRelativeForce (Vector3.forward * speed, ForceMode.Impulse);
		//var direction : Vector3 = Vector3.forward * speed;
		//Debug.Log("direction"+direction);
		//GetComponent.<Rigidbody>().AddForceAtPosition(direction, transform.position);
		transform.Translate(Vector3.forward * speed * Time.deltaTime);
	
		
		//Debug.Log("speed = "+speed+" magniture = "+GetComponent.<Rigidbody>().velocity.magnitude);
		
		//--if gets too fast, constrain speed
		if (GetComponent.<Rigidbody>().velocity.magnitude > speed) 
		{
	    	//GetComponent.<Rigidbody>().velocity = GetComponent.<Rigidbody>().velocity.normalized * speed;
		}
		
		
	
	} else {
		
//		GetComponent.<Rigidbody>().AddRelativeTorque (0,rotationSpeed,0, ForceMode.Impulse);
		
		//Debug.Log("angularVelocity = "+GetComponent.<Rigidbody>().angularVelocity+" magniture = "+GetComponent.<Rigidbody>().angularVelocity.magnitude);
		
		
//		if ((GetComponent.<Rigidbody>().angularVelocity.magnitude > rotationSpeed) || (GetComponent.<Rigidbody>().angularVelocity.magnitude < rotationSpeed)) 
//		{
//	 		Debug.Log("over");
//	    	GetComponent.<Rigidbody>().angularVelocity = GetComponent.<Rigidbody>().velocity.normalized * rotationSpeed;
//		}

		//-- rotate the player
		transform.Rotate((Vector3.up * rotationSpeed) * Time.deltaTime);
	}

}

function Update() {

	if ((transform.position.y < fallingYPos) && alive == true){
		
		alive = false;
				
		if(GameController.roundActive == true){

			GameController.EndRound();
		}
	}
}


function Move(localmoving : boolean) {
	//--called when the button is pressed or stopped pressing 
	moving = localmoving; //--assign to public var
	
	if((localmoving == false) && (alive == true)){
		//--switch spin direction
		rotationSpeed = -rotationSpeed;
	}
	
	if(!hasMoved){
		hasMoved = true;
		
		//--fade the instruction out for this player's control btn
		Btn.GetComponent.<Animator>().Play("FadeOut");
	}

}

function Respot(){
	//--reset position
	transform.position = startingPos;
	
	//--reset rotation
	transform.rotation = startingRotation;
	
	//--make player blink for a bit
	var blinkingAmt : int = 0;
	
	while(blinkingAmt < 8) {
        yield WaitForSeconds(0.06);
    
		if(vfxObj.activeSelf == true){
        	vfxObj.SetActive(false);
    	}else {
    		vfxObj.SetActive(true);
    	}
        
        blinkingAmt++;
    }
    
    vfxObj.SetActive(true);
	
}

function Timer(){
	//--1 second cron
	//--count how long it's been on it's side.
	
	//Debug.Log("z = "+transform.eulerAngles.z+"x = "+transform.eulerAngles.x);
	if( ((transform.eulerAngles.x >= 250) && (transform.eulerAngles.x <= 300)) || ((transform.eulerAngles.z >= 250) && (transform.eulerAngles.z <= 300)) )
	{
		badRotationTimer++;
	} else {
		badRotationTimer = 0;
	}
	
	//--restart if been on it's side for more than 3 seconds
	if((badRotationTimer > 3) && (alive == true)){
		badRotationTimer = 0;
		Respot();
	}
	
	//Debug.Log("rotTimer = "+badRotationTimer);
	
}

