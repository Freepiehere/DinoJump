 * Introduction
A replication of the google chrome 'connection lost' jumping game
-Removed textbox-dependent jumping machanism
-Reworked javascript hierarchy for a less cluttered requestGameFrame function.
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


 * Tasks
-A speed-up affactor
-must add affector funcitons to decrease sphaghetti-ness. (want only 1-2 drawPlayer() calls)

