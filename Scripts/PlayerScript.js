#pragma strict

var rotationSpeed : float = .5;
var speed : float = 1;
public var moving : boolean = false;
private var count = 0;

function Start () {

}


function FixedUpdate () 
{
	
//	if(Input.GetKey("w"))
//	{
//		moving = true;
//		
//	} else {
//		moving = false;
//	}
	
//	if(Input.anyKeyDown) {
//		count += 1;
//		SwitchDirection();
//		Debug.Log(count);
//	}

	
	if ((moving == true) && (transform.position.y > -0.13)){
	
		//-- stop it rotating
		GetComponent.<Rigidbody>().angularVelocity = Vector3.zero;
	
		//-- move forward
		
		GetComponent.<Rigidbody>().AddRelativeForce (Vector3.forward * speed, ForceMode.Impulse);
		//var direction : Vector3 = Vector3.forward * speed;
		//Debug.Log("direction"+direction);
		//GetComponent.<Rigidbody>().AddForceAtPosition(direction, transform.position);
		transform.Translate(Vector3.forward * speed * Time.deltaTime);
	
		
		//Debug.Log("speed = "+speed+" magniture = "+GetComponent.<Rigidbody>().velocity.magnitude);
		
		if (GetComponent.<Rigidbody>().velocity.magnitude > speed) 
		{
	    	Debug.Log("sfsdf");
	    	GetComponent.<Rigidbody>().velocity = GetComponent.<Rigidbody>().velocity.normalized * speed;
		}
		
		
	
	} else {
		
//		GetComponent.<Rigidbody>().AddRelativeTorque (0,rotationSpeed,0, ForceMode.Impulse);
		
		//Debug.Log("angularVelocity = "+GetComponent.<Rigidbody>().angularVelocity+" magniture = "+GetComponent.<Rigidbody>().angularVelocity.magnitude);
		
		
//		if ((GetComponent.<Rigidbody>().angularVelocity.magnitude > rotationSpeed) || (GetComponent.<Rigidbody>().angularVelocity.magnitude < rotationSpeed)) 
//		{
//	 		Debug.Log("over");
//	    	GetComponent.<Rigidbody>().angularVelocity = GetComponent.<Rigidbody>().velocity.normalized * rotationSpeed;
//		}

		transform.Rotate((Vector3.up * rotationSpeed) * Time.deltaTime);
	}

}


function Move(localmoving : boolean) {
	//--called when the button is pressed or stopped pressing 
	moving = localmoving;
	
	if(localmoving == false){
		//--switch spin direction
		rotationSpeed = -rotationSpeed;
	}

}