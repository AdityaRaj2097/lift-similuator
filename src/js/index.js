// console.log("Inside index.js file")
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

// console.log("donnnnnnn",noOfLiftElement.value,noOfFloorElement.value)

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
if(i!=noOfFloor){
    upButton.addEventListener('click', this.callingLift)
    upDownContainer.appendChild(upButton)
}
if(i!=1){
    downButton.addEventListener('click',this. callingLift)
    upDownContainer.appendChild(downButton)
}
// upButton.addEventListener('click', this.callingLift)
// downButton.addEventListener('click',this. callingLift)
upButton.style.cssText="min-width:100%"
downButton.style.cssText="min-width:100%"
container.style.cssText=" width:auto;min-width:100vw"
    // upDownContainer.appendChild(upButton)
    // upDownContainer.appendChild(downButton)
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
    isGateOpening:false
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
    // console.log("lifts",{lifts},{AllLiftData},{destinationFloor})
    for (let liftIndex = 0; liftIndex < AllLiftData.length; liftIndex++) {
        const lift = lifts[liftIndex];
        if (Math.abs(lift.currentFloor - destinationFloor) < nearestLiftDistance && lift. isRunning === false&&lift. isGateOpening == false) {
            nearestLiftDistance = Math.abs(lift.currentFloor - destinationFloor);
            // console.log({nearestLiftDistance})
            nearestliftId = lift.id;
        }
    }
    let allLift=[]
    //  for getting random lift if 
    
    for (let liftIndex = 0; liftIndex < AllLiftData.length; liftIndex++) {
        const lift = lifts[liftIndex];
        if (Math.abs(lift.currentFloor - destinationFloor) == nearestLiftDistance && lift. isRunning === false&&lift. isGateOpening == false) {
            allLift.push(Number(lift.id))
        
        }
    }
    if(allLift&&allLift.length>0){
        const randomIndex = Math.floor(Math.random() * allLift.length);
        let lift =allLift[randomIndex]
        nearestliftId = lift;
    }
    // console.log("doint my best",{allLift})
    
    return nearestliftId;
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
    Currentlift.currentFloor = targetFloor;
        Currentlift. isRunning = false;
        
        Currentlift. isGateOpening=true
    },time*1000)


    setTimeout(()=>{
        leftDoor.classList.remove("openLeftDoor")
        rightDoor.classList.remove("openrightDoor")  
        Currentlift. isGateOpening=false
        Currentlift.Destination = null;
        
    },(time*1000)+(5000))
    
}

async function openCLosedLift(door){
   
 
    const Currentlift = AllLiftData.find(lift => lift.id == door);
    const leftDoor = document.querySelector(`#left-door-${door}`)
    const rightDoor = document.querySelector(`#right-door-${door}`)
   
    setTimeout(() => {    
  
    leftDoor.classList.add("openLeftDoor")
    rightDoor.classList.add("openrightDoor")
    Currentlift. isGateOpening=true
    },)
    setTimeout(()=>{
        leftDoor.classList.remove("openLeftDoor")
        rightDoor.classList.remove("openrightDoor")  
        Currentlift. isGateOpening=false
    },(6000))
}
function isLiftGoingOnThatFloor(TargetFloorNo){
    let boolean=false
    for (let liftIndex = 0; liftIndex < AllLiftData.length; liftIndex++) {
        const lift = AllLiftData[liftIndex];
        if (Number(lift.Destination) == TargetFloorNo) {
            boolean=true
         
        }
    }
    return  boolean
}
function callingLift(e){
        let id=e.target.id;
        let TargetFloorNo = id.split("-")[1];
        TargetFloorNo=Number(TargetFloorNo)
        if(isLiftGoingOnThatFloor(TargetFloorNo)){
            console.log(" already exist floor")
        }
        else{
            console.log(" einse else")
            floorsRequest.push(Number(TargetFloorNo));
            // console.log({AllLiftData})
        }
      
        return

      
       
}


const findLiftAtparticularFloor = (destinationFloor) => {

    destinationFloor=Number(destinationFloor)
    let nearestliftId
    // console.log({AllLiftData})
    for (let liftIndex = 0; liftIndex < AllLiftData.length; liftIndex++) {
        const lift = AllLiftData[liftIndex];
        if (Number(lift.currentFloor) == destinationFloor && lift. isRunning === false) {
            nearestLiftDistance=0
            nearestliftId = lift.id;
            nearestliftId=Number(nearestliftId)
        }
    }

    
    return nearestliftId;
}
const ScheduleLift = () => {

    if (floorsRequest.length === 0) return;

    
    const TargetFloorNo = floorsRequest.shift();
    if(isLiftGoingOnThatFloor(TargetFloorNo)){
        return
    }
   let nearestliftId;
    let nearestLiftAtFloor=findLiftAtparticularFloor(TargetFloorNo)

    if(nearestLiftAtFloor){
        nearestliftId=nearestLiftAtFloor
        openCLosedLift(nearestliftId)
        return
    }
    else{
        let nealiftId= findNearestlift(TargetFloorNo)
      
        if(nealiftId){
            nearestliftId=nealiftId
        }
    }

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




