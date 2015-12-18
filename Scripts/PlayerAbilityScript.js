#pragma strict

public var abilityActive : boolean = false;
public var PlayerScript : PlayerScript;
public var vfxObj : GameObject;
private var abilityCountDownInitial : int = 10;
public var abilityCountDown : int = abilityCountDownInitial;

private var normalScale : Vector3;
private var scaleFactor : float = 0.25;

private var Rb: Rigidbody;
private var normalMass : float;

function Start () {
	//GameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();
	PlayerScript = GetComponent.<PlayerScript>();
	
	Rb = GetComponent.<Rigidbody>();
	
	normalScale = transform.localScale;
	
	normalMass = Rb.mass;
	
//	Debug.Log("start scale = "+transform.localScale);
	
	InvokeRepeating("Countdown", 0, 1);
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
	
	
	//--make player bigger 
	transform.localScale += new Vector3(scaleFactor, scaleFactor, scaleFactor);
	
	//--make player stronger    
    Rb.mass = normalMass + 300;
    
    abilityCountDown = abilityCountDownInitial;

	//--make player blink for a bit
	var blinkingAmt : int = 0;
	
	while(blinkingAmt < 8) {
        yield WaitForSeconds(0.05);
//        vfxObj.GetComponent.<Renderer>().enabled = !vfxObj.GetComponent.<Renderer>().enabled;
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

//	Debug.Log("back to normal");

	//--put player back to normal mass
	Rb.mass = normalMass;
	
	//--pause player for a bit - whilst flashing
	//PlayerScript.alive = false;
	
	//--make player back to normal size 
	transform.localScale = normalScale;

	
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