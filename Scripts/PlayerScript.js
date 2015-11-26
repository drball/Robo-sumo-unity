#pragma strict

var rotationSpeed : float = .5;
var speed : float = 1;
private var moving : boolean = false;
private var count = 0;

function Start () {

}

function Update () {

}


function FixedUpdate () 
{
	
	
	
	if(Input.GetKey("w"))
	{
		moving = true;
		
	} else {
		moving = false;
	}
	
	if(Input.anyKeyDown) {
		count += 1;
		SwitchDirection();
		Debug.Log(count);
	}
	
	
	if (moving == true ){
	
		//-- stop it rotating
		GetComponent.<Rigidbody>().angularVelocity = Vector3.zero;
	
		//-- move forward
		GetComponent.<Rigidbody>().AddRelativeForce (Vector2.up * speed, ForceMode.Impulse);
		
		//Debug.Log("speed = "+speed+" magniture = "+GetComponent.<Rigidbody>().velocity.magnitude);
		
		if (GetComponent.<Rigidbody>().velocity.magnitude > speed) 
		{
	    	GetComponent.<Rigidbody>().velocity = GetComponent.<Rigidbody>().velocity.normalized * speed;
		}
		
		
	
	} else {
		
		GetComponent.<Rigidbody>().AddTorque (0,0,rotationSpeed, ForceMode.Impulse);
		
		//Debug.Log("angularVelocity = "+GetComponent.<Rigidbody>().angularVelocity.magnitude+" magniture = "+GetComponent.<Rigidbody>().angularVelocity.magnitude);
		
		
		if (GetComponent.<Rigidbody>().angularVelocity.magnitude > rotationSpeed) 
		{
	 
	    	GetComponent.<Rigidbody>().angularVelocity = GetComponent.<Rigidbody>().velocity.normalized * rotationSpeed;
		}
	}

}

function SwitchDirection () {
	rotationSpeed = -rotationSpeed;
}