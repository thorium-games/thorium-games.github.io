/*
some code and functions were taken from Marijn Haverbeke's Eloquent Javascript Book, 
in which there are many tutorials regarding the creation of games and good practices when
creating web games. link: https://eloquentjavascript.net/16_game.html (used under the CCO license)

specifically, this website was used given the fact that it is one of the only sources that
outlines a process on how to create web games using DOM
*/


/*
here, we create all the game levels in the form of a list
players progress through levels in the for loop logic indicated at the bottom of the page

levels are created using these strings, which are mapped in an array of arrays of
characters (further explained below)
*/

var gameLevels = [
    `###################################################################
#.................................................................#
#.................................................................#
#.................................................................#
#.................................................................#
#.................................................................#
#.................................................................#
#.................................................................#
#.............................................o...................#
#....@...................................###########..............#
#.................................................................#
#.........................o....o..................................#
#........................########.................................#
#.................................................................#
#...............o.................................................#
###################################################################`,
    `###################################################################
#.................................................................#
#.................................................................#
#....................................................o............#
#...................................................###...........#
#...................................................###..o........#
#...................................................###...........#
#...............................................o...###.....o.....#
#..............................................###..###...........#
#....................o...............o.........###..###......o....#
#...@................#.........................###..###...........#
#...................##.....................o...###..###......o....#
#..................###..............+++...###..###..###...........#
#......o..........####...........o..+++...###++###++###+++++++++++#
#########++++++++#####++++++++++####+++############################
###################################################################`,
    `###################################################################
#.................................................................#
#.................................................................#
#.................................................................#
#.................................................................#
#.................................................................#
#.................................................................#
#.................................................................#
#...###########...................................................#
#...#.........#...................................................#
#...#.........#...................................................#
#...#....M....#...................................................#
#...###########.................................#......M....o.....#
#..............................................####################
#...@.............................................................#
#.......o.....o......#...o...M...o...#................M....o......#
###################################################################
###################################################################
###################################################################
###################################################################`,
    `###################################################################
#..........................................................v......#
#.................................................................#
#.................................................................#
#.................................................................#
#.................................................................#
#.................................................................#
#.......................#..o.....M.....o..#.......................#
#............o..........###################..........o............#
#.........@.###...................................######..........#
#.......................................v......v.................o#
#........................o......................................###
#.................................................................#
#............................................................o....#
#..........................................................########
#.................................................................#
#..............o..o..................o......o.....................#
#####################..........######################.............#
#####################..........######################.............#
#####################++++++++++######################+++++++++++++#
###################################################################`,
    `###################################################################
#...........................................#.....................#
#..............................@............#............o......o.#
#..............................o............#......o.....#......#.#
#...........................................#......#.....#......#.#
#..............................o............#......#.....#.....o#.#
#.o.........................................#...o..#..o..#.....##.#
#####################.#........o............#...#..#..#..#......#.#
#.....................#.........................#..#..#..#......#.#
#..........o..........#........o................#++#++#++#++oo++#.#
#....................o#...................o.#####################.#
#....................##........o.......o.########################.#
#.....................#................##########################o#
#...................................#############################.#
#.o......+++++++......o..........################################.#
#################################################################o#
#################################################################.#
#################################################################.#
#################################################################o#
#################################################################.#
#################################################################o#
#################################################################.#
#################################################################.#
#################################################################.#
#################################################################.#
#################################################################.#
#################################################################o#
#################################################################+#`,
    `###################################################################
#......................########...................................#
#......................########...................................#
#.@....................########...........................o.......#
#......................########...................................#
#......................########...................................#
#......................########...................................#
#......................########................o..................#
########...............########..............########.............#
########...............########............o.########......o......#
########...............########...........###########.............#
########++++....o..++++########......=o......########.............#
########...............#######+.......#......########.............#
########...............#######+..............########........o....#
########...............#######+.o............########.............#
########...............############..........########.............#
########......+++......########........#.....########.............#
########...............########............o.########.............#
########...............########............##########.............#
########...............########.......=......########.........o...#
########...............########.......#......########.............#
########+++++++++..o...########.o............########.............#
########...............##########............########.............#
########...............########.......o......########.............#
########...............########.......#......########.............#
########...............########..............########........o....#
########............+++########.............o########.............#
########...................................##########.............#
########.....................................########.............#
########......o...............o.o.o..........########+++++++++++++#
###################################################################`,
    `###################################################################
#..............#...........v.....v......v.......v......v.....v....#
#..............#............................o.....................#
#..............#....................................o.............#
#..............#.........o....o.......o....................o.....o#
#..............#o.....#############################################
#..............##...v....v....v....v....v....v....v...............#
#..............#......o..............o.........o..................#
#..............#..................................................#
#..............#..................................................#
#..............#o..........o....o..=......o.......................#
#..............##########################################.........#
#..............#....................#...........................o.#
#..............#.........o..........#.........................#####
#........o.....#.........#...=.....=#.............................#
#..............#.........#..........#.............................#
#..@.....+.....#.o.=.....#...=.....=#........................o....#
#.......##.....######....#..........#.....................#########
#......###...............#.........=#.............................#
#.....####......o..o..o..#...=......=.......=....=....=.....=.....#
##########++++############...=.o....=.......=....=....=.....=.....#
###################################################################`,
    `###################################################################
#...................#............+.....+................#........+#
#...@...............#............................................+#
#...................#............o.....o........o................+#
#.o.................#..........................+#+...............+#
#...................#.........................+++++.....o.......o+#
#...................#............+.....+..o.+++++++++...#+++++++++#
#.....o.............#...o....+#####################################
#...................#..####....=......................o..........+#
#...................#.................................o..........+#
#......o.....o......#...o.....o..................=....o..........+#
#.........o.+#+.....######+++###############################+...o+#
#.......o+#++++........................o........................###
#......##++++++....o..........o....o........o...........o........+#
#......########..................................................+#
#+++++++++++++++++####+++#####++##++#+#++###+++#++#+###############
###################################################################`,
    `###################################################################
#.....o..................vvvvvvvvvvv..............................#
#.................................................................#
#.....@.............o.............................................#
#.....o.......o.....#.............................................#
#.................................................................#
#.............#.....................vvvvvvvvv.....................#
#...o.........#.....o.............................................#
#.............#.....#.............................................#
#.............#...................................................#
#.....o.......#...................................................#
#.............#..........o.o.o.o.o.o.o.o.o.o.o....................#
#......................#########################..................#
#.......o...............................................o.........#
#.......................................................#.........#
#................+................................................#
#.....o..........................................................o#
#................................................................##
#...............................................#=......=....=...=#
#....o..............vvvvvvv.....................#=......=....=...=#
#................o..vvvvvvv.o...................#=......o....=..o=#
#.....#..........#..........#.........#.........###################
#++++++++++++++++++++++++++++++++++++++++++++######################
###################################################################`,
    `#############################################################################
#vvvvvvvv.vvvvvvv#vvvvvvvvv...vvvvvvvvvvv...vvvvvvvvvvvvvvvvvvvvv...........#
#................#..........................................................#
#................#..........................................................#
#@...............#..........................................................#
#................#..........................................................#
#..o....o........#..........................................................#
#########........#..........................................................#
#.......#........#................o..o......................................#
#.......#.......o#..............o...........................................#
#.......########.#.............o..###..o....................................#
#......o#......=o#............o...###....o..................................#
#...=..##.....=.o#oooooooooooo....###.....oooooooooooooooooooooo............#
#.......#....=..o################################################..........o#
#o......#...=...o#.........................................................##
##......#..=....o#..........................................................#
#...=...#.=.....o#..........................................................#
#.......#=......o#........................................................o.#
#......o#.......o#......................................................#####
#......##........#....................o........o...........o................#
#.......#........#....................#........#..........##=...............#
#...=...#........#....................#........#.........####=..............#
#o......#........#....................#........#........######=.............#
##......#........#....................#...=o...#.....o.########=...........o#
#.............................o.#############################################
#.........................o.#################################################
#++++..o..o..o..o.......#####################################################
#############################################################################`
];

