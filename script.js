adjs = ['adamant','adroit','baleful','boorish','didactic','puckish','tenacious','turgid','obtuse','mordant','petulant','irksome','insidious','jocular','kind','friendly','funny','shameful','happy','thin','green','yellow','blue','black','white','fat','thin','golden','sharp','dull','homely','defamatory','vast','rectangular','complex','parallel','different','unique','interesting','bookish','fluent','odd','silly','shameful','elegant','irridescent','sad','melodious','terrified','stingy','cleanly','clean','shocking','grizzled','loud','quiet','lazy'];

animals = ['rabbit','fossa','dumbo','dog','cow','cat','sheep','ram','lion','tiger','snake','firefly','ant','catepillar','shark','turtle','dragon','stegasaurus','kangaroo','deer','doe','frog','dikdik','wolf','coyote','eagle','vole','elephant','osprey','python','mosquito','stingray','jellyfish','sturgeon','butterfly','stingray','leech','worm','lightningbug','bunny','lioness','hyena','vulture','mastiff','weimerimer','retriever','mole','groundhog','mollusk','ladybug','sharpei','parrot'];


var adj = adjs[(Math.floor(Math.random()*animals.length-1))];
var animal = animals[(Math.floor(Math.random()*animals.length-1))];

var combo = (adj.charAt(0).toUpperCase() + adj.slice(1) + animal.charAt(0).toUpperCase() + animal.slice(1));

document.getElementById("p1").innerHTML = "Anonymously Assigned Username: " + combo;