from bottle import run, route, error

@error(404)
def error404(error):
    return "<h1>You have encountered error 404</h1>"

@error(405)
def error405(error):
    return "<h1>This method is not allowed</h1>"

@error(500)
def error500(error):
    return "<h1>Internal Server error, fix your code</h1>"

@route('/', method = "POST")
def index():
    return "<h1>Hello</h1>"

@route('/zero')
def zero():
    return 1/0


if __name__ == '__main__':
    run(debug=False, reloader=True) # setting debug to false 