var globalLevel = 0; // along with the game levels, this variable needs to be generated at the top to minimise latency
var deaths = 0; // creating a global death variable for saving progress
/*
here, we import all the the audio used for the websites
the sources of the audio will be soon be cited

audio included background music and sfx for when colliding with
certain items
*/

var bgAudio = document.createElement("audio"); // background score
var retroMusic = document.createElement("source");
retroMusic.setAttribute("src", "assets/audio/bg.mp3");
retroMusic.setAttribute("type", "audio/mpeg");
bgAudio.appendChild(retroMusic);
bgAudio.volume = 0.275; // lowering background audio to ensure that it does not annoy the user
bgAudio.loop = true; // the backgroud audio is short and must be looped to maintain 

var coinCollected = document.createElement("audio"); // coin collection sfx
var coinSound = document.createElement("source");
coinSound.setAttribute("src", "assets/audio/coin.wav");
coinSound.setAttribute("type", "audio/wav");
coinCollected.appendChild(coinSound);

var gameLost = document.createElement("audio"); // game lost sfx
var loseSound = document.createElement("source");
loseSound.setAttribute("src", "assets/audio/lose.wav");
loseSound.setAttribute("type", "audio/wav");
gameLost.appendChild(loseSound);

var hitMonster = document.createElement("audio"); // monster hit sfx
var hitSound = document.createElement("source");
hitSound.setAttribute("src", "assets/audio/hit.wav");
hitSound.setAttribute("type", "audio/wav");
hitMonster.appendChild(hitSound);

