#pragma strict

/* ====================================================
Creates a collectable object
======================================================= */

private var yPos : float = 0.33;
private var appearAfter: float = 10; //-- how many seconds pickup should show again


function Start () {
	SchedulePickup();
}

function Update () {

}

function CreatePickup() {
	Debug.Log("new pickup");
	
	//--select location 
	
	var pickupInstance : GameObject = Instantiate(Resources.Load("Pickup", GameObject),
		Vector3(
			Random.Range(-5.9, 5.9),
			yPos, 
			Random.Range(-5.9, 5.9)
		), transform.rotation);
}

function SchedulePickup(){
	Invoke("CreatePickup",appearAfter);
}