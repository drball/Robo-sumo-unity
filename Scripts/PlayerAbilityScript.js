#pragma strict

public var abilityActive : boolean = false;
public var PlayerScript : PlayerScript;
public var abilityCountDown : int = abilityCountDownInitial;

private var normalScale : Vector3;
private var scaleFactor : float = 0.25;
private var Rb: Rigidbody;
private var normalMass : float;
private var vfxObj : GameObject;
private var abilityCountDownInitial : int = 10;
private var BulletEmitter1 : GameObject;
private var BulletEmitter2 : GameObject;
private var fireFromL : boolean; //--alternates whether fire from L or R

function Start () {
	//GameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();
	PlayerScript = GetComponent.<PlayerScript>();
	
	vfxObj = PlayerScript.vfxObj;
	
	Rb = GetComponent.<Rigidbody>();
	
	normalScale = transform.localScale;
	
	normalMass = Rb.mass;
		
	InvokeRepeating("Countdown", 0, 1);
		
	if(PlayerScript.playerCharacter == "B")
	{
//		BulletEmitter = GameObject.Find("BulletEmitter");	
		BulletEmitter1 = transform.Find("BulletEmitter1").gameObject;
		BulletEmitter2 = transform.Find("BulletEmitter2").gameObject;

		Debug.Log("emitter x pos = "+BulletEmitter1.transform.position.x);
		
		InvokeRepeating("FireBullet", 0, 0.75);
	}
	
}

function Countdown(){
	if((abilityCountDown > 0) && (abilityActive == true)){
		abilityCountDown--;
//		Debug.Log("countdown: "+abilityCountDown);
		
		if(abilityCountDown <=0){
			DisableAbility();
		}
	}
}



function ActivateAbility () {

	abilityActive = true;
//	Debug.Log("ability active");
	
	//--pause player for a bit - whilst flashing
	PlayerScript.alive = false;
	
	//--each character has different abilities
	if(PlayerScript.playerCharacter == "A")
	{
		//--make player bigger 
		transform.localScale += new Vector3(scaleFactor, scaleFactor, scaleFactor);
		
		//--make player stronger    
	    Rb.mass = normalMass + 300;
	}else if(PlayerScript.playerCharacter == "B") 
	{
		InvokeRepeating("FireBullet", 0, 1);
	}
    
    abilityCountDown = abilityCountDownInitial;

	//--make player blink for a bit
	var blinkingAmt : int = 0;
	
	while(blinkingAmt < 8) {
        yield WaitForSeconds(0.05);

        if(vfxObj.activeSelf == true){
        	vfxObj.SetActive(false);
    	} else {
    		vfxObj.SetActive(true);
    	}
        
        blinkingAmt++;
    }
    
    vfxObj.SetActive(true);
    
    PlayerScript.alive = true;
 
}


function DisableAbility() {

	abilityActive = false;

	Debug.Log("back to normal");

	if(PlayerScript.playerCharacter == "A")
	{
		//--put player back to normal mass
		Rb.mass = normalMass;
			
		//--make player back to normal size 
		transform.localScale = normalScale;
		
	}else if(PlayerScript.playerCharacter == "B") 
	{
		
	}
	

	
	//--make player blink for a bit
	var blinkingAmt : int = 0;
	
	while(blinkingAmt < 8) {
        yield WaitForSeconds(0.05);
    
		if(vfxObj.activeSelf == true){
        	vfxObj.SetActive(false);
    	}else {
    		vfxObj.SetActive(true);
    	}
        
        blinkingAmt++;
    }
    
    vfxObj.SetActive(true);
}

function FireBullet() {

	fireFromL = !fireFromL;
	
	if( fireFromL == true ){
		var bullet1Instance : GameObject = Instantiate(Resources.Load("Bullet", GameObject),
			BulletEmitter1.transform.position, 
			transform.rotation
		);
	}else {
		var bullet2Instance : GameObject = Instantiate(Resources.Load("Bullet", GameObject),
			BulletEmitter2.transform.position, 
			transform.rotation
		);
	}


	

}