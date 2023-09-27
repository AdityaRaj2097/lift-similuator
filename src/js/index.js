console.log("Inside index.js file")
const submit =document.getElementById("submit")
// const container=document.getElementById("container")
const container=document.querySelector(".main")
const noOfLiftElement=document.querySelector("#no-of-lift")
const noOfFloorElement=document.querySelector("#no-of-floor")
let noofLift;
let noOfFloor;
let AllLiftData=[]
let floorsRequest = []


submit.addEventListener("click",()=>
{

// if(noOfLift.val)
if(noOfLiftElement&&noOfLiftElement.value==""){
    alert(
        "please Enter no of Lift"
    )
    return
}
if(noOfLiftElement&& (noOfLiftElement.value>10 || noOfLiftElement.value<1 )){
    alert(
        "No of Lift lies between 1 to 10"
    )
    return
}
if(noOfFloorElement&&noOfFloorElement.value==""){
    alert(
        "please Enter no of Floors"
    )
    return
}

if(noOfFloorElement&&noOfFloorElement.value>10 ||noOfFloorElement.value<2  ){
    alert(
        "No of Floor must be lies between 2 to 10"
    )
    return
}
if(Number(noOfLiftElement.value)>Number(noOfFloorElement.value)){
    alert(
        "No of lift must be less than no of floors"
    )
    return
}

console.log("donnnnnnn",noOfLiftElement.value,noOfFloorElement.value)

container.innerHTML=""
;
noOfFloor=noOfFloorElement.value
noofLift=noOfLiftElement.value
noOfLiftElement.value=""
noOfFloorElement.value=""

let element=document.createElement("div")


element.style.cssText = "height: auto; width: 100vw; display: flex;";

element.style.flexDirection="column"



//  Adding floor
let currentFloor 
for(let i=noOfFloor;i>0;i--){
    currentFloor=document.createElement("div")
    let upButton=document.createElement("button")
    upButton.textContent = `UP-${i}`;
    upButton.id = `UP-${i}`
    let downButton=document.createElement("button")
    downButton.textContent = 
    downButton.id = `Down-${i}`
    // element.style.id=`floor-${i}`
let upDownContainer=document.createElement("div")
upButton.addEventListener('click', this.callingLift)
downButton.addEventListener('click',this. callingLift)
upButton.style.cssText="min-width:100%"
downButton.style.cssText="min-width:100%"
container.style.cssText=" width:auto;min-width:100vw"
    upDownContainer.appendChild(upButton)
    upDownContainer.appendChild(downButton)
    upDownContainer.style.cssText="display:flex; flex-direction:column ;justify-content: space-around;min-width:80px"
    upDownContainer.setAttribute("id",`Floor-up-down${i}`)
    currentFloor.setAttribute("id",`Floor-${i}`)
    
    currentFloor.appendChild(upDownContainer)

    currentFloor.style.cssText = "height: 120px; min-width: 90vw ;border: 0.1px solid grey;display:flex;flex-direction:row;gap:2rem;width:auto;border-right:0px";

    element.appendChild(currentFloor)

}
    

    container.appendChild(element)



    let targetFloorNo=container.querySelector("#Floor-1")
let lift;
for(let j=noofLift;j>0;j--){

lift=document.createElement("div")
lift.style.cssText="height:100px; min-width:80px; border:2px solid grey; display:flex;overflow: hidden; "
lift.setAttribute("id",`floorid-${j}`)
let left=document.createElement("div")
left.setAttribute("id",`left-door-${j}`)

left.classList.add("leftLift")

let right=document.createElement("div")
right.setAttribute("id",`right-door-${j}`)
// right.style.cssText="
right.classList.add("rightlift")
lift.appendChild(left)

lift.appendChild(right)



targetFloorNo.appendChild(lift)

const liftState = {
    id: j,
    isRunning: false,
    currentFloor: 1,
    Destination: null,
}


AllLiftData.push(liftState)
setInterval(() => {
    ScheduleLift();
}, 1000)

}})

