{{* control logic in templates *}}
% if True:
    <h1> hello </h1>
% else:
    <h1> Else block </h1>
% end

% for i in range(10):
    <p> This is loop index: {{i}}</p>
% end

{{* {{variables}} put double brackets to print variables  *}}
<h1> Hello {{name}} </h1>