function noScroll(event) {
    event.preventDefault();
  }
  
  let scrollFlag = true;
  
  function disableScroll(){
    if(scrollFlag){
    document.addEventListener('touchmove', noScroll, { passive: false });
    document.addEventListener('mousewheel', noScroll, { passive: false });
    scrollFlag = false;
    }
  }
  
  function enableScroll(){
    if(!scrollFlag){
    document.removeEventListener('touchmove', noScroll, { passive: false });
    document.removeEventListener('mousewheel', noScroll, { passive: false });
    scrollFlag = true;
    }
  }