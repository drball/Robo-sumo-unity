#pragma strict

public var speed = 4;
public var Vfx : GameObject;

function Start () {
	Destroy(gameObject,7);
}

function FixedUpdate () {
	transform.Translate(Vector3.forward * speed * Time.deltaTime);
}


function OnTriggerEnter(other: Collider) 
{
	if (other.tag == "Player")
	{
	
	}
	
	//Destroy(Vfx);

}