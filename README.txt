 * Introduction
A replication of the google chrome 'connection lost' jumping game
-Removed textbox-dependent jumping machanism
-Reworked javascript hierarchy for a less cluttered requestGameFrame function.
-Fixed Score color and disappearing beyond death bugs.
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
-Must add affector funcitons to decrease sphaghetti-ness. (want only 1-2 drawPlayer() calls)
-High Score Counter
