

const add = document.querySelector('.add-button')
const container = document.querySelector('.main-container')
const books = []

add.addEventListener('click', () => {
  const title = document.querySelector('.title').value
  const author = document.querySelector('.author').value
  const pages = document.querySelector('.pages').value
  books.unshift({
    title: title,
    author: author,
    pages: pages,
    read: 5
  })
  addBook()
})

function addBook() {
  let newBookContainer = ''

  books.forEach((item, index) => {
    html = `
      <div class="book-container">
        <div class="book-title book-title-${index}">${item.title}</div>
        <div class="author author-${index}">${item.author}</div>
        <div class="pages-read">Pages read <br>
          <div class="span-container">
            <input class="read" type="number" value="${item.read}">
            <span>/</span>
            <span class="total total-${index}">${item.pages}</span>
          </div>
        </div>
        <div class="controls controls-${index}">
          <button class="remove" data-index="${index}">remove</button>
          <button class="edit" data-index="${index}">edit</button>
          <button class="complete">complete</button>
        </div>
      </div>
    `
    newBookContainer += html

    
  })
  container.innerHTML = newBookContainer

  document.querySelectorAll('.remove')
      .forEach((button) => {
        button.addEventListener('click', () => {
          const index = button.dataset.index
          books.splice(index, 1)
          addBook()
        })
      })

  document.querySelectorAll('.edit')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const index = button.dataset.index
        const title = document.querySelector(`.book-title-${index}`)
        const prevTitle = title.innerText
        title.innerHTML = `
        <input class="edit-name-${index}" type="text" value="${prevTitle}">
        `
        const author = document.querySelector(`.author-${index}`)
        const prevAuthor = author.innerText
        author.innerHTML = `
          <input class="edit-author-${index}" type="text" value="${prevAuthor}">
        `
        const total = document.querySelector(`.total-${index}`)
        const prevTotal = total.innerText
        total.innerHTML = `
          <input class="edit-total-${index}" type="text" value="${prevTotal}">
        `
        document.querySelector(`.controls-${index}`)
          .innerHTML = `
            <button class="cancel">cancel</button>
            <button class="save" onclick="
              console.log(${index})
              function save() {
                books[${index}].title = document.querySelector('.edit-name-${index}').value
                books[${index}].author = document.querySelector('.edit-author-${index}').value
                books[${index}].pages = document.querySelector('.edit-total-${index}').value
              }
              save()
              addBook()
            ">save</button>
          `
      })
    })     
}
