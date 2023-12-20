'use strict'

const VIDEO_PATH = './assets/videos/video.mp4'



document.addEventListener('DOMContentLoaded', () => {
    const screen = document.querySelector('.player__screen')
    const video = document.getElementById('video')
    const controls = document.querySelectorAll('[data-controls]')

    const videoProgressBar = document.querySelector('.player__progress__bar__inner')


    const currentTime = document.querySelector('.player__progress__timeline > span:nth-child(1)')
    const duration = document.querySelector('.player__progress__timeline > span:nth-child(3)')

    let status = 'PAUSED'

    function handleControls(key) {
        const ref = {
            'play': () => {
                status = 'PLAYING'
                video.play()
            },
            'pause': () => {
                video.pause()
                status = 'PAUSED'
            },
            'stop': () => {
                video.pause()
                video.currentTime = 0
                status = 'PAUSED'
            },
            'fullscreen': () => {
                if (document.fullscreenElement) {
                    document.exitFullscreen()
                } else {
                    document.documentElement.requestFullscreen()
                }
            }
        }

        try {
            ref[key]()
        } catch (err) {
            console.log(err)
        }
    }

    video.src = VIDEO_PATH

    function setCurrentTime() {
        videoProgressBar.style.width = `${(video.currentTime / video.duration) * 100}%`

        const minutes = Math.floor(video.currentTime / 60)
        const seconds = Math.floor(video.currentTime - minutes * 60)

        currentTime.textContent = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }

    function setDuration() {
        videoProgressBar.style.width = `${(video.currentTime / video.duration) * 100}%`
        const durationMinutes = Math.floor(video.duration / 60)
        const durationSeconds = Math.floor(video.duration - durationMinutes * 60)

        duration.textContent = `${durationMinutes < 10 ? `0${durationMinutes}` : durationMinutes}:${durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds}`
    }

    video.addEventListener('loadedmetadata', (e) => {
        setDuration()
        setCurrentTime()

        video.addEventListener('timeupdate', (e) => {
            setCurrentTime()
        })

        controls.forEach(control => {
            control.addEventListener('click', () => {
                const action = control.dataset.controls
                handleControls(action)
            })
        })

        screen.classList.remove('is-loading')
    })
})