var gameWon = document.createElement("audio"); // game won sfx
var winSound = document.createElement("source");
winSound.setAttribute("src", "assets/audio/win.wav");
winSound.setAttribute("type", "audio/wav");
gameWon.appendChild(winSound);

// the level variable which creates level information in the form of a class (so that it can be reused for all levels, and to minimise latency by using a class and not a complex function)
var Level = class Level { // levels are grid plans, which are then filled with vectors
    constructor(plan) { // class constructor, which create the level plan in the form of characters comprehensible by the js file
        let rows = plan.trim().split("\n").map(l => [...l]); // splitting the level plan, trimming white space, splitting by every new line, and mapping it into lines; essentially, this creates an array of array of characters
        this.height = rows.length; // the height is the amount of character arrays in the row array
        this.width = rows[0].length; // the width is the length of one singular row (all rows are the same length)
        this.startActors = []; // list containing all the actors (meaning players, coins, lava) that are added to the list for creation and updation

        this.rows = rows.map((row, y) => { // mapping the level plan to create the actors on the level
            return row.map((ch, x) => { // the two variables that will be used later for the creation of actors
                let type = levelChars[ch]; // type of character determined based on dictionnary, and different types of characters point to class
                if (typeof type == "string") return type; // returns the type/class if the character is a string
                this.startActors.push(
                    type.create(new Vector(x, y), ch)); // add the actor to the actor list, and create a new vector for the actor based on its class
                return "empty"; // if the actor is not in the level chars, return an empty cell for the grid in through which everything is displayed
            });
        });
    }
}

var State = class State { // variable, in the form of a class, containing all information pertaining to the current status of the game
    constructor(level, actors, status) { // constructs the variable in a class constructor
        this.level = level; // set level for status
        this.actors = actors; // select actors for current level and update status accordingly
        this.status = status; // status determines the actual status of the game; playing, won, lost and gameover statuses are available
    }

    static start(level) { // static method for the class, used for creating objects throughout the file
        return new State(level, level.startActors, "playing"); // when the game begins, these values are used for the level
    }

    get player() { // get method for the class, used to retrieve information pertaining to the player
        return this.actors.find(a => a.type == "player"); // find the player amongst all the actors using the "a => a" method
    }
}

var Vector = class Vector { // the variable/class through which all actors are created in the form of vector based scalable graphics
    constructor(x, y) { // information containing the size of the actor
        this.x = x; // the x value of the vector actor
        this.y = y; // the y value of the vector actor
    }
    plus(other) { // plus function used to move vector object positions
        return new Vector(this.x + other.x, this.y + other.y);
    }
    times(factor) { // times function used to scale the graphics with a predetermined factor
        return new Vector(this.x * factor, this.y * factor);
    }
}

var Player = class Player { // player variable defined by the player class
    constructor(position, speed) { // the player constructor create the position and the speed of the player both values that are constantly updated and available at low latency in the form of classes
        this.position = position; // the current position of the player, in the form of a player
        this.speed = speed; // the current speed of the player, both vertical and horizonta;
    }

    get type() { return "player"; } // used in the creation of the level plan

    static create(position) {
        return new Player(position.plus(new Vector(0, -0.5)),
            new Vector(0, 0)); // the new vector for the player is created every time there is a new frame, and it is created based on the position and speed of the previous vector
    }
}

