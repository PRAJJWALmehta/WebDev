from bottle import run, route, request

@route('/')
def index():
    return {"name": "jsonDAta"} # python automatically converts python dictionary to a JSON file

if __name__ == '__main__':
    run(debug=True, reloader=True)
