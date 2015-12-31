#pragma strict

function Start () {

}

function Update () {

	 if(Input.GetKeyDown(KeyCode.Escape) == true)
	 {
		Application.LoadLevel ("menu");
	 }
	 
}