Player.prototype.size = new Vector(0.8, 1.5); // the size is defined as a prototype outside the class for a more efficient method to create and access this value

var RedBlockSpeed = 2.5; // the speed of the red blocks, stored as changeable variables (needs to be changes in the case of powerup usage)

var RedBlock = class RedBlock { // variables that is used to create lava actors, again the form of classes to minimize code redundancy
    constructor(position, speed, reset) { // constructor contains all variables pertinent to creation of redblocks, although not all are used by all the types of redblocks
        this.position = position; // position, standard for all actors
        this.speed = speed; // speed, for moving blocks
        this.reset = reset; // reset, for dripping blocks
    }

    get type() { return "RedBlock"; } // used for the level plan creation, when creating actors

    static create(position, ch) { // static method to create the lava blocks
        if (ch == "=") { // different blocks are created based on the characters defined in the levels
            return new RedBlock(position, new Vector(RedBlockSpeed, 0)); // moving redblock (vertical)
        } else if (ch == "|") {
            return new RedBlock(position, new Vector(0, RedBlockSpeed)); // moving redblock (horizontal)
        } else if (ch == "v") {
            return new RedBlock(position, new Vector(0, RedBlockSpeed), position); // dripping redblock (position is reset at the end of the speed movements)
        }
    }
}

RedBlock.prototype.size = new Vector(1, 1); // size is defined outside of the variable for the same reason as that of the player

var monsterSpeed = RedBlockSpeed * 2.5; // the speed of the monsters is faster than the redblocs, given that the monsters should be harder to defeat

class Powerup { // powerups defined as separate classes (there are 5 different types of powerups)
    constructor(position, chtype) { // constructor calls for and defines all values needed to create the powerups
        this.position = position;
        this.chtype = chtype;
    }

    get type() { return "powerup"; } // used for the level plan creation

    static create(position, ch) { // static method for intial creation of powerups
        this.chtype = ch; // getting the character type
        return new Powerup(position.plus(new Vector(0, -1)), this.chtype); // create the powerup based on the type of character
    }

    update() { // powerup is updated on the case of collision
        return new Powerup(this.position, this.chtype); // the new powerup, generated based on the update
    }

    collide(state) { // the collision detector, which determines what to do on the case of collision
        let filtered = state.actors.filter(a => a != this); // removes the actor from the screen/display
        if (this.chtype == "s") {
            Player.prototype.size = new Vector(0.4, 0.75); // if the ch is s, then creates a new, smaller player
        } else if (this.chtype == "l") {
            Player.prototype.size = new Vector(1.6, 3); // if the ch is l, then creates a new, larger player
        } else if (this.chtype == "p") {
            RedBlockSpeed = 1;
        } else if (this.chtype == "g") {
            playerGravity = 20;
        } else if (this.chtype == "f") {
            playerXSpeed = 15;
        } else if (this.chtype == "P") {
            monsterSpeed = RedBlockSpeed;
        }

        return new State(state.level, filtered, state.status);
    }
}

Powerup.prototype.size = new Vector(0.75, 0.75);

class Monster {
    constructor(position, speed, chase) {
        this.position = position;
        this.speed = speed;
        this.chase = chase;
    }

    get type() { return "monster"; }

    static create(position, ch) {
        if (ch == 'm') {
            // monster that moves back and forth
            return new Monster(position.plus(new Vector(0, -1)), new Vector(3, 0), false);
        } else { // 'M'
            // monster that chases player
            return new Monster(position.plus(new Vector(0, -1)), new Vector(3, 0), true);
        }
    }

    update(time, state) {
        let newposition;
        if (this.chase) {
            if (state.player.position.x < this.position.x) {
                this.speed = new Vector(-monsterSpeed, 0);
            } else {
                this.speed = new Vector(monsterSpeed, 0);
            }
        }
        newposition = this.position.plus(this.speed.times(time));
        if (!state.level.touches(newposition, this.size, "wall")) {
            return new Monster(newposition, this.speed, this.chase);
        } else {
            return new Monster(this.position, this.speed.times(-1), this.chase);
        }
    }

    collide(state) {
        let player = state.player;
        let monster = this;
        if (monster.position.y - player.position.y > 1) {
            let filtered = state.actors.filter(a => a != this);
            hitMonster.play();
            return new State(state.level, filtered, state.status);
        } else {
            return new State(state.level, state.actors, 'lost');
        }
    }
}

