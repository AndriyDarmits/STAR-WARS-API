(function () {
    const btn = document.querySelector(".button");
    //const block = document.querySelector(".data-block");
    const personName = document.querySelector(".people__title");
    const height = document.querySelector("#height")
    const mass = document.querySelector("#mass")
    const hairColor = document.querySelector("#hair_color")
    const skinColor = document.querySelector("#skin_color")
    const eyeColor = document.querySelector("#eye_color")
    const birthYear = document.querySelector("#birth_year")
    const gender = document.querySelector("#gender")
    const homeworld = document.querySelector("#homeworld")
    const films = document.querySelector("#films")
    const species = document.querySelector("#species")
    const vehicles = document.querySelector("#vehicles")
    const starships = document.querySelector("#starships")
    const created = document.querySelector("#created")
    const edited = document.querySelector("#edited")
    const url = document.querySelector("#url")

    function getData() {

        let randomValue = Math.floor(Math.random() * 84);


        const data = fetch(`https://swapi.dev/api/people/${randomValue}`);
        data
            .then(response => {
                return response.json();
            }).then(data => {
                generateData(data)
            }).catch(err => {
                receiveError(err);
            })
    }

    /* getData(); */

    function receiveError(err) {
        console.log('Something went wrong')
    }

    function generateData(data) {

        for (let item in data) {

            if (data[item].length == 0) {
                data[item] = 'EMPTY'
            }

            if (Array.isArray(data[item])) {
                if (data[item].length > 1) {
                    for (let i = 0; i < data[item].length; i++) {
                        data[item][i] += "<br>";
                    }
                }
            }
            /* console.log(data[item]) */
        }

        personName.innerHTML = data.name;
        height.innerHTML = data.height;
        mass.innerHTML = data.mass;
        hairColor.innerHTML = data.hair_color;
        skinColor.innerHTML = data.skin_color;
        eyeColor.innerHTML = data.eye_color;
        birthYear.innerHTML = data.birth_year;
        gender.innerHTML = data.gender;
        homeworld.innerHTML = data.homeworld;
        films.innerHTML = data.films;
        species.innerHTML = data.species;
        vehicles.innerHTML = data.vehicles;
        starships.innerHTML = data.starships;
        created.innerHTML = data.created;
        edited.innerHTML = data.edited;
        url.innerHTML = data.url;
    }

    btn.addEventListener('click', getData)
})();

//=================================================SEARCH===========================================================================

(function () {
    const searchButton = document.querySelector('.search__button');
    const inputValue = document.querySelector(".input__value");
    const submitResult = document.querySelector(".submitResult")

    const searchBlock = document.querySelector(".search__mainBlock")

    const personName = document.querySelector(".people__title-search");
    const height = document.querySelector("#height-search")
    const mass = document.querySelector("#mass-search")
    const hairColor = document.querySelector("#hair_color-search")
    const skinColor = document.querySelector("#skin_color-search")
    const eyeColor = document.querySelector("#eye_color-search")
    const birthYear = document.querySelector("#birth_year-search")
    const gender = document.querySelector("#gender-search")
    const homeworld = document.querySelector("#homeworld-search")
    const films = document.querySelector("#films-search")
    const species = document.querySelector("#species-search")
    const vehicles = document.querySelector("#vehicles-search")
    const starships = document.querySelector("#starships-search")
    const created = document.querySelector("#created-search")
    const edited = document.querySelector("#edited-search")
    const url = document.querySelector("#url-search")

    submitResult.style.display = 'none';

    function receiveError(err) {
        console.log('Something went wrong')
    }

    function requestSearch(event) {

        let requestLink = 'https://swapi.dev/api/people/?search='


        if (inputValue.value.trim() === '') {
            alert('Input field is empty. You should enter person name!')
        } else {
            requestLink += `${inputValue.value}`
            let request = fetch(requestLink);

            request.then((response) => {
                return response.json();
            })
                .then(data => {
                    fillItems(data.results)
                }).catch(err => {
                    receiveError(err)
                })
        }
    }


    function fillItems(resp) {

        function showResult(event) {
            this.style.display = "none";
            searchBlock.style.display = 'block'

            for (let item in people) {

                if (people[item].length == 0) {

                    people[item] = 'EMPTY'
                }

                if (Array.isArray(people[item])) {
                    if (people[item].length > 1) {

                        for (let i = 0; i < people[item].length; i++) {
                            people[item][i] += "<br>";
                        }
                    }
                }
                /* console.log(data[item]) */
            }
            personName.innerHTML = people.name;
            height.innerHTML = people.height;
            mass.innerHTML = people.mass;
            hairColor.innerHTML = people.hair_color;
            skinColor.innerHTML = people.skin_color;
            eyeColor.innerHTML = people.eye_color;
            birthYear.innerHTML = people.birth_year;
            gender.innerHTML = people.gender;
            homeworld.innerHTML = people.homeworld;
            films.innerHTML = people.films;
            species.innerHTML = people.species;
            vehicles.innerHTML = people.vehicles;
            starships.innerHTML = people.starships;
            created.innerHTML = people.created;
            edited.innerHTML = people.edited;
            url.innerHTML = people.url;
            submitResult.removeEventListener("click", showResult); // In order to this event ti be removed at once after clicking 
        }

        let people;

        if (resp.length === 0) {

            alert("not found");
            inputValue.value = '';

            return;

        } else if (resp.length === 1) {
            people = resp[0];
            submitResult.innerHTML = people.name;

            submitResult.addEventListener("click", showResult);
        } else {


            submitResult.innerHTML = '';

            resp.forEach(elem => {

                const span = document.createElement('span');
                span.style.display = "block";
                span.innerHTML = elem.name;
                submitResult.append(span)

                searchBlock.style.display = 'none'
            })
        }
        inputValue.value = '';
        submitResult.style.display = 'block'
    }
    searchButton.addEventListener('click', requestSearch);
})();



