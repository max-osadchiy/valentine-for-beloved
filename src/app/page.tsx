"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./page.css";

export default function Valentine() {
    const [showMessage, setShowMessage] = useState(false);
    const [hearts, setHearts] = useState<{ left: number; top: number; size: number; duration: number }[]>([]);
    const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

    // Состояние для таймера
    const [timeTogether, setTimeTogether] = useState({
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Обновляем сердечки
    useEffect(() => {
        const newHearts = Array.from({ length: 50 }).map(() => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 40 + 20,
            duration: Math.random() * 6 + 4,
        }));
        setHearts(newHearts);
    }, []);

    // Функция для анимации кнопки "Нет"
    const moveNoButton = () => {
        const maxX = 150;
        const maxY = 100;

        setNoPosition({
            x: (Math.random() - 0.5) * maxX,
            y: (Math.random() - 0.5) * maxY,
        });
    };

    // Таймер с 20 октября 2024 года
    useEffect(() => {
        const startDate = new Date("2024-10-20T00:00:00"); // Дата начала
        const updateTimer = () => {
            const now = new Date();
            const diff = now.getTime() - startDate.getTime();

            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
            const days = Math.floor(diff / (1000 * 60 * 60 * 24)) % 365;
            const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
            const minutes = Math.floor(diff / (1000 * 60)) % 60;
            const seconds = Math.floor(diff / 1000) % 60;

            setTimeTogether({ years, days, hours, minutes, seconds });
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="valentine-container">
            {/* Летающие сердечки */}
            <div className="hearts">
                {hearts.map((heart, i) => (
                    <motion.div
                        key={i}
                        className="heart"
                        style={{
                            left: `${heart.left}%`,
                            top: `${heart.top}%`,
                            fontSize: `${heart.size}px`,
                        }}
                        animate={{
                            y: [0, -window.innerHeight],
                            opacity: [1, 0],
                        }}
                        transition={{
                            duration: heart.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 3,
                        }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </div>

            {/* Открытка */}
            <motion.div
                className="valentine-card"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
            >
                <h1>💌 Будешь моей валентинкой? 💌</h1>

                {/* Котик */}
                <img
                    src={!showMessage ? '/cat.gif' : '/VeC.gif'}
                    alt="Милый котик"
                    className="valentine-gif"
                    width={120}
                    height={120}
                />

                {/* Кнопки */}
                {!showMessage && (
                    <div className="button-group">
                        <motion.button
                            className="yes-button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowMessage(true)}
                        >
                            Да
                        </motion.button>

                        <motion.button
                            className="no-button"
                            animate={{ x: noPosition.x, y: noPosition.y }}
                            transition={{ type: "spring", stiffness: 100 }}
                            onMouseEnter={moveNoButton}
                            onClick={moveNoButton}
                        >
                            Нет
                        </motion.button>
                    </div>
                )}

                {/* Сообщение при нажатии "Да" */}
                {showMessage && (
                    <motion.div
                        className="message-box"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2>Ты моя Валентинка!</h2>
                        <p>Люблю тебя ❤️</p>
                        <p>Ты самое лучшее, что случилось в моей жизни! 💕</p>
                        <p>Мы вместе уже:</p>
                        <div className="timer">
                            <p className='timer-text'>
                                <strong>{timeTogether.days}</strong> дней,
                                <strong>{timeTogether.hours}</strong> часов, <strong>{timeTogether.minutes}</strong> минут,
                                <strong>{timeTogether.seconds}</strong> секунд!
                            </p>
                        </div>
                    </motion.div>
                )}

                <p className='footerText'>❤️ 14.02.2025 | Maksim + Vika ❤️</p>
            </motion.div>
        </div>
    );
}
