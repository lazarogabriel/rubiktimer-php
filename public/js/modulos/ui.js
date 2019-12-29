
class UI{
    insertTimeInList(tiempo, date = null){ 
        const colors = ['blue', 'yellow', 'white', 'green', 'orange', 'red'];
        let color = colors[0];
        const $times = document.querySelectorAll('.time');
        if($times.length > 0){
            const currentColor =  $times[$times.length-1].classList[4];
            switch (currentColor) {
                case 'blue':
                    color = colors[1];
                    break;
                case 'yellow':
                    color = colors[2];
                    break;
                case 'white':
                    color = colors[3];
                    break;
                case 'green':
                    color = colors[4];
                    break;
                case 'orange':
                    color = colors[5];
                    break;
                case 'red':
                    color = colors[0];
                    break;
            }
        }
        
        if(date === null) date = new Date().toDateString();
        
        const list = document.getElementById("time-list");
        const elementTime = document.createElement('div');

        elementTime.innerHTML = `
            <div class="time d-flex justify-content-between p-3 ${color}">
                <div>
                    <span>${tiempo.toFixed(2)}</span><br>
                    <small class="pl-2">${date}</small>
                </div>
                <div>
                    <button name="save" class="font-weight-bold btn btn-success btn-sm">SAVE</button>
                    <button name="delete" class="font-weight-bold btn btn-danger btn-sm ">X</button>
                </div>
            </div>
        `;

        elementTime.classList.add('col-md-6', 'col-xl-4');
        list.appendChild(elementTime);
        
    }

    deletTime(element){
        if(element.name === 'delete')element.parentElement.parentElement.parentElement.remove();
    }

    persistTime(element){

        if(element.name === 'save'){
            if($username){

                element.innerHTML = "SAVED";
                element.setAttribute('disabled', '');

            }else if(document.getElementsByClassName('messageLog').length === 0){

                    const $messageLog = document.createElement('div');
                    $messageLog.classList.add('messageLog', 'message', 'animated', 'slideInDown');
    
                    $messageLog.innerHTML = `
                         You must be <span class="text-warning font-weight-bold">Login</span> for save times.
                    `;
                    document.body.appendChild($messageLog);
                        
                    setTimeout(  () => {
                        $messageLog.classList.add('slideOutUp');
                        setTimeout( () => $messageLog.remove(), 500);
                    }, 2500);
                    
                
            }


        }
    }
    

    // MIGRATE OWN ANIMATIONS TO ANIMATION . CSS
    // animationIn(element, principio, fin, time){
    //   var i = principio;
    //   var animationTimeOut = setInterval( () => {
    //       i += 2;
    //       element.style.top = i +"%";
    //       if(i > fin)clearInterval(animationTimeOut);
    //   }, time);
    // }

    // animationOut(element, principio, fin, time){
    //   var i = principio;
    //   var animationTimeOut = setInterval( () => {
    //       i -= 2;
    //       element.style.top = i + "%";
    //       if( i < fin )clearInterval(animationTimeOut);
    //   }, time);
    // }

    
}
