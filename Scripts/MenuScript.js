#pragma strict

function StartGame() {
	Application.LoadLevel ("main");
}

function FacebookBtnPressed() {
	Application.OpenURL("https://www.facebook.com/drball");

	
}

function TwitterBtnPressed() {
	Application.OpenURL("https://www.twitter.com/davidonionball");
	
}

function Update()
{
	if(Input.GetKeyDown(KeyCode.Escape) == true)
	{
		Application.Quit();
	}
}