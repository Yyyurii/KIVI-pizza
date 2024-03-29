const productsPizza = [
    {
        class: 'classico',
        id: 'margo',
        name: 'Margo',
        imgSrc: './img/pizza/pizza-margo.jpg',
        description: 'Соус "Пелаті", Помідори, Моцарела',
        price: 124,
        salePrice: 104
    },
    {
        class: 'classico',
        id: 'salame',
        name: 'Salame',
        imgSrc: './img/pizza/pizza-salame.jpg',
        description: 'Соус "Пелаті", Салямі, Моцарела, Оливки',
        price: 134,
        salePrice: 114
    },
    {
        class: 'classico',
        id: 'spicy',
        name: 'Spicy',
        imgSrc: './img/pizza/pizza-spicy.jpg',
        description: 'Соус "Гострий", Салямі, Ковбаски Мисливські, Моцарела, Перець Гострий',
        price: 148,
        salePrice: 124
    },
    {
        class: 'classico',
        id: '4formaggi',
        name: '4 Formaggi',
        imgSrc: './img/pizza/pizza-4formaggi.jpg',
        description: 'Соус "Бешамель", Пармезан, Моцарела, Фета, Дор Блу',
        price: 158,
        salePrice: 134
    },
    {
        class: 'classico',
        id: 'bbq',
        name: 'BBQ',
        imgSrc: './img/pizza/pizza-bbq.jpg',
        description: 'Салямі, Курка копчена, Гриби, Моцарела',
        price: 158,
        salePrice: 134
    },
    {
        class: 'classico',
        id: 'bavaria',
        name: 'Bavaria',
        imgSrc: './img/pizza/pizza-bavaria.jpg',
        description: 'Соус "BBQ", Салямі, Ковбаски Мисливські, Моцарела, Дор Блу, Рукол',
        price: 164,
        salePrice: 138
    },
    {
        class: 'classico',
        id: 'hawai',
        name: 'Hawai',
        imgSrc: './img/pizza/pizza-hawai.jpg',
        description: 'Соус "Бешамель", Курка Копчена, Кукурудза, Ананас, Моцарела',
        price: 164,
        salePrice: 138
    },
    {
        class: 'premio',
        id: '5formaggi',
        name: '5 Formaggi',
        imgSrc: './img/pizza/pizza-5formaggi.jpg',
        description: 'Соус "Бешамель", Груша, Пармезан, Гауда, Моцарела, Фета, Дор Блу',
        price: 178,
        salePrice: 148
    },
    {
        class: 'premio',
        id: 'tuna',
        name: 'Tuna',
        imgSrc: './img/pizza/pizza-tuna.jpg',
        description: 'Соус "Бешамель", Тунець, Моцарела, Цибуля Маринована',
        price: 178,
        salePrice: 148
    },
    {
        class: 'premio',
        id: 'pesto',
        name: 'Pesto',
        imgSrc: './img/pizza/pizza-pesto.jpg',
        description: 'Соус "Бешамель", Соус "Песто", Шпинат, Помідори, Кабачок, Моцарела',
        price: 184,
        salePrice: 154
    },
    {
        class: 'premio',
        id: 'carbonara',
        name: 'Carbonara',
        imgSrc: './img/pizza/pizza-carbonara.jpg',
        description: 'Соус "Бешамель", Бекон, Шпинат, Жовтки Курячі, Цибуля Маринована,Моцарела',
        price: 188,
        salePrice: 158
    },
    {
        class: 'premio',
        id: 'pancetta',
        name: 'Pancetta',
        imgSrc: './img/pizza/pizza-pancetta.jpg',
        description: 'Соус "Бешамель", Бекон, Шпинат, Кабачок, Моцарела',
        price: 188,
        salePrice: 158
    },
    {
        class: 'premio',
        id: 'pesceRosso',
        name: 'Pesce Rosso',
        imgSrc: './img/pizza/pizza-pesceRosso.jpg',
        description: 'Соус "Бешамель", Риба Червона, Філаделфія, Моцарела',
        price: 198,
        salePrice: 168
    },
    {
        class: 'premio',
        id: 'superMizza',
        name: 'Super Mizza',
        imgSrc: './img/pizza/pizza-superMizza.jpg',
        description: 'Соус "BBQ", Салямі, Курка Копчена, Бекон, Ковбаски Мисливські, Моцарела',
        price: 208,
        salePrice: 174
    },
    {
        class: 'premio',
        id: 'piccante',
        name: 'Piccante',
        imgSrc: './img/pizza/pizza-Piccante.jpg',
        description: 'Соус "BBQ", Соус "Spicy", Бекон, Балик Пряний, Моцарелла, Оливки Чорні, Цибуля Маринована, Перець Чорний',
        price: 214,
        salePrice: 178
    },
    {
        class: 'premio',
        id: 'tartufo',
        name: 'Tartufo',
        imgSrc: './img/pizza/pizza-tartufo.jpg',
        description: 'Соус "Трюфельний", Курка Копчена, Гриби, Моцарела',
        price: 224,
        salePrice: 188
    },
    {
        class: 'premio',
        id: 'negroni',
        name: 'Negroni',
        imgSrc: './img/pizza/pizza-undefined.jpg',
        description: 'Соус "Пелаті", Салямі Negroni, Бекон, В\'ялені Томати, Моцарела',
        price: 224,
        salePrice: 188
    }

    // {
    //     class: 'maestro',
    //     id: 'bolognese',
    //     name: 'Bolognese',
    //     imgSrc: './img/pizza/pizza-Bolognese.jpg',
    //     description: 'Соус "Бешамель", Котлетки з Індички, Моцарелла, Пармезан, Помідори',
    //     price: 188
    // },

    // {
    //     class: 'maestro',
    //     id: 'prosciutto',
    //     name: 'Prosciutto',
    //     imgSrc: './img/pizza/pizza-Prosciutto.jpg',
    //     description: 'Соус "Пелаті", Бекон, Прошуто, Моцарелла, Моцарелла Fior di latte, Пармезан, Рукола',
    //     price: 258
    // },

];