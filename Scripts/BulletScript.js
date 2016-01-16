#pragma strict

public var speed = 0.06;
public var Vfx : GameObject;
public var ParticleObj : GameObject;
private var rb : Rigidbody;
public var Owner : GameObject; //--discount this from any collisions

function Start () {
	Destroy(gameObject,7);
	
	rb = GetComponent.<Rigidbody>();
}

function FixedUpdate () {
	//transform.Translate(Vector3.forward * speed * Time.deltaTime);
	
	rb.AddForce(transform.forward * speed);
}


function OnTriggerEnter(other: Collider) 
{
	if (other.tag == "Player")
	{
	
	}else {
		Destroy(Vfx);
		ParticleObj.GetComponent.<ParticleSystem>().emissionRate = 0;
	}
	
	
//	
	

}