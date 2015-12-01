#pragma strict

public var rotationSpeed : float = .5;
public var speed : float = 1;
public var moving : boolean = false;
public var GameController : GameControllerScript;
public var alive = true;
public var score : int = 0;

private var count = 0;
private var fallingYPos : float = -0.13;


function Start () {
	GameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();
}


function FixedUpdate () 
{
		
	if ((moving == true) && (transform.position.y > fallingYPos)){
	
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
	if ((transform.position.y < fallingYPos) && (GameController.roundActive == true)){
		alive = false;
		
		Debug.Log(this+" is dead");

		GameController.EndRound();
	}
}


function Move(localmoving : boolean) {
	//--called when the button is pressed or stopped pressing 
	moving = localmoving; //--assign to public var
	
	if(localmoving == false){
		//--switch spin direction
		rotationSpeed = -rotationSpeed;
	}

}