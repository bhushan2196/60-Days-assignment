const tbody =document.querySelector("#tbody")
const department=document.querySelector('.department')
const gender=document.querySelector('.gender')
const sort=document.querySelector('.sort')
const prev=document.querySelector('.perv')
const next=document.querySelector('.next')




function getData(){
   const data= fetch(" https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees")
   .then(res=>res.json())
   .then(data=>{

    let page1=[]
    let page=[]
    if(data.data){
        
        for(let i=0;i<10;i++){
            page1.push(data.data[i])
        }
        renderData(page1);
      
        
    }
   
    prev.addEventListener('click',function(){
        page=pagination(data.data,prev.textContent)
        tbody.innerHTML=""
        page.length>0?renderData(page): renderData(page1)
       
        
    })
    next.addEventListener('click',function(){
        tbody.innerHTML=""
        page=pagination(data.data,next.textContent)
        page.length>0?renderData(page): renderData(page1)
      
       
       
    })
  


    sortData(page)
   
   
    
    department.addEventListener("change",function(){
       let departmentData =[]
        if(department.value!="")  {
             departmentData=page.filter((el)=>el.department==department.value)
            tbody.innerHTML=""
            renderData(departmentData)
        }
        else{
            tbody.innerHTML=""
            renderData(page)
        }
       
       sortData(departmentData)
       
    })

    gender.addEventListener("change",function(){
        let genderData=[]
        if(gender.value!=""){
             genderData=page.filter((el)=>el.gender==gender.value)
            tbody.innerHTML=""
            renderData(genderData)
        } 
        else{
            tbody.innerHTML=""
            renderData(page)
        }
        sortData(genderData)
       
    
       
       
    })
    
    
})
}

let count=10


function pagination(userData,btn){
    
  
    let data=[]
    let range=10
    if(count<0) return
    if(userData){
        if(btn=="prev"){
           
            for(let i=count-1; i>=count-range; i--){
                data.push(userData[i])
                
            }
            count-=range
        }
        if(btn=="next" ){
            for(let i=count; i<count+range; i++){
                data.push(userData[i])
              
            }
            count+=range
        }
        console.log(data,count,btn);
        return data
    }

    
    
    
   
}





// functions for data sort by salary
function sortData(arr){
    sort.addEventListener("change",function(){
           
        tbody.innerHTML=""
    if(sort.value=="loToHi"){
        let sortData= arr.sort((a,b)=>a.salary-b.salary)
        renderData(sortData)
    }
    else{
        let sortData= arr.sort((a,b)=>b.salary-a.salary)
        renderData(sortData)
    }   
})
}
// data rendering functions
function renderData(arr){

    arr.forEach((el,i)=>{
        // console.log(el);

        let html=
        ` <tr>
            <td>${i+1}</td>
            <td>${el.name}</td>
            <td>${el.gender}</td>
            <td>${el.department}</td>
            <td>${el.salary}</td>
          </tr>
          
        `


        tbody.innerHTML+=html
    })
   
  
   
}

getData()


