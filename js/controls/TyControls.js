
THREE.TyControls = function ( object, domElement ) {
    // object -> camera
	  this.object = object;

    // set domElement
	  this.domElement = ( domElement !== undefined ) ? domElement : document;
    // tabbed things: why is this useful?
	  if ( domElement ) this.domElement.setAttribute( 'tabindex', - 1 );
    // no cursor
    domElement.style.cursor = "none";

    // internal speeds
	  this.moveSpeed = 10;
	  this.rotSpeed = 1;
    this.mouseSpeed = 0.005;

    // key state
	  this.moveState = { up: 0, down: 0, left: 0, right: 0, forward: 0, back: 0, pitchUp: 0, pitchDown: 0, yawLeft: 0, yawRight: 0, rollLeft: 0, rollRight: 0 };

    // translation/rotation vectors to be set by keys
	  this.moveVector = new THREE.Vector3( 0, 0, 0 );
	  this.rotVector = new THREE.Vector3( 0, 0, 0 );

	  this.keyDown = function ( event ) {
		    switch ( event.keyCode ) {
            case 87: /*W*/ this.moveState.forward = 1; break;
            case 83: /*S*/ this.moveState.back = 1; break;

            case 65: /*A*/ this.moveState.left = 1; break;
            case 68: /*D*/ this.moveState.right = 1; break;

            case 82: /*R*/ this.moveState.up = 1; break;
            case 70: /*F*/ this.moveState.down = 1; break;

            case 38: /*up*/ this.moveState.pitchUp = 1; break;
            case 40: /*down*/ this.moveState.pitchDown = 1; break;

            case 37: /*left*/ this.moveState.yawLeft = 1; break;
            case 39: /*right*/ this.moveState.yawRight = 1; break;

            case 81: /*Q*/ this.moveState.rollLeft = 1; break;
            case 69: /*E*/ this.moveState.rollRight = 1; break;
		    }

		    this.updateMovementVector();
		    this.updateRotationVector();

    };

	  this.keyUp = function ( event ) {
		    switch ( event.keyCode ) {
            case 87: /*W*/ this.moveState.forward = 0; break;
            case 83: /*S*/ this.moveState.back = 0; break;

            case 65: /*A*/ this.moveState.left = 0; break;
            case 68: /*D*/ this.moveState.right = 0; break;

            case 82: /*R*/ this.moveState.up = 0; break;
            case 70: /*F*/ this.moveState.down = 0; break;

            case 38: /*up*/ this.moveState.pitchUp = 0; break;
            case 40: /*down*/ this.moveState.pitchDown = 0; break;

            case 37: /*left*/ this.moveState.yawLeft = 0; break;
            case 39: /*right*/ this.moveState.yawRight = 0; break;

            case 81: /*Q*/ this.moveState.rollLeft = 0; break;
            case 69: /*E*/ this.moveState.rollRight = 0; break;
		    }

		    this.updateMovementVector();
		    this.updateRotationVector();
    };

	  this.mouseMove = function ( event ) {
		    var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		    var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		    this.object.rotateY( -movementX * this.mouseSpeed );
		    this.object.rotateX( -movementY * this.mouseSpeed );
	  };

    this.updateMovementVector = function () {
		    this.moveVector.x = ( - this.moveState.left    + this.moveState.right );
		    this.moveVector.y = ( - this.moveState.down    + this.moveState.up );
		    this.moveVector.z = ( - this.moveState.forward + this.moveState.back );
    };

    this.updateRotationVector = function () {
		    this.rotVector.x = ( - this.moveState.pitchDown + this.moveState.pitchUp );
		    this.rotVector.y = ( - this.moveState.yawRight  + this.moveState.yawLeft );
		    this.rotVector.z = ( - this.moveState.rollRight + this.moveState.rollLeft );
    };

    this.update = function ( delta ) {
		    var moveMult = delta * this.moveSpeed;
		    var rotMult = delta * this.rotSpeed;

		    this.object.translateX( this.moveVector.x * moveMult );
		    this.object.translateY( this.moveVector.y * moveMult );
		    this.object.translateZ( this.moveVector.z * moveMult );

        this.object.rotateX( this.rotVector.x * rotMult );
        this.object.rotateY( this.rotVector.y * rotMult );
        this.object.rotateZ( this.rotVector.z * rotMult * 2 );
    };

    // add camera/viewer to scene
	  this.getObject = function () {
		    return this.object;
	  };

    // bind functions to this scope so this doesn't point to the canvas later
	  function bind( scope, fn ) {
		    return function () {
			      fn.apply( scope, arguments );
		    };
	  }

	  var _mouseMove = bind( this, this.mouseMove );
	  var _keyDown = bind( this, this.keyDown );
	  var _keyUp = bind( this, this.keyUp );

    // add event listeners
	  this.domElement.addEventListener( 'mousemove', _mouseMove, false );
    this.domElement.addEventListener( 'keydown', _keyDown, false );
    this.domElement.addEventListener( 'keyup', _keyUp, false );

    // remove event listeners on disposal
	  this.dispose = function() {
		    this.domElement.removeEventListener( 'mousemove', _mouseMove, false );
        this.domElement.removeEventListener( 'keydown', _keyDown, false );
        this.domElement.removeEventListener( 'keyup', _keyUp, false );
	  };

};
