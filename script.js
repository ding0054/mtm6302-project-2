const $btnGet = document.getElementById('btn-get')
const $result = document.getElementById('result')
const $date = document.getElementById('date')
const $hdImage = document.getElementById('hdimage')
const $favList = document.getElementById('fav_list')
const $delete = document.getElementById('delete')


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
                favId++
                let fav = {
                    id : favId,
                    title: data.title,
                    date: data.date,
                }
                display(fav)
                localStorage.setItem(favId, JSON.stringify(fav))
                localStorage.setItem('favId', favId)
            })//end save

        })
        .catch(error => {
            alert(`${error.name} - ${error.message}`)
        })
    }
    
})


let favId = 0

        function init() { 
            if (localStorage.getItem('favId') != null) {
                for (let i = 0; i <= localStorage.getItem('favId'); i++) {
                    let fav = localStorage.getItem(i)
                    if (fav != null) display(JSON.parse(fav))
                    favId = i
                    }
            } else localStorage.setItem('favId', favId)
}
        
// delete a favourites
 $favList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        const $parent = e.target.parentElement
        let id = $parent.querySelector('.id').textContent
        
        localStorage.removeItem(id)
        
        $parent.remove()
    }
})

    function display(fav) {
        $favList.innerHTML += `
        <li class="fav_element" id="fav_element">
                <img id="resultImage" src= ${fav.url}>
                     <div>
                         <h4>${fav.title}</h4>
                         <p class="date">${fav.date}</p>
                         <button class="delete" id="delete">Delete</button>
                     </div>
             </li>`
    }
    
    init() 