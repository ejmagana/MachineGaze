let capture
let tracker
let invisible
let tiptoe


function preload(){

        invisible = loadImage("invisible.jpg")
        tiptoe = loadSound("tiptoe.mp3")

}
function setup() {

    createCanvas(800, 600).parent('p5')

    // start capturing video // comes from p5
    capture = createCapture(VIDEO)
    capture.size(800, 600)
    capture.hide()

    // create the tracker//comes from the clmtrackrxs
    tracker = new clm.tracker()
    tracker.init()
    tracker.start(capture.elt)


}

function draw() {

    // draw background stuff
    background(0,0,0,20)

    image(invisible, mouseX, mouseY, 300, 200)

    // show the mirrored video feed IF YOU COMMENT OUT ITS ONLY THE DOTS (V COOL)
    //showFlippedCapture()

    // get new data from tracker // this gets  the position of the face
    let features = tracker.getCurrentPosition()
// BLOCK OUT the line
    console.log(features)

    // sometimes the tracker doesn't capture anything
    // in that case, we want to stop the function right here using 'return'
    if (features.length == 0) {
        return
    }

    // 'features' is an array of objects with x, y properties
    //YOU CAN COMMENT THIS OUT to get rid of #'s start w/ for end with curly bracket at 49
    for (let feature of features) {

      stroke(255)
       fill(255)
        circle(feature.x, feature.y, 9)
        //text(feature.label, feature.x, feature.y)
    }

        }

    // the nose is feature 62
    let nose = features[62]
    fill(0, 0, 0)
    circle(nose.x, nose.y, 30)

    // the eyes are elements 32 and 27
    fill(0, 0, 0)
    circle(features[32].x, features[32].y, 20)  // access the array directly
    circle(features[27].x, features[27].y, 20)




// this function flips the webcam and displays it
function showFlippedCapture() {
    push()
    translate(capture.width, 0)
    scale(-1, 1)
    image(capture, 0, 0, capture.width, capture.height)
    pop()
}



function mouseClicked() {

    tiptoe.play()


}