Monster.prototype.size = new Vector(1.2, 2);

var Coin = class Coin {
    constructor(position, baseposition, wobble) {
        this.position = position;
        this.baseposition = baseposition;
        this.wobble = wobble;
    }

    get type() { return "coin"; }

    static create(position) {
        let baseposition = position.plus(new Vector(0.2, 0.1));
        return new Coin(baseposition, baseposition,
            Math.random() * Math.PI * 2);
    }
}

Coin.prototype.size = new Vector(0.6, 0.6);

var levelChars = {
    ".": "empty",
    "#": "wall",
    "+": "RedBlock",
    "M": Monster,
    "m": Monster,
    "s": Powerup,
    "l": Powerup,
    "p": Powerup,
    "g": Powerup,
    "f": Powerup,
    "P": Powerup,
    "@": Player,
    "o": Coin,
    "P": Powerup,
    "=": RedBlock,
    "|": RedBlock,
    "v": RedBlock
};

function elt(name, attrs, ...children) {
    let dom = document.createElement(name);
    for (let attr of Object.keys(attrs)) {
        dom.setAttribute(attr, attrs[attr]);
    }
    for (let child of children) {
        dom.appendChild(child);
    }
    return dom;
}

var DOMDisplay = class DOMDisplay {
    constructor(parent, level) {
        this.dom = elt("div", { class: "game" }, drawGrid(level));
        this.actorLayer = null;
        parent.appendChild(this.dom);
    }

    clear() { this.dom.remove(); }
}

var scale = 25;

function drawGrid(level) {
    return elt("table", {
        class: "background",
        style: `width: ${level.width * scale}px`
    }, ...level.rows.map(row =>
        elt("tr", { style: `height: ${scale}px` },
            ...row.map(type => elt("td", { class: type })))
    ));
}

function drawActors(actors) {
    return elt("div", {}, ...actors.map(actor => {
        let rect = elt("div", { class: `actor ${actor.type}` });
        rect.style.width = `${actor.size.x * scale}px`;
        rect.style.height = `${actor.size.y * scale}px`;
        rect.style.left = `${actor.position.x * scale}px`;
        rect.style.top = `${actor.position.y * scale}px`;
        return rect;
    }));
}

DOMDisplay.prototype.syncState = function(state) {
    if (this.actorLayer) this.actorLayer.remove();
    this.actorLayer = drawActors(state.actors);
    this.dom.appendChild(this.actorLayer);
    this.dom.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
};

DOMDisplay.prototype.scrollPlayerIntoView = function(state) {
    let width = this.dom.clientWidth;
    let height = this.dom.clientHeight;
    let margin = width / 3;

    // The viewport
    let left = this.dom.scrollLeft,
        right = left + width;
    let top = this.dom.scrollTop,
        bottom = top + height;

    let player = state.player;
    let center = player.position.plus(player.size.times(0.5))
        .times(scale);

    if (center.x < left + margin) {
        this.dom.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
        this.dom.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin) {
        this.dom.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
        this.dom.scrollTop = center.y + margin - height;
    }
};

Level.prototype.touches = function(position, size, type) {
    var xStart = Math.floor(position.x);
    var xEnd = Math.ceil(position.x + size.x);
    var yStart = Math.floor(position.y);
    var yEnd = Math.ceil(position.y + size.y);

    for (var y = yStart; y < yEnd; y++) {
        for (var x = xStart; x < xEnd; x++) {
            let isOutside = x < 0 || x >= this.width ||
                y < 0 || y >= this.height;
            let here = isOutside ? "wall" : this.rows[y][x];
            if (here == type) return true;
        }
    }
    return false;
};

State.prototype.update = function(time, keys) {
    let actors = this.actors
        .map(actor => actor.update(time, this, keys));
    let newState = new State(this.level, actors, this.status);

    if (newState.status != "playing") return newState;

    let player = newState.player;
    if (this.level.touches(player.position, player.size, "RedBlock")) {
        return new State(this.level, actors, "lost");
    }

    for (let actor of actors) {
        if (actor != player && overlap(actor, player)) {
            newState = actor.collide(newState);
        }
    }
    return newState;
};

function overlap(actor1, actor2) {
    return actor1.position.x + actor1.size.x > actor2.position.x &&
        actor1.position.x < actor2.position.x + actor2.size.x &&
        actor1.position.y + actor1.size.y > actor2.position.y &&
        actor1.position.y < actor2.position.y + actor2.size.y;
}

