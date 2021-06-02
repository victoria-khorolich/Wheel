const $img = document.getElementById('img');
const result = [1, 2, 3, 4, 5, 6];

function res() {
    const count = Math.floor(Math.random() * 6);
    return result[count];

}
function wheel() {
    const resultRotate = res();

    document.querySelector('.text').innerHTML = resultRotate;
    // document.querySelector('.wheel__text').innerHTML = resultRotate;

    setTimeout(() => {
        document.querySelector('.wrap').style.display = "block";
      }, 2000);
    

    if (resultRotate == 1) {
        $img.style.transform = 'rotate(360deg)';
    } else if (resultRotate == 2) {
        $img.style.transform = 'rotate(300deg)';
    } else if (resultRotate == 3) {
        $img.style.transform = 'rotate(240deg)';
    } else if (resultRotate == 4) {
        $img.style.transform = 'rotate(180deg)';
    } else if (resultRotate == 5) {
        $img.style.transform = 'rotate(120deg)';
    } else if (resultRotate == 6) {
        $img.style.transform = 'rotate(60deg)';
    }
}

document.querySelector('.button').addEventListener('click', wheel);
document.querySelector('.modal-button').addEventListener('click', wheel);
document.querySelector('.wrap').addEventListener('click', function(){
    document.querySelector('.wrap').style.display = "none";
});


