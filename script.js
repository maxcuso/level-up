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

function calculateExperience(n, m) {
    if (!Number.isInteger(n) || !Number.isInteger(m)) {
        return "Ошибка: Уровни должны быть целыми числами.";
    }
    if (n <= 0 || m <= 0) {
        return "Ошибка: Уровни должны быть положительными числами.";
    }
    if (n > m) {
        return "Ошибка: Целевой уровень должен быть больше или равен текущему уровню.";
    }
    if (n === m) {
        return `Вы уже находитесь на уровне ${n}. Дополнительный опыт не требуется.`;
    }

    let totalExperience = 0;
    for (let level = n + 1; level <= m; level++) {
        if (level in experienceTable) {
            totalExperience += experienceTable[level];
        } else {
            return `Уровень ${level} отсутствует в таблице опыта.`;
        }
    }
    return totalExperience;
}

// Обработчик формы
document.getElementById("experienceForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const startLevel = parseInt(document.getElementById("startLevel").value, 10);
    const targetLevel = parseInt(document.getElementById("targetLevel").value, 10);

    const result = calculateExperience(startLevel, targetLevel);
    document.getElementById("result").textContent = result;
});