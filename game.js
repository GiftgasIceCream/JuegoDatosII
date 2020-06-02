const socket=io.connect('http://localhost:4000');
socket.on('Bruh', data=>{
    playerNum=data
  if(playerNum==2){
      cont=true
      socket.emit('dif')
  }
})
socket.on('game', ()=>{
    cont=true
})

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 850,
    backgroundColor: 0xc0c0c0,
    physics:{
        default: "arcade",
        arcade:{
            debug:false
        }
    },
    scene: {
        preload,
        create,
        update,
    }
  }

var game = new Phaser.Game(config)

var jugar=document.getElementById("jugar");
var peppino;
var noise;
const vel=300;
var up;
var down;
var left;
var rite;
var cont=false;
var playerNum;
var pizzaNum;
var projNum;
var score1;
var score2;
var timer;
var ketchup;
var flagNoise;
var flagPeppino;
var flagPlay=false;
var escena;

function preload() {
    this.load.spritesheet('peppino', '/assets/peppino.png', {frameWidth:50, frameHeight:50});
    this.load.spritesheet('noise', '/assets/noise.png',{frameWidth:50, frameHeight:50});
    this.load.image('pizza', '/assets/pizza.png')
    this.load.image('ketchup', '/assets/ketchup.png')
    this.load.image('bg', '/assets/bg.png')
  }


  function create() {
      escena=this;
    
      this.add.image(600, 600, 'bg');
      flagNoise=this.add.image(config.width/2, 750, 'pizza');
      flagPeppino=this.add.image(config.width/2 ,100,'pizza');
      
    this.peppino = this.physics.add.sprite(config.width/2,650,"peppino");
    this.peppino.setCollideWorldBounds(true);
    this.noise = this.physics.add.sprite(config.width/2,200,"noise");
    this.noise.setCollideWorldBounds(true);

    this.anims.create({
        key:"idlepone",
        frames:this.anims.generateFrameNumbers("peppino", {start:12, end:33}),
        frameRate: 60
    })
    this.anims.create({
        key:"idleptwo",
        frames:this.anims.generateFrameNumbers("noise", {start:6, end:23}),
        frameRate: 60
    })
    this.anims.create({
        key:"pone",
        frames:this.anims.generateFrameNumbers("peppino",{start:0, end:11}),
        frameRate:60
    })
    this.anims.create({
        key:"ptwo",
        frames:this.anims.generateFrameNumbers("noise",{start:0, end:5}),
        frameRate:60
    })
    up=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    down=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    left=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    rite=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }
  
  function update() {

      if(cont){
        this.peppino.setVelocityX(0);
        this.peppino.setVelocityY(0);
        this.noise.setVelocityX(0);
        this.noise.setVelocityY(0); 

    if(playerNum==1){
        this.physics.overlap(flagPeppino, this.peppino, detectar, null, this);
        this.physics.overlap(flagNoise, this.peppino, puntear, null, this);
        this.physics.overlap(this.peppino, this.noise, detect, null, this);
        socket.on('fai1', ()=>{
            this.noise.setVelocityY(-vel)
            this.noise.anims.play("ptwo", true)
        })
        socket.on('six1', ()=>{
            this.noise.setVelocityY(vel)
            this.noise.anims.play("ptwo", true)
        })
        socket.on('svn1', ()=>{
            this.noise.setVelocityX(-vel)
            this.noise.anims.play("ptwo", true)
        })
        socket.on('ate1', ()=>{
            this.noise.setVelocityX(vel)
            this.noise.anims.play("ptwo", true)
        })
        socket.on('idlejug2t', ()=>{
            this.noise.anims.play("idleptwo", true)
        })
        if(up.isUp && down.isUp && left.isUp && rite.isUp){
            this.peppino.anims.play("idlepone", true)
            socket.emit('idlejug1')
        } 
        if(up.isDown){
            console.log(this.peppino.body.velocity)
            socket.emit('one')
            this.peppino.setVelocityY(-vel)
            this.peppino.anims.play("pone", true)
        }
        if(down.isDown){
            socket.emit('two')
            this.peppino.setVelocityY(vel)
            this.peppino.anims.play("pone", true)
        }
        if(left.isDown){
            socket.emit('tri')
            this.peppino.setVelocityX(-vel)
            this.peppino.anims.play("pone", true)
        }
        if(rite.isDown){
        socket.emit('fur')
        this.peppino.setVelocityX(vel)
        this.peppino.anims.play("pone", true)
        }
    
    } else if(playerNum==2){
        this.physics.overlap(flagNoise, this.noise, detectar, null, this);
        this.physics.overlap(flagPeppino, this.noise, puntear, null, this);
        this.physics.overlap(this.peppino, this.noise, detect, null, this);
        socket.on('one1', ()=>{
            this.peppino.setVelocityY(-vel)
            this.peppino.anims.play("pone", true)
        })
        socket.on('two1', ()=>{
            this.peppino.setVelocityY(vel)
            this.peppino.anims.play("pone", true)
        })
        socket.on('tri1', ()=>{
            this.peppino.setVelocityX(-vel)
            this.peppino.anims.play("pone", true)
        })
        socket.on('fur1', ()=>{
            this.peppino.setVelocityX(vel)
            this.peppino.anims.play("pone", true)
        })
        socket.on('idlejug1t', ()=>{
            this.vpeppino.anims.play("idlepone", true)
        })
        if(up.isUp && down.isUp && left.isUp && rite.isUp){
            this.noise.anims.play("idleptwo", true)
            socket.emit('idlejug2')
        } 
        if(up.isDown){
            socket.emit('fai')
            this.noise.setVelocityY(-vel)
            this.noise.anims.play("ptwo", true)
        }
        if(down.isDown){
            socket.emit('six')
            this.noise.setVelocityY(vel)
            this.noise.anims.play("ptwo", true)
        }
        if(left.isDown){
            socket.emit('svn')
            this.noise.setVelocityX(-vel)
            this.noise.anims.play("ptwo", true)
        }
        if(rite.isDown){
        socket.emit('ate')
        this.noise.setVelocityX(vel)
        this.noise.anims.play("ptwo", true)
        }
    }
      } else {
          alert("Esperando que se conecte un segundo jugador.")
      }

  }

  function detectar(flag, char){
    flag.serVisible(false);
    flagPlay=true;
  }

  function reactivar (flag){
      if(flag==flagNoise){
        flagPeppino.setVisible(true);
      } else {
        flagNoise.setVisible(true);
      }
  }

  function puntear(flag, char){
      if(flagPlay){
        score1+=1;
        flagPlay=false;
        reactivar(flag);
      }
  }

  function detect(char1, char2){
    if(flagPlay){
        reactivar(flag);
        flagPlay=false;
    }
  }

  


