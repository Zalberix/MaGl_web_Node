var fortunes = [
    "Победи свои страхи, или они победят вас.",
    "Рекам нужны истоки.",
    "Не бойся неведомого.",
    "Тебя ждет приятный сюрприз.",
    "Будь проще везде, где только можно."
];

exports.getFortune = function(){
    var idx = Math.floor(Math.random()*fortunes.length);
    return fortunes[idx];
}