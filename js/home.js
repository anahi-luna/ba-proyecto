window.onscroll = ()=>{
    const navBar = document.querySelector('.nav-bar')
    const shadowElement = document.querySelectorAll('.element-show')
    const shadowSearch =document.querySelectorAll('.nav-bar-search')
    if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0 ){
        navBar.classList.add('scrolled')
        console.log(shadowSearch);
        shadowSearch.forEach(elemt =>{
            elemt.classList.remove('shadow-search')
        })
        shadowElement.forEach(elemt =>{
            elemt.classList.remove('shadow')
        })
    }else{
        navBar.classList.remove('scrolled')
        shadowSearch.forEach(elemt =>{
            elemt.classList.add('shadow-search')
        })
        shadowElement.forEach(elemt =>{
            elemt.classList.add('shadow')
        })
    }
}