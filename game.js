var bgAudio = document.createElement("audio");
var retroMusic = document.createElement("source");
retroMusic.setAttribute("src", "bg.mp3");
retroMusic.setAttribute("type", "audio/mpeg");
bgAudio.appendChild(retroMusic);
bgAudio.volume = 0.275;
bgAudio.play();
bgAudio.loop = true;

var coinCollected = document.createElement("audio");
var coinSound = document.createElement("source");
coinSound.setAttribute("src", "coin.wav");
coinSound.setAttribute("type", "audio/wav");
coinCollected.appendChild(coinSound);

var gameLost = document.createElement("audio");
var loseSound = document.createElement("source");
loseSound.setAttribute("src", "lose.wav");
loseSound.setAttribute("type", "audio/wav");
gameLost.appendChild(loseSound);

var gameWon = document.createElement("audio");
var winSound = document.createElement("source");
winSound.setAttribute("src", "win.wav");
winSound.setAttribute("type", "audio/wav");
gameWon.appendChild(winSound);

var deaths = 0;

var Level = class Level {
    constructor(plan) {
        let rows = plan.trim().split("\n").map(l => [...l]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.startActors = [];

        this.rows = rows.map((row, y) => {
            return row.map((ch, x) => {
                let type = levelChars[ch];
                if (typeof type == "string") return type;
                this.startActors.push(
                    type.create(new Vec(x, y), ch));
                return "empty";
            });
        });
    }
}

var State = class State {
    constructor(level, actors, status) {
        this.level = level;
        this.actors = actors;
        this.status = status;
    }

    static start(level) {
        return new State(level, level.startActors, "playing");
    }

    get player() {
        return this.actors.find(a => a.type == "player");
    }
}

var Vec = class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }
    times(factor) {
        return new Vec(this.x * factor, this.y * factor);
    }
}

var Player = class Player {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
    }

    get type() { return "player"; }

    static create(pos) {
        return new Player(pos.plus(new Vec(0, -0.5)),
            new Vec(0, 0));
    }
}

Player.prototype.size = new Vec(0.8, 1.5);

var lavaSpeed = 2.5;

var Lava = class Lava {
    constructor(pos, speed, reset) {
        this.pos = pos;
        this.speed = speed;
        this.reset = reset;
    }

    get type() { return "lava"; }

    static create(pos, ch) {
        if (ch == "=") {
            return new Lava(pos, new Vec(lavaSpeed, 0));
        } else if (ch == "|") {
            return new Lava(pos, new Vec(0, lavaSpeed));
        } else if (ch == "v") {
            return new Lava(pos, new Vec(0, lavaSpeed), pos);
        }
    }
}

Lava.prototype.size = new Vec(1, 1);

var monsterSpeed = lavaSpeed * 2.5;

class Powerup {
    constructor(pos, chtype) {
        this.pos = pos;
        this.chtype = chtype;
    }

    get type() { return "powerup"; }

    static create(pos, ch) {
        this.chtype = ch;
        console.log(this.chtype);
        return new Powerup(pos.plus(new Vec(0, -1)), this.chtype);
    }

    update() {
        return new Powerup(this.pos, this.chtype);
    }

    collide(state) {
        let filtered = state.actors.filter(a => a != this);
        if (this.chtype == "s") {
            Player.prototype.size = new Vec(0.4, 0.75);
        } else if (this.chtype == "l") {
            Player.prototype.size = new Vec(1.6, 3);
        } else if (this.chtype == "p") {
            lavaSpeed = 1;
        } else if (this.chtype == "g") {
            gravity = 26;
        } else if (this.chtype == "f") {
            playerXSpeed = 15;
        } else if (this.chtype == "P") {
            monsterSpeed = lavaSpeed;
        }

        return new State(state.level, filtered, state.status);
    }
}

Powerup.prototype.size = new Vec(0.75, 0.75);

class Monster {
    constructor(pos, speed, chase) {
        this.pos = pos;
        this.speed = speed;
        this.chase = chase;
    }

    get type() { return "monster"; }

    static create(pos, ch) {
        if (ch == 'm') {
            // monster that moves back and forth
            return new Monster(pos.plus(new Vec(0, -1)), new Vec(3, 0), false);
        } else { // 'M'
            // monster that chases player
            return new Monster(pos.plus(new Vec(0, -1)), new Vec(3, 0), true);
        }
    }

