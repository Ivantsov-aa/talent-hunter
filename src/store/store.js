const store = {
    users: [
        {
            id: 1,
            favorite: false,
            gender: 'Женский',
            name: 'Анна С.',
            img: '/images/main/top-user-1.png',
            talent: 'Фотограф',
            content: [
                {
                    selected: true,
                    value: 'instagram',
                    path: '',
                    logo: '/images/main/logo/instagram-logo.svg'
                },
                {
                    selected: true,
                    value: 'youtube',
                    path: '',
                    logo: '/images/main/logo/youtube-logo.svg'
                },
                {
                    selected: false,
                    value: 'twitter',
                    path: '',
                    logo: '/images/main/logo/twitter-logo.svg'
                },
                {
                    selected: false,
                    value: 'tiktok',
                    path: '',
                    logo: '/images/main/logo/tiktok-logo.svg'
                }
            ],
            body_type: "Стройное",
            bust: "122",
            character_traits: ["Жизнерадостный", "Спокойный", "Решительный", "Отзывчивый"],
            chest: "122",
            citizenship: "Республика Беларусь",
            city: "г. Минск",
            clothing_size: "XL (52)",
            cosmetic_features: "Нет",
            cosmetic_surgery: "Нет",
            date: "1996-07-14",
            email: "pr.minsk.ivantsov@gmail.com",
            extra_skills: "Не прыгаю через скакалку",
            eye_color: "Серый",
            eye_shape: "Классический",
            first_name: "Анна",
            hair_color: "Брюнет",
            hair_length: "короче 10 см",
            haircut: "«Под ноль»",
            head_type: "medium",
            hips: "96",
            hobbies: ["Танцы", "Спорт", "Вокал"],
            international_passport: "1",
            is_logged: true,
            language: "Английский",
            last_name: "Синицина",
            level_language: "Продвинутый",
            lip_shape: "Тонкие",
            nose_shape: "«Курносый нос»",
            official_journey: "1",
            password: "Alex1111",
            patronymic: "Дмитриевна",
            personal_achievements: "Хороший разработчик ;)",
            personal_quality: ["Коммуникабельность", "Дружелюбность", "Ответственность"],
            personal_type: ["Представительный"],
            phone_number: "+375293775846",
            portfolio_music: [],
            portfolio_photo: [],
            portfolio_video: [],
            race: "Евразийская",
            sexual_orientation: "heterosexuality",
            shoe_size: "42",
            skin_color: "Смуглая",
            social_network: "",
            stature: "175",
            tattoo: "Нет",
            user_id: "2",
            user_photo: '',
            waist: "83"
        },
        {
            id: 2,
            favorite: false,
            name: 'Джони',
            img: '/images/main/top-user-2.png',
            talent: 'Фотомодель',
            content: [
                {
                    selected: false,
                    value: 'instagram',
                    path: '',
                    logo: '/images/main/logo/instagram-logo.svg'

                },
                {
                    selected: true,
                    value: 'youtube',
                    path: '',
                    logo: '/images/main/logo/youtube-logo.svg'
                },
                {
                    selected: false,
                    value: 'twitter',
                    path: '',
                    logo: '/images/main/logo/twitter-logo.svg'
                },
                {
                    selected: false,
                    value: 'tiktok',
                    path: '',
                    logo: '/images/main/logo/tiktok-logo.svg'
                }
            ],
            body_type: "Полное",
            bust: "122",
            character_traits: ["Жизнерадостный", "Спокойный", "Решительный", "Отзывчивый"],
            chest: "122",
            citizenship: "Республика Беларусь",
            city: "г. Минск",
            clothing_size: "XL (52)",
            cosmetic_features: "Нет",
            cosmetic_surgery: "Нет",
            date: "1996-07-14",
            email: "pr.minsk.ivantsov@gmail.com",
            extra_skills: "Не прыгаю через скакалку",
            eye_color: "Серый",
            eye_shape: "Классический",
            first_name: "Джони",
            gender: "Мужской",
            hair_color: "Брюнет",
            hair_length: "короче 10 см",
            haircut: "«Под ноль»",
            head_type: "medium",
            hips: "96",
            hobbies: ["Танцы", "Спорт", "Вокал"],
            international_passport: "1",
            is_logged: true,
            language: "Английский",
            last_name: "Джониев",
            level_language: "Продвинутый",
            lip_shape: "Тонкие",
            nose_shape: "«Курносый нос»",
            official_journey: "1",
            password: "Alex1111",
            patronymic: "Джониевич",
            personal_achievements: "Хороший разработчик ;)",
            personal_quality: ["Коммуникабельность", "Дружелюбность", "Ответственность"],
            personal_type: ["Представительный"],
            phone_number: "+375293775846",
            portfolio_music: [],
            portfolio_photo: [],
            portfolio_video: [],
            race: "Евразийская",
            sexual_orientation: "heterosexuality",
            shoe_size: "42",
            skin_color: "Смуглая",
            social_network: "",
            stature: "175",
            tattoo: "Нет",
            user_id: "2",
            user_photo: '',
            waist: "83"
        },
        {
            id: 3,
            favorite: true,
            gender: 'Женский',
            name: 'Лиза Кэт',
            img: '/images/main/top-user-3.png',
            talent: 'Певица',
            content: [
                {
                    selected: true,
                    value: 'instagram',
                    path: '',
                    logo: '/images/main/logo/instagram-logo.svg'

                },
                {
                    selected: true,
                    value: 'youtube',
                    path: '',
                    logo: '/images/main/logo/youtube-logo.svg'
                },
                {
                    selected: true,
                    value: 'twitter',
                    path: '',
                    logo: '/images/main/logo/twitter-logo.svg'
                },
                {
                    selected: false,
                    value: 'tiktok',
                    path: '',
                    logo: '/images/main/logo/tiktok-logo.svg'
                }
            ]
        },
        {
            id: 4,
            favorite: false,
            gender: 'Мужской',
            name: 'Роман',
            img: '/images/main/top-user-4.png',
            talent: 'Диджей',
            content: [
                {
                    selected: true,
                    value: 'instagram',
                    path: '',
                    logo: '/images/main/logo/instagram-logo.svg'

                },
                {
                    selected: true,
                    value: 'youtube',
                    path: '',
                    logo: '/images/main/logo/youtube-logo.svg'
                },
                {
                    selected: false,
                    value: 'twitter',
                    path: '',
                    logo: '/images/main/logo/twitter-logo.svg'
                },
                {
                    selected: false,
                    value: 'tiktok',
                    path: '',
                    logo: '/images/main/logo/tiktok-logo.svg'
                }
            ]
        },
        {
            id: 5,
            favorite: false,
            gender: 'Женский',
            name: 'Джесика',
            img: '/images/main/top-user-5.png',
            talent: 'Модель +',
            content: [
                {
                    selected: true,
                    value: 'instagram',
                    path: '',
                    logo: '/images/main/logo/instagram-logo.svg'

                },
                {
                    selected: true,
                    value: 'youtube',
                    path: '',
                    logo: '/images/main/logo/youtube-logo.svg'
                },
                {
                    selected: false,
                    value: 'twitter',
                    path: '',
                    logo: '/images/main/logo/twitter-logo.svg'
                },
                {
                    selected: false,
                    value: 'tiktok',
                    path: '',
                    logo: '/images/main/logo/tiktok-logo.svg'
                }
            ]
        },
        {
            id: 6,
            favorite: false,
            gender: 'Женский',
            name: 'Джиао',
            img: '/images/users/jiao.png',
            talent: 'Модель',
            content: [
                {
                    selected: true,
                    value: 'instagram',
                    path: '',
                    logo: '/images/main/logo/instagram-logo.svg'

                },
                {
                    selected: true,
                    value: 'youtube',
                    path: '',
                    logo: '/images/main/logo/youtube-logo.svg'
                },
                {
                    selected: false,
                    value: 'twitter',
                    path: '',
                    logo: '/images/main/logo/twitter-logo.svg'
                },
                {
                    selected: false,
                    value: 'tiktok',
                    path: '',
                    logo: '/images/main/logo/tiktok-logo.svg'
                }
            ],
            stories: [
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4',
                    duration: 28000,
                },
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4',
                    duration: 10000,
                },
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-family-walking-together-in-nature-39767-large.mp4',
                    duration: 10000,
                }
            ],
            gallery: [
                '/images/users/photos/jiao-photo.png'
            ]
        },
        {
            id: 7,
            favorite: false,
            gender: 'Женский',
            name: 'Мэри',
            img: '/images/users/mary.png',
            talent: 'Певица',
            content: [
                {
                    selected: true,
                    value: 'instagram',
                    path: '',
                    logo: '/images/main/logo/instagram-logo.svg'

                },
                {
                    selected: true,
                    value: 'youtube',
                    path: '',
                    logo: '/images/main/logo/youtube-logo.svg'
                },
                {
                    selected: false,
                    value: 'twitter',
                    path: '',
                    logo: '/images/main/logo/twitter-logo.svg'
                },
                {
                    selected: false,
                    value: 'tiktok',
                    path: '',
                    logo: '/images/main/logo/tiktok-logo.svg'
                }
            ],
            stories: [
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4',
                    duration: 28000,
                },
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4',
                    duration: 10000,
                },
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-family-walking-together-in-nature-39767-large.mp4',
                    duration: 10000,
                }
            ],
            gallery: [
                '/images/users/photos/mary-photo.png'
            ]
        },
        {
            id: 8,
            favorite: false,
            gender: 'Мужской',
            name: 'Александр',
            img: '/images/users/alex.jpg',
            talent: 'Певец',
            content: [
                {
                    selected: true,
                    value: 'instagram',
                    path: '',
                    logo: '/images/main/logo/instagram-logo.svg'

                },
                {
                    selected: true,
                    value: 'youtube',
                    path: '',
                    logo: '/images/main/logo/youtube-logo.svg'
                },
                {
                    selected: false,
                    value: 'twitter',
                    path: '',
                    logo: '/images/main/logo/twitter-logo.svg'
                },
                {
                    selected: false,
                    value: 'tiktok',
                    path: '',
                    logo: '/images/main/logo/tiktok-logo.svg'
                }
            ],
            stories: [
                {
                    type: 'video',
                    url: '/video/alex.mp4',
                    duration: 28000,
                },
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4',
                    duration: 10000,
                },
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-family-walking-together-in-nature-39767-large.mp4',
                    duration: 10000,
                }
            ]
        },
        {
            id: 9,
            favorite: false,
            gender: 'Мужской',
            name: 'Пауль',
            img: '/images/users/paul.png',
            talent: 'Художник',
            content: [
                {
                    selected: true,
                    value: 'instagram',
                    path: '',
                    logo: '/images/main/logo/instagram-logo.svg'

                },
                {
                    selected: true,
                    value: 'youtube',
                    path: '',
                    logo: '/images/main/logo/youtube-logo.svg'
                },
                {
                    selected: false,
                    value: 'twitter',
                    path: '',
                    logo: '/images/main/logo/twitter-logo.svg'
                },
                {
                    selected: false,
                    value: 'tiktok',
                    path: '',
                    logo: '/images/main/logo/tiktok-logo.svg'
                }
            ],
            stories: [
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4',
                    duration: 28000,
                },
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4',
                    duration: 10000,
                },
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-family-walking-together-in-nature-39767-large.mp4',
                    duration: 10000,
                }
            ],
            gallery: [
                '/images/users/photos/paul-photo.png'
            ]
        },
        {
            id: 10,
            favorite: false,
            gender: 'Мужской',
            name: 'Джим',
            img: '/images/users/jim.png',
            talent: 'Фотограф',
            content: [
                {
                    selected: true,
                    value: 'instagram',
                    path: '',
                    logo: '/images/main/logo/instagram-logo.svg'

                },
                {
                    selected: true,
                    value: 'youtube',
                    path: '',
                    logo: '/images/main/logo/youtube-logo.svg'
                },
                {
                    selected: false,
                    value: 'twitter',
                    path: '',
                    logo: '/images/main/logo/twitter-logo.svg'
                },
                {
                    selected: false,
                    value: 'tiktok',
                    path: '',
                    logo: '/images/main/logo/tiktok-logo.svg'
                }
            ],
            stories: [
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4',
                    duration: 28000,
                },
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4',
                    duration: 10000,
                },
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-family-walking-together-in-nature-39767-large.mp4',
                    duration: 10000,
                }
            ],
            gallery: [
                '/images/users/photos/jim-photo.png'
            ]
        },
        {
            id: 11,
            favorite: false,
            gender: 'Мужской',
            name: 'Маркус',
            img: '/images/users/marcus.png',
            talent: 'Актёр',
            content: [
                {
                    selected: true,
                    value: 'instagram',
                    path: '',
                    logo: '/images/main/logo/instagram-logo.svg'

                },
                {
                    selected: true,
                    value: 'youtube',
                    path: '',
                    logo: '/images/main/logo/youtube-logo.svg'
                },
                {
                    selected: false,
                    value: 'twitter',
                    path: '',
                    logo: '/images/main/logo/twitter-logo.svg'
                },
                {
                    selected: false,
                    value: 'tiktok',
                    path: '',
                    logo: '/images/main/logo/tiktok-logo.svg'
                }
            ],
            stories: [
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4',
                    duration: 28000,
                },
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4',
                    duration: 10000,
                },
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-family-walking-together-in-nature-39767-large.mp4',
                    duration: 10000,
                }
            ],
            gallery: [
                '/images/users/photos/marcus-photo.png'
            ]
        },
        {
            id: 12,
            favorite: false,
            gender: 'Женский',
            name: 'Стефани',
            img: '/images/users/stefani.png',
            talent: 'Ведущая',
            content: [
                {
                    selected: true,
                    value: 'instagram',
                    path: '',
                    logo: '/images/main/logo/instagram-logo.svg'

                },
                {
                    selected: true,
                    value: 'youtube',
                    path: '',
                    logo: '/images/main/logo/youtube-logo.svg'
                },
                {
                    selected: false,
                    value: 'twitter',
                    path: '',
                    logo: '/images/main/logo/twitter-logo.svg'
                },
                {
                    selected: false,
                    value: 'tiktok',
                    path: '',
                    logo: '/images/main/logo/tiktok-logo.svg'
                }
            ],
            stories: [
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4',
                    duration: 28000,
                },
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4',
                    duration: 10000,
                },
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-family-walking-together-in-nature-39767-large.mp4',
                    duration: 10000,
                }
            ],
            gallery: [
                '/images/users/photos/stefani-photo.png'
            ]
        },
        {
            id: 13,
            favorite: false,
            gender: 'Женский',
            name: 'Суи',
            img: '/images/users/sui.png',
            talent: 'Модель',
            content: [
                {
                    selected: true,
                    value: 'instagram',
                    path: '',
                    logo: '/images/main/logo/instagram-logo.svg'

                },
                {
                    selected: true,
                    value: 'youtube',
                    path: '',
                    logo: '/images/main/logo/youtube-logo.svg'
                },
                {
                    selected: false,
                    value: 'twitter',
                    path: '',
                    logo: '/images/main/logo/twitter-logo.svg'
                },
                {
                    selected: false,
                    value: 'tiktok',
                    path: '',
                    logo: '/images/main/logo/tiktok-logo.svg'
                }
            ],
            stories: [
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4',
                    duration: 28000,
                },
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4',
                    duration: 10000,
                },
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-family-walking-together-in-nature-39767-large.mp4',
                    duration: 10000,
                }
            ],
            gallery: [
                '/images/users/photos/sui-photo.png'
            ]
        },
        {
            id: 14,
            favorite: false,
            gender: 'Мужской',
            name: 'Стивен',
            img: '/images/users/stiven.png',
            talent: 'Музыкант',
            content: [
                {
                    selected: true,
                    value: 'instagram',
                    path: '',
                    logo: '/images/main/logo/instagram-logo.svg'

                },
                {
                    selected: true,
                    value: 'youtube',
                    path: '',
                    logo: '/images/main/logo/youtube-logo.svg'
                },
                {
                    selected: false,
                    value: 'twitter',
                    path: '',
                    logo: '/images/main/logo/twitter-logo.svg'
                },
                {
                    selected: false,
                    value: 'tiktok',
                    path: '',
                    logo: '/images/main/logo/tiktok-logo.svg'
                }
            ],
            stories: [
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4',
                    duration: 28000,
                },
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4',
                    duration: 10000,
                },
                {
                    type: 'video',
                    url: 'https://assets.mixkit.co/videos/preview/mixkit-family-walking-together-in-nature-39767-large.mp4',
                    duration: 10000,
                }
            ],
            gallery: [
                '/images/users/photos/stiven-photo.png'
            ]
        }
    ],
    castings: [
        {
            id: 1,
            brand_logo: '/images/logoGradient.png',
            spec_name: 'Фотомодель',
            task: 'Фотосъемка для журнала',
            gender: 'Женский',
            category: 'Модель с тату',
            add_info: '#голубыеглаза',
            model_quantity: 2,
            price: 5000,
            start: '5 дек',
            end: '14 дек',
            proposals_date: 1,
            title: 'Кастинг моделей для участия в показе причесок',
            requirements: 'Фотосессия для автомобильного салона',
            brand: 'ADEL',
            main_pic: '/images/castings/casting_main.png',
            pictures: ['/images/castings/casting_main.png', '/images/castings/casting_main.png', '/images/castings/casting_main.png'],
            place: 'Москва',
            desc: '',
            date: '21 дек'
        },
        {
            id: 2,
            brand_logo: '/images/logoGradient.png',
            spec_name: 'Фотомодель',
            task: 'Фотосъемка для журнала',
            gender: 'Женский',
            category: 'Модель с тату',
            add_info: '#голубыеглаза',
            model_quantity: 2,
            price: 5000,
            start: '5 дек',
            end: '14 дек',
            proposals_date: 1,
            title: 'Кастинг моделей для участия в показе причесок',
            requirements: 'Фотосессия для автомобильного салона',
            brand: 'ADEL',
            main_pic: '/images/castings/casting_main.png',
            pictures: ['/images/castings/casting_main.png', '/images/castings/casting_main.png', '/images/castings/casting_main.png'],
            place: 'Москва',
            desc: '',
            date: '21 дек'
        },
        {
            id: 3,
            brand_logo: '/images/logoGradient.png',
            spec_name: 'Фотомодель',
            task: 'Фотосъемка для журнала',
            gender: 'Женский',
            category: 'Модель с тату',
            add_info: '#голубыеглаза',
            model_quantity: 2,
            price: 5000,
            start: '5 дек',
            end: '14 дек',
            proposals_date: 1,
            title: 'Кастинг моделей для участия в показе причесок',
            requirements: 'Фотосессия для автомобильного салона',
            brand: 'ADEL',
            main_pic: '/images/castings/casting_main.png',
            pictures: ['/images/castings/casting_main.png', '/images/castings/casting_main.png', '/images/castings/casting_main.png'],
            place: 'Москва',
            desc: '',
            date: '21 дек'
        },
        {
            id: 4,
            brand_logo: '/images/logoGradient.png',
            spec_name: 'Фотомодель',
            task: 'Фотосъемка для журнала',
            gender: 'Женский',
            category: 'Модель с тату',
            add_info: '#голубыеглаза',
            model_quantity: 2,
            price: 5000,
            start: '5 дек',
            end: '14 дек',
            proposals_date: 1,
            title: 'Кастинг моделей для участия в показе причесок',
            requirements: 'Фотосессия для автомобильного салона',
            brand: 'ADEL',
            main_pic: '/images/castings/casting_main.png',
            pictures: ['/images/castings/casting_main.png', '/images/castings/casting_main.png', '/images/castings/casting_main.png'],
            place: 'Москва',
            desc: '',
            date: '21 дек'
        },
        {
            id: 5,
            brand_logo: '/images/logoGradient.png',
            spec_name: 'Фотомодель',
            task: 'Фотосъемка для журнала',
            gender: 'Женский',
            category: 'Модель с тату',
            add_info: '#голубыеглаза',
            model_quantity: 2,
            price: 5000,
            start: '5 дек',
            end: '14 дек',
            proposals_date: 1,
            title: 'Кастинг моделей для участия в показе причесок',
            requirements: 'Фотосессия для автомобильного салона',
            brand: 'ADEL',
            main_pic: '/images/castings/casting_main.png',
            pictures: ['/images/castings/casting_main.png', '/images/castings/casting_main.png', '/images/castings/casting_main.png'],
            place: 'Москва',
            desc: '',
            date: '21 дек'
        },
        {
            id: 6,
            brand_logo: '/images/logoGradient.png',
            spec_name: 'Фотомодель',
            task: 'Фотосъемка для журнала',
            gender: 'Женский',
            category: 'Модель с тату',
            add_info: '#голубыеглаза',
            model_quantity: 2,
            price: 5000,
            start: '5 дек',
            end: '14 дек',
            proposals_date: 1,
            title: 'Кастинг моделей для участия в показе причесок',
            requirements: 'Фотосессия для автомобильного салона',
            brand: 'ADEL',
            main_pic: '/images/castings/casting_main.png',
            pictures: ['/images/castings/casting_main.png', '/images/castings/casting_main.png', '/images/castings/casting_main.png'],
            place: 'Москва',
            desc: '',
            date: '21 дек'
        }
    ]
}

export default store;