const findNearestlift = (destinationFloor) => {
  
    let nearestLiftDistance = noOfFloor;
    destinationFloor=Number(destinationFloor)
    let nearestliftId
    let  lifts=AllLiftData
    console.log("lifts",{lifts},{AllLiftData},{destinationFloor})
    for (let liftIndex = 0; liftIndex < AllLiftData.length; liftIndex++) {
        const lift = lifts[liftIndex];
        if (Math.abs(lift.currentFloor - destinationFloor) < nearestLiftDistance && lift. isRunning === false) {
            nearestLiftDistance = Math.abs(lift.currentFloor - destinationFloor);
            console.log({nearestLiftDistance})
            nearestliftId = lift.id;
        }
    }
    let allLift=[]
    //  for getting random lift if 
    
    for (let liftIndex = 0; liftIndex < AllLiftData.length; liftIndex++) {
        const lift = lifts[liftIndex];
        if (Math.abs(lift.currentFloor - destinationFloor) == nearestLiftDistance && lift. isRunning === false) {
            allLift.push(Number(lift.id))
        
        }
    }
    if(allLift&&allLift.length>0){
        const randomIndex = Math.floor(Math.random() * allLift.length);
        let lift =allLift[randomIndex]
        nearestliftId = lift;
    }
    // console.log("doint my best",{allLift})
    
    return {nearestliftId,nearestLiftDistance};
}
async function hanldeLift(door, targetFloor) {

    const Currentlift = AllLiftData.find(lift => lift.id == door);
    let from=Currentlift.currentFloor

const distance = -1 * (targetFloor-1) * 120;

const time = Math.abs(from-targetFloor) * 2;



Currentlift.Destination = targetFloor;
Currentlift. isRunning = true;
    let lift=document.querySelector(`#floorid-${door}`)
    // console.log({lift})
    lift.style.transform = `translateY(${distance}px)`;
    lift.style.transition = `transform ${time}s`
    
    const leftDoor = document.querySelector(`#left-door-${door}`)
    const rightDoor = document.querySelector(`#right-door-${door}`)
    setTimeout(() => {    
  
    leftDoor.classList.add("openLeftDoor")
    rightDoor.classList.add("openrightDoor")
    },time*1000)


    setTimeout(()=>{
        leftDoor.classList.remove("openLeftDoor")
        rightDoor.classList.remove("openrightDoor")  
        Currentlift.currentFloor = targetFloor;
        Currentlift. isRunning = false;
        Currentlift.Destination = null;
    },(time*1000)+(8000))
    
}


function callingLift(e){
        let id=e.target.id;
        let TargetFloorNo = id.split("-")[1];
        // floorsRequest.push(Number(TargetFloorNo))
        floorsRequest.push(Number(TargetFloorNo)); //
        console.log("floorsRequestfloorsRequest",floorsRequest)
        return
//        let allLiftAtCurrentFloor= getAllListAtTargetFloor(TargetFloorNo)

//        if(allLiftAtCurrentFloor&&allLiftAtCurrentFloor.length>0){
//         for(let itr=0;itr<allLiftAtCurrentFloor.length;itr++){
//             hanldeLift((allLiftAtCurrentFloor[itr]),TargetFloorNo)
//         }
// return 
//        }
//        else{
//         let {nearestliftId}= findNearestlift(TargetFloorNo)
//         hanldeLift(nearestliftId,TargetFloorNo)
//        }
      
       
}


const ScheduleLift = () => {
// console.log({floorsRequest})
    if (floorsRequest.length === 0) return;
    const TargetFloorNo = floorsRequest.shift();
    let {nearestliftId}= findNearestlift(TargetFloorNo)
    if (!nearestliftId) {
        floorsRequest.unshift(TargetFloorNo);
        return;
    }
    hanldeLift(nearestliftId,TargetFloorNo)
   

   
}
// function getAllListAtTargetFloor(TargetFloorNo){
//     TargetFloorNo=Number(TargetFloorNo)
    
//     let allLift=[]
  
//     for (let liftIndex = 0; liftIndex < AllLiftData.length; liftIndex++) {
//         const lift = AllLiftData[liftIndex];
//         if (TargetFloorNo==lift.currentFloor && lift.isRunning === false) {
//             allLift.push(Number(lift.id))
//         }
//     }
//     return allLift
// }




