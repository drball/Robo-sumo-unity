#pragma strict
public var spinX : float = 0;
public var spinY : float = 0;
public var spinZ : float = 0;

function Start () {
	GetComponent.<Rigidbody>().AddTorque(spinX,spinY,spinZ);
}

function Update () {

}