var gameport = document.getElementById( "gameport" );

var renderer = PIXI.autoDetectRenderer(
												{ width: 400, height: 400, backgroundColor: 0x6ac48a });

gameport.appendChild( renderer.view );

var stage = new PIXI.Container();

var field = new PIXI.Sprite( PIXI.Texture.fromImage( "field.png" ));
var baseball_bat = new PIXI.Sprite( PIXI.Texture.fromImage( "bat.png" ));
var baseball = new PIXI.Sprite( PIXI.Texture.fromImage( "ball.png" ));
var target_1 = new PIXI.Sprite( PIXI.Texture.fromImage( "glove.png" ));

var pitcher_idle_frame = PIXI.Texture.fromImage( "pitcher_idle.png" );
var pitcher_windup_frame = PIXI.Texture.fromImage( "pitcher_windup.png" );
var pitcher_throw_frame = PIXI.Texture.fromImage( "pitcher_throw.png" );

var pitcher = new PIXI.Sprite( pitcher_idle_frame );

var ball_x_position;
var ball_y_position;
var ball_speed = 0;
var ball_direction = 0.0;
var target_size = 25;
var score = 0;

stage.addChild( field );
field.anchor.x = 0.5;
field.anchor.y = 0.5;
field.position.x = 200;
field.position.y = 200;

stage.addChild( baseball_bat );
baseball_bat.anchor.x = 0.5;
baseball_bat.anchor.y = 0.9;
baseball_bat.position.x = 350;
baseball_bat.position.y = 245;
//baseball_bat.rotation = -36;

stage.addChild( pitcher );
pitcher.anchor.x = 0.5;
pitcher.anchor.y = 0.5;
pitcher.position.x = 50;
pitcher.position.y = 200;

stage.addChild( target_1 );
target_1.anchor.x = 0.5;
target_1.anchor.y = 0.5;

//createjs.RotationPlugin.install();


/*
	Stub functions
*/

function pitchAnimation()
	{



	}

function swingBatEventHandler( e )
	{

	if( e.keyCode == 32 && e.target == document.body )
		{

    // Make sure the space doesn't scroll the page
		e.preventDefault();

    // Save the current ball
    ball_x_position = baseball.position.x * 1.0;

    //ball_speed = -5;

    // Check if the ball position is inside the hitbox
    if( ball_x_position >= 300 &&
        ball_x_position <= 390 &&
        baseball.position.y == 200 )
      {

      ball_speed = 0;

      // If so, then proceed to calculate the new ball direction
      ball_direction = ( 360.0 - ball_x_position ) / 30.0;
      ball_direction = ball_direction * 300 + 50;

      createjs.Tween.get( baseball.position ).to(
                                            {x: 0, y: ball_direction }, 1000 );

      }

    // Otherwise, it is a strike
		}
	}

function pitchBallEventHandler( e )
	{

	if( e.keyCode == 66 )
		{

    // Check that the ball is live


    // Spawn the ball
    spawnBaseball();

    // Change the ball speed to move toward the bat
    ball_speed = 5;

    pitcher.texture( pitcher_throw_frame );
		}
	}

function spawnBaseball()
	{

	stage.addChild( baseball );
	baseball.anchor.x = 0.5;
	baseball.anchor.y = 0.5;
	baseball.position.x = 50;
	baseball.position.y = 200;
	}

function checkBallOutsideOfPlay()
	{

	if( baseball.position.x >= 400 ||
			baseball.position.x <= 0   ||
      baseball.position.y >= 400 ||
      baseball.position.y <= 0 )
		{

    ball_speed = 0;
    ball_direction = 0.0;
		stage.removeChild( baseball );

		return true;
		}

	return false;
	}

function randomizeTargetPosition( target )
	{

	target.position.x = 25;
	target.position.y = Math.random() * 340 + 30;
	}

function checkTargetHit( target )
  {

  if( baseball.position.x >= target.position.x - target_size &&
      baseball.position.x <= target.position.x + target_size &&
      baseball.position.y >= target.position.y - target_size &&
      baseball.position.y <= target.position.y + target_size )
    {

    //
    randomizeTargetPosition( target );
    score++;
    }
  }

function animate()
	{

	requestAnimationFrame( animate );
	renderer.render( stage );

  baseball.position.x += ball_speed;
  //baseball.position.y += ball_direction;

  checkBallOutsideOfPlay();
  checkTargetHit( target_1 );

  document.getElementById( "score" ).innerHTML = score;
	}

randomizeTargetPosition( target_1 );
document.addEventListener( 'keydown', swingBatEventHandler );
document.addEventListener( 'keydown', pitchBallEventHandler );
animate();
