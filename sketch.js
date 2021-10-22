class Enemy{
  constructor(x,y, image){
    this.x = x;
    this.y = y;
    this.image = image;
  }
  show(){
    imageMode(CENTER); 
    image(this.image, this.x, this.y, 20, 20);
    imageMode(CORNER); 
  }
  move(hero){
    if(hero.getX()>this.x){
      this.x++;
    }else{
      this.x--;
    }

    if(hero.getY()>this.y){
      this.y++;
    }else{
      this.y--;
    }  
  }
  validateContact(bullet){
    if(dist(this.x,this.y,bullet.getX(),bullet.getY())<10){
      return true;
    }
    return false;
  }
  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
}

class Bullet{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  show(){
    fill(255,0,0);
    ellipse(this.x,this.y,3,3);
  }
  move(){
    this.x+=4;
  }

  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
}

class Hero{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  show(){
    fill(0,0,0);
    ellipse(this.x,this.y,50,50);
  }

  move(mx, my){
    this.x = mx;
    this.y = my;
  }

  shoot(bullets){
    bullets.push(new Bullet(this.x, this.y));
  }

  selectTarget(enemys){
    let baseDist = dist(this.x,this.y,enemys[0].getX(),enemys[0].getY());
    let minDistIndex = 0;
    for (let index = 1; index < enemys.length; index++) {
      const element = enemys[index];
      let newDistance = dist(this.x,this.y,enemys[index].getX(),enemys[index].getY());
      if(newDistance <= baseDist){
        baseDist = newDistance;
        minDistIndex = index;
      }
    }
    return minDistIndex;
  }

  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
}

let army = [];
let superman = new Hero(200,200);
let bullets = [];
let alienImage;

function setup() {
  createCanvas(400, 400);
  alienImage = loadImage("/images/alien.PNG");
  for (let index = 0; index < 1; index++) {
    army.push(new Enemy(random(10,490),random(10,490), alienImage));
  }
}

function draw() {
  background(220); 
  for (let index = 0; index < army.length; index++) {
    const element = army[index];
    element.show(); 
    element.move(superman);
  }
  for (let index = 0; index < bullets.length; index++) {
    const element = bullets[index];
    element.show(); 
    element.move();
  }
  superman.show();
  let enemyToKill = superman.selectTarget(army);

  fill(255,0,0,50);
  circle(army[enemyToKill].getX(),army[enemyToKill].getY(),25);
  
  validateBulletContact();
  generateNewEnemys();
}

function generateNewEnemys() {
  if( frameCount%30 === 0 ){ // cada segundo
    army.push(new Enemy(random(10,490),random(10,490), alienImage));
  }
}
function validateBulletContact() {
  for (let bullet = 0; bullet < bullets.length; bullet++) {
    for (let enemy = 0; enemy < Enemy.length; enemy++) {
      if(army[enemy] !== undefined && army[enemy].validateContact(bullets[bullet])){
        console.log("Contact 💀!!");
        army.splice(enemy, 1);
        bullets.splice(bullet,1);
        break;
      }
    }
  }
}

function mouseMoved() {
  superman.move(mouseX, mouseY);
}

function mousePressed() {
  superman.shoot(bullets);  
}