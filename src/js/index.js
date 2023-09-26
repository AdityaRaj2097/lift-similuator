console.log("Inside index.js file")
const submit =document.getElementById("submit")
// const container=document.getElementById("container")
const container=document.querySelector(".container")
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
        "pleae Enter no of Lift"
    )
    return
}
if(noOfLiftElement&&noOfLiftElement.value>12){
    alert(
        "Lift must be lest than 12"
    )
    return
}
if(noOfFloorElement&&noOfFloorElement.value==""){
    alert(
        "pleae Enter no of Floors"
    )
    return
}
;
noOfFloor=noOfFloorElement.value
noofLift=noOfLiftElement.value
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
    upDownContainer.appendChild(upButton)
    upDownContainer.appendChild(downButton)
    upDownContainer.style.cssText="display:flex; flex-direction:column ;justify-content: space-around"
    upDownContainer.setAttribute("id",`Floor-up-down${i}`)
    currentFloor.setAttribute("id",`Floor-${i}`)
    
    currentFloor.appendChild(upDownContainer)

    currentFloor.style.cssText = "height: 120px; min-width: 100vw ;border: 0.1px solid grey;display:flex;flex-direction:row;gap:2rem";

    element.appendChild(currentFloor)

}
    container.innerHTML = ""
    container.style.backgroundColor="#ddd"

    container.appendChild(element)



    let targetFloorNo=container.querySelector("#Floor-1")
let lift;
for(let j=noofLift;j>0;j--){

lift=document.createElement("div")
lift.style.cssText="height:100px; min-width:100px; border:2px solid grey; display:flex;overflow: hidden; "
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
// Totallifts.push(lift)
const liftState = {
    id: j,
    isActicve: false,
    currentFloor: 0,
   
    isMoving: false,
    movingTo: null,
}


AllLiftData.push(liftState)


}})

const findNearestlift = (destinationFloor) => {
   console.log("findNearestlift")
    let nearestLiftDistance = noOfFloor;
    destinationFloor=Number(destinationFloor)
    let nearestliftId
    let  lifts=AllLiftData
    console.log("lifts",{lifts},{AllLiftData},{destinationFloor})
    for (let liftIndex = 0; liftIndex < AllLiftData.length; liftIndex++) {
        const lift = lifts[liftIndex];
        if (Math.abs(lift.currentFloor - destinationFloor) < nearestLiftDistance && lift.isActicve === false) {
            nearestLiftDistance = Math.abs(lift.currentFloor - destinationFloor);
            console.log({nearestLiftDistance})
            nearestliftId = lift.id;
        }
    }
    
    return {nearestliftId,nearestLiftDistance};
}
async function hanldeDoor(door, distanceSrcToDest, targetFloor) {
    console.log({door, distanceSrcToDest, targetFloor})
    const Currentlift = AllLiftData.find(lift => lift.id == door);
    let from=Currentlift.currentFloor
//  let distance=(targetFloor-door)
const distance = -1 * (targetFloor-1) * 120;

const time = Math.abs(from-targetFloor) * 2;


Currentlift.isMoving = true;
Currentlift.movingTo = targetFloor;
Currentlift.isActicve = true;
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
        Currentlift.isMoving = false;
        Currentlift.isActicve = false;
        Currentlift.movingTo = null;
    },(time*1000)+(5000))
    
}
function callingLift(e){
        let id=e.target.id;
        let TargetFloorNo = id.split("-")[1];
       let {nearestliftId,nearestLiftDistance}= findNearestlift(TargetFloorNo)
       console.log("nearestLiftDistance----callingLift"  ,nearestLiftDistance,nearestliftId)
       if(nearestLiftDistance==0){
        hanldeDoor()
       }
       else{
        hanldeDoor(nearestliftId,nearestLiftDistance,TargetFloorNo)
       }

       
}




