// Function to fetch books from the backend API
async function loadBooks() {
    try {
        const response = await fetch('http://localhost:5000/api/books');
        const books = await response.json();
        
        const booksList = document.getElementById('booksList');
        booksList.innerHTML = ''; // Clear loading text

        books.forEach(book => {
            booksList.innerHTML += `
                <div style="border-bottom: 1px solid #ddd; padding: 10px 0;">
                    <h4>${book.title}</h4>
                    <p>Author: ${book.author} | Status: <b>${book.status}</b></p>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error loading books:", error);
        document.getElementById('booksList').innerText = "Failed to load books.";
    }
}

// Run this function when the page loads
loadBooks();