// TIMER
function timer(id, deadline) {
    


    function getTimeRemaining(endtime) {
        const temp = Date.parse(endtime) - Date.parse(new Date()), // Math.floor() - rounding
            days = Math.floor(temp / (1000 * 60 * 60 * 24)),
            hours = Math.floor((temp / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((temp / (1000 * 60)) % 60),
            seconds = Math.floor((temp / 1000) % 60);

        return {
            'total': temp,
            days, //'days': days,
            hours, //'hours' : hours,
            minutes, //'minutes': minutes,
            seconds //'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const temp = getTimeRemaining(endtime);


            days.innerHTML = getZero(temp.days);
            hours.innerHTML = getZero(temp.hours);
            minutes.innerHTML = getZero(temp.minutes);
            seconds.innerHTML = getZero(temp.seconds);


            if (temp.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = hours.innerHTML = minutes.innerHTML = seconds.innerHTML = 0;
            }
        }
    }

    setClock(id, deadline);
}

export default timer;