RedBlock.prototype.collide = function(state) {
    return new State(state.level, state.actors, "lost");
};

Coin.prototype.collide = function(state) {
    let filtered = state.actors.filter(a => a != this);
    coinCollected.play()
    let status = state.status;
    if (!filtered.some(a => a.type == "coin")) {
        gameWon.play();
        status = "won";
    }
    return new State(state.level, filtered, status);
};

RedBlock.prototype.update = function(time, state) {
    let newposition = this.position.plus(this.speed.times(time));
    if (!state.level.touches(newposition, this.size, "wall")) {
        return new RedBlock(newposition, this.speed, this.reset);
    } else if (this.reset) {
        return new RedBlock(this.reset, this.speed, this.reset);
    } else {
        return new RedBlock(this.position, this.speed.times(-1));
    }
};

function resetVariables() {
    Player.prototype.size = new Vector(0.8, 1.5);
    RedBlockSpeed = 2.5;
    monsterSpeed = RedBlockSpeed * 2.5;
    playerGravity = 38;
    playerXSpeed = 10;
}

var wobbleSpeed = 8,
    wobbleDist = 0.07;

Coin.prototype.update = function(time) {
    let wobble = this.wobble + time * wobbleSpeed;
    let wobbleposition = Math.sin(wobble) * wobbleDist;
    return new Coin(this.baseposition.plus(new Vector(0, wobbleposition)),
        this.baseposition, wobble);
};

var playerXSpeed = 10;
var playerGravity = 38;
var jumpSpeed = 20;

Player.prototype.update = function(time, state, keys) {
    let xSpeed = 0;
    if (keys.a || keys.ArrowLeft) xSpeed -= playerXSpeed;
    if (keys.d || keys.ArrowRight) xSpeed += playerXSpeed;
    let position = this.position;
    let movedX = position.plus(new Vector(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, "wall")) {
        position = movedX;
    }

    let ySpeed = this.speed.y + time * playerGravity;
    let movedY = position.plus(new Vector(0, ySpeed * time));
    if (!state.level.touches(movedY, this.size, "wall")) {
        position = movedY;
    } else if ((keys.w && ySpeed > 0) || (keys.ArrowUp && ySpeed > 0) || ((keys.Space) && ySpeed > 0)) {
        ySpeed = -jumpSpeed;
    } else {
        ySpeed = 0;
    }
    return new Player(position, new Vector(xSpeed, ySpeed));
};

function trackKeys(keys) {
    let down = Object.create(null);

    function track(event) {
        if (keys.includes(event.key)) {
            down[event.key] = event.type == "keydown";
            event.preventDefault();
        } else if (keys.includes(event.code)) {
            down[event.code] = event.type == "keydown";
            event.preventDefault();
        }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    return down;
}

var arrowKeys =
    trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

function runAnimation(frameFunc) {
    let lastTime = null;

    function frame(time) {
        if (lastTime != null) {
            let timeStep = Math.min(time - lastTime, 500) / 1000;
            if (frameFunc(timeStep) === false) return;
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

function runLevel(level, Display) {
    let display = new Display(document.getElementById("actual-game-div"), level);
    let state = State.start(level);
    let ending = 1;
    return new Promise(resolve => {
        runAnimation(time => {
            state = state.update(time, arrowKeys);
            if (state.status == "lost") {
                gameLost.play();
            }
            display.syncState(state);
            if (state.status == "playing") {
                return true;
            } else if (ending > 0) {
                ending -= time;
                return true;
            } else {
                display.clear();
                resolve(state.status);
                return false;
            }
        });
    });
}

async function runGame(plans, Display) {
    for (let level = globalLevel; level < plans.length;) {
        let status = await runLevel(new Level(plans[level]),
            Display);
        if (status == "won") {
            globalLevel++;
            resetVariables();
        } else {
            deaths++;
            resetVariables();
        }
        saveProgress();
        updateLeaderboard();
        document.getElementById("stats").innerHTML = `deaths: ${deaths}, level: ${globalLevel}, ratio: ${(Math.round((globalLevel / (deaths)) * 100)) / 100} (current session)`
        level = globalLevel;

    }
    document.getElementById("stats").innerHTML = "you won the game!";
}

document.onkeydown = function(e) {
    if (event.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}