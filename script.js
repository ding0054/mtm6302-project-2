const $btnGet = document.getElementById('btn-get')
const $result = document.getElementById('result')
const $date = document.getElementById('date')

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
            $result.innerHTML=`<img src=${data.url}>`

        })
        .catch(error => {
            alert(`${error.name} - ${error.message}`)
        })
    }
    
})