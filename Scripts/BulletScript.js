#pragma strict

public var speed = 1;
public var Vfx : GameObject;
public var ParticleObj : GameObject;
public var Owner : GameObject; //--discount this from any collisions
public var forceAmount : float = 50;
public var radius : float = 1.0;
public var ignoreLayers : LayerMask;



private var tr : Transform;
private var rb : Rigidbody;
private var coll : Collider;

function Start () {
	Destroy(gameObject,7);
	
//	rb = GetComponent.<Rigidbody>();
	tr = transform;
	coll = GetComponent.<Collider>();

 
}

function FixedUpdate () {
	tr.Translate(Vector3.forward * speed * Time.deltaTime);
	
	//rb.AddForce(transform.forward * speed);
}


function OnTriggerEnter(other: Collider) 
{
	if(other.gameObject == Owner) {

		Debug.Log("hitting self");
		
	}else {
		coll.enabled = false;
	
		if (other.GetComponent.<Rigidbody>()) {
			Debug.Log("apply force to "+other.name);
			// Apply force to the target object - calculate force
			
			if(other.tag == "Player") {
				//--apply more force when hitting player
				forceAmount = forceAmount*3;
			}
			var force : Vector3 = tr.forward * forceAmount;
			
	//		force.y = 0;
			other.GetComponent.<Rigidbody>().AddForce(force, ForceMode.Impulse);
			
			Destroy(Vfx);
			ParticleObj.GetComponent.<ParticleSystem>().emissionRate = 0;

		}
		
		//--spawn an explosion
		var explosionInstance : GameObject = Instantiate(Resources.Load("Explosion", GameObject),
			transform.position, 
			transform.rotation
		);
		
		Destroy(explosionInstance,3);

	}
//	Debug.Log("collided with "+other.name);
	



}

//function Update() {
//
//	// Check if this one hits something
//	var hits : Collider[] = Physics.OverlapSphere (tr.position, radius, ~ignoreLayers.value);
//	var collided : boolean = false;
//	for (var c : Collider in hits) {
//		// Don't collide with triggers
//		if (c.isTrigger)
//			continue;
//		
//		// Get the rigidbody if any
//		if (c.GetComponent.<Rigidbody>()) {
//			// Apply force to the target object
//			var force : Vector3 = tr.forward * forceAmount;
//			force.y = 0;
//			c.GetComponent.<Rigidbody>().AddForce (force, ForceMode.Impulse);
//		}
//		collided = true;
//		
//	}
//	if (collided) {
////		Spawner.Destroy (gameObject);
////		Spawner.Spawn (explosionPrefab, transform.position, transform.rotation);
//		Debug.Log("collided");
//	}
//}