from fastapi import FastAPI
from dotenv import dotenv_values
from routes import router as book_router


# config = dotenv_values('.env')
app = FastAPI()

@app.on_event('startup')
def start_db_client():
    
    print('Successfully connceted to the database')
    
@app.on_event('shutdown')
def shutdown_db_client():
    
    print('Shutdown connected')

    
app.include_router(book_router, tags=['recipe'], prefix='/recipes')
