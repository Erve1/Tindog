const dogs = [
    {
        name: "Rex",
        avatar: "images/dog-rex.jpg",
        age: 25,
        bio: "Art. Literature. Natural wine. Yoga.",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },{
        name: "Bella",
        avatar: "images/dog-bella.jpg",
        age: 43,
        bio: "Yup, that's my owner. U can meet him if you want",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    {
        name: "Teddy",
        avatar: "images/dog-teddy.jpg",
        age: 30,
        bio: "How you doin?",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    {
        name: "Bob",
        avatar: "images/dog-bob.png",
        age: 25,
        bio: "Stylish is my nickname",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    {
        name: "Elsa",
        avatar: "images/dog-elsa.png",
        age: 28,
        bio: "I love to play Hide and Seek!",
        hasBeenSwiped: false,
        hasBeenLiked: false
    }
]

let currentDogIndex = 0
let currentDog = new Dog(dogs[currentDogIndex])
let isWaiting = false

function Dog(data) {
    
    Object.assign(this, data)
    
    const {name, avatar, age, bio} = this
    
    this.getDogHtml = function () {  
        
        return `    
            <img src="${avatar}" alt="" class="dog" id="avatar">
            <img src="images/badge-like.png" alt="" class="dog" id="like">
            <img src="images/badge-nope.png"" alt="" class="dog" id="nope">
            <div class="transparent-bg">
                <div id="bio">
                    <h1>${name}, ${age}</h1>
                    <p>${bio}</p>
                </div>
            </div>
            `
        } 
}

let remainingDogs = dogs.filter(mates => mates.hasBeenLiked === false)

function getNewDog() {
    
    if (currentDogIndex < remainingDogs.length - 1) {
    currentDogIndex += 1
    currentDog = new Dog(remainingDogs[currentDogIndex])
    setTimeout( () => render(), 1000)
    } else if (remainingDogs.length === 0){
    setTimeout( () => endMessage(), 1000)
    } else {
    currentDogIndex = 0
    currentDog = new Dog(remainingDogs[currentDogIndex])
    setTimeout( () => render(), 1000)
    }
    
}

document.getElementById("like-btn").addEventListener('click', like)
document.getElementById("nope-btn").addEventListener('click', nope)
document.getElementById("logoEl").addEventListener('click', reload)

function reload() {
    window.location.reload()
}

function endMessage() {
    document.getElementById('section-el').innerHTML = 
    `<img src="images/end.png" alt="" class="dog" id="">
    <div id="end">
    <p>There are no other dogs in your area. Be patient and wait to see if there is a match or try to press logo 🐾<p>
    </div>
    `
    document.getElementById("like-btn").style.visibility = "hidden"
    document.getElementById("nope-btn").style.visibility = "hidden"
}

function like() {
    if(!isWaiting){
    isWaiting = true
    remainingDogs[currentDogIndex].hasBeenLiked = true
    remainingDogs = dogs.filter(mates => mates.hasBeenLiked === false)
    currentDogIndex = - 1
    document.getElementById("like").style.display = "block"
    document.getElementById("nope").style.display = "none"
    getNewDog()
    }
}

function nope() {
    if(!isWaiting){
    isWaiting = true
    document.getElementById("nope").style.display = "block"
    document.getElementById("like").style.display = "none"
    getNewDog()
    } 
}

function render() {
    document.getElementById('section-el').innerHTML = currentDog.getDogHtml()
    isWaiting = false
}

render()
