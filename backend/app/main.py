# backend/app/main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/recommend")
async def recommend(request: Request):
    data = await request.json()
    user_genres = data.get('genres', [])
    user_people = data.get('people', [])

    search_url = f'https://openlibrary.org/search.json?q={"%20".join(user_genres)}'
    response = requests.get(search_url)
    books = response.json().get('docs', [])[:10]

    musk_books = ["The Hitchhiker's Guide to the Galaxy", "Zero to One"]
    ravikant_books = ["Sapiens: A Brief History of Humankind", "The Alchemist"]
    gates_books = ["The Great Gatsby", "The Road Ahead"]

    people_books = {
        "Elon Musk": musk_books,
        "Naval Ravikant": ravikant_books,
        "Bill Gates": gates_books
    }

    recommended_books = [{"title": book["title"], "author": book.get("author_name", ["Unknown"])[0], "cover_i": book.get("cover_i")} for book in books]

    for person in user_people:
        recommended_books.extend([{"title": title, "author": "Various", "cover_i": None} for title in people_books.get(person, [])])

    return {"recommendations": recommended_books}

@app.get("/search")
async def search_books(query: str):
    search_url = f'https://openlibrary.org/search.json?q={query}'
    response = requests.get(search_url)
    books = response.json().get('docs', [])[:10]
    search_results = [{"title": book["title"], "author": book.get("author_name", ["Unknown"])[0], "cover_i": book.get("cover_i")} for book in books]
    return {"results": search_results}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
