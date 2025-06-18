from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database.connection import get_connection  # Your connection file
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only, restrict in prod!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/api/login")
def login(request: LoginRequest):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT name, password FROM students WHERE email = %s", (request.email,))
    result = cur.fetchone()
    if not result or result[1] != request.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    name = result[0]
    return {
        "message": "Login successful", 
        "status": "success", 
        "name": name
    }

@app.get("/api/courses")
def get_courses():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, title, instructor, schedule, credits, status FROM courses")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    # Convert to dicts
    courses = [
        {
            "id": row[0],
            "title": row[1],
            "instructor": row[2],
            "schedule": row[3],
            "credits": row[4],
            "status": row[5],
        }
        for row in rows
    ]
    return courses

@app.get("/api/assignments")
def get_assignments():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, title, due, status FROM assignments")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    assignments = [
        {
            "id": row[0],
            "title": row[1],
            "due": row[2],
            "status": row[3],
        }
        for row in rows
    ]
    return assignments

@app.get("/api/grades")
def get_grades():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT course, instructor, assignment, score, total
        FROM grades
        ORDER BY course, assignment
    """)
    rows = cur.fetchall()
    cur.close()
    conn.close()

    # Group by course
    courses = {}
    for row in rows:
        course, instructor, assignment, score, total = row
        if course not in courses:
            courses[course] = {
                "course": course,
                "instructor": instructor,
                "assignments": [],
                "overall": 0
            }
        courses[course]["assignments"].append({
            "name": assignment,
            "score": score,
            "total": total
        })

    # Calculate overall grade for each course
    for c in courses.values():
        total_score = sum(a["score"] for a in c["assignments"])
        total_possible = sum(a["total"] for a in c["assignments"])
        c["overall"] = round((total_score / total_possible) * 100) if total_possible else 0

    return list(courses.values())

# Request model for profile
class EmailRequest(BaseModel):
    email: str

@app.post("/api/profile")
async def get_profile(request: EmailRequest):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "SELECT name, email, age, country, dept, address FROM profiles WHERE email = %s",
        (request.email,)
    )
    row = cur.fetchone()
    cur.close()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Profile not found")
    profile = {
        "name": row[0],
        "email": row[1],
        "age": row[2],
        "country": row[3],
        "dept": row[4],
        "address": row[5],
    }
    return profile

class SettingsRequest(BaseModel):
    email: str

class UpdateProfileRequest(BaseModel):
    email: str
    name: str
    notifications: bool

class ChangePasswordRequest(BaseModel):
    email: str
    current_password: str
    new_password: str

class DeleteAccountRequest(BaseModel):
    email: str

@app.post("/api/settings")
def get_settings(request: SettingsRequest):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT name, email FROM profiles WHERE email = %s", (request.email,))
    row = cur.fetchone()
    cur.close()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="User not found")
    return {"name": row[0], "email": row[1]}

@app.put("/api/settings")
def update_profile(request: UpdateProfileRequest):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "UPDATE profiles SET name = %s, WHERE email = %s",
        (request.name, request.email)
    )
    conn.commit()
    cur.close()
    conn.close()
    return {"message": "Profile updated"}

@app.patch("/api/settings/password")
def change_password(request: ChangePasswordRequest):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT password FROM profiles WHERE email = %s", (request.email,))
    row = cur.fetchone()
    if not row or row[0] != request.current_password:
        cur.close()
        conn.close()
        raise HTTPException(status_code=400, detail="Current password incorrect")
    cur.execute(
        "UPDATE profiles SET password = %s WHERE email = %s",
        (request.new_password, request.email)
    )
    conn.commit()
    cur.close()
    conn.close()
    return {"message": "Password changed"}

@app.delete("/api/settings")
def delete_account(request: DeleteAccountRequest):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM profiles WHERE email = %s", (request.email,))
    conn.commit()
    cur.close()
    conn.close()
    return {"message": "Account deleted"}
