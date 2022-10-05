'use strict';
const modalDiv = document.querySelector('#modalDiv')
const appDiv = document.querySelector('#appDiv')
const modalWrap = document.querySelector('.modalWrap');
const hide = document.querySelector('.hide');
const modalTop = document.querySelector('.topModal');
const searchSwitch = document.querySelector('#searchSwitch');
const showSwitch = document.querySelector('#showSwitch');


let brandIdV = null
let prodIdV = null
let sizeIdV = null
let sizeValueV = null
let sizeValueIndex = null

// close btn in modal div
hide.addEventListener('click', ()=>{
	modalWrap.classList.toggle('active');
	modalDiv.innerHTML='';
	modalTop.innerHTML='';	
})

// set nav buttons in modal div
function setNavBtn(elClass, nbr){
  const checkBtn = document.querySelector(elClass)  
  if(checkBtn){
    while(modalTop.childNodes.length>nbr){
      modalTop.removeChild(modalTop.lastChild)
    }    
  }
}

// create buttons
	function crBtn (idBtn, classBtn, container, action, name){
  const html = `<button data-name='${idBtn}' onclick=${action} class ='${classBtn}'>${name}</button>`;
  container.innerHTML += html;
}  
	
  //brands.sort();
	/*for(i=0;i<brands.length;i++){
  if(brands[i]=='International'){
  let inter = brands.splice(i, 1);
 	brands.unshift(inter[0]);
  }
  }*/
	
//buttons for Brnads with international size chart
interBrands.forEach(interBrand=>{
  	crBtn('International', 'brandBtn', appDiv, 'clickBrand(this.dataset.name)', interBrand) 
  })

  //buttons for Brnads with unique size chart
  const brands = [...Object.keys(sizeGuide)]
  brands.forEach(brand => {
   const brandsBtn = crBtn (brand, 'brandBtn', appDiv, 'clickBrand(this.dataset.name)',brand)
  }) 
 
// click brand button and show brand's products
function clickBrand (brandId){
  brandIdV = brandId;
  modalDiv.innerHTML=''
  modalTop.innerHTML=''
  modalWrap.classList.add('active')  
  const checkBtn = document.querySelector('.topModal>.brandBtn')
  if(!checkBtn){crBtn (brandId, 'brandBtn', modalTop, 'clickBrand(this.dataset.name)',brandId)}     
  const prods = Object.keys(sizeGuide[brandId]).sort()  
  
  prods.forEach(prod=>{
    crBtn(prod, 'prodBtn', modalDiv, 'clickProd(this.dataset.name)',prod)    
  })

}

//click product button and show vaialabe size IDs
function clickProd (prodId){
  prodIdV = prodId;  
  modalDiv.innerHTML='';   
  setNavBtn('.prodBtn', 1);  
  crBtn(prodId, 'prodBtn', modalTop, 'clickProd(this.dataset.name)',prodId)
	
const sizeVs = Object.values(sizeGuide[brandIdV][prodId])
  // check if length of size numbers arrays are the same
  for(let i=1;i<sizeVs.length;i++){
    if(sizeVs[0].length!=sizeVs[i].length){	
    sizeVs.forEach(sizeV=>{
    console.log(sizeV.length)//show lengths of size arrays
    })    
    alert (`if you see that alert '${prodId}' has corrupted size chart so please report it to your lovely TL.`);
  return;
    }	
  }
  const sizeIds = Object.keys(sizeGuide[brandIdV][prodId]) 
  
  sizeIds.forEach(sizeId=>{
    crBtn(sizeId, 'sizeIdBtn', modalDiv, 'clickSizeId(this.dataset.name)', sizeId)    
  }) 
}

// click sizeId button and show size array values
function clickSizeId (sizeId){
  sizeIdV = sizeId;
  modalDiv.innerHTML='';  
  setNavBtn('.sizeIdBtn', 2);   
  crBtn(sizeId, 'sizeIdBtn', modalTop, 'clickSizeId(this.dataset.name)', sizeId)

  const sizeValues = Object.values(sizeGuide[brandIdV][prodIdV][sizeId])   

  sizeValues.forEach((sizeValue, index)=>{    
    crBtn(index, 'sizeValueBtn', modalDiv, `'clickSizeValue(this.dataset.name,this.innerText)'`, sizeValue)     
  })  
}

