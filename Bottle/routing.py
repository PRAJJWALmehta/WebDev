from bottle import run, route

# route is a decorator
@route('/login')
def login():
    return "<h1>Login</h1>"

@route('/register')
def register():
    return "<h1>register</h1>"

#dynamic links
@route('/article/<id>/<name>')
#must pass the dynamic parts of the link as inputs
def article(id, name):
    return "<h1> You are viewing article " + id + " with a name of " + name + "</h1>"
   
@route('/posted', method = "POST") # by default the method is get
def posted():
    return "<h1>Posted</h1>" # post method won't work some data is sent
 
if __name__ == '__main__':
    run(debug = True, reloader=True) 