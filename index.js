// initialization


const tabs = document.querySelectorAll(".tab-content") 
const tabButtons = document.querySelectorAll(".tab-btn")

function openTab(evt, tabName){

    tabs.forEach((tab) => {
        tab.style.display = 'none'
    })

    tabButtons.forEach((btn) => btn.classList.remove("tab-active"))

    document.querySelector(`[data-tab-name=${tabName}]`).style.display = 'block'

    evt.target.classList.add("tab-active") // set current button to be active

}

// Force dark mode
document.documentElement.classList.add('tw-dark');
localStorage.setItem("color-mode", "dark");