#pragma strict

/* ====================================================
Creates a collectable object
======================================================= */

private var yPos : float = 0.33;
private var appearAfter: float = 1; //-- how many seconds pickup should show again


function Start () {
	Invoke("CreatePickup",appearAfter);
}

function Update () {

}

function CreatePickup() {
	Debug.Log("new pickup");
	
	//--select location 
	
	var pickupInstance : GameObject = Instantiate(Resources.Load("Pickup", GameObject),
		Vector3(3.6, yPos, -0.32), 
		transform.rotation);
}