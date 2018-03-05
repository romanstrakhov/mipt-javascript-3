

function Animal(name) {
    this.name = name;
}

function Cat(name) {
    Animal(name);
}

// Добавляет возможность мурлыкать
Cat.prototype.purr = function() { console.log ('Purrr!'); }; 

var murzik = new Cat('Murzik');



console.log(murzik.name);
murzik.purr();
