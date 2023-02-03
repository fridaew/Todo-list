BASE_URL='https://jsonplaceholder.typicode.com/todos'
const form= document.querySelector('.container form')
let tasks=[]
const lista = document.querySelector('#tasks-board')
const modal = document.querySelector('#myModal')
const closeModal = document.querySelector('.close')

const getTodos = async () => {
      const res = await fetch( BASE_URL + '?_limit=7')
      const data = await res.json()
        console.log(data)
        tasks = data
  
   const loadItems =() => { 
    
   tasks.forEach(item =>{
      document.querySelector('#tasks-board').appendChild(createItemElement(item,item.id)) 
     })
}
loadItems()

}
getTodos()

function createItemElement (itemValue,id) { 
    let post = document.createElement('div')
    post.classList.add('items')
    post.id=id

    let p = document.createElement('p')
    p.classList.add('user-add')
    p.innerText = itemValue.title

     let checkbox = document.createElement('input')
    checkbox.type = "checkbox"
    checkbox.classList.add('checkbox')
    checkbox.checked = itemValue.completed

    let button = document.createElement('button')
    button.classList.add('delete')
    button.className = 'bi bi-x-lg'
    button.id=id

    post.appendChild(checkbox)
    post.appendChild(p)
    post.appendChild(button)

    
    const checkTask =() =>{

      checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          p.classList.add('strike-through');
        } 
        
       else {
          p.classList.remove('strike-through');
        }
       
      });
    
       if(checkbox.checked){
        p.classList.add('strike-through');
       }
    }
    
    checkTask()
    return post

}
 const addTodo = async(e) =>{ 

  e.preventDefault()

  const input = form.querySelector('#input')
  let itemValue = input.value

  if (input.value.trim() === "") {
    document.querySelector('#errorMessage').innerHTML="Du måste skriva något"
    return false
  }

const newTodo = {
    userId: 1,
    title: itemValue,
    completed: false
  };
 
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      // data.id = crypto.randomUUID()
      data.id=Math.max(...tasks.map(b=>b.id))+1
    
      tasks.unshift(data)
      console.log(data);
  
      const item = createItemElement(data); 
      
      lista.prepend(item);

      console.log(tasks); 
    
      form.reset();

   } catch (err) {
      console.error(err);
    }
  
}
form.addEventListener('submit', addTodo)

lista.addEventListener('click', async (e) => {
  
  const checkModal =() =>{
    modal.style.display = "block";
    
    closeModal.onclick = function(event) {
      if (event.target == closeModal) {
        modal.style.display = "none";
      }
    
    }}

if (e.target.nodeName === 'BUTTON') {
      const itemId = e.target.id;
      const checkbox = e.target.parentElement.querySelector('.checkbox')

      if (checkbox.checked !== true) {
         checkModal()
        return false
       }
    try {
        await fetch(BASE_URL + '/' + itemId, {
          method: 'DELETE'
        });

        const taskIndex = tasks.findIndex(item => item.id !== +itemId);
        if (taskIndex !== -1) {
          tasks.splice(taskIndex, 1);
        }
        e.target.parentNode.remove();
        console.log(tasks);
        
        } catch (err) {
        console.error(err);
      }
    }

  });










  
  
  

  








   

