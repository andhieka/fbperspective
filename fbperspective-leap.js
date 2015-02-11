// This script enables Perspective to be controlled by hand movement
// using LEAP Motion sensor. If there is a LEAP Motion device plugged
// in to the client computer and if the browser window is on focus,
// LEAP Motion control will take precedence over mouse control.

var trackHandType = null;
var options = { enableGestures: true };


function leapStep(frame) {
    var i, j;
    var hand, normal, perspective;
    // getting perspective
    if (perspectiveManager == null) return;
    perspective = perspectiveManager.perspective;
    if (perspective == null) return;
    perspective.clearMovementCommands(); 

    for(i = 0; i < frame.hands.length; i++) {
        hand = frame.hands[i];
        if(hand.type == trackHandType) break;
    }
    if (hand == null) return;
    trackHandType = hand.type;

    // check hand normal
    normal = hand.palmNormal; //3-element array
    var turnLeft = normal[0];
    var pitchDown = normal[2];
    
    // manipulating perspective
    if (turnLeft > 0.4) perspective.command['LEFT'] = true;
    if (turnLeft < -0.4) perspective.command['RIGHT'] = true;
    if (pitchDown > 0.4) perspective.command['UP'] = true;
    if (pitchDown < -0.4) perspective.command['DOWN'] = true;
}

Leap.loop(options, leapStep);