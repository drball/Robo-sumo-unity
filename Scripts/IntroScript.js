#pragma strict
var collectionSfx : AudioSource;

function Start () {
	collectionSfx = GetComponent.<AudioSource>();
	
	Invoke("LoadNextScene", 4.5);
}


function PlayIntroSound() {
	collectionSfx.Play();
}

function LoadNextScene(){
	Application.LoadLevel ("menu");
}