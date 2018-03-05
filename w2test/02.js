function Cat (name) {
  console.info(this);
  this.name = null;
  
  return {
    name: 'Tuzik' 
  }
}

var barsik = new Cat('Barsik');

console.log(barsik.name);
