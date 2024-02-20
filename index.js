import {menuArray} from '/data.js'
const orderSummaryId = document.getElementById('order-list')
const totalPrice = document.getElementById('total-price')
let orderArray = []
const cardForm = document.getElementById('card-form')
const appColor = document.getElementById('app-color')
const inputName = document.getElementById('input-name')
const orderConfirmation = document.getElementById('order-confirmation')
const orderList = document.getElementById('order-list')
const payForm = document.getElementById('pay-form')
const inputCard = document.getElementById('input-card')
const inputCvv = document.getElementById('input-cvv')
const closeFormBtn = document.getElementById('close-form')
// Event Listner

document.addEventListener('click',function(e){
    e.preventDefault()
    if(e.target.dataset.add){
          orderSummary(e.target.dataset.add) 
    }

    if(e.target.dataset.remove ){
        removeItemFromOrder(e.target.dataset.remove)
    }
    if(e.target.id === 'complete-btn'){
        renderForm()
    }

    if(e.target.id === 'close-form'){
        closeForm()
    }

    if(e.target.id ==='pay-btn' )
    if(inputName.value)
    if(inputCard.value)
    if(inputCvv.value){
    confirmOrder(inputName.value)
    clearForm()
    }
    
})

// Rendering Menu

function getMenu(menuItemArray){
    let menuHtml = ""
     menuItemArray.forEach(function(menuItem){
         menuHtml += `
         <div class="pizza-item">
         <div class="pizza-icon">${menuItem.emoji}</div>
         <div class="item-text">
         <h3 class="item-title">${menuItem.name}</h3>
         <p class="item-ingredients">${menuItem.ingredients}</p>
         <p class="item-price">$${menuItem.price}</p>
         <i class="fa-solid fa-plus" data-add="${menuItem.id}"></i>     
         </div>    
     </div>
         `
     })
     return menuHtml
 }



// Remove Item Function

function removeItemFromOrder(removeItem){
    let orderTittleHtml = ""
    const removeOrderObj = orderArray.findIndex(function(removeItemId){
        return removeItemId.ProductId === removeItem
        
    }) 

     orderArray.splice(removeOrderObj, 1)
    
    
     document.getElementById('order-item').innerHTML = orderTittleHtml
        updateOrderArray(orderArray)
        getTotalPrice(orderArray)
    if(orderArray.length === 0){
        orderSummaryId.style.display = 'none'     
    }
    
    }
 
    function updateOrderArray(orderArrayUpdated){
        let orderArrayHtml = '' 
        
         orderArrayUpdated.forEach(function(finalOrderArray){
            orderArrayHtml += `
            
            <div class="total-order-view">    
                <h3 class="item-title">${finalOrderArray.productName}</h3>
                <button id="remove-btn" data-remove="${finalOrderArray.ProductId}">remove</button>
                <p class="item-price order-price" id="item-price">$${finalOrderArray.productPrice}</p>
            </div>
        `  
        })

        renderFinalOrder(orderArrayHtml)
        
        }
    

// Rendering Orders
function orderSummary(orderItems){
    
    let orderItemsHtml = ''
    const orderSummaryObj = menuArray.filter(function(orderItemsId){
        return orderItemsId.id === orderItems
         })[0]
         

         const {name, ingredients, emoji, id, isPurchased, price } = orderSummaryObj
                
         if(orderSummaryObj.isPurchased){
            orderArray.push({
            productName: name,
            productPrice: price,
            ProductId:id
            })  

            getTotalPrice(orderArray)    
    
                orderItemsHtml += `
        
                    <div class="total-order-view">
                    <h3 class="item-title">${name}</h3>
                    <button id="remove-btn" data-remove="${id}">remove</button>
                    <p class="item-price order-price" id="item-price">$${price}</p>
                    </div>
            `  
            document.getElementById('order-item').innerHTML += orderItemsHtml
            orderSummaryId.style.display = 'flex'   
            orderList.style.display = 'block'  
            orderConfirmation.style.display = 'block' 
            appColor.style.backgroundColor = '#FFFFFF'
            document.getElementById('order-footer').innerHTML = ''
            
    }
    
    orderSummaryObj.isPurchased = !orderSummary.isPurchased
    
}

function getTotalPrice(array){
    
   const finalPrice = array.reduce(function(itemPrice, totalPrice){
                  return  itemPrice + totalPrice.productPrice
    },0)
     return totalPrice.innerHTML ='$' + finalPrice
     
}


function renderFinalOrder(orderHtml){
    document.getElementById('order-item').innerHTML += orderHtml
}

function render(){
    document.getElementById('items-list').innerHTML = getMenu(menuArray)
}

function closeForm(){
    cardForm.style.display = 'none'
    appColor.style.backgroundColor = 'white'
    document.getElementById("complete-btn").style.backgroundColor = '#16DB99'
    
}

function renderForm(){
    cardForm.style.display = 'flex'
    appColor.style.backgroundColor = '#F5F5F5'
    document.getElementById("complete-btn").style.backgroundColor = '#F5F5F5'
}

function confirmOrder(customer){
    let customerName = customer
    document.getElementById("complete-btn").style.backgroundColor = '#16DB99'
    let customerNameHtml = ''
    customerNameHtml =
    `<div class="hide-border-bottom">
    <p class= "confirmation-message">Thanks, ${customerName}!Your order is on it's way!</p>
    </div`
    
    
    orderSummaryId.style.border = 'none'
    document.getElementById('order-footer').innerHTML = customerNameHtml    
    cardForm.style.display = 'none'
    orderConfirmation.style.display = 'none'
    orderList.style.border = 'none'  
    orderSummaryId.style.display = 'none'
    document.getElementById('order-item').innerHTML = ''
    orderArray.length = 0  
    
}

function clearForm(){
    inputName.value = ''
    inputCard.value = ''
    inputCvv.value = ''
}


render()