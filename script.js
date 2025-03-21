// Таблица опыта для каждого уровня
const experienceTable = {
    3: 50,
    4: 100,
    5: 150,
    6: 250,
    7: 350,
    8: 450,
    9: 550,
    10: 650,
    11: 900,
    12: 1150,
    13: 1400,
    14: 1650,
    15: 1900,
    16: 2400,
    17: 2900,
    18: 3400,
    19: 3900,
    20: 4000
};

// Функция для склонения слова в зависимости от числа
function getPluralForm(number, one, two, five) {
    // Определяем последнюю цифру числа
    const lastDigit = number % 10;

    // Проверяем, попадает ли число в диапазон от 11 до 14 (исключения)
    if (number % 100 >= 11 && number % 100 <= 14) {
        return five; // Возвращаем форму множественного числа
    }

    // Основные правила склонения
    if (lastDigit === 1) {
        return one; // Единственное число (например, "месяц")
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return two; // Множественное число для 2–4
    } else {
        return five; // Множественное число для остальных случаев
    }
}

function calculateExperience(n, m) {
    // Проверки на корректность входных данных
    if (!Number.isInteger(n) || !Number.isInteger(m)) {
        return "Ты символы вычитать мне предлагаешь или че?";
    }
    if (n <= 0 || m <= 0) {
        return "Самый умный что ли? Нахуй пошёл отсюда.";
    }
    if (n > m) {
        return "Деградируешь ты только в реальной жизни, а тут только развитие.";
    }
    if (n === m) {
        return "Ты уже на этом уровне, дурачок.";
    }


    // Расчет общего опыта
    let totalExperience = 0;
    for (let level = n + 1; level <= m; level++) {
        if (level in experienceTable) {
            totalExperience += experienceTable[level];
        } else {
		if (n === 1) {
		    return `Ты кого обмануть пытаешься, чебупель? Не может у тебя быть меньше 2 уровня.`;
		} else {
		    return `Ты правила хоть читал, абоба? ${m} уровня нет в таблице опыта.`;
		}
        }
    }

    // Рассчитываем количество квестов
    const simpleQuest = Math.ceil(totalExperience / 100); // Простой квест = 100 опыта
    const mediumQuest = Math.ceil(totalExperience / 400); // Средний квест = 400 опыта
    const largeQuest = Math.ceil(totalExperience / 1000); // Крупный квест = 1000 опыта
    const centurionQuest = Math.ceil(totalExperience / 4000); // Центурион = 4000 опыта

    // Рассчитываем время (1 месяц = 1000 опыта)
    const months = Math.ceil(totalExperience / 1000);

    // Формируем результат с учетом склонения
    const monthText = getPluralForm(months, "месяц", "месяца", "месяцев");
	const simpleText = getPluralForm(simpleQuest, "простой квест", "простых квеста", "простых квестов");
	const mediumText = getPluralForm(mediumQuest, "средний квест", "средних квеста", "средних квестов");
	const largeText = getPluralForm(largeQuest, "крупный квест", "крупных квеста", "крупных квестов");
	const centurionText = getPluralForm(centurionQuest, "Центурион", "Центуриона", "Центурионов");

    return `
Для перехода с уровня ${n} на уровень ${m} требуется ${totalExperience} опыта.<br>
Для этого тебе надо выполнить:<br>
Либо ${simpleQuest} ${simpleText}, <br>
либо ${mediumQuest} ${mediumText}, <br>
либо ${largeQuest} ${largeText}, <br>
либо пройти ${centurionQuest} ${centurionText}. <br>
Это займет примерно ${months} ${monthText}. <br>
    `;
}

// Обработчик формы
document.getElementById("experienceForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const startLevel = parseInt(document.getElementById("startLevel").value, 10);
    const targetLevel = parseInt(document.getElementById("targetLevel").value, 10);

    const result = calculateExperience(startLevel, targetLevel);
     document.getElementById("result").innerHTML = result;
});
