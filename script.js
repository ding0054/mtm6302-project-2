const $btnGet = document.getElementById('btn-get')
const $result = document.getElementById('result')
const $date = document.getElementById('date')
const $hdImage = document.getElementById('hdimage')

window.addEventListener('DOMContentLoaded', checkLocalStorage);

$btnGet.addEventListener('click', function (e) { 
    e.preventDefault()

    if($date.value == "") {
        alert('no date selected!')
    } else {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${$date.value}&end_date=${$date.value}`)
            
        .then(response => response.json())
        .then(json => { 
            
            const data = json[0]
            console.log(data)

            //title, date, expl.
            $result.innerHTML = `
            <img id="resultImage" src=${data.url}>
            <div>
            <h3>${data.title}</h3>
            <p class="date">${data.date}</p>
            <p>${data.explanation}</p>
            <button id="save">Save to Favourites</button>
            </div>
            `
            function addHiddenClass(e) { 
                e.classList.add('hidden');
            }

            function removeHiddenClass(e) { 
                e.classList.remove('hidden');
            }
            const $resultImage = document.getElementById('resultImage')

            $resultImage.addEventListener('click', function () {
                removeHiddenClass($hdImage)   
                $hdImage.innerHTML=`<img src=${data.hdurl}>`
            })

            $hdImage.addEventListener('click', function () {
                addHiddenClass($hdImage)
            })

            const $save = document.getElementById('save')
            $save.addEventListener('click', function () {
                
            })

        })
        .catch(error => {
            alert(`${error.name} - ${error.message}`)
        })
    }
    
})