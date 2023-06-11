# http://mywebsite.com/page?query1=value1&query2=value2

from bottle import run, route, request

@route('/')
def querytest():
    param1 = request.query.param1
    param2 = request.query.param2
    return "<h1>The value of param1 is " + param1 + " and of param2 is " + param2 +"</h1>"

if __name__ == '__main__':
    run(debug=True, reloader=True)
