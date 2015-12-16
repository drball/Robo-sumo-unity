#pragma strict

public var abilityActive : boolean = false;
public var PlayerScript : PlayerScript;
private var normalScaleFactor : float = 1;
private var largeScaleFactor : float = 1.15;

function Start () {
	//GameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();
	PlayerScript = GetComponent.<PlayerScript>();
	
}



function ActivateAbility () {

	abilityActive = true;
	Debug.Log("ability active");
	
	//--pause player for a bit - whilst flashing
	PlayerScript.alive = false;
	
	//--flash the player 
	
	//--make player bigger 
	
	transform.localScale = new Vector3(largeScaleFactor, largeScaleFactor, largeScaleFactor);

}