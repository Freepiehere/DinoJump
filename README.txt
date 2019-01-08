 * Introduction
A replication of the google chrome 'connection lost' jumping game
-Removed textbox-dependent jumping machanism
-Reworked javascript hierarchy for a less cluttered requestGameFrame function.
-Fixed Score color and disappearing beyond death bugs.
-Included Dinosaur (Yohsi) Icon
-Added leniency mechanic loosening restrictions on pinpint accuracy
-Added highScore display
-Added "need" for crouch mechanic
 Hierarchy:
 +mainLoop
	+reset
	+requestGameFrame
		+printScore
		+updatePlayer
			+drawPlayer
		+updateObstacles
			+throwObstacles
			+drawObstacles
		+playerDead
			+gameOver
				+drawObstacles
				+drawPlayer
		+checkKey
			+userJump
			+userCrouch