//click size value (number that need tobe checked) and show remaining size IDs
function clickSizeValue (sizeIndex, sizeValueId){
  sizeValueIndex = sizeIndex;
  sizeValueV = sizeValueId;   
  modalDiv.innerHTML='';
  setNavBtn('.sizeValueBtn', 3);   
  crBtn(sizeIndex, 'sizeValueBtn', modalTop, `'clickSizeValue(this.dataset.name,this.innerText)'`, `${sizeValueId}`)

  const sizeIds = Object.keys(sizeGuide[brandIdV][prodIdV])
  sizeIds.forEach(sizeId =>{
    if(sizeId!=sizeIdV){
    crBtn(sizeId, 'sizeIdBtn', modalDiv, 'showTargetSize(this.dataset.name)',sizeId)}
  })
}
    
  //click one of reaining size Ids to find correct size number
function showTargetSize (sizeId2){
  modalDiv.innerHTML='';
  crBtn(sizeId2, 'sizeIdTarget', modalTop, 'none', sizeId2)
  const sizeValues2 = Object.values(sizeGuide[brandIdV][prodIdV][sizeId2])
  crBtn(sizeValueIndex, 'sizeValueTargetBtn', modalDiv, 'none', sizeValues2[sizeValueIndex])    
  }
  
//collect all avaialable brand buttons
const brandBtns = [...document.querySelectorAll('.brandBtn')]


//utility buttons
let searchBtn = false;
let switchBtn = false;

//change search mode

searchSwitch.addEventListener('click',()=>{
  searchBtn = !searchBtn
 if(!searchBtn){
   searchSwitch.innerText = 'a...'
 }else if(searchBtn){
  searchSwitch.innerText = '..a.'
 }  
})


//show/hide brand buttons
showSwitch.addEventListener('click', ()=>{
  switchBtn = !switchBtn
  if(!switchBtn){
    showSwitch.innerText = 'show'
    brandBtns.forEach(brandBtn=>{
      brandBtn.style.display = 'none'
    })
  }else if(switchBtn){
    showSwitch.innerText = 'hide'
    brandBtns.forEach(brandBtn=>{
      brandBtn.style.display = 'block'
    })
  }
})

// search bar
function searchBrand(){
	let input = document.getElementById('searchbar').value;
  input = input.toLowerCase();  
  const letters = /^[A-Za-z]+$/;
  // check if letters only
  if(input===letters){
    return 
  }

  for(let i = 0; i < brandBtns.length; i++){   
    if(input==''){
    	brandBtns[i].style.display = "none" 
  	}else if(!brandBtns[i].innerHTML.toLowerCase().startsWith(input)&&!searchBtn&&input){
    		brandBtns[i].style.display = "none"; //hide btns that are not searched
    }else if(!brandBtns[i].innerHTML.toLowerCase().includes(input)&&searchBtn){
      brandBtns[i].style.display = "none";
    } else {
    	brandBtns[i].style.display = 'block';  //show searched buttons   
    }
  }  
};

brandBtns.sort((a,b)=>a.innerText>b.innerText?1:-1)

// button with international size chart moved to beginning of div
for(let i=0;i<brandBtns.length;i++){
    if(brandBtns[i].innerText=='International'){    
    let inter = brandBtns.splice(i, 1);
    brandBtns.unshift(inter[0]);
    }
  }
  
brandBtns.forEach(btn=>appDiv.appendChild(btn))

//----------tests for duplicates

const findDuplicates = arrs => arrs.filter((item, index)=> arrs.indexOf(item) !==index)
const duplicatesInter = findDuplicates(interBrands)
//const duplicatesBrands = findDuplicates(brands)
//console.log(arr2)

if(duplicatesInter.length>0){
console.log(duplicatesInter)}
/*
if(duplicatesBrands.length>0){
  console.log(duplicatesBrands)}
*/
console.log(brandBtns.length)