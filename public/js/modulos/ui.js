
class UI{
    insertTimeInList(tiempo, timesCant, date = null){ 
        const colors = ['blue', 'yellow', 'white', 'green', 'orange', 'red'];
        let color = colors[0];
        const $times = document.querySelectorAll('.time');
        if($times.length > 0){
            const currentColor =  $times[$times.length-1].classList[4];
            console.log(currentColor);
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
        
        if(date === null)date = new Date();
        const list = document.getElementById("time-list");
        const elementTime = document.createElement('div');

        elementTime.innerHTML = `
            <div class="time d-flex justify-content-between p-3 ${color}">
                <div>
                    <span>${tiempo.toFixed(2)}</span><br>
                    <small>${date.toDateString()}</small>
                </div>
                <div>
                    <button type="button" name="info" class="font-weight-bold btn btn-success btn-sm">SAVE</button>
                    <button type="button" name="delete" class="font-weight-bold btn btn-danger btn-sm ">X</button>
                </div>
            </div>
        `;

        elementTime.classList.add('col-md-6', 'col-xl-4');
        list.appendChild(elementTime);
        
    }

    deletTime(element){
        if(element.name === 'delete')element.parentElement.parentElement.parentElement.remove();
    }

    showTimeInfo(element){
        //if(element.name === 'info')console.log(element.parentElement.parentElement);
    }
    
    animationIn(element){
      var i = -50;
      var animationTimeOut = setInterval( () => {
          i += 2;
          element.style.top = i +"%";
          if(i > 49)clearInterval(animationTimeOut);
      }, 5);
    }

    animationOut(element){
      var i = 50;
      var animationTimeOut = setInterval( () => {
          i -= 2;
          element.style.top = i + "%";
          if(i < -49)clearInterval(animationTimeOut);
      }, 5);
    }

    
}
