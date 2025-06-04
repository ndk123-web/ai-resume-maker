from weasyprint import HTML
from jinja2 import Template

# === Input Data ===
user_data = {
    "name": "Navnath D. Kale",
    "email": "navnath@example.com",
    "phone": "+91-1234567890",
    "summary": "Computer Engineering student passionate about AI, ML, and Full Stack development.",
    "skills": ["Python", "FastAPI", "Django", "React", "Node.js", "Express", "Machine Learning"],
    "experience": [
        {
            "role": "Intern Developer",
            "company": "XYZ Technologies",
            "duration": "Jan 2024 - Apr 2024",
            "description": "Worked on backend APIs using FastAPI and improved system performance by 20%."
        },
        {
            "role": "Project Lead",
            "company": "College Project",
            "duration": "Aug 2023 - Dec 2023",
            "description": "Led a team to build a web-based study chat application using Django Channels."
        }
    ]
}

# === Read Template HTML ===
with open("template.html", "r") as f:
    html_content = f.read()

# === Render with Jinja2 ===
template = Template(html_content)
rendered_html = template.render(user_data)

# === Generate PDF ===
HTML(string=rendered_html, base_url='.').write_pdf("resume.pdf")

print("✅ PDF created successfully!")
