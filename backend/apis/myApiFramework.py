class myApp:

    def __init__(self):
        self.routes = []

    def get(self, path):
        def wrapper(fn):
            route = {
                "path": path,
                "method": "GET",
                "func": fn
            }
            self.routes.append(route)
            return fn

        return wrapper

    def post(self,path):
        def wrapper(fn):
            route = {
                "path" : path,
                "method": "POST",
                "func": fn
            }
            self.routes.append(route)
            return fn
        return wrapper

# like app = FastAPI()
app = myApp()

# root = app.get("/")(root)
@app.get("/")
def root():
    print("This is root")

# login = app.get("/login")(login)
@app.post("/login")
def login():
    print("This is root")


print("paths: ", app.routes)