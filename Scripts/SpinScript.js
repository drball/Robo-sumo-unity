#pragma strict
public var spinX : float;
public var spinY : float;
public var spinZ : float;

function Start () {
	GetComponent.<Rigidbody>().AddTorque(spinX,spinY,spinZ);
}

function Update () {

}