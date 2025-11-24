/* ===================================================================
 * traditional.js - Custom JS for the Janmashtami theme
 * =================================================================== */

(function() {

    "use strict";

    document.addEventListener('DOMContentLoaded', function() {

        /*-----------------------------------------------------------------------------------*/
        /*	1. Background Music Control
        /*-----------------------------------------------------------------------------------*/
        const music = document.getElementById('flute-music');
        const musicControl = document.getElementById('music-control');
        const musicIcon = document.getElementById('music-icon');

        if (music && musicControl && musicIcon) {
            
            // Attempt to autoplay, but be aware of browser restrictions
            // A user interaction is often required to start audio.
            let promise = music.play();
            if (promise !== undefined) {
                promise.then(_ => {
                    // Autoplay started!
                    musicIcon.classList.remove('fa-volume-off');
                    musicIcon.classList.add('fa-volume-up');
                }).catch(error => {
                    // Autoplay was prevented.
                    console.log("Autoplay prevented. User must interact to start music.");
                    musicIcon.classList.remove('fa-volume-up');
                    musicIcon.classList.add('fa-volume-off');
                });
            }

            musicControl.addEventListener('click', function() {
                if (music.paused) {
                    music.play();
                    musicIcon.classList.remove('fa-volume-off');
                    musicIcon.classList.add('fa-volume-up');
                } else {
                    music.pause();
                    musicIcon.classList.remove('fa-volume-up');
                    musicIcon.classList.add('fa-volume-off');
                }
            });
        }

        /*-----------------------------------------------------------------------------------*/
        /*	2. Ornate Animations on Scroll
        /*-----------------------------------------------------------------------------------*/
        const traditionalElements = document.querySelectorAll('.animate-this');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // You can add more traditional animations here
                    entry.target.classList.add('fadeInUp');
                }
            });
        }, { threshold: 0.1 });

        traditionalElements.forEach(el => {
            observer.observe(el);
        });

    }); // End DOMContentLoaded

})();