    update(time, state) {
        let newPos;
        if (this.chase) {
            if (state.player.pos.x < this.pos.x) {
                this.speed = new Vec(-monsterSpeed, gravity);
            } else {
                this.speed = new Vec(monsterSpeed, gravity);
            }
        }
        newPos = this.pos.plus(this.speed.times(time));
        if (!state.level.touches(newPos, this.size, "wall")) {
            return new Monster(newPos, this.speed, this.chase);
        } else {
            return new Monster(this.pos, this.speed.times(-1), this.chase);
        }
    }

    collide(state) {
        let player = state.player;
        let monster = this;
        if (monster.pos.y - player.pos.y > 1) {
            let filtered = state.actors.filter(a => a != this);
            return new State(state.level, filtered, state.status);
        } else {
            return new State(state.level, state.actors, 'lost');
        }
    }
}

Monster.prototype.size = new Vec(1.2, 2);

var Coin = class Coin {
    constructor(pos, basePos, wobble) {
        this.pos = pos;
        this.basePos = basePos;
        this.wobble = wobble;
    }

    get type() { return "coin"; }

    static create(pos) {
        let basePos = pos.plus(new Vec(0.2, 0.1));
        return new Coin(basePos, basePos,
            Math.random() * Math.PI * 2);
    }
}

Coin.prototype.size = new Vec(0.6, 0.6);

var levelChars = {
    ".": "empty",
    "#": "wall",
    "+": "lava",
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
    "=": Lava,
    "|": Lava,
    "v": Lava
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
        rect.style.left = `${actor.pos.x * scale}px`;
        rect.style.top = `${actor.pos.y * scale}px`;
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
    let center = player.pos.plus(player.size.times(0.5))
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

Level.prototype.touches = function(pos, size, type) {
    var xStart = Math.floor(pos.x);
    var xEnd = Math.ceil(pos.x + size.x);
    var yStart = Math.floor(pos.y);
    var yEnd = Math.ceil(pos.y + size.y);

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
    if (this.level.touches(player.pos, player.size, "lava")) {
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
    return actor1.pos.x + actor1.size.x > actor2.pos.x &&
        actor1.pos.x < actor2.pos.x + actor2.size.x &&
        actor1.pos.y + actor1.size.y > actor2.pos.y &&
        actor1.pos.y < actor2.pos.y + actor2.size.y;
}

Lava.prototype.collide = function(state) {
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

Lava.prototype.update = function(time, state) {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
        return new Lava(newPos, this.speed, this.reset);
    } else if (this.reset) {
        return new Lava(this.reset, this.speed, this.reset);
    } else {
        return new Lava(this.pos, this.speed.times(-1));
    }
};

function resetVariables() {
    Player.prototype.size = new Vec(0.8, 1.5);
    lavaSpeed = 2.5;
    monsterSpeed = lavaSpeed * 2.5;
    gravity = 38;
    playerXSpeed = 10;
}

var wobbleSpeed = 8,
    wobbleDist = 0.07;

Coin.prototype.update = function(time) {
    let wobble = this.wobble + time * wobbleSpeed;
    let wobblePos = Math.sin(wobble) * wobbleDist;
    return new Coin(this.basePos.plus(new Vec(0, wobblePos)),
        this.basePos, wobble);
};

var playerXSpeed = 10;
var gravity = 38;
var jumpSpeed = 20;

Player.prototype.update = function(time, state, keys) {
    let xSpeed = 0;
    if (keys.a || keys.ArrowLeft) xSpeed -= playerXSpeed;
    if (keys.d || keys.ArrowRight) xSpeed += playerXSpeed;
    let pos = this.pos;
    let movedX = pos.plus(new Vec(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, "wall")) {
        pos = movedX;
    }

    let ySpeed = this.speed.y + time * gravity;
    let movedY = pos.plus(new Vec(0, ySpeed * time));
    if (!state.level.touches(movedY, this.size, "wall")) {
        pos = movedY;
    } else if ((keys.w && ySpeed > 0) || (keys.ArrowUp && ySpeed > 0) || ((keys.Space) && ySpeed > 0)) {
        ySpeed = -jumpSpeed;
    } else {
        ySpeed = 0;
    }
    return new Player(pos, new Vec(xSpeed, ySpeed));
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
    trackKeys(["a", "d", "w", "ArrowLeft", "ArrowRight", "ArrowUp", "Space"]);

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
    let display = new Display(gameDiv, level);
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
    for (let level = 0; level < plans.length;) {
        let status = await runLevel(new Level(plans[level]),
            Display);
        if (status == "won") {
            level++;
            resetVariables();
        } else {
            deaths++;
            resetVariables();
        }
    }
    console.log("You've won!");
}